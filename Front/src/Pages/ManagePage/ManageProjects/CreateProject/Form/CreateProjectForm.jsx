import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import DiscenteForm from '../../../ManageDiscentes/CreateDiscente/DiscenteForm';
import DocenteForm from '../../../ManageDocente/CreateDocente/DocenteForm';

const api = import.meta.env.VITE_API_LINK;

const CreateProjectForm = () => {
  const [formData, setFormData] = useState({
    titulo_projeto: '',
    edital: '',
    area: '',
    objetivo: '',
    metas: '',
    discentes: [
      { matricula: '', nome: '', cpf: '', lates: '', date_born: '', tamanho_camisa: '', contato: '', bolsista: false },
    ],
    doscentes: [
      { siape: '', nome: '', email: '', contato: '' },
    ],
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  
  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedForm = { ...prev };
      if (type === 'discente') {
        updatedForm.discentes[index][name] = value;
      } else if (type === 'docente') {
        updatedForm.doscentes[index][name] = value;
      } else {
        updatedForm[name] = value;
      }
      return updatedForm;
    });
  };

  
  const addDiscente = () => {
    setFormData((prev) => ({
      ...prev,
      discentes: [...prev.discentes, { matricula: '', nome: '', cpf: '', lates: '', date_born: '', tamanho_camisa: '', contato: '', bolsista: false }],
    }));
  };

  
  const addDocente = () => {
    setFormData((prev) => ({
      ...prev,
      doscentes: [...prev.doscentes, { siape: '', nome: '', email: '', contato: '' }],
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api}/projetos`, formData);
      navigate('/projetos', { state: { message: 'Projeto criado com sucesso!' } });
    } catch (err) {
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
        className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md border border-gray-600"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">Criar Projeto</h2>
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error && <p className="text-red-500">{error}</p>}

          
          <div>
            <label htmlFor="titulo_projeto" className="block text-sm font-medium text-gray-700">
              Título do Projeto
            </label>
            <input
              id="titulo_projeto"
              name="titulo_projeto"
              type="text"
              value={formData.titulo_projeto}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Digite o título do projeto"
            />
          </div>

          <div>
            <label htmlFor="edital" className="block text-sm font-medium text-gray-700">
              Edital
            </label>
            <input
              id="edital"
              name="edital"
              type="text"
              value={formData.edital}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Ex: Edital 2024/01"
            />
          </div>

          
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Área
            </label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Área de pesquisa"
            />
          </div>

         
          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <textarea
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Defina os objetivos do projeto"
            />
          </div>

          
          <div>
            <label htmlFor="metas" className="block text-sm font-medium text-gray-700">
              Metas
            </label>
            <textarea
              id="metas"
              name="metas"
              value={formData.metas}
              onChange={(e) => handleChange(e)}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Defina as metas do projeto"
            />
          </div>

          
          <div>
            <h3 className="text-xl font-bold text-gray-900">Discentes</h3>
            {formData.discentes.map((discente, index) => (
              <DiscenteForm key={index} discente={discente} index={index} handleChange={handleChange} />
            ))}
            <button 
              type="button" 
              onClick={addDiscente} 
              className="mt-2 text-green-500 hover:text-green-600"
            >
              + Adicionar Discente
            </button>
          </div>

         
          <div>
            <h3 className="text-xl font-bold text-gray-900">Docentes</h3>
            {formData.doscentes.map((docente, index) => (
              <DocenteForm key={index} docente={docente} index={index} handleChange={handleChange} />
            ))}
            <button 
              type="button" 
              onClick={addDocente} 
              className="mt-2 text-green-500 hover:text-green-600"
            >
              + Adicionar Docente
            </button>
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
