import React from 'react';
import Navbar from '../../Components/Navbar';

const Noticias = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Últimas Notícias</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das últimas notícias e atualizações do grupo de pesquisa GPmecatronica. 
            Aqui você encontra informações sobre nossos projetos, publicações, eventos e muito mais.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-image1.jpg" alt="Notícia 1" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Título da Notícia 1</h2>
              <p className="text-gray-600">Um resumo breve da notícia 1. Esse resumo deve ser curto, cativante e direto ao ponto.</p>
              <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Leia mais</a>
            </div>
          </article>

          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-image2.jpg" alt="Notícia 2" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Título da Notícia 2</h2>
              <p className="text-gray-600">Um resumo breve da notícia 2. Esse resumo deve ser curto, cativante e direto ao ponto.</p>
              <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Leia mais</a>
            </div>
          </article>

          <article className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src="/path-to-image3.jpg" alt="Notícia 3" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Título da Notícia 3</h2>
              <p className="text-gray-600">Um resumo breve da notícia 3. Esse resumo deve ser curto, cativante e direto ao ponto.</p>
              <a href="#" className="text-blue-500 hover:underline mt-4 inline-block">Leia mais</a>
            </div>
          </article>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Outras Notícias</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Acompanhe todas as atualizações e fique por dentro das novidades do nosso grupo.
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

export default Noticias;
