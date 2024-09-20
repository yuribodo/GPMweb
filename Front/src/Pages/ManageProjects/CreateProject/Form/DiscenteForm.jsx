import React from 'react';

const DiscenteForm = ({ discente, index, handleChange }) => {
  return (
    <div className="space-y-2">
      <input
        name="matricula"
        type="text"
        placeholder="Matricula"
        value={discente.matricula}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="nome"
        type="text"
        placeholder="Nome"
        value={discente.nome}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="cpf"
        type="text"
        placeholder="CPF"
        value={discente.cpf}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="lates"
        type="text"
        placeholder="Lates"
        value={discente.lates}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="date_born"
        type="date"
        placeholder="Data de Nascimento"
        value={discente.date_born}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="tamanho_camisa"
        type="text"
        placeholder="Tamanho da Camisa"
        value={discente.tamanho_camisa}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <input
        name="contato"
        type="text"
        placeholder="Contato"
        value={discente.contato}
        onChange={(e) => handleChange(e, index, 'discente')}
        required
        className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
      />
      <div className="flex items-center">
        <input
          name="bolsista"
          type="checkbox"
          checked={discente.bolsista}
          onChange={(e) => handleChange({ target: { name: 'bolsista', value: e.target.checked } }, index, 'discente')}
          className="mr-2"
        />
        <label>Bolsista</label>
      </div>
    </div>
  );
};

export default DiscenteForm;
