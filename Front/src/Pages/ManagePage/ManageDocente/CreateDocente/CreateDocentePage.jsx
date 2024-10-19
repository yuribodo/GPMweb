import React, { useState } from 'react';
import { AlertCircle, Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import DocenteForm from './DocenteForm';

const CreateDocentePage = () => {
  const [docentes, setDocentes] = useState([{
    siape: '',
    nome: '',
    email: '',
    contato: ''
  }]);
  
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const newDocentes = [...docentes];
    newDocentes[index] = {
      ...newDocentes[index],
      [name]: value
    };
    setDocentes(newDocentes);
  };

  const addDocente = () => {
    setDocentes([
      ...docentes,
      {
        siape: '',
        nome: '',
        email: '',
        contato: ''
      }
    ]);
  };

  const removeDocente = (index) => {
    if (docentes.length === 1) {
      return; 
    }
    const newDocentes = docentes.filter((_, i) => i !== index);
    setDocentes(newDocentes);
  };

  const validateForm = () => {
    for (const docente of docentes) {
      if (!docente.siape || !docente.nome || !docente.email) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    if (!validateForm()) {
      setSubmitError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Aqui você implementa a chamada à API
      console.log('Dados a serem enviados:', docentes);
      
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      setDocentes([{
        siape: '',
        nome: '',
        email: '',
        contato: ''
      }]);
      
      
      alert('Docente(s) cadastrado(s) com sucesso!');
      
    } catch (error) {
      setSubmitError('Erro ao cadastrar docente(s). Por favor, tente novamente.');
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

              {docentes.map((docente, index) => (
                <div key={index} className="relative">
                  <DocenteForm
                    docente={docente}
                    index={index}
                    handleChange={handleChange}
                  />
                  {docentes.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 p-2 text-red-600 hover:text-red-800"
                      onClick={() => removeDocente(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={addDocente}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Docente
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

export default CreateDocentePage;