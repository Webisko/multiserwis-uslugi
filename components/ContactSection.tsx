import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
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
                  <a href="tel:+48123456789" className="text-2xl md:text-3xl font-display font-bold text-white hover:text-industrial-accent transition-colors">
                    +48 123 456 789
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
                  <a href="mailto:kontakt@industrialpro.pl" className="text-xl md:text-2xl text-white hover:text-industrial-accent transition-colors">
                    kontakt@industrialpro.pl
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-industrial-900 rounded-2xl flex items-center justify-center text-industrial-accent shrink-0 border border-gray-700">
                  <Clock size={32} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl md:text-2xl mb-1">Godziny pracy</h3>
                  <p className="text-gray-400 text-lg">Poniedziałek - Piątek: 7:00 - 17:00</p>
                  <p className="text-gray-400 text-lg">Serwis awaryjny 24/7 (dla stałych klientów)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form - Wariant A (Universal) */}
          <div className="bg-industrial-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-700">
            <h3 className="text-3xl font-display font-bold text-white mb-8">Formularz kontaktowy</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-400 mb-2">Imię i Nazwisko *</label>
                  <input required type="text" className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors" placeholder="Jan Kowalski" />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-400 mb-2">Firma (opcjonalnie)</label>
                  <input type="text" className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors" placeholder="Nazwa firmy" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-400 mb-2">Telefon *</label>
                  <input required type="tel" className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors" placeholder="+48 ..." />
                </div>
                <div>
                  <label className="block text-base font-medium text-gray-400 mb-2">E-mail *</label>
                  <input required type="email" className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors" placeholder="email@firma.pl" />
                </div>
              </div>
              
              <div>
                <label className="block text-base font-medium text-gray-400 mb-2">Interesująca usługa</label>
                <select className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors">
                  <option>Wynajem maszyn i sprzętu</option>
                  <option>Usługi spawalnicze</option>
                  <option>Relokacja maszyn</option>
                  <option>Konserwacja i UDT</option>
                  <option>Usługi elektryczne</option>
                  <option>Remonty budowlane</option>
                  <option>Szkolenia (UDT, SEP, inne)</option>
                  <option>Inne</option>
                </select>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-400 mb-2">Wiadomość *</label>
                <textarea required rows={4} className="w-full bg-industrial-800 border border-gray-700 rounded-lg p-4 text-white text-lg focus:outline-none focus:border-industrial-accent transition-colors" placeholder="Opisz swoje potrzeby, termin, lokalizację..."></textarea>
              </div>

              <div className="flex items-start gap-3">
                 <input type="checkbox" required id="rodo" className="mt-1.5 w-5 h-5 accent-industrial-accent rounded" />
                 <label htmlFor="rodo" className="text-sm text-gray-500 leading-snug">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu obsługi zapytania. (Wymagane)
                 </label>
              </div>

              <button className="w-full bg-industrial-accent text-industrial-900 font-bold py-5 rounded-lg hover:bg-industrial-accentHover transition-colors uppercase tracking-wide text-xl mt-4 shadow-lg hover:shadow-xl">
                Wyślij Zapytanie
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};