import React from 'react';
import { Award, ArrowRight } from 'lucide-react';
import { useCompanyData } from '../data/company';
import { QualityProcessIcon, CheckMarkIcon } from './icons/IndustrialIcons';

export const CertificatesSection: React.FC = () => {
  const company = useCompanyData();
  const basePath = company.links.basePath;

  const scopes = [
    'Wynajem sprzętu dźwigowego i budowlanego',
    'Usługi naprawy i konserwacji urządzeń technicznych (UDT)',
    'Kompleksowe usługi spawalnicze i konstrukcyjne dla przemysłu',
    'Relokacja maszyn, urządzeń i linii produkcyjnych',
    'Pomiary, projektowanie i budowa instalacji elektrycznych',
    'Szkolenia branżowe (UDT, IMBiGS, SEP, spawalnicze) i doradztwo',
  ];

  return (
    <section id="certyfikaty" className="page-section border-b border-gray-800/80">
      <div className="page-container">
        <div className="bg-industrial-900 rounded-2xl p-6 sm:p-10 md:p-14 relative overflow-hidden border border-gray-800">
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 -mt-10 -mr-10 text-industrial-950/70 opacity-60 rotate-12 pointer-events-none"
            aria-hidden="true"
          >
            <Award size={340} />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="mb-4">
                <span className="section-badge">
                  <QualityProcessIcon size={15} />
                  <span>Jakość potwierdzona audytem</span>
                </span>
              </div>
              <h2 className="section-title mb-5">
                Certyfikat <span className="text-industrial-accent">ISO 9001:2015</span>
              </h2>
              <p className="text-gray-200 mb-4 text-base sm:text-lg leading-relaxed">
                Posiadamy certyfikat systemu zarządzania jakością potwierdzony przez{' '}
                <strong className="text-white font-semibold">
                  Polskie Centrum Akredytacji (PCA) AC 136
                </strong>
                .
              </p>
              <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
                Norma PN-EN ISO 9001:2015 potwierdza, że nasze procesy operacyjne, serwisowe i
                szkoleniowe są stale monitorowane, a realizowane prace spełniają rygorystyczne
                wymagania bezpieczeństwa i jakości w przemyśle.
              </p>
              <a
                href={`${basePath}/o-firmie#certyfikat-iso`}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-industrial-accent hover:text-white transition-colors group"
              >
                <span>Poznaj pełny zakres 13 obszarów akredytacji</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="lg:col-span-6 bg-industrial-950/90 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-800 shadow-xl">
              <h3 className="card-title mb-5">Kluczowy zakres certyfikacji obejmuje:</h3>
              <ul className="space-y-3.5">
                {scopes.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 text-gray-300 text-sm sm:text-base items-start"
                  >
                    <CheckMarkIcon
                      className="text-industrial-accent shrink-0 mt-1"
                      size={18}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
