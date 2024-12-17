import React, { useState } from 'react';
import ManageProjects from './ManageProjects/ManageProjects';
import ManageNews from './ManageNews/ManageNews';
import ManageDiscentesPage from './ManageDiscentes/ManageDiscentesPage';
import ManageDocentePage from './ManageDocente/ManageDocentePage';
import Relatorios from './Relatorios/Relatorios';
import { FaProjectDiagram, FaNewspaper, FaUserGraduate, FaChalkboardTeacher, FaChartPie } from 'react-icons/fa';

const ManagePage = () => {
  const [activeTab, setActiveTab] = useState('projects'); 

  return (
    <div className="p-4">
      
      <div className="flex justify-center mb-6 space-x-2 overflow-auto">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex flex-col items-center justify-center px-4 py-2 text-sm font-medium ${
            activeTab === 'projects' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-full shadow-md w-12 h-12`}
        >
          <FaProjectDiagram size={20} />
          <span className="text-xs mt-1 hidden sm:block">Projetos</span>
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex flex-col items-center justify-center px-4 py-2 text-sm font-medium ${
            activeTab === 'news' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-full shadow-md w-12 h-12`}
        >
          <FaNewspaper size={20} />
          <span className="text-xs mt-1 hidden sm:block">Notícias</span>
        </button>
        <button
          onClick={() => setActiveTab('discentes')}
          className={`flex flex-col items-center justify-center px-4 py-2 text-sm font-medium ${
            activeTab === 'discentes' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-full shadow-md w-12 h-12`}
        >
          <FaUserGraduate size={20} />
          <span className="text-xs mt-1 hidden sm:block">Discentes</span>
        </button>
        <button
          onClick={() => setActiveTab('docentes')}
          className={`flex flex-col items-center justify-center px-4 py-2 text-sm font-medium ${
            activeTab === 'docentes' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-full shadow-md w-12 h-12`}
        >
          <FaChalkboardTeacher size={20} />
          <span className="text-xs mt-1 hidden sm:block">Docentes</span>
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex flex-col items-center justify-center px-4 py-2 text-sm font-medium ${
            activeTab === 'reports' ? 'text-white bg-green-600' : 'text-green-600 bg-white'
          } rounded-full shadow-md w-12 h-12`}
        >
          <FaChartPie size={20} />
          <span className="text-xs mt-1 hidden sm:block">Relatórios</span>
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'projects' && <ManageProjects />}
        {activeTab === 'news' && <ManageNews />}
        {activeTab === 'discentes' && <ManageDiscentesPage />}
        {activeTab === 'docentes' && <ManageDocentePage />}
        {activeTab === 'reports' && <Relatorios />}
      </div>
    </div>
  );
};

export default ManagePage;
