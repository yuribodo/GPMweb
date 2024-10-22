import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import SkeletonLoader from '../../../Components/SkeletonLoader';

const ManageProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(5);

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${api}/projetos`);
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setError('Falha ao carregar os projetos. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchProjects();
  }, [api]);

  useEffect(() => {
    const results = projects.filter(project =>
      project.titulo_projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.edital.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
    setCurrentPage(1);
  }, [searchTerm, projects]);

  const handleDeleteClick = (id) => {
    setProjectToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${api}/projetos/${projectToDelete}`);
      setProjects(projects.filter((project) => project.id !== projectToDelete));
      setFilteredProjects(filteredProjects.filter((project) => project.id !== projectToDelete));
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao deletar projeto:', error);
      setError('Falha ao deletar o projeto. Por favor, tente novamente mais tarde.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-project/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-project');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Gerenciar Projetos</h2>
          <SkeletonLoader rows={5} />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Gerenciar Projetos</h2>
        
        <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <motion.button
            onClick={handleCreate}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Criar Novo Projeto
          </motion.button>
          <input
            type="text"
            placeholder="Buscar projetos..."
            className="px-4 py-2 border rounded-md w-full sm:w-auto"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {currentProjects.length > 0 ? (
          <>
            <div className="hidden sm:block">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Título</th>
                    <th className="px-4 py-2">Edital</th>
                    <th className="px-4 py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <tr key={project.id}>
                      <td className="border px-4 py-2 max-w-[400px] truncate" title={project.titulo_projeto}>
                        {project.titulo_projeto}
                      </td>
                      <td className="border px-4 py-2 max-w-[100px] truncate" title={project.edital}>
                        {project.edital}
                      </td>
                      <td className="border px-4 py-2 flex justify-center space-x-2">
                        <motion.button
                          onClick={() => handleEdit(project.id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Editar
                        </motion.button>
                        <motion.button
                          onClick={() => handleDeleteClick(project.id)}
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
            </div>

            {/* Mobile layout */}
            <div className="block sm:hidden">
              {currentProjects.map((project) => (
                <div key={project.id} className="border rounded-lg p-4 mb-4 bg-white shadow-md">
                  <h3 className="font-bold text-lg">{project.titulo_projeto}</h3>
                  <p className="text-sm text-gray-600">Edital: {project.edital}</p>
                  <div className="mt-4 flex justify-center space-x-2">
                    <motion.button
                      onClick={() => handleEdit(project.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Editar
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteClick(project.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700 focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Deletar
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(filteredProjects.length / projectsPerPage)).keys()].map((number) => (
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
          <div className="text-center mt-4">Nenhum projeto encontrado.</div>
        )}
      </div>

      {showModal && (
        <DeleteConfirmationModal
          onCancel={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </motion.div>
  );
};

export default ManageProjects;
