import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8">
      <div className="text-center">
        <p className="text-sm">© {new Date().getFullYear()} GPmecatronica. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
