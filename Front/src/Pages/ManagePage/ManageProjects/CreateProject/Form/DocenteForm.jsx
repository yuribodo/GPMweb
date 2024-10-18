import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';

const DocenteForm = ({ docente, index, handleChange }) => {
  const [errors, setErrors] = useState({});

  
  const validateSIAPE = (siape) => {
    if (!siape) return 'SIAPE é obrigatório';
    if (siape.length < 5) return 'SIAPE deve ter no mínimo 5 caracteres';
    return '';
  };

  const validateNome = (nome) => {
    if (!nome) return 'Nome é obrigatório';
    if (nome.length < 3) return 'Nome deve ter no mínimo 3 caracteres';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Digite o e-mail';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Formato inválido de e-mail. Deve conter "@" e um domínio válido.';
    return '';
  };

  
  const validateField = (name, value) => {
    switch (name) {
      case 'siape':
        return validateSIAPE(value);
      case 'nome':
        return validateNome(value);
      case 'email':
        return validateEmail(value);
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
      <h4 className="font-semibold text-gray-800">Docente {index + 1}</h4>
      
     
      <div>
        <label htmlFor={`siape-${index}`} className="block text-sm text-gray-600">
          SIAPE<span className="text-red-500">*</span>
        </label>
        <input
          id={`siape-${index}`}
          name="siape"
          type="text"
          value={docente.siape}
          onChange={(e) => handleFieldChange(e, index, 'docente')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.siape ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o SIAPE"
          required
        />
        {errors.siape && (
          <p className="mt-1 text-sm text-red-500">{errors.siape}</p>
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
          value={docente.nome}
          onChange={(e) => handleFieldChange(e, index, 'docente')}
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
        <label htmlFor={`email-${index}`} className="block text-sm text-gray-600">
          E-mail<span className="text-red-500">*</span>
        </label>
        <input
          id={`email-${index}`}
          name="email"
          type="email"
          value={docente.email}
          onChange={(e) => handleFieldChange(e, index, 'docente')}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o e-mail"
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      
      <div>
        <label htmlFor={`contato-${index}`} className="block text-sm text-gray-600">Contato</label>
        <ReactInputMask
          mask="(99) 99999-9999"
          id={`contato-${index}`}
          name="contato"
          value={docente.contato}
          onChange={(e) => handleChange(e, index, 'docente')}
        >
          {(inputProps) => (
            <input
              {...inputProps}
              type="text"
              className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="Digite o contato"
            />
          )}
        </ReactInputMask>
      </div>
    </div>
  );
};

export default DocenteForm;
