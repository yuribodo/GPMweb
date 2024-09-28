// src/components/EditNews.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [news, setNews] = useState({ titulo: '', descricao: '' });

  useEffect(() => {
    
    
    const fetchedNews = { id: id, titulo: 'Notícia Exemplo', descricao: 'Descrição da notícia exemplo' };
    setNews(fetchedNews);
  }, [id]);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Notícia atualizada:', news);
    navigate('/manage'); 
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Editar Notícia</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Título</label>
            <input
              type="text"
              name="titulo"
              value={news.titulo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <textarea
              name="descricao"
              value={news.descricao}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <motion.button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Atualizar
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditNews;
