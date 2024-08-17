import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProjetoCard from './ProjetoCard';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import SearchBar from '../../Components/SearchBar';

const Projetos = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/projetos');
        setProjects(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (query) => {
    const filtered = projects.filter((project) =>
      project.titulo_projeto.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProjects(filtered);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Projetos de Pesquisa</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore os projetos de pesquisa desenvolvidos pelo grupo de pesquisa GPmecatronica. 
            Nosso foco está em inovação e tecnologia, buscando soluções para os desafios da atualidade.
          </p>
        </section>

        
        <SearchBar placeholder="Buscar projetos..." onSearch={handleSearch} />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filteredProjects.length > 0 ? filteredProjects : projects).map((project, index) => (
            <ProjetoCard 
              key={index} 
              id={project.id} 
              title={project.titulo_projeto} 
              description={project.objetivo} 
            />
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Sobre o Grupo GPmecatronica</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            O grupo GPmecatronica é composto por pesquisadores dedicados a promover avanços em várias áreas 
            da mecatrônica. Trabalhamos em colaboração com a indústria e academia para desenvolver projetos 
            que impulsionam a inovação e a tecnologia.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Projetos;
