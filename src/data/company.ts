import { createContext, createElement, useContext, useEffect, useState, type ReactNode } from 'react';

export const defaultCompany = {
  name: 'Multiserwis Kutno',
  legalName: 'MULTISERWIS KUTNO SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
  nip: '7752676330',
  regon: '541108550',
  krs: '0001160280',
  shareCapital: '5 000,00 zł',
  brand: {
    mark: 'MS',
    primary: 'MULTISERWIS',
    accent: 'KUTNO',
  },
  links: {
    basePath: '/multiserwis-uslugi',
    trainingSiteUrl: 'https://multiserwis.edu.pl',
  },
  address: {
    street: 'ul. Przemysłowa 2',
    postalCode: '99-300',
    city: 'Kutno',
  },
  phones: {
    services: {
      label: 'Usługi',
      value: '730 101 000',
      href: 'tel:+48730101000',
      secondaryValue: '733 929 100',
      secondaryHref: 'tel:+48733929100',
    },
    training: {
      label: 'Szkolenia',
      value: '',
      href: '',
    },
  },
  email: 'biuro@multiserwis.tech',
  departmentEmails: {
    biuro: 'biuro@multiserwis.tech',
    wynajem: 'wynajem@multiserwis.tech',
    automatyka: 'automatyka@multiserwis.tech',
    technologia: 'technologia@multiserwis.tech',
    szkolenia: 'szkolenia@multiserwis.tech',
  },
  openingHours: {
    days: 'Poniedziałek – Piątek',
    details: '8:00 – 16:00',
  },
  emergencyNote: 'Serwis awaryjny 24/7 (dla stałych klientów)',
  map: {
    query: 'Multiserwis Kutno, ul. Przemysłowa 2, 99-300 Kutno',
    embedUrl:
      'https://www.google.com/maps?q=Multiserwis%20Kutno%2C%20ul.%20Przemys%C5%82owa%202%2C%2099-300%20Kutno&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Multiserwis%20Kutno%2C%20ul.%20Przemys%C5%82owa%202%2C%2099-300%20Kutno',
  },
} as const;

export type CompanyData = Omit<typeof defaultCompany, 'links'> & {
  links: {
    basePath: string;
    trainingSiteUrl: string;
  };
};

export type SiteSeoData = {
  defaultTitle: string;
  defaultDescription: string;
  siteName: string;
  ogImageUrl: string;
};

export type SiteSettingsData = {
  company: CompanyData;
  seo: SiteSeoData;
};

declare global {
  interface Window {
    __MULTISERWIS_SITE_SETTINGS__?: SiteSettingsData;
  }
}

export const company: CompanyData =
  typeof window !== 'undefined' && window.__MULTISERWIS_SITE_SETTINGS__?.company
    ? window.__MULTISERWIS_SITE_SETTINGS__.company
    : defaultCompany;

const CompanyDataContext = createContext<CompanyData>(company);

let cachedLiveCompany: CompanyData | null = null;
let liveCompanyPromise: Promise<CompanyData | null> | null = null;

function resolveEffectiveClientBasePath(fallback: string): string {
  const envBase = import.meta.env.PUBLIC_SITE_BASE_PATH?.trim();
  if (envBase !== undefined) {
    return envBase === '/' || envBase === '' ? '' : `/${envBase.replace(/^\/+|\/+$/g, '')}`;
  }
  if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/multiserwis-uslugi')) {
    return '';
  }
  return fallback === '/' ? '' : fallback;
}

export async function fetchLiveCompanyData(): Promise<CompanyData | null> {
  if (typeof window === 'undefined') {
    return null;
  }

  if (cachedLiveCompany) {
    return cachedLiveCompany;
  }

  if (liveCompanyPromise) {
    return liveCompanyPromise;
  }

  const apiUrl = import.meta.env.PUBLIC_SITE_SETTINGS_API_URL?.trim();
  if (!apiUrl) {
    return null;
  }

  liveCompanyPromise = fetch(apiUrl, { headers: { Accept: 'application/json' } })
    .then(async (res) => {
      if (!res.ok) return null;
      const json = (await res.json()) as { data?: { company?: CompanyData; seo?: SiteSeoData } };
      const apiCompany = json?.data?.company;
      if (!apiCompany || typeof apiCompany !== 'object') return null;
      const normalized: CompanyData = {
        ...apiCompany,
        links: {
          ...apiCompany.links,
          basePath: resolveEffectiveClientBasePath(apiCompany.links?.basePath ?? ''),
        },
      };
      cachedLiveCompany = normalized;
      if (window.__MULTISERWIS_SITE_SETTINGS__) {
        window.__MULTISERWIS_SITE_SETTINGS__.company = normalized;
      }
      window.dispatchEvent(new CustomEvent('multiserwis:company-updated', { detail: normalized }));
      return normalized;
    })
    .catch(() => null);

  return liveCompanyPromise;
}

export function useLiveCompanyData(initial?: CompanyData): CompanyData {
  const ctxCompany = useContext(CompanyDataContext);
  const [liveData, setLiveData] = useState<CompanyData>(
    () => cachedLiveCompany ?? initial ?? ctxCompany ?? company
  );

  useEffect(() => {
    const onUpdate = (event: Event) => {
      const detail = (event as CustomEvent<CompanyData>).detail;
      if (detail) {
        setLiveData(detail);
      }
    };

    window.addEventListener('multiserwis:company-updated', onUpdate);
    void fetchLiveCompanyData().then((fresh) => {
      if (fresh) {
        setLiveData(fresh);
      }
    });

    return () => window.removeEventListener('multiserwis:company-updated', onUpdate);
  }, []);

  return liveData;
}

type SiteSettingsProviderProps = {
  value?: CompanyData;
  children: ReactNode;
};

export function SiteSettingsProvider({ value, children }: SiteSettingsProviderProps) {
  const liveCompany = useLiveCompanyData(value);
  return createElement(CompanyDataContext.Provider, { value: liveCompany }, children);
}

export function useCompanyData(): CompanyData {
  return useLiveCompanyData();
}

export function getWhatsAppUrl(phoneHref?: string, fallbackValue?: string): string | null {
  const raw = (phoneHref || fallbackValue || '').replace(/tel:/, '').replace(/\D/g, '');

  if (!raw) {
    return null;
  }

  return `https://wa.me/${raw}`;
}
