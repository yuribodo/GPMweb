import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProjetoCard = ({ id, title, description }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
        <p className="mt-4 text-gray-600">{description}</p>
        <Link to={`/projetos/${id}`}>
          <motion.button
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            whileHover={{ scale: 1.1 }}
          >
            Saiba mais
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default ProjetoCard;
