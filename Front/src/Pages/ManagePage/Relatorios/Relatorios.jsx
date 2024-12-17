import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Relatorios = () => {
  const api = import.meta.env.VITE_API_LINK;
  const [data, setData] = useState({
    totalProjects: 0,
    totalDiscentes: 0,
    totalDocentes: 0,
    totalNews: 0,
  });

  const fetchData = async () => {
    try {
      const [projetosResponse, discentesResponse, doscentesResponse, noticiasResponse] = await Promise.all([
        axios.get(`${api}/projetos`),
        axios.get(`${api}/discentes`),
        axios.get(`${api}/doscentes`),
        axios.get(`${api}/noticias`),
      ]);

      const projetos = projetosResponse.data;
      const discentes = discentesResponse.data;
      const doscentes = doscentesResponse.data;
      const noticias = noticiasResponse.data;


      setData({
        totalProjects: projetos.length,
        totalDiscentes: discentes.length,
        totalDocentes: doscentes.length,
        totalNews: noticias.length,
      });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-2xl font-bold mb-6 text-gray-800 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Relatórios
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, scale: 0.8 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
     
        <motion.div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Projetos</h2>
          <motion.p
            className="text-4xl font-bold text-green-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {data.totalProjects}
          </motion.p>
        </motion.div>

  
        <motion.div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Discentes</h2>
          <motion.p
            className="text-4xl font-bold text-green-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {data.totalDiscentes}
          </motion.p>
        </motion.div>

      
        <motion.div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Docentes</h2>
          <motion.p
            className="text-4xl font-bold text-green-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {data.totalDocentes}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow hover:shadow-lg transition"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total de Notícias</h2>
          <motion.p
            className="text-4xl font-bold text-green-600"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
          >
            {data.totalNews}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Relatorios;
