import React from 'react';
import { PageHeader } from '../components/PageHeader';
import { company } from '../data/company';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <PageHeader
        badge="Dokumenty formalne"
        title="Polityka prywatności"
        subtitle="Informacje o przetwarzaniu danych osobowych i zasadach korzystania ze strony."
        backgroundImage="/images/page-headers/legal-header.webp"
      />

      <section className="page-section">
        <div className="page-container">
          <div className="max-w-4xl mx-auto bg-industrial-900 border border-gray-800 rounded-2xl p-8 md:p-10 space-y-8 text-gray-300 leading-relaxed">
            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">1. Administrator danych</h2>
              <p>
                Administratorem danych osobowych jest {company.name}, {company.address.street}, {company.address.postalCode} {company.address.city},
                e-mail: <a href={`mailto:${company.email}`} className="text-brand-yellow hover:underline">{company.email}</a>,
                tel.: <a href={company.phones.services.href} className="text-brand-yellow hover:underline">{company.phones.services.value}</a>.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">2. Zakres i cel przetwarzania</h2>
              <p>
                Dane przekazane poprzez formularz kontaktowy lub bezpośredni kontakt telefoniczny i mailowy przetwarzamy w celu obsługi zapytania ofertowego,
                przygotowania wyceny usług technicznych oraz prowadzenia korespondencji handlowej B2B.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">3. Podstawa prawna</h2>
              <p>
                Podstawą przetwarzania danych osobowych jest zgoda użytkownika (art. 6 ust. 1 lit. a RODO), podjęcie działań przed zawarciem umowy na żądanie osoby, której dane dotyczą (art. 6 ust. 1 lit. b RODO) oraz prawnie uzasadniony interes administratora polegający na obsłudze zapytań i dochodzeniu roszczeń (art. 6 ust. 1 lit. f RODO).
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">4. Okres przechowywania danych</h2>
              <p>
                Dane przechowujemy przez okres niezbędny do obsługi zapytania i prowadzenia negocjacji handlowych, a w przypadku zawarcia umowy – przez okres jej realizacji oraz czas wynikający z obowiązujących przepisów podatkowych i rachunkowych.
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">5. Prawa użytkownika</h2>
              <p>
                Każdej osobie, której dane dotyczą, przysługuje prawo dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
                przenoszenia danych, wniesienia sprzeciwu wobec przetwarzania oraz wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (PUODO).
              </p>
            </article>

            <article>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">6. Kontakt w sprawach RODO</h2>
              <p>
                W sprawach dotyczących ochrony danych osobowych prosimy o kontakt pod adresem e-mail:{' '}
                <a href={`mailto:${company.email}`} className="text-brand-yellow hover:underline">{company.email}</a>.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
