import React, { useState, useEffect } from 'react';
import { AlertCircle, Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import DiscenteForm from './DiscenteForm';
import axios from 'axios';

const CreateDiscentePage = () => {
  const [discente, setDiscente] = useState({
    matricula: '',
    nome: '',
    cpf: '',
    lates: '',
    date_born: null,
    projetoId: '',
    tamanho_camisa: '',
    contato: '',
    bolsista: false
  });
  
  const [projetos, setProjetos] = useState([]);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const { name, value, type, checked } = e.target;
    setDiscente((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              name === 'matricula' ? (value === '' ? '' : parseInt(value, 10)) : 
              value
    }));
  };

  const validateForm = () => {
    if (!discente.matricula || !discente.nome || !discente.cpf || 
        !discente.date_born || !discente.projetoId || !discente.tamanho_camisa) {
      return false;
    }
    
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpfRegex.test(discente.cpf)) {
      return false;
    }

    if (discente.matricula.toString().length < 5) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
  
    if (!validateForm()) {
      setSubmitError('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }
  
    // Check for valid date_born
    const date = new Date(discente.date_born);
    if (isNaN(date.getTime())) {
      setSubmitError('Por favor, insira uma data de nascimento válida.');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const formattedDiscente = {
        ...discente,
        date_born: new Date(discente.date_born).toISOString().slice(0, 10), // Ensure it's in ISO format
        projetoId: parseInt(discente.projetoId, 10)
      };

      // Log the data being sent
      console.log('Dados do Discente a serem enviados:', formattedDiscente);
  
      const response = await axios.post(`${api}/discentes`, formattedDiscente);
  
      // Reset form after successful submission
      setDiscente({
        matricula: '',
        nome: '',
        cpf: '',
        lates: '',
        date_born: null,
        projetoId: '',
        tamanho_camisa: '',
        contato: '',
        bolsista: false
      });
  
      alert('Discente cadastrado com sucesso!');
      
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      setSubmitError('Erro ao cadastrar discente. Por favor, tente novamente.');
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
              Cadastro de Discente
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

              <DiscenteForm
                discente={discente}
                handleChange={handleChange}
                projetos={projetos}
              />

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

export default CreateDiscentePage;
