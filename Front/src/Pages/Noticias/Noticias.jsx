import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const api = import.meta.env.VITE_API_LINK;

const Noticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get(`${api}/noticias`);
        setNoticias(response.data);
      } catch (err) {
        setError('Não foi possível carregar as notícias.');
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16">
          <p className="text-center text-gray-600">Carregando...</p>
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
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">Últimas Notícias</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das últimas notícias e atualizações do grupo de pesquisa GPmecatronica. 
            Aqui você encontra informações sobre nossos projetos, publicações, eventos e muito mais.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {noticias.map((noticia) => (
            <article key={noticia.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src="/path-to-image.jpg" alt={noticia.titulo} className="w-full h-48 object-cover"/>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{noticia.titulo}</h2>
                <p className="text-gray-600">{noticia.resumo}</p>
                <a href={noticia.link} className="text-blue-500 hover:underline mt-4 inline-block">Leia mais</a>
              </div>
            </article>
          ))}
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-gray-900">Outras Notícias</h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Acompanhe todas as atualizações e fique por dentro das novidades do nosso grupo.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Noticias;
