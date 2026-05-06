import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { getWhatsAppUrl, useCompanyData } from '../data/company';
import { ContactForm } from './ContactForm';
import { WhatsAppIcon } from './WhatsAppIcon';

type ContactSectionProps = {
  serviceOptions?: string[];
};

export const ContactSection: React.FC<ContactSectionProps> = ({ serviceOptions }) => {
  const company = useCompanyData();
  const hasSecondaryServicePhone = Boolean(
    company.phones.services.secondaryValue && company.phones.services.secondaryHref
  );
  const primaryWhatsAppUrl = getWhatsAppUrl(company.phones.services.href, company.phones.services.value);

  return (
    <section id="kontakt" className="border-t border-gray-700 bg-industrial-800 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-display text-3xl font-bold text-white sm:text-4xl md:mb-8 md:text-5xl lg:text-6xl">
              Skontaktuj się <span className="text-industrial-accent">z nami</span>
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-300 sm:text-lg md:mb-12 md:text-xl">
              Potrzebujesz wyceny wynajmu? Planujesz relokację linii produkcyjnej? 
              A może szukasz stałej obsługi UDT? Jesteśmy do dyspozycji.
            </p>

            <div className="grid gap-8 md:gap-10">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-700 bg-industrial-900 text-industrial-accent md:h-16 md:w-16">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white sm:text-xl md:text-2xl">Zadzwoń do nas</h3>
                  <p className="mb-2 text-base text-gray-400 md:text-lg">Dział handlowy / Wynajem</p>
                  <div className="flex flex-col gap-1">
                    <a href={company.phones.services.href} className="font-display text-xl font-bold text-white transition-colors hover:text-industrial-accent sm:text-2xl md:text-3xl">
                      {company.phones.services.value}
                    </a>
                    {hasSecondaryServicePhone ? (
                      <a
                        href={company.phones.services.secondaryHref}
                        className="font-display text-lg font-bold text-white transition-colors hover:text-industrial-accent sm:text-xl md:text-2xl"
                      >
                        {company.phones.services.secondaryValue}
                      </a>
                    ) : null}
                    <p className="text-sm text-gray-500">WhatsApp dostępny na numerach usług.</p>
                    {primaryWhatsAppUrl ? (
                      <a
                        href={primaryWhatsAppUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        Napisz na WhatsApp
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-700 bg-industrial-900 text-industrial-accent md:h-16 md:w-16">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white sm:text-xl md:text-2xl">Napisz wiadomość</h3>
                  <p className="mb-2 text-base text-gray-400 md:text-lg">Odpowiadamy w ciągu 24h</p>
                  <a href={`mailto:${company.email}`} className="text-lg text-white transition-colors hover:text-industrial-accent sm:text-xl md:text-2xl break-all">
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 md:gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gray-700 bg-industrial-900 text-industrial-accent md:h-16 md:w-16">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-white sm:text-xl md:text-2xl">Godziny pracy</h3>
                  <p className="text-base text-gray-400 md:text-lg">{company.openingHours.days}: {company.openingHours.details}</p>
                  <p className="text-base text-gray-400 md:text-lg">{company.emergencyNote}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm
            title="Formularz kontaktowy"
            contextLabel="home-contact"
            serviceOptions={serviceOptions}
            cardClassName="rounded-3xl border border-gray-700 bg-industrial-900 p-6 shadow-2xl md:p-12"
            fieldClassName="w-full rounded-lg border bg-industrial-800 p-3 text-base text-white transition-colors focus:outline-none md:p-4 md:text-lg"
            submitButtonClassName="mt-4 w-full rounded-lg bg-industrial-accent py-4 text-lg font-bold uppercase tracking-wide text-industrial-900 transition-colors hover:bg-industrial-accentHover shadow-lg hover:shadow-xl md:py-5 md:text-xl"
          />

        </div>
      </div>
    </section>
  );
};