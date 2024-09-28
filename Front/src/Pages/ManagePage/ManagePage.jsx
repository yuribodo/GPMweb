import React, { useState } from 'react';
import ManageProjects from './ManageProjects/ManageProjects';
import ManageNews from './ManageNews/ManageNews';

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState('projects'); 

  return (
    <div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'projects' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Projetos
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'news' ? 'text-white bg-blue-600' : 'text-blue-600 bg-white'
          } rounded-md shadow-md mx-2`}
        >
          Gerenciar Notícias
        </button>
      </div>

      
      {activeTab === 'projects' && <ManageProjects />}
      {activeTab === 'news' && <ManageNews />}
    </div>
  );
};

export default ManagePage;
