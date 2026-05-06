import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { company, getWhatsAppUrl, type CompanyData } from '../data/company';
import { ContactForm } from '../components/ContactForm';
import { WhatsAppIcon } from '../components/WhatsAppIcon';

const fallbackServiceOptions = [
   'Wynajem Maszyn',
   'Usługi Spawalnicze',
   'Relokacja Maszyn',
   'Konserwacja i UDT',
   'Usługi Elektryczne',
   'Hydraulika i Montaż',
   'Szkolenia',
   'Inne',
];

type ContactPageProps = {
   companyData?: CompanyData;
   serviceOptions?: string[];
};

export const ContactPage: React.FC<ContactPageProps> = ({ companyData, serviceOptions = fallbackServiceOptions }) => {
   const resolvedCompany = companyData ?? company;
   const hasSecondaryServicePhone = Boolean(
      resolvedCompany.phones.services.secondaryValue && resolvedCompany.phones.services.secondaryHref
   );
   const hasTrainingPhone = Boolean(resolvedCompany.phones.training.href);
   const primaryWhatsAppUrl = getWhatsAppUrl(
      resolvedCompany.phones.services.href,
      resolvedCompany.phones.services.value
   );

  return (
    <>
      <PageHeader 
        title="Kontakt" 
        subtitle="Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami, aby omówić szczegóły współpracy."
      />

         <section className="bg-industrial-950 py-16 md:py-20">
        <div className="container mx-auto px-4">
               <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-20">
            
            {/* Contact Info */}
            <div>
               <h3 className="mb-6 text-2xl font-bold text-white md:mb-8">Dane Kontaktowe</h3>
               
               <div className="space-y-6 md:space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Adres</h4>
                        <p className="text-base text-white sm:text-lg">{resolvedCompany.address.street}</p>
                        <p className="text-base text-white sm:text-lg">{resolvedCompany.address.postalCode} {resolvedCompany.address.city}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Telefony</h4>
                        <p className="mb-1 text-base text-white sm:text-lg">
                           <span className="text-gray-500 text-sm block">{resolvedCompany.phones.services.label}:</span>
                           <span className="flex flex-col gap-1">
                              <a href={resolvedCompany.phones.services.href} className="hover:text-industrial-accent transition-colors">{resolvedCompany.phones.services.value}</a>
                              {hasSecondaryServicePhone ? (
                                 <a href={resolvedCompany.phones.services.secondaryHref} className="hover:text-industrial-accent transition-colors">{resolvedCompany.phones.services.secondaryValue}</a>
                              ) : null}
                              <span className="text-sm text-gray-500">WhatsApp dostępny na numerach usług.</span>
                              {primaryWhatsAppUrl ? (
                                 <a
                                    href={primaryWhatsAppUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300 transition-colors hover:border-emerald-400 hover:text-white sm:w-fit"
                                 >
                                    <WhatsAppIcon className="h-4 w-4" />
                                    Napisz na WhatsApp
                                 </a>
                              ) : null}
                           </span>
                        </p>
                        <p className="text-base text-white sm:text-lg">
                           <span className="text-gray-500 text-sm block">{resolvedCompany.phones.training.label}:</span>
                           {hasTrainingPhone ? (
                              <a href={resolvedCompany.phones.training.href} className="hover:text-industrial-accent transition-colors">{resolvedCompany.phones.training.value}</a>
                           ) : (
                              <span className="flex flex-col gap-2 text-gray-300">
                                 <span>Kontakt szkoleniowy obsługujemy obecnie przez dedykowaną stronę szkoleń.</span>
                                 <a
                                    href={resolvedCompany.links.trainingSiteUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-semibold text-industrial-accent transition-colors hover:text-white"
                                 >
                                    Przejdź do strony szkoleń
                                 </a>
                              </span>
                           )}
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Mail size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">E-mail</h4>
                        <a href={`mailto:${resolvedCompany.email}`} className="break-all text-base text-white transition-colors hover:text-industrial-accent sm:text-lg">
                           {resolvedCompany.email}
                        </a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Clock size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Godziny Pracy</h4>
                        <p className="text-white">{resolvedCompany.openingHours.days}</p>
                        <p className="text-gray-400">{resolvedCompany.openingHours.details}</p>
                     </div>
                  </div>
               </div>
            </div>

            <ContactForm
               title="Napisz do nas"
               contextLabel="contact-page"
               serviceOptions={serviceOptions}
               compact
               cardClassName="rounded-2xl border border-gray-800 bg-industrial-900 p-6 md:p-8"
               fieldClassName="w-full rounded border bg-industrial-950 p-3 text-white focus:outline-none transition-colors"
               titleClassName="text-2xl font-bold text-white mb-6"
               submitButtonClassName="w-full bg-industrial-accent text-industrial-900 font-bold py-4 rounded hover:bg-industrial-accentHover transition-colors mt-4"
            />

          </div>

               <div className="mt-14 overflow-hidden rounded-xl border border-gray-800 bg-industrial-900 md:mt-20">
                   <iframe
                      title="Mapa dojazdu do Multiserwis Kutno"
                      src={resolvedCompany.map.embedUrl}
                      className="h-80 w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                   />
                   <div className="flex flex-col gap-3 border-t border-gray-800 px-6 py-5 text-sm text-gray-400 md:flex-row md:items-center md:justify-between">
                        <p>
                           Dojazd: {resolvedCompany.address.street}, {resolvedCompany.address.postalCode} {resolvedCompany.address.city}
                        </p>
                        <a href={resolvedCompany.map.directionsUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-industrial-accent transition-colors hover:text-white">
                           Otwórz trasę w mapach
                        </a>
                   </div>
               </div>

        </div>
      </section>
    </>
  );
};
