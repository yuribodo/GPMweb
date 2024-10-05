import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const CreateNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState({ titulo: '', tipo: '', link: '', projetoId: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_LINK;

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${api}/noticias`, news);
      console.log('Notícia criada:', response.data);
      navigate('/manage');
    } catch (err) {
      setError(err.response?.data?.message || 'Falha ao criar notícia');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold text-center mb-6">Criar Nova Notícia</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo" className="block mb-2 text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={news.titulo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-700">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              value={news.tipo}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Selecione o tipo</option>
              <option value="Notícia">Notícia</option>
              <option value="Artigo">Artigo</option>
              <option value="Evento">Evento</option>
            </select>
          </div>
          <div>
            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-700">Link</label>
            <input
              type="url"
              id="link"
              name="link"
              value={news.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <div>
            <label htmlFor="projetoId" className="block mb-2 text-sm font-medium text-gray-700">ID do Projeto</label>
            <input
              type="text"
              id="projetoId"
              name="projetoId"
              value={news.projetoId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? 'Criando...' : 'Criar Notícia'}
          </motion.button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </motion.div>
  );
};

export default CreateNews;
