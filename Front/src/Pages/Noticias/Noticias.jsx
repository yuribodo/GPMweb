import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import SearchBar from '../../Components/SearchBar';

const api = import.meta.env.VITE_API_LINK;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [filteredNoticias, setFilteredNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${api}/noticias`);
        setNoticias(response.data);
        setFilteredNoticias(response.data);
      } catch (err) {
        setError('Não foi possível carregar as notícias.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  const handleSearch = (query) => {
    if (query) {
      const filtered = noticias.filter((noticia) =>
        noticia.titulo.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNoticias(filtered);
    } else {
      setFilteredNoticias(noticias);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 relative overflow-hidden">
        
        <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl" aria-hidden="true">
          <div className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl">
            <div className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-green-200 to-green-400 opacity-50 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(0% 0%, 60% 0%, 100% 60%, 80% 100%, 0% 100%)' }} />
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-300 to-green-500 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)' }} />
          </div>
        </div>
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16 flex justify-center items-center">
          <motion.div
            className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"
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
      <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 relative overflow-hidden">
        
        <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl" aria-hidden="true">
          <div className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl">
            <div className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-green-200 to-green-400 opacity-50 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(0% 0%, 60% 0%, 100% 60%, 80% 100%, 0% 100%)' }} />
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-300 to-green-500 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)' }} />
          </div>
        </div>
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
          <p className="text-center text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-100 via-green-200 to-green-300 relative overflow-hidden">
      
      <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl" aria-hidden="true">
        <div className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl">
          <div className="relative left-[calc(50%-10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[20deg] bg-gradient-to-tr from-green-200 to-green-400 opacity-50 sm:left-[calc(50%-20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(0% 0%, 60% 0%, 100% 60%, 80% 100%, 0% 100%)' }} />
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl">
            <div className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-300 to-green-500 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)' }} />
          </div>
        </div>

      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Últimas Notícias</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das últimas notícias e atualizações do grupo de pesquisa GPmecatronica. 
            Aqui você encontra informações sobre nossos projetos, publicações, eventos e muito mais.
          </p>
        </motion.section>

        <SearchBar 
          placeholder="Buscar notícias..."
          onSearch={handleSearch}
        />

        <motion.section 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {filteredNoticias.map((noticia) => (
            <motion.article 
              key={noticia.id} 
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{noticia.titulo}</h2>
                <p className="text-gray-600">{noticia.resumo}</p>
                <a href="https://portal.ifro.edu.br/calama/noticias/" className="text-blue-500 hover:underline mt-4 inline-block">Leia mais</a>
              </div>
            </motion.article>
          ))}
        </motion.section>

        <motion.section 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">Outras Notícias</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Acompanhe todas as atualizações e fique por dentro das novidades do nosso grupo.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Noticias;
