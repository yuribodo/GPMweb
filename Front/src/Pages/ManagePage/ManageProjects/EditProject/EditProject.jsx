import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    titulo_projeto: '',
    edital: '',
    area: '',
    objetivo: '',
    metas: '',
  });

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${api}/projetos/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do projeto:', error);
        setError('Falha ao carregar os dados do projeto. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/projetos/${id}`, formData);
      setSuccessMessage('Projeto editado com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/manage', { state: { message: 'Projeto editado com sucesso!' } });
      }, 3000); 
    } catch (error) {
      console.error('Erro ao editar projeto:', error);
      setError('Falha ao editar o projeto. Por favor, tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Carregando dados do projeto...</div>;
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
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-blue-500"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">Editar Projeto</h2>

        
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
            <label htmlFor="titulo_projeto" className="block text-sm font-medium text-gray-700">
              Título do Projeto
            </label>
            <input
              id="titulo_projeto"
              name="titulo_projeto"
              type="text"
              value={formData.titulo_projeto}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default EditProject;
