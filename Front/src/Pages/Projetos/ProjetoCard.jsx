import React from 'react';
import { Link } from 'react-router-dom';

const ProjetoCard = ({ title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
        <Link to='/projetos/saiba-mais'>
          <button className="mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
            Saiba mais
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProjetoCard;
