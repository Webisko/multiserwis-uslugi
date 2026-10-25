import React, { useState, useEffect } from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useLiveCompanyData, getWhatsAppUrl, type CompanyData, SiteSettingsProvider } from '../data/company';
import { fetchLiveServices } from '../lib/siteContent';
import { ContactForm } from '../components/ContactForm';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const fallbackServiceOptions = [
  'Wynajem Maszyn',
  'Relokacja Maszyn',
  'Konserwacja i UDT',
  'Usługi Spawalnicze',
  'Hydraulika i Montaż',
  'Usługi Elektryczne',
  'Szkolenia',
  'Inne',
];

type ContactPageProps = {
  companyData?: CompanyData;
  serviceOptions?: string[];
};

export const ContactPage: React.FC<ContactPageProps> = ({
  companyData,
  serviceOptions = fallbackServiceOptions,
}) => {
  const resolvedCompany = useLiveCompanyData(companyData);
  const [liveOptions, setLiveOptions] = useState<string[]>(serviceOptions);

  useEffect(() => {
    void fetchLiveServices().then((fresh) => {
      if (fresh) {
        setLiveOptions(fresh.contactOptions);
      }
    });
  }, []);

  const hasSecondaryServicePhone = Boolean(
    resolvedCompany.phones.services.secondaryValue &&
      resolvedCompany.phones.services.secondaryHref
  );
  const hasTrainingPhone = Boolean(resolvedCompany.phones.training.href);
  const primaryWhatsAppUrl = getWhatsAppUrl(
    resolvedCompany.phones.services.href,
    resolvedCompany.phones.services.value
  );

  return (
    <SiteSettingsProvider value={resolvedCompany}>
      <PageHeader
        badge="Szybka wycena w 24h"
        title="Kontakt i wycena usług"
        subtitle="Skontaktuj się z naszym zespołem technicznym, aby dobrać sprzęt, omówić zakres prac i otrzymać indywidualną ofertę."
      />

      <section className="page-section">
        <div className="page-container">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start">
            {/* Contact Info */}
            <div className="lg:col-span-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6">
                Dane kontaktowe
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                  <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Adres siedziby i bazy
                    </h3>
                    <p className="text-base sm:text-lg font-semibold text-white">
                      {resolvedCompany.address.street}
                    </p>
                    <p className="text-sm sm:text-base text-gray-300">
                      {resolvedCompany.address.postalCode} {resolvedCompany.address.city}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                  <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                    <Phone size={22} />
                  </div>
                  <div className="w-full">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Telefony – {resolvedCompany.phones.services.label}
                    </h3>
                    <div className="flex flex-col gap-1">
                      <a
                        href={resolvedCompany.phones.services.href}
                        className="font-display text-2xl font-bold text-white hover:text-industrial-accent transition-colors"
                      >
                        {resolvedCompany.phones.services.value}
                      </a>
                      {hasSecondaryServicePhone ? (
                        <a
                          href={resolvedCompany.phones.services.secondaryHref}
                          className="font-display text-xl font-bold text-gray-200 hover:text-industrial-accent transition-colors"
                        >
                          {resolvedCompany.phones.services.secondaryValue}
                        </a>
                      ) : null}
                      <span className="text-xs text-gray-400 mt-1">
                        Obsługa zapytań dostępna również przez WhatsApp.
                      </span>
                      {primaryWhatsAppUrl ? (
                        <a
                          href={primaryWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white"
                        >
                          <WhatsAppIcon className="h-4 w-4" />
                          <span>Napisz na WhatsApp</span>
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-1">
                        {resolvedCompany.phones.training.label} (UDT / SEP / Spawalnictwo):
                      </span>
                      {hasTrainingPhone ? (
                        <a
                          href={resolvedCompany.phones.training.href}
                          className="font-display text-lg font-bold text-white hover:text-industrial-accent transition-colors"
                        >
                          {resolvedCompany.phones.training.value}
                        </a>
                      ) : null}
                      <a
                        href={resolvedCompany.links.trainingSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-industrial-accent transition-colors hover:text-white"
                      >
                        <span>Przejdź do serwisu szkoleń</span>
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                  <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Adres e-mail
                    </h3>
                    <a
                      href={`mailto:${resolvedCompany.email}`}
                      className="break-all text-base sm:text-lg font-semibold text-white transition-colors hover:text-industrial-accent"
                    >
                      {resolvedCompany.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-industrial-900 border border-gray-800">
                  <div className="w-12 h-12 bg-industrial-950 border border-gray-800 rounded-xl flex items-center justify-center text-industrial-accent shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                      Godziny pracy biura
                    </h3>
                    <p className="text-sm sm:text-base text-white font-medium">
                      {resolvedCompany.openingHours.days}: {resolvedCompany.openingHours.details}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                      {resolvedCompany.emergencyNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm
                title="Formularz zapytania ofertowego"
                contextLabel="contact-page"
                serviceOptions={liveOptions}
                cardClassName="rounded-2xl border border-gray-800 bg-industrial-900 p-6 sm:p-8 md:p-10 shadow-xl"
                fieldClassName="w-full rounded-lg border bg-industrial-950 px-4 py-3 text-base text-white placeholder-gray-500 focus:outline-none transition-colors"
                titleClassName="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-6"
                submitButtonClassName="w-full bg-industrial-accent text-industrial-950 font-bold py-4 rounded-lg hover:bg-industrial-accentHover transition-colors mt-2 uppercase tracking-wider text-base sm:text-lg"
              />
            </div>
          </div>

          {/* Map */}
          <div className="mx-auto max-w-6xl mt-14 overflow-hidden rounded-2xl border border-gray-800 bg-industrial-900 md:mt-16">
            <iframe
              title="Mapa dojazdu do Multiserwis Kutno"
              src={resolvedCompany.map.embedUrl}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-col gap-3 border-t border-gray-800 px-6 py-4 text-sm text-gray-300 md:flex-row md:items-center md:justify-between">
              <p>
                Lokalizacja bazy: <strong className="text-white">{resolvedCompany.address.street}, {resolvedCompany.address.postalCode} {resolvedCompany.address.city}</strong>
              </p>
              <a
                href={resolvedCompany.map.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-bold text-industrial-accent transition-colors hover:text-white"
              >
                <span>Wyznacz trasę w Google Maps</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteSettingsProvider>
  );
};
