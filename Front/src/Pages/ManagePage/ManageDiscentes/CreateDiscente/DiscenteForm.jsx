// DiscenteForm.jsx
import React, { useState } from 'react';
import ReactInputMask from 'react-input-mask';

const DiscenteForm = ({ discente, index, handleChange, projetos }) => {
  const [errors, setErrors] = useState({});
  
  const validateField = (name, value) => {
    switch (name) {
      case 'cpf':
        return !value ? 'CPF é obrigatório' :
               !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value) ? 'CPF inválido (formato: xxx.xxx.xxx-xx)' : '';
      case 'matricula':
        return !value ? 'Matrícula é obrigatória' :
               value.toString().length < 5 ? 'Matrícula deve ter no mínimo 5 dígitos' : '';
      case 'nome':
        return !value ? 'Nome é obrigatório' :
               value.length < 3 ? 'Nome deve ter no mínimo 3 caracteres' : '';
      case 'lates':
        return !value ? 'Link do Lattes é obrigatório' : '';
      case 'projetoId':
        return !value ? 'Projeto é obrigatório' : '';
      case 'tamanho_camisa':
        return !value ? 'Tamanho da camisa é obrigatório' : '';
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

    handleChange(e, index);
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
          onChange={handleFieldChange}
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
          onChange={handleFieldChange}
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
        <ReactInputMask
          id={`cpf-${index}`}
          name="cpf"
          mask="999.999.999-99"
          value={discente.cpf}
          onChange={handleFieldChange}
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
        <label htmlFor={`lates-${index}`} className="block text-sm text-gray-600">
          Link do Lattes<span className="text-red-500">*</span>
        </label>
        <input
          id={`lates-${index}`}
          name="lates"
          type="url"
          value={discente.lates}
          onChange={handleFieldChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.lates ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o link do Lattes"
          required
        />
        {errors.lates && (
          <p className="mt-1 text-sm text-red-500">{errors.lates}</p>
        )}
      </div>

      <div>
        <label htmlFor={`date_born-${index}`} className="block text-sm text-gray-600">
          Data de Nascimento<span className="text-red-500">*</span>
        </label>
        <input
          id={`date_born-${index}`}
          name="date_born"
          type="date"
          value={discente.date_born ? discente.date_born.substring(0, 10) : ''} // Formatação correta
          onChange={handleFieldChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.date_born ? 'border-red-500' : 'border-gray-300'}`}
          required
        />
        {errors.date_born && (
          <p className="mt-1 text-sm text-red-500">{errors.date_born}</p>
        )}
      </div>

      <div>
        <label htmlFor={`projetoId-${index}`} className="block text-sm text-gray-600">
          Projeto<span className="text-red-500">*</span>
        </label>
        <select
          id={`projetoId-${index}`}
          name="projetoId"
          value={discente.projetoId}
          onChange={handleFieldChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.projetoId ? 'border-red-500' : 'border-gray-300'}`}
          required
        >
          <option value="">Selecione um projeto</option>
          {projetos.map(projeto => (
            <option key={projeto.id} value={projeto.id}>
              {projeto.nome}
            </option>
          ))}
        </select>
        {errors.projetoId && (
          <p className="mt-1 text-sm text-red-500">{errors.projetoId}</p>
        )}
      </div>

      <div>
        <label htmlFor={`tamanho_camisa-${index}`} className="block text-sm text-gray-600">
          Tamanho da Camisa<span className="text-red-500">*</span>
        </label>
        <select
          id={`tamanho_camisa-${index}`}
          name="tamanho_camisa"
          value={discente.tamanho_camisa}
          onChange={handleFieldChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.tamanho_camisa ? 'border-red-500' : 'border-gray-300'}`}
          required
        >
          <option value="">Selecione um tamanho</option>
          <option value="PP">PP</option>
          <option value="P">P</option>
          <option value="M">M</option>
          <option value="G">G</option>
          <option value="GG">GG</option>
          <option value="XG">XG</option>
        </select>
        {errors.tamanho_camisa && (
          <p className="mt-1 text-sm text-red-500">{errors.tamanho_camisa}</p>
        )}
      </div>

      <div>
        <label htmlFor={`contato-${index}`} className="block text-sm text-gray-600">
          Contato
        </label>
        <ReactInputMask
          id={`contato-${index}`}
          name="contato"
          mask="(99) 99999-9999" 
          value={discente.contato}
          onChange={handleFieldChange}
          className={`w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500
            ${errors.contato ? 'border-red-500' : 'border-gray-300'}`}
          placeholder="Digite o contato"
        />
        {errors.contato && (
          <p className="mt-1 text-sm text-red-500">{errors.contato}</p>
        )}
      </div>

      <div>
        <label htmlFor={`bolsista-${index}`} className="flex items-center">
          <input
            id={`bolsista-${index}`}
            name="bolsista"
            type="checkbox"
            checked={discente.bolsista}
            onChange={e => handleChange({ target: { name: 'bolsista', value: e.target.checked } }, index)}
            className="mr-2"
          />
          Bolsista
        </label>
      </div>

    </div>
  );
};

export default DiscenteForm;
