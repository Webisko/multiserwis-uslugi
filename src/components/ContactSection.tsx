import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import { getWhatsAppUrl, useCompanyData } from '../data/company';
import { fetchLiveServices } from '../lib/siteContent';
import { ContactForm } from './ContactForm';
import { WhatsAppIcon } from './WhatsAppIcon';

type ContactSectionProps = {
  serviceOptions?: string[];
};

export const ContactSection: React.FC<ContactSectionProps> = ({ serviceOptions }) => {
  const company = useCompanyData();
  const [liveOptions, setLiveOptions] = useState<string[] | undefined>(serviceOptions);

  useEffect(() => {
    void fetchLiveServices().then((fresh) => {
      if (fresh) {
        setLiveOptions(fresh.contactOptions);
      }
    });
  }, []);

  const hasSecondaryServicePhone = Boolean(
    company.phones.services.secondaryValue && company.phones.services.secondaryHref
  );
  const primaryWhatsAppUrl = getWhatsAppUrl(
    company.phones.services.href,
    company.phones.services.value
  );

  return (
    <section id="kontakt" className="page-section">
      <div className="page-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* Contact Info */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="mb-4">
              <span className="section-badge">
                <Phone size={14} />
                <span>Szybka wycena w 24h</span>
              </span>
            </div>
            <h2 className="section-title mb-4">
              Skontaktuj się <span className="text-industrial-accent">z nami</span>
            </h2>
            <p className="mb-8 text-base sm:text-lg leading-relaxed text-gray-300">
              Potrzebujesz wyceny wynajmu dźwigu lub podnośnika? Planujesz relokację linii
              produkcyjnej albo szukasz stałej obsługi UDT? Opisz zadanie lub zadzwoń bezpośrednio
              do koordynatora.
            </p>

            <div className="grid gap-6">
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-industrial-950 border border-gray-800 text-industrial-accent">
                  <Phone size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Dział usług i wynajmu
                  </h3>
                  <div className="flex flex-col gap-1">
                    <a
                      href={company.phones.services.href}
                      className="font-display text-2xl font-bold text-white transition-colors hover:text-industrial-accent"
                    >
                      {company.phones.services.value}
                    </a>
                    {hasSecondaryServicePhone ? (
                      <a
                        href={company.phones.services.secondaryHref}
                        className="font-display text-xl font-bold text-gray-200 transition-colors hover:text-industrial-accent"
                      >
                        {company.phones.services.secondaryValue}
                      </a>
                    ) : null}
                    {primaryWhatsAppUrl ? (
                      <a
                        href={primaryWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        <span>Napisz na WhatsApp</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-industrial-950 border border-gray-800 text-industrial-accent">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Zapytania ofertowe e-mail
                  </h3>
                  <a
                    href={`mailto:${company.email}`}
                    className="text-base sm:text-lg font-semibold text-white transition-colors hover:text-industrial-accent break-all"
                  >
                    {company.email}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Odpowiadamy w ciągu 24 godzin w dni robocze.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-industrial-950 border border-gray-800 text-industrial-accent">
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1">
                    Baza i biuro
                  </h3>
                  <p className="text-sm sm:text-base text-white font-medium">
                    {company.address.street}, {company.address.postalCode} {company.address.city}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1 flex items-center gap-1.5">
                    <Clock size={14} className="text-industrial-accent shrink-0" />
                    <span>
                      {company.openingHours.days}: {company.openingHours.details}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm
              title="Wyślij zapytanie o wycenę"
              contextLabel="home-contact"
              serviceOptions={liveOptions}
              cardClassName="rounded-2xl border border-gray-800 bg-industrial-900 p-6 sm:p-8 md:p-10 shadow-2xl"
              fieldClassName="w-full rounded-lg border bg-industrial-950 px-4 py-3 text-base text-white placeholder-gray-500 transition-colors focus:outline-none"
              titleClassName="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6"
              submitButtonClassName="mt-2 w-full rounded-lg bg-industrial-accent py-4 text-base sm:text-lg font-bold uppercase tracking-wider text-industrial-950 transition-colors hover:bg-industrial-accentHover shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
