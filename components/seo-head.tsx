import Head from 'next/head';

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
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | PermitAI`;
  const fullUrl = url ? `https://permitai.co${url}` : 'https://permitai.co';
  const keywordsStr = keywords.length > 0 ? keywords.join(', ') : 'permits, AI, building permits, permit applications, construction, contractor, homeowner';

  return (
    <Head>
      <title key="title">{fullTitle}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywordsStr} key="keywords" />
      <link rel="canonical" href={fullUrl} key="canonical" />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:url" content={fullUrl} key="og:url" />
      <meta property="og:title" content={fullTitle} key="og:title" />
      <meta property="og:description" content={description} key="og:description" />
      <meta property="og:image" content={image} key="og:image" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="PermitAI" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
      <meta name="twitter:url" content={fullUrl} key="twitter:url" />
      <meta name="twitter:title" content={fullTitle} key="twitter:title" />
      <meta name="twitter:description" content={description} key="twitter:description" />
      <meta name="twitter:image" content={image} key="twitter:image" />
      
      {/* Additional SEO */}
      <meta name="author" content="PermitAI" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </Head>
  );
}
