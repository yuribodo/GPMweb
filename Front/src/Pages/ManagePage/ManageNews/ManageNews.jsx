import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const ManageNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsPerPage] = useState(10);

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${api}/noticias`);
        setNews(response.data);
        setFilteredNews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar notícias:', error);
        setError('Falha ao carregar as notícias. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const results = news.filter(n =>
      n.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.descricao.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredNews(results);
    setCurrentPage(1);
  }, [searchTerm, news]);

  const handleDeleteClick = (id) => {
    setNewsToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/noticias/${newsToDelete}`);
      setNews(news.filter((n) => n.id !== newsToDelete));
      setFilteredNews(filteredNews.filter((n) => n.id !== newsToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar notícia:', error);
      setError('Falha ao deletar a notícia. Por favor, tente novamente mais tarde.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-news/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-news');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Get current news
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = filteredNews.slice(indexOfFirstNews, indexOfLastNews);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="text-center mt-8">Carregando notícias...</div>;
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
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Gerenciar Notícias</h2>
        
        <div className="flex justify-between mb-6">
          <motion.button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Criar Nova Notícia
          </motion.button>
          <input
            type="text"
            placeholder="Buscar notícias..."
            className="px-4 py-2 border rounded-md"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {currentNews.length > 0 ? (
          <>
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Título</th>
                  <th className="px-4 py-2">Descrição</th>
                  <th className="px-4 py-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {currentNews.map((n) => (
                  <tr key={n.id}>
                    <td className="border px-4 py-2">{n.titulo}</td>
                    <td className="border px-4 py-2">{n.descricao}</td>
                    <td className="border px-4 py-2">
                      <motion.button
                        onClick={() => handleEdit(n.id)}
                        className="mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Editar
                      </motion.button>
                      <motion.button
                        onClick={() => handleDeleteClick(n.id)}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Deletar
                      </motion.button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(filteredNews.length / newsPerPage)).keys()].map((number) => (
                <button
                  key={number + 1}
                  onClick={() => paginate(number + 1)}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">Nenhuma notícia encontrada.</p>
        )}
      </div>

      <DeleteConfirmationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </motion.div>
  );
};

export default ManageNews;