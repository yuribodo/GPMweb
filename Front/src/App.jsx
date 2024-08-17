import Footer from './Components/Footer';
import Hero from './Pages/Hero/Hero';
import { motion } from 'framer-motion';

function App() {
  return (
    <>
      <div>
        <Hero />
        <motion.section
          id="about"
          className="py-10 bg-gray-100 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Sobre o GPmecatronica</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            O GPMecatronica é um grupo de pesquisa dedicado ao desenvolvimento e inovação em sistemas mecatrônicos. Com foco em robótica, automação, e inteligência artificial, o grupo busca soluções avançadas para desafios tecnológicos, promovendo a integração entre as áreas de mecânica, eletrônica e computação.
          </p>
        </motion.section>

        <motion.section
          id="projects"
          className="py-10 bg-white text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Projetos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Exemplo de card de projeto */}
            <motion.div
              className="bg-gray-200 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4">Projeto A</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto A, destacando seus objetivos e resultados alcançados.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-200 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Projeto B</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto B, destacando seus objetivos e resultados alcançados.
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-200 p-6 rounded-lg shadow-md"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Projeto C</h3>
              <p className="text-gray-700">
                Uma descrição breve do Projeto C, destacando seus objetivos e resultados alcançados.
              </p>
            </motion.div>
          </div>
        </motion.section>
        <Footer/>
      </div>
    </>
  );
}

export default App;
