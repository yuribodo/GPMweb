import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

const api = import.meta.env.VITE_API_LINK;

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    titulo_projeto: '',
    edital: '',
    area: '',
    objetivo: '',
    metas: '',
    discentes: [],
    docentes: []  
  });

  const [availableDiscentes, setAvailableDiscentes] = useState([]);
  const [availableDocentes, setAvailableDocentes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch existing discentes and docentes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discentesRes, docentesRes] = await Promise.all([
          axios.get(`${api}/discentes`),
          axios.get(`${api}/doscentes`)
        ]);
        setAvailableDiscentes(discentesRes.data);
        setAvailableDocentes(docentesRes.data);
      } catch (err) {
        console.error('Erro ao carregar dados:', err);
        setError('Erro ao carregar discentes e docentes');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDiscenteSelect = (e) => {
    const selectedDiscente = availableDiscentes.find(
      d => d.matricula === e.target.value
    );
    if (selectedDiscente && !formData.discentes.some(d => d.matricula === selectedDiscente.matricula)) {
      setFormData(prev => ({
        ...prev,
        discentes: [...prev.discentes, selectedDiscente]
      }));
    }
  };

  const handleDocenteSelect = (e) => {
    const selectedDocente = availableDocentes.find(
      d => d.siape === e.target.value
    );
    if (selectedDocente && !formData.docentes.some(d => d.siape === selectedDocente.siape)) {
      setFormData(prev => ({
        ...prev,
        docentes: [...prev.docentes, selectedDocente]
      }));
    }
  };

  const removeDiscente = (matricula) => {
    setFormData(prev => ({
      ...prev,
      discentes: prev.discentes.filter(d => d.matricula !== matricula)
    }));
  };

  const removeDocente = (siape) => {
    setFormData(prev => ({
      ...prev,
      docentes: prev.docentes.filter(d => d.siape !== siape)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Log para debug
      console.log('Enviando dados:', formData);

      // Preparar dados para envio
      const dataToSend = {
        ...formData,
        // Garantir que apenas os IDs necessários sejam enviados
        discentes: formData.discentes.map(d => ({ matricula: d.matricula })),
        docentes: formData.docentes.map(d => ({ siape: d.siape }))
      };

      console.log('Dados formatados para envio:', dataToSend);

      const response = await axios.post(`${api}/projetos`, dataToSend);
      console.log('Resposta da API:', response.data);

      navigate('/projetos', { state: { message: 'Projeto criado com sucesso!' } });
    } catch (err) {
      console.error('Erro ao criar projeto:', err);
      setError('Falha ao criar o projeto. Por favor, tente novamente.');
    }
  };

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Criar Projeto</h2>
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
        >
          {error && <p className="text-red-500">{error}</p>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título do Projeto
              </label>
              <input
                name="titulo_projeto"
                type="text"
                value={formData.titulo_projeto}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Edital
              </label>
              <input
                name="edital"
                type="text"
                value={formData.edital}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Área
              </label>
              <input
                name="area"
                type="text"
                value={formData.area}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Objetivo
              </label>
              <textarea
                name="objetivo"
                value={formData.objetivo}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Metas
              </label>
              <textarea
                name="metas"
                value={formData.metas}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Discentes Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adicionar Discente
              </label>
              <select
                onChange={handleDiscenteSelect}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Selecione um discente</option>
                {availableDiscentes.map(discente => (
                  <option key={discente.matricula} value={discente.matricula}>
                    {discente.nome} - {discente.matricula}
                  </option>
                ))}
              </select>

              <div className="mt-2 space-y-2">
                {formData.discentes.map(discente => (
                  <div key={discente.matricula} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{discente.nome} - {discente.matricula}</span>
                    <button
                      type="button"
                      onClick={() => removeDiscente(discente.matricula)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Docentes Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adicionar Docente
              </label>
              <select
                onChange={handleDocenteSelect}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Selecione um docente</option>
                {availableDocentes.map(docente => (
                  <option key={docente.siape} value={docente.siape}>
                    {docente.nome} - {docente.siape}
                  </option>
                ))}
              </select>

              <div className="mt-2 space-y-2">
                {formData.docentes.map(docente => (
                  <div key={docente.siape} className="flex items-center justify-between p-2 border rounded-md">
                    <span>{docente.nome} - {docente.siape}</span>
                    <button
                      type="button"
                      onClick={() => removeDocente(docente.siape)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Criar Projeto
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default CreateProjectForm;