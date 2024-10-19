import React, { useState } from 'react';
import { AlertCircle, Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import DiscenteForm from './DiscenteForm';
import axios from 'axios'; // Adicionando o axios para realizar a chamada à API

const CreateDiscentePage = () => {
  const [discentes, setDiscentes] = useState([{
    matricula: '',
    nome: '',
    cpf: '',
    contato: '',
    bolsista: false
  }]);
  
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = import.meta.env.VITE_API_LINK;

  const handleChange = (e, index, type) => {
    const { name, value, type: inputType, checked } = e.target;
    const newDiscentes = [...discentes];
    newDiscentes[index] = {
      ...newDiscentes[index],
      [name]: inputType === 'checkbox' ? checked : value
    };
    setDiscentes(newDiscentes);
  };

  const addDiscente = () => {
    setDiscentes([
      ...discentes,
      {
        matricula: '',
        nome: '',
        cpf: '',
        contato: '',
        bolsista: false
      }
    ]);
  };

  const removeDiscente = (index) => {
    if (discentes.length === 1) {
      return; 
    }
    const newDiscentes = discentes.filter((_, i) => i !== index);
    setDiscentes(newDiscentes);
  };

  const validateForm = () => {
    for (const discente of discentes) {
      if (!discente.matricula || !discente.nome || !discente.cpf) {
        return false;
      }
      
      const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
      if (!cpfRegex.test(discente.cpf)) {
        return false;
      }

      if (discente.matricula.length < 10) {
        return false;
      }
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

    setIsSubmitting(true);

    try {
     
      const response = await axios.post(`${api}/discentes`, { discentes });
      
      console.log('Resposta da API:', response.data);

      setDiscentes([{
        matricula: '',
        nome: '',
        cpf: '',
        contato: '',
        bolsista: false
      }]);

      alert('Discente(s) cadastrado(s) com sucesso!');
      
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
      setSubmitError('Erro ao cadastrar discente(s). Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto pt-4 px-4">
        <button
          onClick={handleBack}
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

              {discentes.map((discente, index) => (
                <div key={index} className="relative">
                  <DiscenteForm
                    discente={discente}
                    index={index}
                    handleChange={handleChange}
                  />
                  {discentes.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800"
                      onClick={() => removeDiscente(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={addDiscente}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Discente
                </button>

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
