'use client';

import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'PermitAI - AI-Powered Permit Applications | Cut Permit Time by 80%';
const DEFAULT_DESCRIPTION = 'AI that reads local codes, drafts applications, and checks compliance before you submit. Cut permit time from 15 hours to 15 minutes. 92% first-pass approval rate.';
const DEFAULT_IMAGE = 'https://permitai.co/og-image.png';

export default function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  keywords = [],
  noIndex = false,
}: SEOHeadProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const fullTitle = title === DEFAULT_TITLE ? title : `${title} | PermitAI`;
    const fullUrl = url ? `https://permitai.co${url}` : 'https://permitai.co';
    const keywordsStr = keywords.length > 0 ? keywords.join(', ') : 'permits, AI, building permits, permit applications, construction, contractor, homeowner';

    // Update title
    document.title = fullTitle;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, isProperty = false) => {
      let meta = document.querySelector(`meta[${isProperty ? 'property' : 'name'}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(isProperty ? 'property' : 'name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic SEO
    updateMeta('description', description);
    updateMeta('keywords', keywordsStr);
    updateMeta('author', 'PermitAI');
    updateMeta('viewport', 'width=device-width, initial-scale=1');
    
    if (noIndex) {
      updateMeta('robots', 'noindex, nofollow');
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) robotsMeta.remove();
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Open Graph
    updateMeta('og:type', type, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:title', fullTitle, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', image, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:site_name', 'PermitAI', true);
    updateMeta('og:locale', 'en_US', true);

    // Twitter
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:url', fullUrl);
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);

    // Favicon
    if (!document.querySelector('link[rel="icon"]')) {
      const favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      favicon.setAttribute('href', '/favicon.ico');
      document.head.appendChild(favicon);
    }

    // Structured Data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'PermitAI',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: description,
      offers: [
        {
          '@type': 'Offer',
          name: 'DIY Homeowner',
          price: '9.99',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
        },
        {
          '@type': 'Offer',
          name: 'Solo Contractor',
          price: '49',
          priceCurrency: 'USD',
          billingIncrement: 'P1M',
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        ratingCount: '240',
      },
    });
    document.head.appendChild(script);
  }, [title, description, image, url, type, keywords.join(','), noIndex]);

  return null;
}
