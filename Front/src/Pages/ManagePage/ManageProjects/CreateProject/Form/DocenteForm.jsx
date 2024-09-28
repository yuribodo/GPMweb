import React from 'react';

const DocenteForm = ({ docente, index, handleChange }) => {
  return (
    <div className="space-y-3 bg-gray-50 p-4 rounded-md mb-4 border border-gray-200">
      <h4 className="font-semibold text-gray-800">Docente {index + 1}</h4>
      
      
      <div>
        <label htmlFor={`siape-${index}`} className="block text-sm text-gray-600">SIAPE</label>
        <input
          id={`siape-${index}`}
          name="siape"
          type="text"
          value={docente.siape}
          onChange={(e) => handleChange(e, index, 'docente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o SIAPE"
        />
      </div>

      
      <div>
        <label htmlFor={`nome-${index}`} className="block text-sm text-gray-600">Nome</label>
        <input
          id={`nome-${index}`}
          name="nome"
          type="text"
          value={docente.nome}
          onChange={(e) => handleChange(e, index, 'docente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o nome"
        />
      </div>

      
      <div>
        <label htmlFor={`email-${index}`} className="block text-sm text-gray-600">E-mail</label>
        <input
          id={`email-${index}`}
          name="email"
          type="email"
          value={docente.email}
          onChange={(e) => handleChange(e, index, 'docente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o e-mail"
        />
      </div>

     
      <div>
        <label htmlFor={`contato-${index}`} className="block text-sm text-gray-600">Contato</label>
        <input
          id={`contato-${index}`}
          name="contato"
          type="text"
          value={docente.contato}
          onChange={(e) => handleChange(e, index, 'docente')}
          className="w-full px-3 py-2 border rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Digite o contato"
        />
      </div>
    </div>
  );
};

export default DocenteForm;
