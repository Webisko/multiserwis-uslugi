import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, ExternalLink } from 'lucide-react';
import { company, type CompanyData } from '../data/company';
import { BrandMark } from './BrandMark';

// Use standard a tags for Astro
type NavbarProps = {
  companyData?: CompanyData;
};

export const Navbar: React.FC<NavbarProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setOpenDropdown(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.group\\/menu')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
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
  ];

  const mobileNavLinks = [
    ...navLinks,
    { name: 'FAQ', path: `${basePath}/faq` },
  ];

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-industrial-900/95 backdrop-blur-md shadow-lg py-3.5' : 'bg-transparent py-5 lg:py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-6">
        {/* Logo */}
        <a href={`${basePath}/`} className="shrink-0" aria-label={`${resolvedCompany.name} - Strona Główna`}>
          <BrandMark subtitle="PROFESJONALNE USŁUGI" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-7 2xl:gap-9">
          {navLinks.map((link) => {
            const isDropdownActive = openDropdown === link.name;

            return (
              <div 
                key={link.name} 
                className="relative group/menu"
              >
                {link.external ? (
                  <a 
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs xl:text-sm font-semibold text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
                  >
                    {link.name}
                    <ExternalLink size={12} className="opacity-70" />
                  </a>
                ) : link.dropdownOnly ? (
                   <button
                     type="button"
                     onClick={(e) => {
                       e.stopPropagation();
                       setOpenDropdown(isDropdownActive ? null : link.name);
                     }}
                     aria-expanded={isDropdownActive}
                     aria-haspopup="true"
                     className="text-xs xl:text-sm font-semibold text-gray-300 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap cursor-pointer"
                   >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`} />
                   </button>
                ) : (
                  <div className="flex items-center gap-0.5">
                    <a
                      href={link.path}
                      className="text-xs xl:text-sm font-semibold transition-colors uppercase tracking-wider text-gray-300 hover:text-industrial-accent whitespace-nowrap"
                    >
                      {link.name}
                    </a>
                    {link.submenu && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(isDropdownActive ? null : link.name);
                        }}
                        aria-label={`Rozwiń menu ${link.name}`}
                        aria-expanded={isDropdownActive}
                        className="p-1 text-gray-400 hover:text-industrial-accent transition-colors cursor-pointer"
                      >
                        <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                )}

                {/* Dropdown */}
                {link.submenu && (
                  <div
                    className={`absolute top-full left-0 pt-3 transition-all duration-200 transform w-64 z-50 ${
                      isDropdownActive
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0'
                    }`}
                  >
                     <div className="bg-industrial-900 border border-gray-800 rounded-lg shadow-2xl p-2 flex flex-col gap-1">
                        {link.submenu.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.path}
                            onClick={() => setOpenDropdown(null)}
                            className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-industrial-800 rounded transition-colors"
                          >
                            {subItem.name}
                          </a>
                        ))}
                     </div>
                  </div>
                )}
              </div>
            );
          })}
          <a
            href={`${basePath}/kontakt`}
            className="px-4 py-2 xl:px-5 xl:py-2.5 bg-industrial-accent text-industrial-900 font-bold rounded hover:bg-industrial-accentHover transition-colors flex items-center gap-2 whitespace-nowrap text-xs xl:text-sm shadow-sm"
          >
            <Phone size={15} />
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
           {mobileNavLinks.map((link) => (
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

