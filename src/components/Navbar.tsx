import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, ChevronDown, ExternalLink } from 'lucide-react';
import { useLiveCompanyData, type CompanyData } from '../data/company';
import { BrandMark } from './BrandMark';

type NavbarProps = {
  companyData?: CompanyData;
};

type NavSubItem = {
  name: string;
  path: string;
};

type NavItem = {
  name: string;
  path?: string;
  dropdownOnly?: boolean;
  external?: boolean;
  submenu?: NavSubItem[];
};

export const Navbar: React.FC<NavbarProps> = ({ companyData }) => {
  const resolvedCompany = useLiveCompanyData(companyData);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
      setOpenDropdown(null);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const basePath = resolvedCompany.links.basePath;

  const navLinks: NavItem[] = [
    {
      name: 'Wynajem maszyn',
      path: `${basePath}/wynajem`,
      submenu: [
        { name: 'Podesty i podnośniki', path: `${basePath}/wynajem#podesty` },
        { name: 'Żurawie samochodowe', path: `${basePath}/wynajem#zurawie` },
        { name: 'Ładowarki i wózki', path: `${basePath}/wynajem#ladowarki` },
        { name: 'Sprzęt specjalistyczny', path: `${basePath}/wynajem#specjalistyczne` },
      ],
    },
    {
      name: 'Usługi techniczne',
      path: `${basePath}/uslugi-techniczne`,
      submenu: [
        { name: 'Usługi spawalnicze i konstrukcje', path: `${basePath}/spawanie` },
        { name: 'Konserwacja, serwis i UDT', path: `${basePath}/udt` },
        { name: 'Relokacja maszyn i linii', path: `${basePath}/relokacja` },
      ],
    },
    {
      name: 'Instalacje i montaż',
      dropdownOnly: true,
      submenu: [
        { name: 'Hydraulika i montaż przemysłowy', path: `${basePath}/budownictwo` },
        { name: 'Usługi elektryczne i pomiary', path: `${basePath}/elektryka` },
      ],
    },
    { name: 'Realizacje', path: `${basePath}/realizacje` },
    { name: 'O firmie', path: `${basePath}/o-firmie` },
    { name: 'Szkolenia', path: resolvedCompany.links.trainingSiteUrl, external: true },
  ];

  const mobileNavLinks: NavItem[] = [
    ...navLinks,
    { name: 'FAQ – Pytania i odpowiedzi', path: `${basePath}/faq` },
  ];

  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-industrial-950/95 backdrop-blur-md border-b border-gray-800/80 shadow-lg py-3'
          : 'bg-gradient-to-b from-industrial-950/80 to-transparent py-4 lg:py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4">
        {/* Logo */}
        <a
          href={`${basePath}/`}
          className="shrink-0"
          aria-label={`${resolvedCompany.name} – Strona główna`}
        >
          <BrandMark subtitle="USŁUGI DLA PRZEMYSŁU" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-6 2xl:gap-8">
          {navLinks.map((link) => {
            const isDropdownActive = openDropdown === link.name;

            return (
              <div key={link.name} className="relative group/menu">
                {link.external ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs xl:text-sm font-semibold text-gray-200 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap"
                  >
                    {link.name}
                    <ExternalLink size={12} className="opacity-75" />
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
                    className="text-xs xl:text-sm font-semibold text-gray-200 hover:text-industrial-accent transition-colors uppercase tracking-wider flex items-center gap-1 whitespace-nowrap cursor-pointer"
                  >
                    {link.name}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <div className="flex items-center gap-0.5">
                    <a
                      href={link.path}
                      className="text-xs xl:text-sm font-semibold transition-colors uppercase tracking-wider text-gray-200 hover:text-industrial-accent whitespace-nowrap"
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
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 ${isDropdownActive ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                )}

                {/* Dropdown */}
                {link.submenu && (
                  <div
                    className={`absolute top-full left-0 pt-3 transition-all duration-200 transform w-68 z-50 ${
                      isDropdownActive
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible translate-y-2 group-hover/menu:opacity-100 group-hover/menu:visible group-hover/menu:translate-y-0'
                    }`}
                  >
                    <div className="bg-industrial-900 border border-gray-800 rounded-xl shadow-2xl p-2 flex flex-col gap-1">
                      {link.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          onClick={() => setOpenDropdown(null)}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-industrial-800 rounded-lg transition-colors"
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
            className="px-4 py-2.5 xl:px-5 bg-industrial-accent text-industrial-950 font-bold rounded-lg hover:bg-industrial-accentHover transition-colors flex items-center gap-2 whitespace-nowrap text-xs xl:text-sm shadow-sm"
          >
            <Phone size={15} />
            Poproś o wycenę
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="z-50 rounded-lg border border-white/15 bg-industrial-900/80 p-2 text-white backdrop-blur-sm lg:hidden"
          aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 top-full flex w-full flex-col gap-1 border-t border-gray-800 bg-industrial-950 p-4 shadow-2xl lg:hidden max-h-[calc(100svh-68px)] overflow-y-auto"
        >
          {mobileNavLinks.map((link) => (
            <div key={link.name} className="border-b border-gray-800/60 last:border-0">
              {link.external ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between min-h-[46px] py-2.5 text-base font-semibold text-gray-200 hover:text-industrial-accent transition-colors"
                >
                  <span>{link.name}</span>
                  <ExternalLink size={16} className="text-industrial-accent" />
                </a>
              ) : link.dropdownOnly ? (
                <div className="py-2.5">
                  <div className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1.5">
                    {link.name}
                  </div>
                  {link.submenu && (
                    <div className="pl-3 flex flex-col gap-0.5 border-l-2 border-industrial-accent/40">
                      {link.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          onClick={closeMobileMenu}
                          className="flex items-center min-h-[42px] py-2 text-base text-gray-200 hover:text-white transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-2">
                  <a
                    href={link.path}
                    onClick={closeMobileMenu}
                    className="flex items-center min-h-[44px] py-2 text-base font-semibold text-gray-100 hover:text-industrial-accent transition-colors"
                  >
                    {link.name}
                  </a>
                  {link.submenu && (
                    <div className="pl-3 mt-1 mb-1 flex flex-col gap-0.5 border-l-2 border-gray-800">
                      {link.submenu.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.path}
                          onClick={closeMobileMenu}
                          className="flex items-center min-h-[40px] py-1.5 text-sm text-gray-300 hover:text-white transition-colors"
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
            className="mt-3 w-full text-center bg-industrial-accent text-industrial-950 font-bold py-3.5 rounded-lg text-base hover:bg-industrial-accentHover transition-colors"
          >
            Poproś o wycenę
          </a>
        </div>
      )}
    </nav>
  );
};
