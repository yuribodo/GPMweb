import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <div className="w-full">
      {[...Array(rows)].map((_, index) => (
        <motion.div
          key={index}
          className="h-16 bg-gray-200 rounded-md mb-4"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default SkeletonLoader;