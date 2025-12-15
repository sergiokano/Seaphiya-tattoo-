import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';

// JSON-LD structured data for the business
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TattooParlor',
  name: 'Seaphiya Tattoo',
  image: 'https://seaphiya.com/og-image.jpg',
  description: 'Professional fine line and micro-realism tattoo artist specializing in botanical designs and minimalist art.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  priceRange: '$$',
  url: 'https://seaphiya.com',
  sameAs: [
    'https://instagram.com/seaphiya.tat',
  ],
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  return {
    alternates: {
      canonical: `https://seaphiya.com/${locale}`,
      languages: {
        en: 'https://seaphiya.com/en',
        es: 'https://seaphiya.com/es',
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  const messages = await getMessages();

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <NextIntlClientProvider messages={messages}>
        {/* Noise overlay */}
        <div className="fixed inset-0 z-[9999] pointer-events-none opacity-[0.07] mix-blend-overlay bg-noise bg-repeat" />

        {children}
      </NextIntlClientProvider>
    </>
  );
}
