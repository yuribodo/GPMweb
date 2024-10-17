import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';

const api = import.meta.env.VITE_API_LINK;

const Equipes = () => {
  const [projetos, setProjetos] = useState([]);
  const [filteredProjetos, setFilteredProjetos] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const projetosPerPage = 6;

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get(`${api}/projetos`);
        setProjetos(response.data);
        setFilteredProjetos(response.data);
      } catch (error) {
        setError('Não foi possível carregar os projetos.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjetos();
  }, []);


  useEffect(() => {
    const results = projetos.filter(projeto =>
      projeto.titulo_projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.edital.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjetos(results);
    setCurrentPage(1);
  }, [searchTerm, projetos]);

  // Cálculo da paginação
  const indexOfLastProjeto = currentPage * projetosPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - projetosPerPage;
  const currentProjetos = filteredProjetos.slice(indexOfFirstProjeto, indexOfLastProjeto);
  const totalPages = Math.ceil(filteredProjetos.length / projetosPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 relative">
        
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl"
          aria-hidden="true"
        >
          <div
            className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-green-700 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[92.1875rem]"
              style={{
                clipPath: 'polygon(0% 0%, 50% 0%, 100% 50%, 80% 100%, 0% 100%)',
              }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-600 to-green-800 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
              }}
            />
          </div>
        </div>

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
      <div className="flex flex-col min-h-screen bg-gray-50 relative">
        
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl"
          aria-hidden="true"
        >
          <div
            className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-green-700 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[92.1875rem]"
              style={{
                clipPath: 'polygon(0% 0%, 50% 0%, 100% 50%, 80% 100%, 0% 100%)',
              }}
            />
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-600 to-green-800 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]"
              style={{
                clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
              }}
            />
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
    <div className="flex flex-col min-h-screen  relative">
      
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl"
        aria-hidden="true"
      >
        <div
          className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-green-700 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[92.1875rem]"
            style={{
              clipPath: 'polygon(0% 0%, 50% 0%, 100% 50%, 80% 100%, 0% 100%)',
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-600 to-green-800 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
            }}
          />
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
          <h1 className="text-4xl font-bold text-gray-900">Nossas Equipes</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os projetos em que estamos trabalhando no grupo GPMecatronica. Nossas equipes estão empenhadas em pesquisa e inovação.
          </p>
        </motion.section>

       
        <motion.div
          className="max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Pesquisar por título, área ou edital..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentProjetos.map((projeto) => (
            <motion.div
              key={projeto.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * currentProjetos.indexOf(projeto) }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{projeto.titulo_projeto}</h2>
                <p className="text-gray-600">Edital: {projeto.edital}</p>
                <p className="text-gray-600 mt-2">Área: {projeto.area}</p>
                <p className="mt-4 text-gray-600">{projeto.objetivo}</p>
                <p className="mt-2 text-gray-600">{projeto.metas}</p>
                <Link to={`/membros/${projeto.id}`} className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                  Ver Membros
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.section>

        {/* Paginação */}
        {filteredProjetos.length > projetosPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    currentPage === number
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

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