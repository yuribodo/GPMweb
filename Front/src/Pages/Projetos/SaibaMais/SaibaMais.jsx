import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../../../Components/Navbar';
import Footer from '../../../Components/Footer';

const api = import.meta.env.VITE_API_LINK;

const SaibaMais = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`${api}/projetos/${id}`);
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
        <motion.h1
          className="font-bold text-2xl text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projeto: {project.titulo_projeto}
        </motion.h1>
        <motion.div
          className="flex justify-center items-center bg-slate-500 h-[40vh] w-[50vw] mt-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {project.imagem && (
            <motion.img
              src={project.imagem}
              alt={project.titulo_projeto}
              className="h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          )}
        </motion.div>
        <motion.div
          className="flex space-x-2 mt-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className='text-xl font-semibold'>
            Objetivo:
          </h3>
          <p className="text-xl">
            {project.objetivo}
          </p>
        </motion.div>
        
        <motion.p
          className="text-lg font-medium text-gray-700 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Edital: <span className="font-normal">{project.edital}</span>
        </motion.p>
        <motion.p
          className="text-lg font-medium text-gray-700 mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Área: <span className="font-normal">{project.area}</span>
        </motion.p>
      </main>
      <Footer />
    </div>
  );
}

export default SaibaMais;
