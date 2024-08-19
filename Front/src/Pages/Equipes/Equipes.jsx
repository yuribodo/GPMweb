import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const api = import.meta.env.VITE_API_LINK;

const Equipes = () => {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get(`${api}/projetos`);
        setProjetos(response.data);
      } catch (error) {
        setError('Não foi possível carregar os projetos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16 flex justify-center items-center">
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
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
          <p className="text-center text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Nossas Equipes</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os projetos em que estamos trabalhando no grupo GPMecatronica. Nossas equipes estão empenhadas em pesquisa e inovação.
          </p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projetos.map((projeto) => (
            <motion.div
              key={projeto.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * projetos.indexOf(projeto) }}
            >
              {/* <img src={projeto.image || "/default-image.jpg"} alt={projeto.titulo_projeto} className="w-full h-48 object-cover"/>*/}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{projeto.titulo_projeto}</h2>
                <p className="text-gray-600">Edital: {projeto.edital}</p>
                <p className="text-gray-600 mt-2">Área: {projeto.area}</p>
                <p className="mt-4 text-gray-600">{projeto.objetivo}</p>
                <p className="mt-2 text-gray-600">{projeto.metas}</p>
                <Link to={`/membros/${projeto.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Membros</Link>
              </div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">Colaboradores</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Além dos membros principais, contamos com a colaboração de diversos profissionais e parceiros que contribuem para o sucesso dos nossos projetos.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default Equipes;
