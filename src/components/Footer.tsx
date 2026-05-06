import React from 'react';
import { company, type CompanyData } from '../data/company';

type FooterProps = {
  companyData?: CompanyData;
};

export const Footer: React.FC<FooterProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;

  return (
    <footer className="bg-black py-8 border-t border-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
        <div className="mb-4 md:mb-0">
          <a href={`${resolvedCompany.links.basePath}/`} className="flex items-center gap-2 mb-2 md:mb-0">
            <span className="font-display font-bold text-white text-lg mr-2">
              {resolvedCompany.brand.primary}<span className="text-industrial-accent"> {resolvedCompany.brand.accent}</span>
            </span>
          </a>
          &copy; {new Date().getFullYear()} {resolvedCompany.name}. Wszelkie prawa zastrzeżone.
        </div>
        <div className="flex gap-6">
          <a href={`${resolvedCompany.links.basePath}/polityka-prywatnosci`} className="hover:text-white transition-colors">Polityka Prywatności</a>
          <a href={`${resolvedCompany.links.basePath}/regulamin`} className="hover:text-white transition-colors">Regulamin</a>
        </div>
      </div>
    </footer>
  );
};

