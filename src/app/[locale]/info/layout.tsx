import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('info.title'),
    description: t('info.description'),
    alternates: {
      canonical: `https://seaphiya.com/${locale}/info`,
      languages: {
        en: 'https://seaphiya.com/en/info',
        es: 'https://seaphiya.com/es/info',
      },
    },
    openGraph: {
      title: t('info.title'),
      description: t('info.description'),
      url: `https://seaphiya.com/${locale}/info`,
      siteName: 'Seaphiya Tattoo',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
