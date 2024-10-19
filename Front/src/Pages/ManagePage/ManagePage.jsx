import React, { useState } from 'react';
import ManageProjects from './ManageProjects/ManageProjects';
import ManageNews from './ManageNews/ManageNews';
import ManageDiscentesPage from './ManageDiscentes/ManageDiscentesPage';
import ManageDocentePage from './ManageDocente/ManageDocentePage';

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState('projects'); 

  return (
    <div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'projects' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Projetos
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'news' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Notícias
        </button>
        <button
          onClick={() => setActiveTab('discentes')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'discentes' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Discentes
        </button>
        <button
          onClick={() => setActiveTab('docentes')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'docentes' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Docentes
        </button>
      </div>

      
      {activeTab === 'projects' && <ManageProjects />}
      {activeTab === 'news' && <ManageNews />}
      {activeTab === 'discentes' && <ManageDiscentesPage />}
      {activeTab === 'docentes' && <ManageDocentePage />}
    </div>
  );
};

export default ManagePage;
