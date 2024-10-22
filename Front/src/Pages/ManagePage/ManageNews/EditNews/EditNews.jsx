import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [news, setNews] = useState({ titulo: '', tipo: '', link: '', projetoId: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${api}/noticias/${id}`);
        setNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados da notícia:', error);
        setError('Falha ao carregar os dados da notícia. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleChange = (e) => {
    setNews({ ...news, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/noticias/${id}`, news);
      navigate('/manage', { state: { message: 'Notícia atualizada com sucesso!' } });
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error);
      setError('Falha ao atualizar a notícia. Por favor, tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Carregando dados da notícia...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="text-sm font-medium text-green-600 hover:text-green-500 mb-4"
        >
          &larr; Voltar
        </button>
        <h2 className="text-2xl font-bold text-center mb-6">Editar Notícia</h2>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Atualizar Notícia
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default EditNews;