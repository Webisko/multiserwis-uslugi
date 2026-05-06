import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';
import { useCompanyData } from '../data/company';
import { ContactForm } from './ContactForm';

type ContactSectionProps = {
  serviceOptions?: string[];
};

export const ContactSection: React.FC<ContactSectionProps> = ({ serviceOptions }) => {
  const company = useCompanyData();

  return (
    <section id="kontakt" className="py-24 bg-industrial-800 border-t border-gray-700">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-8">
              Skontaktuj się <span className="text-industrial-accent">z nami</span>
            </h2>
            <p className="text-gray-300 mb-12 text-xl leading-relaxed">
              Potrzebujesz wyceny wynajmu? Planujesz relokację linii produkcyjnej? 
              A może szukasz stałej obsługi UDT? Jesteśmy do dyspozycji.
            </p>

            <div className="grid gap-10">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-industrial-900 rounded-2xl flex items-center justify-center text-industrial-accent shrink-0 border border-gray-700">
                  <Phone size={32} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Zadzwoń do nas</h3>
                  <p className="text-gray-400 mb-2 text-lg">Dział handlowy / Wynajem</p>
                  <a href={company.phones.services.href} className="text-2xl md:text-3xl font-display font-bold text-white hover:text-industrial-accent transition-colors">
                    {company.phones.services.value}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-industrial-900 rounded-2xl flex items-center justify-center text-industrial-accent shrink-0 border border-gray-700">
                  <Mail size={32} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Napisz wiadomość</h3>
                  <p className="text-gray-400 mb-2 text-lg">Odpowiadamy w ciągu 24h</p>
                  <a href={`mailto:${company.email}`} className="text-xl md:text-2xl text-white hover:text-industrial-accent transition-colors">
                    {company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-industrial-900 rounded-2xl flex items-center justify-center text-industrial-accent shrink-0 border border-gray-700">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Godziny pracy</h3>
                  <p className="text-gray-400 text-lg">{company.openingHours.days}: {company.openingHours.details}</p>
                  <p className="text-gray-400 text-lg">{company.emergencyNote}</p>
                </div>
              </div>
            </div>
          </div>

          <ContactForm
            title="Formularz kontaktowy"
            contextLabel="home-contact"
            serviceOptions={serviceOptions}
            cardClassName="bg-industrial-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-700"
            fieldClassName="w-full rounded-lg border bg-industrial-800 p-4 text-lg text-white focus:outline-none transition-colors"
            submitButtonClassName="w-full bg-industrial-accent text-industrial-900 font-bold py-5 rounded-lg hover:bg-industrial-accentHover transition-colors uppercase tracking-wide text-xl mt-4 shadow-lg hover:shadow-xl"
          />

        </div>
      </div>
    </section>
  );
};