import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 border-t border-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          <a href="/" className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-display font-bold text-white text-lg mr-2">INDUSTRIAL<span className="text-industrial-accent">PRO</span></span>
          </a>
          &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
        </div>
        <div className="flex gap-6">
          <a href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</a>
          <a href="/regulamin" className="hover:text-white transition-colors">Regulamin</a>
        </div>
      </div>
    </footer>
  );
};

