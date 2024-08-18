import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

const Suporte = () => {
  return (
    <div>
      <Navbar />
      <main className="mt-16 p-4 md:p-8 bg-gray-50 min-h-screen">
        <section className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-indigo-600">Suporte</h1>

          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Perguntas Frequentes</h2>
            <div className="space-y-6 md:space-y-8">
              <div className="bg-gray-100 p-4 md:p-6 rounded-md">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">Como posso fazer x?</h3>
                <p className="text-gray-600 mt-2">Você pode fazer x seguindo as instruções.</p>
              </div>
              <div className="bg-gray-100 p-4 md:p-6 rounded-md">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">Como faco algo?</h3>
                <p className="text-gray-600 mt-2">Aqui está a explicação de como fazer algo.</p>
              </div>
              <div className="bg-gray-100 p-4 md:p-6 rounded-md">
                <h3 className="text-lg md:text-xl font-semibold text-gray-700">Como entro em contato com o suporte técnico?</h3>
                <p className="text-gray-600 mt-2">Você pode entrar em contato conosco preenchendo o formulário abaixo ou enviando um e-mail para suporte@suporte.com.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Entre em Contato</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Seu nome"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Escreva sua mensagem aqui..."
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Suporte;
