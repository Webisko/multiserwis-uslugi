import { createContext, createElement, useContext, type ReactNode } from 'react';

export const defaultCompany = {
  name: 'Multiserwis Kutno',
  brand: {
    mark: 'MS',
    primary: 'MULTISERWIS',
    accent: 'KUTNO',
  },
  links: {
    basePath: '/multiserwis-uslugi',
    trainingSiteUrl: 'https://szkolenia-multiserwis.pl/',
  },
  address: {
    street: 'ul. Siemieradzkiego 18',
    postalCode: '99-300',
    city: 'Kutno',
  },
  phones: {
    services: {
      label: 'Usługi',
      value: '730 202 000',
      href: 'tel:+48730202000',
    },
    training: {
      label: 'Szkolenia',
      value: '730 101 000',
      href: 'tel:+48730101000',
    },
  },
  email: 'multiserwis.kutno@gmail.com',
  openingHours: {
    days: 'Poniedziałek - Piątek',
    details: '8:00 - 16:00',
  },
  emergencyNote: 'Serwis awaryjny 24/7 (dla stałych klientów)',
  map: {
    query: 'Multiserwis Kutno, ul. Siemieradzkiego 18, 99-300 Kutno',
    embedUrl:
      'https://www.google.com/maps?q=Multiserwis%20Kutno%2C%20ul.%20Siemieradzkiego%2018%2C%2099-300%20Kutno&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Multiserwis%20Kutno%2C%20ul.%20Siemieradzkiego%2018%2C%2099-300%20Kutno',
  },
} as const;

export type CompanyData = typeof defaultCompany;

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

type SiteSettingsProviderProps = {
  value?: CompanyData;
  children: ReactNode;
};

export function SiteSettingsProvider({ value, children }: SiteSettingsProviderProps) {
  return createElement(CompanyDataContext.Provider, { value: value ?? company }, children);
}

export function useCompanyData(): CompanyData {
  return useContext(CompanyDataContext);
}