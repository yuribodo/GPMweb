import React, { useState } from 'react';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    titulo_projeto: '',
    edital: '',
    area: '',
    objetivo: '',
    metas: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would typically send formData to your backend here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      titulo_projeto: '',
      edital: '',
      area: '',
      objetivo: '',
      metas: '',
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">Create Project</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titulo_projeto" className="block text-sm font-medium text-gray-700">
              Project Title
            </label>
            <input
              id="titulo_projeto"
              name="titulo_projeto"
              type="text"
              value={formData.titulo_projeto}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="edital" className="block text-sm font-medium text-gray-700">
              Public Notice
            </label>
            <input
              id="edital"
              name="edital"
              type="text"
              value={formData.edital}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="area" className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              id="area"
              name="area"
              type="text"
              value={formData.area}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="objetivo" className="block text-sm font-medium text-gray-700">
              Objective
            </label>
            <textarea
              id="objetivo"
              name="objetivo"
              value={formData.objetivo}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="metas" className="block text-sm font-medium text-gray-700">
              Goals
            </label>
            <textarea
              id="metas"
              name="metas"
              value={formData.metas}
              onChange={handleChange}
              required
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
