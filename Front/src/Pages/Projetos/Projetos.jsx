import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProjetoCard from './ProjetoCard';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import SearchBar from '../../Components/SearchBar';
import { ClipLoader } from 'react-spinners';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const api = import.meta.env.VITE_API_LINK;

const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${api}/projetos`);
        setProjects(response.data);
        setFilteredProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [api]);

  const handleSearch = (query) => {
    const filtered = projects.filter((project) =>
      project.titulo_projeto.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  // Cálculo das páginas
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-2xl" aria-hidden="true">
        <div className="absolute inset-x-0 -top-1/2 -z-10 transform-gpu overflow-hidden blur-2xl" aria-hidden="true">
          <div
            className="relative left-[calc(50%-15rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-green-500 to-green-700 opacity-50 sm:left-[calc(50%-30rem)] sm:w-[92.1875rem]"
            style={{
              clipPath: 'polygon(0% 0%, 50% 0%, 100% 50%, 80% 100%, 0% 100%)',
            }}
          />
        </div>
        <div className="absolute inset-x-0 top-[calc(100%-10rem)] -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div
            className="relative left-[calc(50%+10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[15deg] bg-gradient-to-tr from-green-600 to-green-800 opacity-70 sm:left-[calc(50%+20rem)] sm:w-[72.1875rem]"
            style={{
              clipPath: 'polygon(100% 0%, 100% 100%, 50% 100%, 0% 50%, 0% 0%)',
            }}
          />
        </div>
      </div>

      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16 relative">
        <motion.section
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900">Projetos de Pesquisa</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto font-semibold">
            Explore os projetos de pesquisa desenvolvidos pelo grupo de pesquisa GPMecatronica. 
            Nosso foco está em inovação e tecnologia, buscando soluções para os desafios da atualidade.
          </p>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SearchBar placeholder="Buscar projetos..." onSearch={handleSearch} />
        </motion.div>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {loading ? (
            <div className="flex justify-center items-center col-span-full">
              <ClipLoader color="green" size={50} />
            </div>
          ) : currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <ProjetoCard
                key={project.id}
                id={project.id}
                title={project.titulo_projeto}
                description={project.objetivo}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">Nenhum projeto encontrado.</p>
          )}
        </motion.section>

        
        {!loading && filteredProjects.length > projectsPerPage && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 rounded-lg ${
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
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold text-gray-900">Sobre o Grupo GPmecatronica</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            O grupo GPmecatronica é composto por pesquisadores dedicados a promover avanços em várias áreas 
            da mecatrônica. Trabalhamos em colaboração com a indústria e academia para desenvolver projetos 
            que impulsionam a inovação e a tecnologia.
          </p>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Projetos;