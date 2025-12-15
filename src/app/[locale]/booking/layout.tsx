import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('booking.title'),
    description: t('booking.description'),
    alternates: {
      canonical: `https://seaphiya.com/${locale}/booking`,
      languages: {
        en: 'https://seaphiya.com/en/booking',
        es: 'https://seaphiya.com/es/booking',
      },
    },
    openGraph: {
      title: t('booking.title'),
      description: t('booking.description'),
      url: `https://seaphiya.com/${locale}/booking`,
      siteName: 'Seaphiya Tattoo',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
