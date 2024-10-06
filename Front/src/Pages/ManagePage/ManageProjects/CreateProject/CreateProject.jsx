import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import CreateProjectForm from './Form/CreateProjectForm';

const CreateProject = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center mb-6 p-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Voltar
        </button>
        <h1 className="flex-grow text-3xl font-bold text-center">Criar Novo Projeto</h1>
      </div>

      <CreateProjectForm />
    </div>
  );
};

export default CreateProject;
