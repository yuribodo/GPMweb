import React from 'react';

const DiscenteForm = ({ discente, index, handleChange }) => {
  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800">Discente {index + 1}</h4>
      
      {/* Matrícula */}
      <div>
        <label htmlFor={`matricula-${index}`} className="block text-sm text-gray-600">Matrícula</label>
        <input
          id={`matricula-${index}`}
          name="matricula"
          type="text"
          value={discente.matricula}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite a matrícula"
        />
      </div>

      {/* Nome */}
      <div>
        <label htmlFor={`nome-${index}`} className="block text-sm text-gray-600">Nome</label>
        <input
          id={`nome-${index}`}
          name="nome"
          type="text"
          value={discente.nome}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o nome"
        />
      </div>

      {/* CPF */}
      <div>
        <label htmlFor={`cpf-${index}`} className="block text-sm text-gray-600">CPF</label>
        <input
          id={`cpf-${index}`}
          name="cpf"
          type="text"
          value={discente.cpf}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o CPF"
        />
      </div>

      {/* Lattes */}
      <div>
        <label htmlFor={`lattes-${index}`} className="block text-sm text-gray-600">Lattes</label>
        <input
          id={`lattes-${index}`}
          name="lates"
          type="text"
          value={discente.lates}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Link do currículo Lattes"
        />
      </div>

      {/* Data de Nascimento */}
      <div>
        <label htmlFor={`date_born-${index}`} className="block text-sm text-gray-600">Data de Nascimento</label>
        <input
          id={`date_born-${index}`}
          name="date_born"
          type="date"
          value={discente.date_born}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
        />
      </div>

      {/* Tamanho da Camisa */}
      <div>
        <label htmlFor={`tamanho_camisa-${index}`} className="block text-sm text-gray-600">Tamanho da Camisa</label>
        <input
          id={`tamanho_camisa-${index}`}
          name="tamanho_camisa"
          type="text"
          value={discente.tamanho_camisa}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o tamanho da camisa"
        />
      </div>

      {/* Contato */}
      <div>
        <label htmlFor={`contato-${index}`} className="block text-sm text-gray-600">Contato</label>
        <input
          id={`contato-${index}`}
          name="contato"
          type="text"
          value={discente.contato}
          onChange={(e) => handleChange(e, index, 'discente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o contato"
        />
      </div>

      {/* Bolsista */}
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
