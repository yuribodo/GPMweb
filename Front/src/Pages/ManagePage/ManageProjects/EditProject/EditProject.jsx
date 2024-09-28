import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    titulo_projeto: 'Projeto de Pesquisa A',
    edital: 'Edital 001/2024',
    area: 'Ciências Exatas',
    objetivo: 'Desenvolver tecnologias inovadoras.',
    metas: 'Alcançar resultados em 2025.',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode fazer a requisição para editar o projeto
    console.log('Projeto editado com sucesso:', formData);
    navigate('/projetos', { state: { message: 'Projeto editado com sucesso!' } });
  };

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-blue-500"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-900">Editar Projeto</h2>
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label htmlFor="titulo_projeto" className="block text-sm font-medium text-gray-700">
              Título do Projeto
            </label>
            <input
              id="titulo_projeto"
              name="titulo_projeto"
              type="text"
              value={formData.titulo_projeto}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="edital" className="block text-sm font-medium text-gray-700">
              Edital
            </label>
            <input
              id="edital"
              name="edital"
              type="text"
              value={formData.edital}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Área
            </label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
              Objetivo
            </label>
            <textarea
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="metas" className="block text-sm font-medium text-gray-700">
              Metas
            </label>
            <textarea
              id="metas"
              name="metas"
              value={formData.metas}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Salvar Alterações
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default EditProject;
