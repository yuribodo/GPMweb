// SearchBar.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importando o ícone da lupa

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative mb-8 max-w-md mx-auto">
      <input
        type="text"
        className="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
