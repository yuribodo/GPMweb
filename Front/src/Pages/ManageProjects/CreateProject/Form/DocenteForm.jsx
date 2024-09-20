import React from 'react';

const DocenteForm = ({ docente, index, handleChange }) => {
  return (
    <div className="space-y-2">
      <input
        name="siape"
        type="text"
        placeholder="Siape"
        value={docente.siape}
        onChange={(e) => handleChange(e, index, 'docente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="nome"
        type="text"
        placeholder="Nome"
        value={docente.nome}
        onChange={(e) => handleChange(e, index, 'docente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={docente.email}
        onChange={(e) => handleChange(e, index, 'docente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="contato"
        type="text"
        placeholder="Contato"
        value={docente.contato}
        onChange={(e) => handleChange(e, index, 'docente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  );
};

export default DocenteForm;
