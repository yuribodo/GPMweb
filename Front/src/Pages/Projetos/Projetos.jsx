import React from 'react';
import ProjetoCard from './ProjetoCard';
import Navbar from '../../Components/Navbar';

const Projetos = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      <main className="px-4 sm:px-8 md:px-12 lg:px-16 py-12">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Projetos de Pesquisa</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Explore os projetos de pesquisa desenvolvidos pelo grupo de pesquisa GPmecatronica. 
            Nosso foco está em inovação e tecnologia, buscando soluções para os desafios da atualidade.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <ProjetoCard title="Projeto 1" description="Descrição breve do Projeto 1." />
          <ProjetoCard title="Projeto 2" description="Descrição breve do Projeto 2." />
          <ProjetoCard title="Projeto 3" description="Descrição breve do Projeto 3." />
          <ProjetoCard title="Projeto 4" description="Descrição breve do Projeto 4." />
          
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

      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="text-center">
          <p className="text-sm">© {new Date().getFullYear()} GPmecatronica. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default Projetos;
