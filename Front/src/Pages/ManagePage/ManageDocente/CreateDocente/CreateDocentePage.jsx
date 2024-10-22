import React, { useState, useEffect } from 'react';
import { AlertCircle, Save, ArrowLeft } from 'lucide-react';
import DocenteForm from './DocenteForm';
import axios from 'axios';

const CreateDocentePage = () => {
  const [docente, setDocente] = useState({
    siape: '',
    nome: '',
    email: '',
    contato: '',
    projetos: []
  });
  
  const [projetos, setProjetos] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const api = import.meta.env.VITE_API_LINK;

  useEffect(() => {
    const fetchProjetos = async () => {
      try {
        const response = await axios.get(`${api}/projetos`);
        setProjetos(response.data);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
      }
    };
    fetchProjetos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'projetos') {
      
      const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value));
      setDocente(prev => ({
        ...prev,
        projetos: selectedOptions
      }));
    } else {
      setDocente(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!docente.siape || !docente.nome || !docente.email) {
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(docente.email)) {
      return false;
    }

    if (docente.siape.toString().length < 5) {
      return false;
    }

    return true;
  };

  const cleanContactNumber = (value) => {
    return value.replace(/\D/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSuccessMessage('');
  
    if (!validateForm()) {
        setSubmitError('Por favor, preencha todos os campos obrigatórios corretamente.');
        return;
    }
  
    setIsSubmitting(true);
  
    try {
        const formattedDocente = {
            siape: parseInt(docente.siape, 10),
            nome: docente.nome,
            email: docente.email,
            contato: cleanContactNumber(docente.contato),
            projetosId: docente.projetos.length > 0 ? String(docente.projetos[0]) : '0' 
        };

        console.log('Dados do Docente a serem enviados:', formattedDocente);
  
        const response = await axios.post(`${api}/doscentes`, formattedDocente);
  
        
        setDocente({
            siape: '',
            nome: '',
            email: '',
            contato: '',
            projetos: []
        });
  
        setSuccessMessage('Docente cadastrado com sucesso!');
      
    } catch (error) {
        console.error('Erro ao enviar dados para a API:', error);
        setSubmitError('Erro ao cadastrar docente. Por favor, tente novamente.');
    } finally {
        setIsSubmitting(false);
    }
};

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-4 px-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 py-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar</span>
        </button>
      </div>

      <div className="container mx-auto px-4 pb-6 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">
              Cadastro de Docente
            </h1>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-4 w-4" />
                  <p>{submitError}</p>
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center gap-2 text-green-700">
                  <p>{successMessage}</p>
                </div>
              )}

              <DocenteForm
                docente={docente}
                handleChange={handleChange}
              />

              <div className="mb-4">
                <label htmlFor="projetos" className="block text-sm font-medium text-gray-700">
                  Projetos Associados
                </label>
                <select
                  id="projetos"
                  name="projetos"
                  multiple
                  value={docente.projetos}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                  {projetos.map((projeto) => (
                    <option key={projeto.id} value={projeto.id}>
                      {projeto.titulo_projeto}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocentePage;
