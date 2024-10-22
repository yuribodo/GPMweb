import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import SkeletonLoader from '../../../Components/SkeletonLoader';

const ManageDiscentes = () => {
  const navigate = useNavigate();
  const [discentes, setDiscentes] = useState([]);
  const [filteredDiscentes, setFilteredDiscentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [discenteToDelete, setDiscenteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [discentesPerPage] = useState(5);

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchDiscentes = async () => {
      try {
        const response = await axios.get(`${api}/discentes`);
        setDiscentes(response.data);
        setFilteredDiscentes(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar discentes:', error);
        setError('Falha ao carregar os discentes. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchDiscentes();
  }, [api]);

  useEffect(() => {
    const results = discentes.filter(discente =>
      discente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discente.matricula.toString().includes(searchTerm)
    );
    setFilteredDiscentes(results);
    setCurrentPage(1);
  }, [searchTerm, discentes]);

  const handleDeleteClick = (id) => {
    setDiscenteToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/discentes/${discenteToDelete}`);
      setDiscentes(discentes.filter((discente) => discente.id !== discenteToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar discente:', error);
      setError('Falha ao deletar o discente. Por favor, tente novamente mais tarde.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-discentes/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-discente');
  };

  const indexOfLastDiscente = currentPage * discentesPerPage;
  const indexOfFirstDiscente = indexOfLastDiscente - discentesPerPage;
  const currentDiscentes = filteredDiscentes.slice(indexOfFirstDiscente, indexOfLastDiscente);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Gerenciar Discentes</h2>
        <SkeletonLoader rows={5} />
      </div>
    </div>
  );

  if (error) return <div className="text-center mt-8 text-red-600">{error}</div>;

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Gerenciar Discentes</h2>
        
        <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
          <motion.button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Adicionar Discente
          </motion.button>
          <input
            type="text"
            placeholder="Buscar por nome ou matrícula..."
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {currentDiscentes.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">Matrícula</th>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Bolsista</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDiscentes.map((discente) => (
                    <tr key={discente.id} className="block sm:table-row border-b">
                      
                      <td className="block sm:table-cell px-4 py-2">
                        <div className="flex flex-col sm:hidden mb-2">
                          <span className="font-bold">Matrícula:</span>
                          <span>{discente.matricula}</span>
                          <span className="font-bold mt-2">Nome:</span>
                          <span>{discente.nome}</span>
                          <span className="font-bold mt-2">Bolsista:</span>
                          <span>{discente.bolsista ? 'Sim' : 'Não'}</span>
                          <div className="flex gap-2 mt-4">
                            <motion.button
                              onClick={() => handleEdit(discente.id)}
                              className="flex-1 px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Editar
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteClick(discente.id)}
                              className="flex-1 px-3 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Deletar
                            </motion.button>
                          </div>
                        </div>
                        
                        
                        <span className="hidden sm:block">{discente.matricula}</span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-2">{discente.nome}</td>
                      <td className="hidden sm:table-cell px-4 py-2 text-center">{discente.bolsista ? 'Sim' : 'Não'}</td>
                      <td className="hidden sm:table-cell px-4 py-2">
                        <div className="flex space-x-2">
                          <motion.button
                            onClick={() => handleEdit(discente.id)}
                            className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Editar
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(discente.id)}
                            className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Deletar
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-center flex-wrap gap-2">
              {[...Array(Math.ceil(filteredDiscentes.length / discentesPerPage))].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">Nenhum discente encontrado.</p>
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

export default ManageDiscentes;