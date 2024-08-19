import React from 'react';
import Footer from './Components/Footer';
import Hero from './Pages/Hero/Hero';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function App() {
  const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true });
  const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true });

  const aboutControls = useAnimation();
  const projectsControls = useAnimation();

  React.useEffect(() => {
    if (aboutInView) {
      aboutControls.start({ opacity: 1, y: 0 });
    }
  }, [aboutInView, aboutControls]);

  React.useEffect(() => {
    if (projectsInView) {
      projectsControls.start({ opacity: 1, y: 0 });
    }
  }, [projectsInView, projectsControls]);

  return (
    <>
      <div>
        <Hero />
        <motion.section
          id="about"
          className="py-10 bg-gray-100 text-center"
          ref={aboutRef}
          initial={{ opacity: 0, y: 50 }}
          animate={aboutControls}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-4">Sobre o GPmecatronica</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-700">
            O GPMecatronica é um grupo de pesquisa dedicado ao desenvolvimento e inovação em sistemas mecatrônicos. Com foco em robótica, automação, e inteligência artificial, o grupo busca soluções avançadas para desafios tecnológicos, promovendo a integração entre as áreas de mecânica, eletrônica e computação.
          </p>
        </motion.section>
        <Footer />
      </div>
    </>
  );
}

export default App;
