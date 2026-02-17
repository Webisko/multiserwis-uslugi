import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader 
        title="Kontakt" 
            subtitle="Skontaktuj się z nami i otrzymaj szybką odpowiedź oraz dopasowaną wycenę usług."
            backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
      />

         <section className="page-section">
            <div className="page-container">
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
                        <p className="text-white text-lg">ul. Siemieradzkiego 18</p>
                        <p className="text-white text-lg">99-300 Kutno</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Phone size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Telefony</h4>
                        <p className="text-white text-lg mb-1">
                           <span className="text-gray-500 text-sm block">Usługi:</span>
                           <a href="tel:730202000" className="hover:text-industrial-accent transition-colors">730 202 000</a>
                        </p>
                        <p className="text-white text-lg">
                           <span className="text-gray-500 text-sm block">Szkolenia:</span>
                           <a href="tel:730101000" className="hover:text-industrial-accent transition-colors">730 101 000</a>
                        </p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Mail size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">E-mail</h4>
                        <a href="mailto:multiserwis.kutno@gmail.com" className="text-white text-lg hover:text-industrial-accent transition-colors">
                           multiserwis.kutno@gmail.com
                        </a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-12 h-12 bg-industrial-900 rounded-lg flex items-center justify-center text-industrial-accent shrink-0">
                        <Clock size={24} />
                     </div>
                     <div>
                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Godziny Pracy</h4>
                        <p className="text-white">Poniedziałek - Piątek</p>
                        <p className="text-gray-400">8:00 - 16:00 (do potwierdzenia)</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Contact Form (Simple Variant A/D hybrid) */}
            <div className="offer-cta">
               <h3 className="text-2xl font-bold text-white mb-6">Napisz do nas</h3>
               <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label className="block text-sm text-gray-400 mb-1">Imię i nazwisko *</label>
                        <input type="text" className="w-full bg-industrial-950 border border-gray-700 rounded p-3 text-white focus:border-industrial-accent focus:outline-none transition-colors" placeholder="Jan Kowalski" required />
                     </div>
                     <div>
                        <label className="block text-sm text-gray-400 mb-1">Telefon *</label>
                        <input type="tel" className="w-full bg-industrial-950 border border-gray-700 rounded p-3 text-white focus:border-industrial-accent focus:outline-none transition-colors" placeholder="123 456 789" required />
                     </div>
                  </div>
                  
                  <div>
                     <label className="block text-sm text-gray-400 mb-1">E-mail *</label>
                     <input type="email" className="w-full bg-industrial-950 border border-gray-700 rounded p-3 text-white focus:border-industrial-accent focus:outline-none transition-colors" placeholder="adres@email.com" required />
                  </div>

                  <div>
                     <label className="block text-sm text-gray-400 mb-1">Temat</label>
                     <select className="w-full bg-industrial-950 border border-gray-700 rounded p-3 text-white focus:border-industrial-accent focus:outline-none transition-colors">
                        <option>Wybierz temat...</option>
                        <option>Wynajem Maszyn</option>
                        <option>Usługi Spawalnicze</option>
                        <option>Konserwacja UDT</option>
                        <option>Elektryka</option>
                        <option>Szkolenia</option>
                        <option>Inne</option>
                     </select>
                  </div>

                  <div>
                     <label className="block text-sm text-gray-400 mb-1">Wiadomość *</label>
                     <textarea rows={4} className="w-full bg-industrial-950 border border-gray-700 rounded p-3 text-white focus:border-industrial-accent focus:outline-none transition-colors" placeholder="Opisz, czego potrzebujesz..." required></textarea>
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                     <input type="checkbox" id="rodo" className="mt-1" required />
                     <label htmlFor="rodo" className="text-xs text-gray-500">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. *
                     </label>
                  </div>

                  <button type="submit" className="w-full bg-industrial-accent text-industrial-900 font-bold py-4 rounded hover:bg-industrial-accentHover transition-colors mt-4">
                     Wyślij zapytanie
                  </button>
               </form>
            </div>

          </div>

          {/* Map Placeholder */}
          <div className="mt-20 h-80 bg-industrial-900 rounded-xl border border-gray-800 flex items-center justify-center text-gray-500">
             [Mapa Google z lokalizacją firmy]
          </div>

        </div>
      </section>
    </>
  );
};
