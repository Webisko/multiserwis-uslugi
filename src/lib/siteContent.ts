import { readJsonSnapshot } from './previewSnapshots';

export type FaqItemPayload = {
  id: string;
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  isFeatured: boolean;
};

export type FaqGroupPayload = {
  category: string;
  questions: Array<{
    id: string;
    q: string;
    a: string;
  }>;
};

export type ServiceOfferingPayload = {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: string[];
  pagePath?: string | null;
  contactLabel: string;
  training: {
    text: string;
    linkText: string;
  } | null;
  isFeatured: boolean;
  sortOrder: number;
};

export type PortfolioItemPayload = {
  id: string;
  slug: string;
  title: string;
  category: string;
  location?: string | null;
  description?: string | null;
  items: string[];
  imageUrl?: string | null;
  isFeatured: boolean;
  sortOrder: number;
};

export type SiteContentData = {
  faqs: {
    items: FaqItemPayload[];
    categories: string[];
    featuredGroups: FaqGroupPayload[];
  };
  services: {
    items: ServiceOfferingPayload[];
    contactOptions: string[];
  };
  portfolio: {
    items: PortfolioItemPayload[];
  };
};

const defaultFaqItems: FaqItemPayload[] = [
  {
    id: 'faq-1',
    question: 'Na jakim obszarze działacie?',
    answer:
      'Realizujemy zlecenia na terenie całej Polski oraz na obszarze Europy (w tym m.in. w Wielkiej Brytanii, gdzie regularnie prowadzimy projekty instalacyjne i relokacje maszyn).',
    category: 'Ogólne',
    sortOrder: 10,
    isFeatured: true,
  },
  {
    id: 'faq-2',
    question: 'Czy obsługujecie klientów indywidualnych?',
    answer:
      'Tak, obsługujemy zarówno duże zakłady przemysłowe i generalnych wykonawców, jak i mniejsze firmy oraz klientów indywidualnych.',
    category: 'Ogólne',
    sortOrder: 20,
    isFeatured: true,
  },
  {
    id: 'faq-3',
    question: 'Czy sprzęt można wynająć z operatorem?',
    answer:
      'Tak, podnośniki koszowe, żurawie samochodowe i ładowarki teleskopowe wynajmujemy z doświadczonym operatorem. Wózki widłowe udostępniamy również z operatorem na życzenie klienta.',
    category: 'Wynajem',
    sortOrder: 30,
    isFeatured: true,
  },
  {
    id: 'faq-4',
    question: 'Czy transport sprzętu jest w cenie?',
    answer:
      'Koszt transportu kalkulujemy indywidualnie w zależności od odległości, gabarytów maszyny i czasu trwania najmu.',
    category: 'Wynajem',
    sortOrder: 40,
    isFeatured: true,
  },
  {
    id: 'faq-5',
    question: 'Czy pomożecie w rejestracji urządzenia w UDT bez dokumentacji?',
    answer:
      'Tak. Oferujemy odtworzenie dokumentacji techniczno-ruchowej, wykonanie resursu i pełną obsługę formalną aż do uzyskania decyzji zezwalającej na eksploatację.',
    category: 'UDT',
    sortOrder: 50,
    isFeatured: true,
  },
  {
    id: 'faq-6',
    question: 'Jak często trzeba wykonywać przeglądy UDT?',
    answer:
      'Częstotliwość przeglądów konserwacyjnych i badań okresowych zależy od rodzaju urządzenia i jest ściśle określona przepisami UDT. Weryfikujemy harmonogram indywidualnie dla konkretnego typu maszyny i trybu jej eksploatacji.',
    category: 'UDT',
    sortOrder: 60,
    isFeatured: true,
  },
  {
    id: 'faq-7',
    question: 'Czy wykonujecie prace na czynnych obiektach?',
    answer:
      'Tak, specjalizujemy się w pracach na ruchu. Pracujemy również w systemie zmianowym lub podczas okien serwisowych, aby ograniczyć wpływ robót na ciągłość produkcji.',
    category: 'Elektryka i spawanie',
    sortOrder: 70,
    isFeatured: true,
  },
  {
    id: 'faq-8',
    question: 'Czy spawacie bezpośrednio u klienta?',
    answer:
      'Tak, dysponujemy mobilnym zapleczem spawalniczym i wykonujemy naprawy oraz montaże bezpośrednio na terenie zakładu klienta.',
    category: 'Elektryka i spawanie',
    sortOrder: 80,
    isFeatured: true,
  },
  {
    id: 'faq-9',
    question: 'Czy realizujecie relokacje tylko wewnątrz zakładu?',
    answer:
      'Nie. Obsługujemy zarówno przemieszczenia wewnątrzzakładowe, jak i relokacje całych linii do nowych lokalizacji w Polsce i za granicą, wraz z demontażem, transportem i rozruchem.',
    category: 'Relokacja',
    sortOrder: 90,
    isFeatured: false,
  },
  {
    id: 'faq-10',
    question: 'Czy wykonujecie prace hydrauliczne i montażowo-konstrukcyjne w czynnych zakładach?',
    answer:
      'Tak. Realizujemy modernizacje rurociągów, wymianę armatury przemysłowej, konstrukcje wsporcze i prace montażowe przy urządzeniach również na czynnych instalacjach.',
    category: 'Hydraulika i montaż',
    sortOrder: 100,
    isFeatured: false,
  },
  {
    id: 'faq-11',
    question: 'Jak szybko odpowiadacie na zapytania?',
    answer:
      'Odpowiadamy na zapytania w ciągu 24 godzin w dni robocze. W pilnych sprawach awaryjnych lub sprzętowych prosimy o bezpośredni kontakt telefoniczny.',
    category: 'Kontakt',
    sortOrder: 110,
    isFeatured: false,
  },
];

const defaultServiceItems: ServiceOfferingPayload[] = [
  {
    id: 'service-1',
    slug: 'wynajem',
    title: 'Wynajem maszyn i dźwigów',
    description: 'Własny park maszynowy dobierany do zadania, z obsługą operatorską dla żurawi i podnośników.',
    items: [
      'Podesty nożycowe do 18 m oraz podnośniki koszowe na pojeździe',
      'Żurawie samochodowe o udźwigu 35 t, 45 t, 60 t oraz 90 t',
      'Ładowarki teleskopowe i wózki widłowe',
      'Sprzęt specjalistyczny do relokacji (m.in. VersaLift)',
      'Osprzęt pomocniczy: trawersy, rolki transportowe, przedłużki wideł',
    ],
    pagePath: '/wynajem',
    contactLabel: 'Wynajem Maszyn',
    training: {
      text: 'Potrzebujesz uprawnień UDT na wózki, żurawie lub podesty?',
      linkText: 'Oferta szkoleń UDT',
    },
    isFeatured: true,
    sortOrder: 10,
  },
  {
    id: 'service-2',
    slug: 'relokacja',
    title: 'Relokacja maszyn i linii',
    description: 'Kompleksowe przenoszenie pojedynczych maszyn i całych linii technologicznych z własnym zapleczem dźwigowym.',
    items: [
      'Demontaż mechaniczny, elektryczny i odłączenie mediów',
      'Wyprowadzenie gabarytów z użyciem sprzętu VersaLift i rolek',
      'Załadunek dźwigowy i bezpieczny transport specjalistyczny',
      'Relokacje wewnątrzzakładowe oraz międzylokalizacyjne',
      'Ponowny montaż, kotwienie, poziomowanie i rozruch',
    ],
    pagePath: '/relokacja',
    contactLabel: 'Relokacja Maszyn',
    training: null,
    isFeatured: true,
    sortOrder: 20,
  },
  {
    id: 'service-3',
    slug: 'udt',
    title: 'Konserwacja, serwis i UDT',
    description: 'Pełna obsługa formalna, przeglądy konserwacyjne oraz diagnostyka i naprawa urządzeń transportu bliskiego.',
    items: [
      'Kompleksowa organizacja badań UDT i asysta inspektorska',
      'Rejestracja urządzeń oraz odtwarzanie dokumentacji i resursu',
      'Cykliczne przeglądy konserwacyjne i prowadzenie dzienników',
      'Diagnostyka i naprawa układów hydrauliki siłowej oraz sterowania',
      'Usuwanie awarii, regeneracja siłowników i wymiana podzespołów',
    ],
    pagePath: '/udt',
    contactLabel: 'Konserwacja i UDT',
    training: {
      text: 'Szkolimy operatorów i konserwatorów urządzeń UDT oraz IMBiGS.',
      linkText: 'Szkolenia UDT',
    },
    isFeatured: true,
    sortOrder: 30,
  },
  {
    id: 'service-4',
    slug: 'spawanie',
    title: 'Usługi spawalnicze i konstrukcje',
    description: 'Prefabrykacja i montaż konstrukcji stalowych oraz mobilne naprawy spawalnicze bezpośrednio na zakładzie.',
    items: [
      'Naprawy maszyn, zbiorników, silosów, rurociągów i kontenerów',
      'Antresole magazynowe, podesty serwisowe, hale i wiaty',
      'Suwnice, belki podsuwnicowe, uchwyty, ramy i wsporniki',
      'Konstrukcje pod wentylatory, kanały, rurociągi i zabudowy akustyczne',
      'Spawanie metodami TIG, MIG/MAG i MMA wszystkich gatunków stali',
    ],
    pagePath: '/spawanie',
    contactLabel: 'Usługi Spawalnicze',
    training: {
      text: 'Prowadzimy certyfikowane kursy spawalnicze TIG, MIG/MAG i MMA.',
      linkText: 'Kursy spawalnicze',
    },
    isFeatured: true,
    sortOrder: 40,
  },
  {
    id: 'service-5',
    slug: 'budownictwo',
    title: 'Hydraulika i montaż przemysłowy',
    description: 'Instalacje rurociągowe, wymiana armatury przemysłowej i konstrukcje wsporcze pod nowe urządzenia.',
    items: [
      'Modernizacja i naprawa rurociągów spawanych, zgrzewanych i skręcanych',
      'Montaż konstrukcji wsporczych i tras rurociągowych',
      'Wymiana armatury przemysłowej (zawory, zasuwy, przepustnice)',
      'Konstrukcje stalowe pod maszyny, pompy i wentylatory',
      'Przebudowy instalacji i izolacje termiczne na czynnych obiektach',
    ],
    pagePath: '/budownictwo',
    contactLabel: 'Hydraulika i Montaż',
    training: null,
    isFeatured: true,
    sortOrder: 50,
  },
  {
    id: 'service-6',
    slug: 'elektryka',
    title: 'Usługi elektryczne i AKPiA',
    description: 'Uruchomienia, pomiary odbiorcze i okresowe oraz wykonawstwo instalacji nn, SN i WN na czynnych obiektach.',
    items: [
      'Pomiary transformatorów, silników, kabli i ochrony przeciwporażeniowej',
      'Testy, parametryzacja i uruchomienia rozdzielnic nn oraz SN',
      'Integracja automatyki: Profibus, Profinet, Modbus, IEC 61850',
      'Montaż tras kablowych, oświetlenia i instalacji odgromowych',
      'Kompletne protokoły pomiarowe i dokumentacja powykonawcza',
    ],
    pagePath: '/elektryka',
    contactLabel: 'Usługi Elektryczne',
    training: {
      text: 'Organizujemy kursy i egzaminy energetyczne SEP G1, G2 i G3.',
      linkText: 'Szkolenia SEP',
    },
    isFeatured: true,
    sortOrder: 60,
  },
];

const defaultPortfolioItems: PortfolioItemPayload[] = [
  {
    id: 'portfolio-1',
    slug: 'wynajem-zurawi-i-podestow-przemyslowych',
    title: 'Wynajem maszyn i sprzętu dźwigowego',
    category: 'Wynajem maszyn',
    location: 'Kutno i centralna Polska',
    description:
      'Obsługa dźwigowa i podnośnikowa prac montażowych oraz serwisowych na czynnych zakładach przemysłowych.',
    items: [
      'Projekty wsparcia prac na wysokości i transportu ciężkiego',
      'Wynajem żurawi samochodowych (35 t – 90 t) i podestów z operatorem',
      'Podesty nożycowe i przegubowe do prac instalacyjnych na halach',
    ],
    imageUrl: null,
    isFeatured: true,
    sortOrder: 10,
  },
  {
    id: 'portfolio-2',
    slug: 'relokacja-linii-i-maszyn-produkcyjnych',
    title: 'Relokacje maszyn i linii produkcyjnych',
    category: 'Relokacja maszyn',
    location: 'Zakłady produkcyjne (Polska i Europa)',
    description:
      'Kompleksowe przeniesienie parku maszynowego z zachowaniem ciągłości technologicznej zakładu.',
    items: [
      'Demontaż, transport specjalistyczny i ponowny montaż urządzeń',
      'Wprowadzanie gabarytów na halę z użyciem sprzętu VersaLift i rolek',
      'Poziomowanie, podłączenie mediów i uruchomienia po relokacji',
    ],
    imageUrl: null,
    isFeatured: true,
    sortOrder: 20,
  },
  {
    id: 'portfolio-3',
    slug: 'konserwacja-i-odbiory-udt',
    title: 'Obsługa UDT i przeglądy konserwacyjne',
    category: 'UDT i serwis',
    location: 'Woj. łódzkie i mazowieckie',
    description:
      'Stały nadzór konserwatorski nad flotą wózków, podestów ruchomych i suwnic wraz z udziałem w badaniach UDT.',
    items: [
      'Kompleksowa obsługa formalna rejestracji urządzeń w UDT',
      'Okresowe przeglądy konserwacyjne i wpisy do dzienników konserwacji',
      'Przygotowanie techniczne maszyn i asysta podczas odbiorów inspektorskich',
    ],
    imageUrl: null,
    isFeatured: true,
    sortOrder: 30,
  },
  {
    id: 'portfolio-4',
    slug: 'spawalnictwo-i-konstrukcje-stalowe',
    title: 'Spawalnictwo i konstrukcje przemysłowe',
    category: 'Spawalnictwo i montaż',
    location: 'Obiekty przemysłowe i logistyczne',
    description:
      'Prefabrykacja oraz montaż konstrukcji stalowych, podestów obsługowych i rurociągów technologicznych.',
    items: [
      'Naprawy bieżące i modernizacje elementów stalowych na zakładach',
      'Wykonawstwo konstrukcji wsporczych, suwnic, antresol i barier ochronnych',
      'Spawanie rurociągów i zbiorników metodami TIG oraz MIG/MAG',
    ],
    imageUrl: null,
    isFeatured: true,
    sortOrder: 40,
  },
];

const siteContentSnapshotPath = 'src/generated/site-content.snapshot.json';

function buildFeaturedGroups(items: FaqItemPayload[]): FaqGroupPayload[] {
  return items
    .filter((item) => item.isFeatured)
    .reduce<FaqGroupPayload[]>((groups, item) => {
      const existingGroup = groups.find((group) => group.category === item.category);

      if (existingGroup) {
        existingGroup.questions.push({
          id: item.id,
          q: item.question,
          a: item.answer,
        });
        return groups;
      }

      groups.push({
        category: item.category,
        questions: [
          {
            id: item.id,
            q: item.question,
            a: item.answer,
          },
        ],
      });

      return groups;
    }, []);
}

function buildDefaultContent(): SiteContentData {
  const categories = ['Wszystkie', ...Array.from(new Set(defaultFaqItems.map((item) => item.category)))];
  const contactOptions = [...defaultServiceItems.map((item) => item.contactLabel), 'Szkolenia', 'Inne'];

  return {
    faqs: {
      items: defaultFaqItems,
      categories,
      featuredGroups: buildFeaturedGroups(defaultFaqItems),
    },
    services: {
      items: defaultServiceItems,
      contactOptions,
    },
    portfolio: {
      items: defaultPortfolioItems,
    },
  };
}

function getFaqsApiUrl() {
  return import.meta.env.FAQS_API_URL?.trim() || import.meta.env.PUBLIC_FAQS_API_URL?.trim();
}

function getServiceOfferingsApiUrl() {
  return (
    import.meta.env.SERVICE_OFFERINGS_API_URL?.trim() ||
    import.meta.env.PUBLIC_SERVICE_OFFERINGS_API_URL?.trim()
  );
}

function getPortfolioItemsApiUrl() {
  return (
    import.meta.env.PORTFOLIO_ITEMS_API_URL?.trim() ||
    import.meta.env.PUBLIC_PORTFOLIO_ITEMS_API_URL?.trim()
  );
}

function isFaqItemPayload(value: unknown): value is FaqItemPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'question' in value &&
      'answer' in value &&
      'category' in value
  );
}

function isFaqGroupPayload(value: unknown): value is FaqGroupPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'category' in value &&
      'questions' in value &&
      Array.isArray((value as FaqGroupPayload).questions)
  );
}

function isServiceOfferingPayload(value: unknown): value is ServiceOfferingPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'slug' in value &&
      'title' in value &&
      'items' in value &&
      Array.isArray((value as ServiceOfferingPayload).items)
  );
}

function isPortfolioItemPayload(value: unknown): value is PortfolioItemPayload {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'id' in value &&
      'title' in value &&
      'items' in value &&
      Array.isArray((value as PortfolioItemPayload).items)
  );
}

async function fetchJson(url: string | undefined): Promise<{ data?: unknown } | null> {
  if (!url) {
    return null;
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as { data?: unknown };
  } catch {
    return null;
  }
}

function normalizeFaqContent(payload: { data?: unknown } | null, allowEmpty = false): SiteContentData['faqs'] | null {
  const data = payload?.data;

  if (!data || typeof data !== 'object' || !('items' in data) || !Array.isArray(data.items)) {
    return null;
  }

  const items = data.items.filter(isFaqItemPayload);

  if (!allowEmpty && items.length === 0) {
    return null;
  }

  const rawCategories =
    'categories' in data && Array.isArray(data.categories)
      ? data.categories.filter((category): category is string => typeof category === 'string' && category.trim().length > 0)
      : items.map((item) => item.category);

  const categories = ['Wszystkie', ...Array.from(new Set(rawCategories.filter((cat) => cat !== 'Wszystkie')))];

  const featuredGroups =
    'featuredGroups' in data && Array.isArray(data.featuredGroups)
      ? data.featuredGroups.filter(isFaqGroupPayload)
      : buildFeaturedGroups(items);

  return {
    items,
    categories,
    featuredGroups,
  };
}

function normalizeServiceContent(payload: { data?: unknown } | null, allowEmpty = false): SiteContentData['services'] | null {
  const data = payload?.data;

  if (!data || typeof data !== 'object' || !('items' in data) || !Array.isArray(data.items)) {
    return null;
  }

  const items = data.items.filter(isServiceOfferingPayload);

  if (!allowEmpty && items.length === 0) {
    return null;
  }

  const contactOptions =
    'contactOptions' in data && Array.isArray(data.contactOptions)
      ? data.contactOptions.filter((option): option is string => typeof option === 'string' && option.length > 0)
      : [...items.map((item) => item.contactLabel), 'Szkolenia', 'Inne'];

  return {
    items,
    contactOptions,
  };
}

function normalizePortfolioContent(
  payload: { data?: unknown } | null,
  allowEmpty = false
): SiteContentData['portfolio'] | null {
  const data = payload?.data;

  if (!data || typeof data !== 'object' || !('items' in data) || !Array.isArray(data.items)) {
    return null;
  }

  const items = data.items.filter(isPortfolioItemPayload);

  if (!allowEmpty && items.length === 0) {
    return null;
  }

  return { items };
}

export async function fetchLiveFaqs(): Promise<SiteContentData['faqs'] | null> {
  const payload = await fetchJson(import.meta.env.PUBLIC_FAQS_API_URL?.trim());
  return normalizeFaqContent(payload, true);
}

export async function fetchLiveServices(): Promise<SiteContentData['services'] | null> {
  const payload = await fetchJson(import.meta.env.PUBLIC_SERVICE_OFFERINGS_API_URL?.trim());
  return normalizeServiceContent(payload, true);
}

export async function fetchLivePortfolioItems(): Promise<SiteContentData['portfolio'] | null> {
  const payload = await fetchJson(import.meta.env.PUBLIC_PORTFOLIO_ITEMS_API_URL?.trim());
  return normalizePortfolioContent(payload, true);
}

export async function getSiteContent(): Promise<SiteContentData> {
  const fallback = buildDefaultContent();

  const [faqPayload, servicePayload, portfolioPayload] = await Promise.all([
    fetchJson(getFaqsApiUrl()),
    fetchJson(getServiceOfferingsApiUrl()),
    fetchJson(getPortfolioItemsApiUrl()),
  ]);

  const snapshot = await readJsonSnapshot<SiteContentData>(siteContentSnapshotPath);
  const snapshotFaqs = normalizeFaqContent(snapshot ? { data: snapshot.faqs } : null);
  const snapshotServices = normalizeServiceContent(snapshot ? { data: snapshot.services } : null);
  const snapshotPortfolio = normalizePortfolioContent(snapshot ? { data: snapshot.portfolio } : null);

  return {
    faqs: normalizeFaqContent(faqPayload, true) ?? snapshotFaqs ?? fallback.faqs,
    services: normalizeServiceContent(servicePayload, true) ?? snapshotServices ?? fallback.services,
    portfolio: normalizePortfolioContent(portfolioPayload, true) ?? snapshotPortfolio ?? fallback.portfolio,
  };
}

export function getDefaultSiteContent(): SiteContentData {
  return buildDefaultContent();
}
