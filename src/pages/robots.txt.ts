function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/$/, '');
}

function normalizeBasePath(basePath: string) {
  const trimmed = basePath.trim();

  if (!trimmed || trimmed === '/') {
    return '/';
  }

  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

function getSiteOrigin() {
  const siteEnvironment = import.meta.env.SITE_ENVIRONMENT?.trim() || 'preview';

  return normalizeSiteUrl(
    import.meta.env.PUBLIC_SITE_URL?.trim() ||
      (siteEnvironment === 'production' ? 'https://multiserwis.example.invalid' : 'https://webisko.github.io')
  );
}

function getBasePath() {
  const siteEnvironment = import.meta.env.SITE_ENVIRONMENT?.trim() || 'preview';

  return normalizeBasePath(
    import.meta.env.PUBLIC_SITE_BASE_PATH?.trim() || (siteEnvironment === 'production' ? '/' : '/multiserwis-uslugi')
  );
}

export function GET() {
  const siteOrigin = getSiteOrigin();
  const basePath = getBasePath();
  const sitemapPath = basePath === '/' ? '/sitemap-index.xml' : `${basePath}/sitemap-index.xml`;
  const sitemapUrl = new URL(sitemapPath, siteOrigin).toString();

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}