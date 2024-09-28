import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const ManageNews = () => {
  const navigate = useNavigate();

  const [news, setNews] = useState([
    { id: 1, titulo: 'Notícia A', descricao: 'Descrição da notícia A' },
    { id: 2, titulo: 'Notícia B', descricao: 'Descrição da notícia B' },
    { id: 3, titulo: 'Notícia C', descricao: 'Descrição da notícia C' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setNewsToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setNews(news.filter((n) => n.id !== newsToDelete));
    setShowModal(false);
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-news/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-news');
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Gerenciar Notícias</h2>
        
        <motion.button
          onClick={handleCreate}
          className="mb-6 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Criar Nova Notícia
        </motion.button>

        {news.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Descrição</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {news.map((n) => (
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
