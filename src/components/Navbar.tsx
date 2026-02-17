import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';

// Use standard a tags for Astro
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

  // Base path for GitHub Pages
  const basePath = '/multiserwis-uslugi';

  const navLinks = [
    { 
      name: 'Wynajem Maszyn', 
      path: `${basePath}/wynajem`,
      submenu: [
        { name: 'Podesty i podnośniki', path: `${basePath}/wynajem#podesty` },
        { name: 'Żurawie', path: `${basePath}/wynajem#zurawie` },
        { name: 'Ładowarki i wózki', path: `${basePath}/wynajem#ladowarki` },
        { name: 'Sprzęt specjalistyczny', path: `${basePath}/wynajem#specjalistyczne` },
      ]
    },
    { 
      name: 'Usługi Techniczne', 
      path: `${basePath}/uslugi-techniczne`, 
      dropdownOnly: true, 
      submenu: [
        { name: 'Spawalnictwo', path: `${basePath}/spawanie` },
        { name: 'Konserwacja i UDT', path: `${basePath}/udt` },
        { name: 'Relokacja maszyn', path: `${basePath}/relokacja` },
      ]
    },
    {
      name: 'Budownictwo',
      dropdownOnly: true,
      submenu: [
        { name: 'Usługi remontowo-budowlane', path: `${basePath}/budownictwo` },
        { name: 'Usługi elektryczne', path: `${basePath}/elektryka` },
      ]
    },
    { name: 'O Firmie', path: `${basePath}/o-firmie` },
    { name: 'Realizacje', path: `${basePath}/realizacje` },
    { name: 'Szkolenia', path: 'https://szkolenia-multiserwis.pl', external: true }, 
    { name: 'FAQ', path: `${basePath}/faq` },
  ];

  const renderDesktopNavItem = (link: typeof navLinks[number]) => {
    if (link.external) {
      return (
        <a 
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
        >
          {link.name}
        </a>
      );
    }

    if (link.dropdownOnly) {
      return (
        <button type="button" className="text-sm font-medium text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap">
          {link.name}
          <ChevronDown size={14} />
        </button>
      );
    }

    return (
      <a
        href={link.path}
        className="text-sm font-medium transition-colors uppercase tracking-wider flex items-center gap-1 text-gray-300 hover:text-industrial-accent whitespace-nowrap"
      >
        {link.name}
        {link.submenu && <ChevronDown size={14} />}
      </a>
    );
  };

  const renderMobileNavItem = (link: typeof navLinks[number]) => {
    if (link.external) {
      return (
        <a href={link.path} target="_blank" rel="noopener noreferrer" className="block py-3 text-lg font-medium text-gray-300 hover:text-industrial-accent transition-colors">{link.name}</a>
      );
    }

    if (link.dropdownOnly) {
      return (
        <div className="py-2">
          <div className="text-lg font-medium text-gray-300 mb-2">{link.name}</div>
          {link.submenu && (
            <div className="pl-4 flex flex-col gap-2 mb-2 border-l border-gray-700">
              {link.submenu.map((subItem) => (
                <a
                  key={subItem.name}
                  href={subItem.path}
                  className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {subItem.name}
                </a>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="py-2">
        <a href={link.path} className="block text-lg font-medium text-gray-300 hover:text-industrial-accent transition-colors">{link.name}</a>
        {link.submenu && (
          <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-gray-700">
            {link.submenu.map((subItem) => (
              <a
                key={subItem.name}
                href={subItem.path}
                className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {subItem.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-industrial-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href={`${basePath}/`} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-industrial-accent rounded flex items-center justify-center font-display font-bold text-industrial-900 text-xl group-hover:bg-white transition-colors">
            IP
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-white">
            INDUSTRIAL<span className="text-industrial-accent group-hover:text-white transition-colors">PRO</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group/menu"
            >
              {renderDesktopNavItem(link)}

              {/* Dropdown */}
              {link.submenu && (
                <div className="absolute top-full left-0 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 w-64">
                   <div className="bg-industrial-900 border border-gray-800 rounded shadow-xl p-2 flex flex-col gap-1">
                      {link.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-industrial-800 rounded transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                   </div>
                </div>
              )}
            </div>
          ))}
          <a
            href={`${basePath}/kontakt`}
            className="px-5 py-2 bg-industrial-accent text-industrial-900 font-bold rounded hover:bg-industrial-accentHover transition-colors flex items-center gap-2"
          >
            <Phone size={16} />
            Wycena
          </a>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden text-white z-50" type="button" aria-label="Toggle navigation menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (GitHub style) */}
      {isOpen && (
        <div className="xl:hidden absolute top-full left-0 w-full bg-industrial-900 border-t border-gray-800 shadow-xl flex flex-col gap-2 p-4 animate-in slide-in-from-top-2 duration-200">
           {navLinks.map((link) => (
             <div key={link.name} className="border-b border-gray-800/50 last:border-0">
               {renderMobileNavItem(link)}
             </div>
           ))}
           <a
             href={`${basePath}/kontakt`}
             className="mt-4 w-full text-center bg-industrial-accent text-industrial-900 font-bold py-3 rounded text-lg hover:bg-industrial-accentHover transition-colors"
           >
             Zamów Wycenę
           </a>
        </div>
      )}
    </nav>
  );
};

