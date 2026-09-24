import React from 'react';
import { Phone, Mail, MapPin, Clock, ShieldCheck, ExternalLink } from 'lucide-react';
import { company, type CompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandMark } from './BrandMark';

type FooterProps = {
  companyData?: CompanyData;
};

export const Footer: React.FC<FooterProps> = ({ companyData }) => {
  const resolvedCompany = companyData ?? company;
  const basePath = resolvedCompany.links.basePath;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-industrial-950 border-t border-industrial-800 text-industrial-400">
      {/* Main Footer Grid */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & ISO (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <a href={`${basePath}/`} className="mb-4 inline-block" aria-label={`${resolvedCompany.name} - Strona Główna`}>
              <BrandMark subtitle="PROFESJONALNE USŁUGI" />
            </a>

            <p className="text-sm text-industrial-300 leading-relaxed mb-6">
              Kompleksowe usługi dla przemysłu: wynajem specjalistycznych maszyn, precyzyjne spawalnictwo, 
              relokacje linii technologicznych, dozór UDT, hydraulika siłowa oraz instalacje elektryczne.
            </p>

            {/* ISO 9001 Badge */}
            <a
              href={`${basePath}/o-firmie#certyfikat-iso`}
              className="inline-flex items-center gap-3 p-3 bg-industrial-900/80 hover:bg-industrial-800/80 border border-industrial-700/60 rounded-lg transition-colors group"
            >
              <ShieldCheck className="h-5 w-5 text-industrial-accent shrink-0 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-semibold text-white tracking-wide">CERTYFIKAT ISO 9001:2015</div>
                <div className="text-[11px] text-industrial-400">Akredytacja PCA AC 136</div>
              </div>
            </a>
          </div>

          {/* Col 2: Services Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white mb-4">
              Oferta i Usługi
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`${basePath}/wynajem`} className="hover:text-industrial-accent transition-colors">
                  Wynajem Maszyn i Podestów
                </a>
              </li>
              <li>
                <a href={`${basePath}/relokacja`} className="hover:text-industrial-accent transition-colors">
                  Relokacja Maszyn i Linii
                </a>
              </li>
              <li>
                <a href={`${basePath}/udt`} className="hover:text-industrial-accent transition-colors">
                  Konserwacja i Dozór UDT
                </a>
              </li>
              <li>
                <a href={`${basePath}/spawanie`} className="hover:text-industrial-accent transition-colors">
                  Usługi Spawalnicze i Konstrukcje
                </a>
              </li>
              <li>
                <a href={`${basePath}/budownictwo`} className="hover:text-industrial-accent transition-colors">
                  Hydraulika i Montaż Przemysłowy
                </a>
              </li>
              <li>
                <a href={`${basePath}/elektryka`} className="hover:text-industrial-accent transition-colors">
                  Pomiary i Usługi Elektryczne
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white mb-4">
              Firma
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`${basePath}/o-firmie`} className="hover:text-industrial-accent transition-colors">
                  O Firmie
                </a>
              </li>
              <li>
                <a href={`${basePath}/realizacje`} className="hover:text-industrial-accent transition-colors">
                  Realizacje
                </a>
              </li>
              <li>
                <a href={`${basePath}/faq`} className="hover:text-industrial-accent transition-colors">
                  Centrum Pomocy FAQ
                </a>
              </li>
              <li>
                <a href={`${basePath}/kontakt`} className="hover:text-industrial-accent transition-colors">
                  Kontakt i Wycena
                </a>
              </li>
              <li>
                <a 
                  href={resolvedCompany.links.trainingSiteUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-industrial-accent hover:text-white transition-colors font-medium"
                >
                  Szkolenia UDT / SEP
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white mb-4">
              Kontakt i Biuro
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-industrial-accent shrink-0 mt-0.5" />
                <span>
                  {resolvedCompany.address.street},<br />
                  {resolvedCompany.address.postalCode} {resolvedCompany.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-industrial-accent shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href={resolvedCompany.phones.services.href} className="hover:text-white transition-colors font-medium text-white">
                    {resolvedCompany.phones.services.value}
                  </a>
                  {resolvedCompany.phones.services.secondaryValue ? (
                    <a href={resolvedCompany.phones.services.secondaryHref} className="hover:text-white transition-colors text-industrial-300 text-xs">
                      {resolvedCompany.phones.services.secondaryValue}
                    </a>
                  ) : null}
                </div>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="h-4 w-4 text-green-500 shrink-0" />
                <a 
                  href={`https://wa.me/48${resolvedCompany.phones.services.value.replace(/\s+/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-green-400 transition-colors"
                >
                  Napisz na WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-industrial-accent shrink-0" />
                <a href={`mailto:${resolvedCompany.email}`} className="hover:text-white transition-colors break-all">
                  {resolvedCompany.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-industrial-400">
                <Clock className="h-3.5 w-3.5 text-industrial-500 shrink-0 mt-0.5" />
                <div>
                  <div>Biuro: {resolvedCompany.openingHours.details} ({resolvedCompany.openingHours.days})</div>
                  <div className="text-industrial-500 mt-0.5">{resolvedCompany.emergencyNote}</div>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-industrial-900 bg-black/60 py-6">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-industrial-500">
          <div>
            &copy; {currentYear} {resolvedCompany.name}. Wszelkie prawa zastrzeżone.
          </div>
          <div className="flex gap-6">
            <a href={`${basePath}/polityka-prywatnosci`} className="hover:text-industrial-300 transition-colors">
              Polityka Prywatności
            </a>
            <a href={`${basePath}/regulamin`} className="hover:text-industrial-300 transition-colors">
              Regulamin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
