
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const ManageProjects = () => {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([
    { id: 1, titulo_projeto: 'Projeto de Pesquisa A', edital: 'Edital 001/2024' },
    { id: 2, titulo_projeto: 'Projeto de Extensão B', edital: 'Edital 002/2024' },
    { id: 3, titulo_projeto: 'Projeto de Inovação C', edital: 'Edital 003/2024' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setProjectToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    setProjects(projects.filter((project) => project.id !== projectToDelete));
    setShowModal(false);
  };

  const handleEdit = (id) => {
    navigate(`/manage/edit-project/${id}`);
  };

  const handleCreate = () => {
    navigate('/manage/create-project');
  };

  return (
    <motion.div 
      className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Gerenciar Projetos</h2>
        
        <motion.button
          onClick={handleCreate}
          className="mb-6 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md shadow-sm hover:bg-green-700 focus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Criar Novo Projeto
        </motion.button>

        {projects.length > 0 ? (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Título</th>
                <th className="px-4 py-2">Edital</th>
                <th className="px-4 py-2">Ações</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="border px-4 py-2">{project.titulo_projeto}</td>
                  <td className="border px-4 py-2">{project.edital}</td>
                  <td className="border px-4 py-2">
                    <motion.button
                      onClick={() => handleEdit(project.id)}
                      className="mr-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none"
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
        ) : (
          <p className="text-center">Nenhum projeto encontrado.</p>
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

export default ManageProjects;
