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
        <p className="mt-6 text-xl">
          {project.objetivo}
        </p>
        <p className="mt-4 text-lg text-gray-700">
          {project.descricao}
        </p>
      </main>
      <Footer />
    </div>
  );
}

export default SaibaMais;
