import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditDiscente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    lates: '',
    date_born: '',
    projetoId: '',
    tamanho_camisa: '',
    contato: '',
    bolsista: false
  });

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchDiscente = async () => {
      try {
        const response = await axios.get(`${api}/discentes/${id}`);
        
        const formattedData = {
          ...response.data,
          date_born: new Date(response.data.date_born).toISOString().split('T')[0]
        };
        setFormData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do discente:', error);
        setError('Falha ao carregar os dados do discente. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchDiscente();
  }, [id]);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/discentes/${id}`, formData);
      setSuccessMessage('Discente editado com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/manage', { state: { message: 'Discente editado com sucesso!' } });
      }, 3000);
    } catch (error) {
      console.error('Erro ao editar discente:', error);
      setError('Falha ao editar o discente. Por favor, tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Carregando dados do discente...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-green-500"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 underline mb-4"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900">Editar Discente</h2>

        {successMessage && (
          <motion.div
            className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label htmlFor="matricula" className="block text-sm font-medium text-gray-700">
              Matrícula
            </label>
            <input
              id="matricula"
              name="matricula"
              type="text"
              value={formData.matricula}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              value={formData.cpf}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lates" className="block text-sm font-medium text-gray-700">
              Lattes
            </label>
            <input
              id="lates"
              name="lates"
              type="text"
              value={formData.lates}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="date_born" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              id="date_born"
              name="date_born"
              type="date"
              value={formData.date_born}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="projetoId" className="block text-sm font-medium text-gray-700">
              ID do Projeto
            </label>
            <input
              id="projetoId"
              name="projetoId"
              type="number"
              value={formData.projetoId}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="tamanho_camisa" className="block text-sm font-medium text-gray-700">
              Tamanho da Camisa
            </label>
            <select
              id="tamanho_camisa"
              name="tamanho_camisa"
              value={formData.tamanho_camisa}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Selecione um tamanho</option>
              <option value="PP">PP</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
              <option value="GG">GG</option>
              <option value="XG">XG</option>
            </select>
          </div>

          <div>
            <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <input
              id="contato"
              name="contato"
              type="text"
              value={formData.contato}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div className="flex items-center">
            <input
              id="bolsista"
              name="bolsista"
              type="checkbox"
              checked={formData.bolsista}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="bolsista" className="ml-2 block text-sm text-gray-900">
              Bolsista
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Salvar Alterações
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default EditDiscente;