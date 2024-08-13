import Hero from './Pages/Hero/Hero';

function App() {
  return (
    <>
      <div>
        <Hero />

        {/* Seção GPmecatronica */}
        <section id="about" className="py-10 bg-gray-100 text-center">
          <h2 className="text-3xl font-semibold mb-4">Sobre o GPmecatronica</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            O GPmecatronica é um grupo de pesquisa dedicado ao desenvolvimento e inovação em sistemas mecatrônicos. Com foco em robótica, automação, e inteligência artificial, o grupo busca soluções avançadas para desafios tecnológicos, promovendo a integração entre as áreas de mecânica, eletrônica e computação.
          </p>
        </section>

        {/* Seção Projetos Recentes */}
        <section id="projects" className="py-10 bg-white text-center">
          <h2 className="text-3xl font-semibold mb-8">Projetos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Exemplo de card de projeto */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Projeto A</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto A, destacando seus objetivos e resultados alcançados.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Projeto B</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto B, destacando seus objetivos e resultados alcançados.
              </p>
            </div>
            <div className="bg-gray-200 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Projeto C</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto C, destacando seus objetivos e resultados alcançados.
              </p>
            </div>
          </div>
        </section>  
      </div>
    </>
  );
}

export default App;
