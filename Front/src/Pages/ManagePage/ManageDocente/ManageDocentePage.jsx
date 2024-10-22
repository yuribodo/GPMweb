import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import SkeletonLoader from '../../../Components/SkeletonLoader';

const ManageDocentes = () => {
  const navigate = useNavigate();
  const [docentes, setDocentes] = useState([]);
  const [filteredDocentes, setFilteredDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [docenteToDelete, setDocenteToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [docentesPerPage] = useState(5);

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get(`${api}/doscentes`);
        setDocentes(response.data);
        setFilteredDocentes(response.data);
      } catch (error) {
        console.error('Erro ao buscar docentes:', error);
        setError('Falha ao carregar os docentes. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchDocentes();
  }, [api]);

  useEffect(() => {
    const results = docentes.filter(docente =>
      docente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      docente.siape.toString().includes(searchTerm) ||
      docente.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocentes(results);
    setCurrentPage(1);
  }, [searchTerm, docentes]);

  const handleDeleteClick = (id) => {
    setDocenteToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/docentes/${docenteToDelete}`);
      setDocentes(docentes.filter((docente) => docente.id !== docenteToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar docente:', error);
      setError('Falha ao deletar o docente. Por favor, tente novamente mais tarde.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-docente/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-docente');
  };

  const indexOfLastDocente = currentPage * docentesPerPage;
  const indexOfFirstDocente = indexOfLastDocente - docentesPerPage;
  const currentDocentes = filteredDocentes.slice(indexOfFirstDocente, indexOfLastDocente);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">Gerenciar Docentes</h2>
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
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Gerenciar Docentes</h2>
        
        <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0 sm:space-x-4">
          <motion.button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Adicionar Docente
          </motion.button>
          <input
            type="text"
            placeholder="Buscar por nome, SIAPE ou email..."
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {currentDocentes.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="hidden sm:table-header-group">
                  <tr className="bg-gray-50">
                    <th className="px-4 py-2">SIAPE</th>
                    <th className="px-4 py-2">Nome</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Contato</th>
                    <th className="px-4 py-2">Projetos</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDocentes.map((docente) => (
                    <tr key={docente.id} className="block sm:table-row border-b">
                      
                      <td className="block sm:table-cell px-4 py-2">
                        <div className="flex flex-col sm:hidden space-y-2 mb-4">
                          <div>
                            <span className="font-bold">SIAPE:</span>
                            <span className="ml-2">{docente.siape}</span>
                          </div>
                          <div>
                            <span className="font-bold">Nome:</span>
                            <span className="ml-2">{docente.nome}</span>
                          </div>
                          <div>
                            <span className="font-bold">Email:</span>
                            <span className="ml-2">{docente.email}</span>
                          </div>
                          <div>
                            <span className="font-bold">Contato:</span>
                            <span className="ml-2">{docente.contato}</span>
                          </div>
                          <div>
                            <span className="font-bold">Projetos:</span>
                            <span className="ml-2">{docente.projetos?.length || 0}</span>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <motion.button
                              onClick={() => handleEdit(docente.id)}
                              className="flex-1 px-3 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Editar
                            </motion.button>
                            <motion.button
                              onClick={() => handleDeleteClick(docente.id)}
                              className="flex-1 px-3 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              Deletar
                            </motion.button>
                          </div>
                        </div>
                        
                        
                        <span className="hidden sm:block">{docente.siape}</span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-2">{docente.nome}</td>
                      <td className="hidden sm:table-cell px-4 py-2">{docente.email}</td>
                      <td className="hidden sm:table-cell px-4 py-2">{docente.contato}</td>
                      <td className="hidden sm:table-cell px-4 py-2 text-center">
                        {docente.projetos?.length || 0}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-2">
                        <div className="flex justify-center space-x-2">
                          <motion.button
                            onClick={() => handleEdit(docente.id)}
                            className="px-3 py-1 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            Editar
                          </motion.button>
                          <motion.button
                            onClick={() => handleDeleteClick(docente.id)}
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
              {[...Array(Math.ceil(filteredDocentes.length / docentesPerPage))].map((_, index) => (
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
          <p className="text-center">Nenhum docente encontrado.</p>
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

export default ManageDocentes;