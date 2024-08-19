import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const api = import.meta.env.VITE_API_LINK;

const Membros = () => {
  const { id } = useParams();
  const [membros, setMembros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await axios.get(`${api}/discentes/projeto/${id}`);
        setMembros(response.data);
      } catch (error) {
        setError('Erro ao buscar membros.');
      } finally {
        setLoading(false);
      }
    };

    fetchMembros();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <p className="text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Membros do Projeto</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os membros envolvidos neste projeto. Aqui você encontra informações detalhadas sobre cada um dos colaboradores.
          </p>
        </motion.section>

        <motion.section
          className="flex flex-col md:flex-row md:flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {membros.map((membro, index) => (
            <motion.div
              key={membro.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full md:w-80"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{membro.nome}</h2>
                <p className="text-gray-600 mb-2">Matrícula: {membro.matricula}</p>
                <p className="text-gray-600 mb-2">Camisa: {membro.tamanho_camisa}</p>
                <p className="text-gray-600 mb-2">
                  Contato:{' '}
                  <a href={`tel:${membro.contato}`} className="text-blue-600 hover:underline">
                    {membro.contato}
                  </a>
                </p>
                <p className="text-gray-600 mb-2">
                  Lattes:{' '}
                  <a
                    href={membro.lates}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Perfil Lattes
                  </a>
                </p>
                <p className="text-gray-600 mb-2">Bolsista: {membro.bolsista ? 'Sim' : 'Não'}</p>
              </div>
            </motion.div>
          ))}
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Membros;
