import React from 'react';
import { PageHeader } from '../components/PageHeader';

export const TermsPage: React.FC = () => {
  return (
    <>
      <PageHeader
        title="Regulamin"
        subtitle="Zasady korzystania ze strony internetowej i kontaktu ofertowego."
        backgroundImage="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-4xl mx-auto bg-industrial-900 border border-gray-800 rounded-2xl p-8 md:p-10 space-y-8 text-gray-300 leading-relaxed">
            <div className="bg-industrial-800 border border-gray-700 rounded-lg p-4 text-sm text-gray-300">
              Wersja robocza. Treść wymaga finalnej akceptacji klienta i ewentualnej konsultacji prawnej.
            </div>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">1. Postanowienia ogólne</h2>
              <p>
                Strona ma charakter informacyjno-ofertowy i służy prezentacji usług firmy MULTISERWIS.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">2. Zakres informacji</h2>
              <p>
                Informacje publikowane na stronie nie stanowią oferty handlowej w rozumieniu Kodeksu cywilnego,
                a szczegółowe warunki współpracy ustalane są indywidualnie.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">3. Formularz kontaktowy</h2>
              <p>
                Użytkownik zobowiązuje się do podawania prawdziwych danych i niewysyłania treści bezprawnych.
                Odpowiedź na zapytanie następuje w możliwie najkrótszym terminie.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">4. Prawa autorskie</h2>
              <p>
                Treści, grafiki i materiały umieszczone na stronie podlegają ochronie prawnej i nie mogą być
                kopiowane bez zgody właściciela, z wyjątkiem dozwolonego użytku.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">5. Odpowiedzialność</h2>
              <p>
                Dokładamy należytej staranności, aby treści były aktualne, jednak zastrzegamy możliwość zmian
                i aktualizacji bez wcześniejszego powiadomienia.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-white mb-3">6. Kontakt</h2>
              <p>
                W sprawach formalnych skontaktuj się: multiserwis.kutno@gmail.com.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
