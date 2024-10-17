import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';

const DiscenteForm = ({ discente, index, handleChange }) => {
  const [errors, setErrors] = useState({});
  
  
  const validateCPF = (cpf) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf) return 'CPF é obrigatório';
    if (!cpfRegex.test(cpf)) return 'CPF inválido (formato: xxx.xxx.xxx-xx)';
    return '';
  };

  const validateMatricula = (matricula) => {
    if (!matricula) return 'Matrícula é obrigatória';
    if (matricula.length < 10) return 'Matrícula deve ter no mínimo 10 caracteres';
    return '';
  };

  const validateNome = (nome) => {
    if (!nome) return 'Nome é obrigatório';
    if (nome.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
    return '';
  };

  
  const validateField = (name, value) => {
    switch (name) {
      case 'cpf':
        return validateCPF(value);
      case 'matricula':
        return validateMatricula(value);
      case 'nome':
        return validateNome(value);
      default:
        return '';
    }
  };

  
  const handleFieldChange = (e, index, type) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    handleChange(e, index, type);
  };

  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800">Discente {index + 1}</h4>
      
      <div>
        <label htmlFor={`matricula-${index}`} className="block text-sm text-gray-600">
          Matrícula<span className="text-red-500">*</span>
        </label>
        <input
          id={`matricula-${index}`}
          name="matricula"
          type="text"
          value={discente.matricula}
          onChange={(e) => handleFieldChange(e, index, 'discente')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500 
            ${errors.matricula ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite a matrícula"
          required
        />
        {errors.matricula && (
          <p className="mt-1 text-sm text-red-500">{errors.matricula}</p>
        )}
      </div>

      <div>
        <label htmlFor={`nome-${index}`} className="block text-sm text-gray-600">
          Nome<span className="text-red-500">*</span>
        </label>
        <input
          id={`nome-${index}`}
          name="nome"
          type="text"
          value={discente.nome}
          onChange={(e) => handleFieldChange(e, index, 'discente')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.nome ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o nome"
          required
        />
        {errors.nome && (
          <p className="mt-1 text-sm text-red-500">{errors.nome}</p>
        )}
      </div>

      <div>
        <label htmlFor={`cpf-${index}`} className="block text-sm text-gray-600">
          CPF<span className="text-red-500">*</span>
        </label>
        <InputMask
          id={`cpf-${index}`}
          name="cpf"
          mask="999.999.999-99"
          value={discente.cpf}
          onChange={(e) => handleFieldChange(e, index, 'discente')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.cpf ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o CPF"
          required
        />
        {errors.cpf && (
          <p className="mt-1 text-sm text-red-500">{errors.cpf}</p>
        )}
      </div>

      <div>
        <label htmlFor={`contato-${index}`} className="block text-sm text-gray-600">Contato</label>
        <InputMask
          id={`contato-${index}`}
          name="contato"
          mask="(99) 99999-9999"
          value={discente.contato}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o contato"
        />
      </div>

      <div>
        <label htmlFor={`bolsista-${index}`} className="block text-sm text-gray-600">Bolsista</label>
        <input
          id={`bolsista-${index}`}
          name="bolsista"
          type="checkbox"
          checked={discente.bolsista}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
        />
      </div>
    </div>
  );
};

export default DiscenteForm;