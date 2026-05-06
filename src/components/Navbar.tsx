import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { company, type CompanyData } from '../data/company';

// Use standard a tags for Astro
type NavbarProps = {
  companyData?: CompanyData;
};

export const Navbar: React.FC<NavbarProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Base path for GitHub Pages
  const basePath = resolvedCompany.links.basePath;

  const navLinks = [
    { name: 'Strona Główna', path: `${basePath}/` },
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
      name: 'Instalacje i Montaż',
      dropdownOnly: true,
      submenu: [
        { name: 'Hydraulika i montaż przemysłowy', path: `${basePath}/budownictwo` },
        { name: 'Usługi elektryczne', path: `${basePath}/elektryka` },
      ]
    },
    { name: 'O Firmie', path: `${basePath}/o-firmie` },
    { name: 'Szkolenia', path: resolvedCompany.links.trainingSiteUrl, external: true }, 
    { name: 'FAQ', path: `${basePath}/faq` },
  ];

  const handleDropdownEnter = (name: string) => {
    setActiveDropdown(name);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-industrial-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href={`${basePath}/`} className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-industrial-accent rounded flex items-center justify-center font-display font-bold text-industrial-900 text-xl group-hover:bg-white transition-colors">
            {resolvedCompany.brand.mark}
          </div>
          <span className="text-xl sm:text-2xl font-display font-bold tracking-tight text-white leading-none">
            {resolvedCompany.brand.primary}<span className="text-industrial-accent group-hover:text-white transition-colors"> {resolvedCompany.brand.accent}</span>
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div 
              key={link.name} 
              className="relative group/menu"
              onMouseEnter={() => link.submenu && handleDropdownEnter(link.name)}
              onMouseLeave={handleDropdownLeave}
            >
              {link.external ? (
                <a 
                  href={link.path}
                   target="_blank"
                   rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  {link.name}
                </a>
              ) : link.dropdownOnly ? (
                 <button className="text-sm font-medium text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1">
                    {link.name}
                    <ChevronDown size={14} />
                 </button>
              ) : (
                <a
                  href={link.path}
                  className={`text-sm font-medium transition-colors uppercase tracking-wider flex items-center gap-1 text-gray-300 hover:text-industrial-accent`}
                >
                  {link.name}
                  {link.submenu && <ChevronDown size={14} />}
                </a>
              )}

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
            Poproś o wycenę
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 rounded border border-white/10 bg-industrial-900/60 p-2 text-white backdrop-blur-sm lg:hidden"
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown (GitHub style) */}
      {isOpen && (
        <div id="mobile-navigation" className="absolute left-0 top-full flex w-full flex-col gap-2 border-t border-gray-800 bg-industrial-900 p-4 shadow-xl animate-in slide-in-from-top-2 duration-200 lg:hidden max-h-[calc(100svh-72px)] overflow-y-auto">
           {navLinks.map((link) => (
             <div key={link.name} className="border-b border-gray-800/50 last:border-0">
                {link.external ? (
               <a href={link.path} target="_blank" rel="noopener noreferrer" onClick={closeMobileMenu} className="block py-3 text-lg font-medium text-gray-300 hover:text-industrial-accent transition-colors">{link.name}</a>
                ) : link.dropdownOnly ? (
                   <div className="py-2">
                      <div className="text-lg font-medium text-gray-300 mb-2">{link.name}</div>
                      {link.submenu && (
                        <div className="pl-4 flex flex-col gap-2 mb-2 border-l border-gray-700">
                           {link.submenu.map((subItem) => (
                             <a 
                               key={subItem.name} 
                               href={subItem.path}
                       onClick={closeMobileMenu}
                               className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
                             >
                                {subItem.name}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>
                ) : (
                   <div className="py-2">
                     <a href={link.path} onClick={closeMobileMenu} className="block text-lg font-medium text-gray-300 hover:text-industrial-accent transition-colors">{link.name}</a>
                      {link.submenu && (
                        <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-gray-700">
                           {link.submenu.map((subItem) => (
                             <a 
                               key={subItem.name} 
                               href={subItem.path}
                               onClick={closeMobileMenu}
                               className="block py-2 text-sm text-gray-400 hover:text-white transition-colors"
                             >
                                {subItem.name}
                             </a>
                           ))}
                        </div>
                      )}
                   </div>
                )}
             </div>
           ))}
           <a
             href={`${basePath}/kontakt`}
             onClick={closeMobileMenu}
             className="mt-4 w-full text-center bg-industrial-accent text-industrial-900 font-bold py-3 rounded text-lg hover:bg-industrial-accentHover transition-colors"
           >
             Poproś o wycenę
           </a>
        </div>
      )}
    </nav>
  );
};

