import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Wynajem', href: '#wynajem' },
    { name: 'Spawanie', href: '#spawanie' },
    { name: 'UDT', href: '#udt' },
    { name: 'Elektryka', href: '#elektryka' },
    { name: 'Certyfikaty', href: '#certyfikaty' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-industrial-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-industrial-accent rounded flex items-center justify-center font-display font-bold text-industrial-900 text-xl">
            IP
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            INDUSTRIAL<span className="text-industrial-accent">PRO</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#kontakt"
            className="px-5 py-2 bg-industrial-accent text-industrial-900 font-bold rounded hover:bg-industrial-accentHover transition-colors flex items-center gap-2"
          >
            <Phone size={16} />
            Wycena
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-industrial-900 border-t border-gray-800 p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-gray-300 hover:text-industrial-accent py-2 font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#kontakt"
            onClick={() => setIsOpen(false)}
            className="block text-center bg-industrial-accent text-industrial-900 font-bold py-3 rounded"
          >
            Zamów Wycenę
          </a>
        </div>
      )}
    </nav>
  );
};