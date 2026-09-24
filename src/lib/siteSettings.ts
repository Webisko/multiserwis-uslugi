import { defaultCompany, type CompanyData, type SiteSeoData, type SiteSettingsData } from '../data/company';
import { readJsonSnapshot } from './previewSnapshots';

export function getEffectiveBasePath(fallbackPath: string = defaultCompany.links.basePath): string {
  const envBasePath = import.meta.env.PUBLIC_SITE_BASE_PATH?.trim();
  if (envBasePath !== undefined) {
    return envBasePath === '/' || envBasePath === '' ? '' : `/${envBasePath.replace(/^\/+|\/+$/g, '')}`;
  }
  const siteEnv = import.meta.env.SITE_ENVIRONMENT?.trim();
  if (siteEnv === 'production') {
    return '';
  }
  return fallbackPath === '/' ? '' : fallbackPath;
}

function resolveCompanyWithBasePath(company: CompanyData): CompanyData {
  return {
    ...company,
    links: {
      ...company.links,
      basePath: getEffectiveBasePath(company.links.basePath),
    },
  };
}

const defaultSeo: SiteSeoData = {
  defaultTitle: 'Multiserwis – Kompleksowe Usługi dla Przemysłu | Kutno',
  defaultDescription:
    'Kompleksowe usługi dla przemysłu: wynajem maszyn, relokacje linii, dozór UDT, spawalnictwo i elektryka. Szybka wycena w 24h. Sprawdź ofertę Multiserwis Kutno!',
  siteName: 'Multiserwis Kutno',
  ogImageUrl: `${getEffectiveBasePath(defaultCompany.links.basePath)}/og-image.png`,
};

function getSiteSettingsApiUrl() {
  return import.meta.env.SITE_SETTINGS_API_URL?.trim() || import.meta.env.PUBLIC_SITE_SETTINGS_API_URL?.trim();
}

const siteSettingsSnapshotPath = 'src/generated/site-settings.snapshot.json';

function isCompanyData(value: unknown): value is CompanyData {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'name' in value &&
      'links' in value &&
      'brand' in value &&
      'address' in value
  );
}

function isSeoData(value: unknown): value is SiteSeoData {
  return Boolean(
    value &&
      typeof value === 'object' &&
      'defaultTitle' in value &&
      'defaultDescription' in value &&
      'siteName' in value &&
      'ogImageUrl' in value
  );
}

export async function getSiteSettings(): Promise<SiteSettingsData | null> {
  const apiUrl = getSiteSettingsApiUrl();

  if (apiUrl) {
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const payload = (await response.json()) as { data?: unknown };
        const data = payload.data;

        if (data && typeof data === 'object') {
          const companyData = 'company' in data ? (data.company as unknown) : null;
          const seoData = 'seo' in data ? (data.seo as unknown) : null;

          if (isCompanyData(companyData) && isSeoData(seoData)) {
            return {
              company: resolveCompanyWithBasePath(companyData),
              seo: seoData,
            };
          }
        }
      }
    } catch {
      // Ignore API errors and try the static preview snapshot instead.
    }
  }

  const snapshot = await readJsonSnapshot<SiteSettingsData>(siteSettingsSnapshotPath);

  if (!snapshot) {
    return null;
  }

  return isCompanyData(snapshot.company) && isSeoData(snapshot.seo)
    ? {
        company: resolveCompanyWithBasePath(snapshot.company),
        seo: snapshot.seo,
      }
    : null;
}

export function getDefaultSeo(): SiteSeoData {
  return defaultSeo;
}