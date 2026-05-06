import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { company, type CompanyData } from '../data/company';
import { ContactForm } from '../components/ContactForm';

const fallbackServiceOptions = [
   'Wynajem Maszyn',
   'Usługi Spawalnicze',
   'Relokacja Maszyn',
   'Konserwacja i UDT',
   'Usługi Elektryczne',
   'Remonty Budowlane',
   'Szkolenia',
   'Inne',
];

type ContactPageProps = {
   companyData?: CompanyData;
   serviceOptions?: string[];
};

export const ContactPage: React.FC<ContactPageProps> = ({ companyData, serviceOptions = fallbackServiceOptions }) => {
   const resolvedCompany = companyData ?? company;

  return (
    <>
      <PageHeader 
        title="Kontakt" 
        subtitle="Jesteśmy do Twojej dyspozycji. Skontaktuj się z nami, aby omówić szczegóły współpracy."
      />

      <section className="py-20 bg-industrial-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto">
            
            {/* Contact Info */}
            <div>
               <h3 className="text-2xl font-bold text-white mb-8">Dane Kontaktowe</h3>
               
               <div className="space-y-8">
                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Adres</h4>
                        <p className="text-white text-lg">{resolvedCompany.address.street}</p>
                        <p className="text-white text-lg">{resolvedCompany.address.postalCode} {resolvedCompany.address.city}</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Telefony</h4>
                        <p className="text-white text-lg mb-1">
                           <span className="text-gray-500 text-sm block">{resolvedCompany.phones.services.label}:</span>
                           <a href={resolvedCompany.phones.services.href} className="hover:text-industrial-accent transition-colors">{resolvedCompany.phones.services.value}</a>
                        </p>
                        <p className="text-white text-lg">
                           <span className="text-gray-500 text-sm block">{resolvedCompany.phones.training.label}:</span>
                           <a href={resolvedCompany.phones.training.href} className="hover:text-industrial-accent transition-colors">{resolvedCompany.phones.training.value}</a>
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Mail size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">E-mail</h4>
                        <a href={`mailto:${resolvedCompany.email}`} className="text-white text-lg hover:text-industrial-accent transition-colors">
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
               cardClassName="bg-industrial-900 p-8 rounded-2xl border border-gray-800"
               fieldClassName="w-full rounded border bg-industrial-950 p-3 text-white focus:outline-none transition-colors"
               titleClassName="text-2xl font-bold text-white mb-6"
               submitButtonClassName="w-full bg-industrial-accent text-industrial-900 font-bold py-4 rounded hover:bg-industrial-accentHover transition-colors mt-4"
            />

          </div>

               <div className="mt-20 overflow-hidden rounded-xl border border-gray-800 bg-industrial-900">
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
