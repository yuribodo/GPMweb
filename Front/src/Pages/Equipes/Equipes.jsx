import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ou outro método de roteamento que você está usando

const Equipes = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get('http://localhost:8080/projetos'); // Substitua pela URL real da sua API
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };

    fetchProjetos();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Nossa Equipe</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os projetos em que estamos trabalhando no grupo GPMecatronica. Nossa equipe está empenhada em pesquisa e inovação.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projetos.map((projeto) => (
            <div key={projeto.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={projeto.image || "/default-image.jpg"} alt={projeto.titulo_projeto} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{projeto.titulo_projeto}</h2>
                <p className="text-gray-600">Edital: {projeto.edital}</p>
                <p className="text-gray-600 mt-2">Área: {projeto.area}</p>
                <p className="mt-4 text-gray-600">{projeto.objetivo}</p>
                <p className="mt-2 text-gray-600">{projeto.metas}</p>
                <Link to={`/membros/${projeto.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Ver Membros</Link>
              </div>
            </div>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Colaboradores</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Além dos membros principais, contamos com a colaboração de diversos profissionais e parceiros que contribuem para o sucesso dos nossos projetos.
          </p>
        </section>
      </main>

      <Footer/>
    </div>
  );
}

export default Equipes;
