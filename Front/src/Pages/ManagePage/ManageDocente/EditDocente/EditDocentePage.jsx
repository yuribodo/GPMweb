import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditDocente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    siape: '',
    nome: '',
    projetosId: '',
    email: '',
    contato: '',
  });

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchDocente = async () => {
      try {
        const response = await axios.get(`${api}/doscentes/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do docente:', error);
        setError('Falha ao carregar os dados do docente. Por favor, tente novamente mais tarde.');
        setLoading(false);
      }
    };

    fetchDocente();
  }, [id]);

  const handleChange = (e) => {
    let value = e.target.value;
    
    // Convert to number for SIAPE field
    if (e.target.name === 'siape') {
      value = value ? parseInt(value) : '';
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api}/doscentes/${id}`, formData);
      setSuccessMessage('Docente editado com sucesso!');
      setTimeout(() => {
        setSuccessMessage('');
        navigate('/manage', { state: { message: 'Docente editado com sucesso!' } });
      }, 3000);
    } catch (error) {
      console.error('Erro ao editar docente:', error);
      setError('Falha ao editar o docente. Por favor, tente novamente mais tarde.');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Carregando dados do docente...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <motion.div 
      className="flex min-h-screen items-center justify-center bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md border border-green-500"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 underline mb-4"
        >
          Voltar
        </button>
        <h2 className="text-2xl font-bold text-center text-gray-900">Editar Docente</h2>

        {successMessage && (
          <motion.div
            className="p-4 mb-4 text-sm text-green-800 bg-green-100 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {successMessage}
          </motion.div>
        )}

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <label htmlFor="siape" className="block text-sm font-medium text-gray-700">
              SIAPE
            </label>
            <input
              id="siape"
              name="siape"
              type="number"
              value={formData.siape}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={formData.nome}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="projetosId" className="block text-sm font-medium text-gray-700">
              IDs dos Projetos (separados por vírgula)
            </label>
            <input
              id="projetosId"
              name="projetosId"
              type="text"
              value={formData.projetosId}
              onChange={handleChange}
              placeholder="Ex: 1,2,3"
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
            <p className="mt-1 text-xs text-gray-500">
              Digite os IDs dos projetos separados por vírgula
            </p>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <input
              id="contato"
              name="contato"
              type="text"
              value={formData.contato}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <motion.button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

export default EditDocente;