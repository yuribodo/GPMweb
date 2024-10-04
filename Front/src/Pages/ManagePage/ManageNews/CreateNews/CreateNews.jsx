import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const CreateNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState({ titulo: '', tipo: '', link: '', projetoId: '' });

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Notícia criada:', news);
    navigate('/manage');
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Criar Nova Notícia</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">Título</label>
            <input
              id="titulo"
              name="titulo"
              type="text"
              value={news.titulo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              id="tipo"
              name="tipo"
              value={news.tipo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Selecione o tipo</option>
              <option value="noticia">Notícia</option>
              <option value="artigo">Artigo</option>
              <option value="evento">Evento</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="link" className="block text-sm font-medium text-gray-700">Link</label>
            <input
              id="link"
              name="link"
              type="url"
              value={news.link}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="projetoId" className="block text-sm font-medium text-gray-700">ID do Projeto</label>
            <input
              id="projetoId"
              name="projetoId"
              type="number"
              value={news.projetoId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Criar Notícia
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateNews;