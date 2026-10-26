import React from 'react';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useLiveCompanyData, getWhatsAppUrl, type CompanyData } from '../data/company';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandMark } from './BrandMark';
import { QualityProcessIcon } from './icons/IndustrialIcons';

type FooterProps = {
  companyData?: CompanyData;
};

export const Footer: React.FC<FooterProps> = ({ companyData }) => {
  const resolvedCompany = useLiveCompanyData(companyData);
  const basePath = resolvedCompany.links.basePath;
  const whatsappUrl = getWhatsAppUrl(
    resolvedCompany.phones.services.href,
    resolvedCompany.phones.services.value
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-industrial-950 border-t border-gray-800/80 text-gray-300">
      {/* Main Footer Grid */}
      <div className="page-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & ISO (4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <a
              href={`${basePath}/`}
              className="mb-4 inline-block w-fit"
              aria-label={`${resolvedCompany.name} – Strona główna`}
            >
              <BrandMark subtitle="USŁUGI DLA PRZEMYSŁU" />
            </a>

            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Kompleksowe wsparcie zakładów przemysłowych: wynajem żurawi i podestów ruchomych,
              relokacje linii technologicznych, dozór i serwis UDT, spawalnictwo, rurociągi
              przemysłowe oraz instalacje elektryczne.
            </p>

            {/* ISO 9001 Badge */}
            <a
              href={`${basePath}/o-firmie#certyfikat-iso`}
              className="inline-flex items-center gap-3 p-3.5 bg-industrial-900/90 hover:bg-industrial-800/80 border border-gray-800 hover:border-industrial-accent/40 rounded-xl transition-colors group w-fit"
            >
              <QualityProcessIcon
                size={22}
                className="text-industrial-accent shrink-0 group-hover:scale-105 transition-transform"
              />
              <div>
                <div className="text-xs font-bold text-white tracking-wider uppercase">
                  Certyfikat ISO 9001:2015
                </div>
                <div className="text-xs text-gray-400">Akredytacja PCA AC 136</div>
              </div>
            </a>
          </div>

          {/* Col 2: Services Links (3 cols) */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white mb-4">
              Usługi przemysłowe
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`${basePath}/wynajem`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Wynajem maszyn i dźwigów
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/relokacja`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Relokacja maszyn i linii
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/udt`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Konserwacja, serwis i UDT
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/spawanie`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Usługi spawalnicze i konstrukcje
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/budownictwo`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Hydraulika i montaż przemysłowy
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/elektryka`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Pomiary i usługi elektryczne
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Information (2 cols) */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-display font-bold uppercase tracking-wider text-white mb-4">
              Informacje
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`${basePath}/o-firmie`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  O firmie i certyfikaty
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/realizacje`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Przykładowe realizacje
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/uslugi-techniczne`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Przegląd usług technicznych
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/faq`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Pytania i odpowiedzi (FAQ)
                </a>
              </li>
              <li>
                <a
                  href={`${basePath}/kontakt`}
                  className="text-gray-300 hover:text-industrial-accent transition-colors"
                >
                  Kontakt i wycena
                </a>
              </li>
              <li>
                <a
                  href={resolvedCompany.links.trainingSiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-industrial-accent hover:text-white transition-colors font-semibold"
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
              Kontakt i siedziba
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-industrial-accent shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  {resolvedCompany.address.street},<br />
                  {resolvedCompany.address.postalCode} {resolvedCompany.address.city}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="h-4 w-4 text-industrial-accent shrink-0 mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <a
                    href={resolvedCompany.phones.services.href}
                    className="hover:text-industrial-accent transition-colors font-semibold text-white"
                  >
                    {resolvedCompany.phones.services.value}
                  </a>
                  {resolvedCompany.phones.services.secondaryValue ? (
                    <a
                      href={resolvedCompany.phones.services.secondaryHref}
                      className="hover:text-white transition-colors text-gray-300 text-xs"
                    >
                      {resolvedCompany.phones.services.secondaryValue}
                    </a>
                  ) : null}
                </div>
              </li>
              {whatsappUrl ? (
                <li className="flex items-center gap-2.5">
                  <WhatsAppIcon className="h-4 w-4 text-emerald-400 shrink-0" />
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-300 hover:text-emerald-300 transition-colors"
                  >
                    Napisz na WhatsApp
                  </a>
                </li>
              ) : null}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-industrial-accent shrink-0" />
                <a
                  href={`mailto:${resolvedCompany.email}`}
                  className="text-gray-300 hover:text-white transition-colors break-all"
                >
                  {resolvedCompany.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-1 text-xs text-gray-300">
                <Clock className="h-3.5 w-3.5 text-industrial-accent shrink-0 mt-0.5" />
                <div>
                  <div>
                    Biuro: {resolvedCompany.openingHours.details} ({resolvedCompany.openingHours.days})
                  </div>
                  <div className="text-gray-400 mt-0.5">{resolvedCompany.emergencyNote}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-gray-900 bg-black/50 py-6">
        <div className="page-container flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>&copy; {currentYear} MULTISERWIS KUTNO Sp. z o.o. Wszelkie prawa zastrzeżone.</span>
            <span className="hidden sm:inline text-gray-700">•</span>
            <span className="text-gray-400">NIP: 7752676330 • REGON: 541108550 • KRS: 0001160280</span>
          </div>
          <div className="flex gap-6 shrink-0">
            <a
              href={`${basePath}/polityka-prywatnosci`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Polityka prywatności
            </a>
            <a
              href={`${basePath}/regulamin`}
              className="text-gray-400 hover:text-white transition-colors"
            >
              Regulamin serwisu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
