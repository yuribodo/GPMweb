import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';

const SaibaMais = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/projetos/${id}`);
        setProject(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do projeto:', error);
      }
    };

    fetchProject();
  }, [id]);

  if (!project) {
    return <div className="flex flex-col min-h-screen justify-center items-center">Carregando...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-grow flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16"> 
        <h1 className="font-bold text-2xl text-center">
          Projeto: {project.titulo_projeto}
        </h1>
        <div className="flex justify-center items-center bg-slate-500 h-[40vh] w-[50vw] mt-6">
          
          {project.imagem && <img src={project.imagem} alt={project.titulo_projeto} className="h-full w-full object-cover"/>}
        </div>
        <div className=' flex space-x-2 mt-8'>
          <h3 className='text-xl font-semibold'>
            Objetivo:
          </h3>
          <p className="text-xl">
            {project.objetivo}
          </p>
        </div>
        
        <p className="text-lg font-medium text-gray-700 mb-2">
            Edital: <span className="font-normal">{project.edital}</span>
        </p>
        <p className="text-lg font-medium text-gray-700 mb-2">
            Área: <span className="font-normal">{project.area}</span>
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default SaibaMais;
