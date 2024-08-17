import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Membros = () => {
  const { id } = useParams(); // Obtém o ID do projeto da URL
  const [membros, setMembros] = useState([]);

  useEffect(() => {
    const fetchMembros = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/discentes/projeto/${id}`); // Substitua pela URL real da sua API
        setMembros(response.data);
      } catch (error) {
        console.error('Erro ao buscar membros:', error);
      }
    };

    fetchMembros();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Membros do Projeto</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os membros envolvidos neste projeto. Aqui você encontra informações detalhadas sobre cada um dos colaboradores.
          </p>
        </section>

        <section className=" flex justify-center">
          <div className="flex space-x-10">
            {membros.map((membro) => (
              <div key={membro.id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{membro.nome}</h2>
                  <p className="text-gray-600 mb-2">Matrícula: {membro.matricula}</p>
                  <p className="text-gray-600 mb-2">Camisa: {membro.tamanho_camisa}</p>
                  <p className="text-gray-600 mb-2">Contato: <a href={`tel:${membro.contato}`} className="text-blue-600 hover:underline">{membro.contato}</a></p>
                  <p className="text-gray-600 mb-2">Lattes: <a href={membro.lates} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Perfil Lattes</a></p>
                  <p className="text-gray-600 mb-2">Bolsista: {membro.bolsista ? 'Sim' : 'Não'}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Membros;
