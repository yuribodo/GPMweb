import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';
import { Check } from 'lucide-react';

const DocenteForm = ({ docente, handleChange, projetos }) => {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'siape':
        return !value ? 'SIAPE é obrigatório' :
               value.toString().length < 5 ? 'SIAPE deve ter no mínimo 5 dígitos' : '';
      case 'nome':
        return !value ? 'Nome é obrigatório' :
               value.length < 3 ? 'Nome deve ter no mínimo 3 caracteres' : '';
      case 'email':
        return !value ? 'Email é obrigatório' :
               !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Email inválido' : '';
      default:
        return '';
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    handleChange(e); 
  };

  const handleProjetoToggle = (projetoId) => {
    const currentProjetos = Array.isArray(docente.projetos) ? docente.projetos : [];
    let newProjetos;
    
    if (currentProjetos.includes(projetoId)) {
      newProjetos = currentProjetos.filter(id => id !== projetoId);
    } else {
      newProjetos = [...currentProjetos, projetoId];
    }

    handleChange({
      target: {
        name: 'projetos',
        value: newProjetos
      }
    });
  };

  return (
    <div className="space-y-6 bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="siape" className="block text-sm font-medium text-gray-700">
              SIAPE<span className="text-red-500">*</span>
            </label>
            <input
              id="siape"
              name="siape"
              type="text"
              value={docente.siape}
              onChange={handleFieldChange}
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 
                ${errors.siape ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite o SIAPE"
              required
            />
            {errors.siape && (
              <p className="mt-1 text-sm text-red-500">{errors.siape}</p>
            )}
          </div>

          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
              Nome<span className="text-red-500">*</span>
            </label>
            <input
              id="nome"
              name="nome"
              type="text"
              value={docente.nome}
              onChange={handleFieldChange}
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
                ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite o nome"
              required
            />
            {errors.nome && (
              <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={docente.email}
              onChange={handleFieldChange}
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
                ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite o email"
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="contato" className="block text-sm font-medium text-gray-700">
              Contato
            </label>
            <ReactInputMask
              id="contato"
              name="contato"
              mask="(99) 99999-9999"
              value={docente.contato}
              onChange={handleFieldChange}
              className={`mt-1 w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
                ${errors.contato ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Digite o contato"
            />
            {errors.contato && (
              <p className="mt-1 text-sm text-red-500">{errors.contato}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocenteForm;
