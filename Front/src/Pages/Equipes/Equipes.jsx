import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';


const Equipes = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Nossa Equipe</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Conheça os profissionais que fazem parte do grupo GPmecatronica. Nossa equipe é formada por especialistas dedicados à pesquisa e inovação.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-member1.jpg" alt="Membro 1" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nome do Membro 1</h2>
              <p className="text-gray-600">Cargo do Membro 1</p>
              <p className="mt-4 text-gray-600">Uma breve descrição ou biografia do membro da equipe, destacando suas habilidades e contribuições.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-member2.jpg" alt="Membro 2" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nome do Membro 2</h2>
              <p className="text-gray-600">Cargo do Membro 2</p>
              <p className="mt-4 text-gray-600">Uma breve descrição ou biografia do membro da equipe, destacando suas habilidades e contribuições.</p>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-member3.jpg" alt="Membro 3" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Nome do Membro 3</h2>
              <p className="text-gray-600">Cargo do Membro 3</p>
              <p className="mt-4 text-gray-600">Uma breve descrição ou biografia do membro da equipe, destacando suas habilidades e contribuições.</p>
            </div>
          </div>
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
