import type { Metadata } from 'next';
import { Inter, Playfair_Display, Manrope, Kalam } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-kalam',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seaphiya.com'),
  title: {
    default: 'Seaphiya | Fine Line Tattoo Artist',
    template: '%s | Seaphiya Tattoo',
  },
  description: 'Professional fine line and micro-realism tattoo artist in Miami, FL.',
  keywords: ['tattoo', 'fine line', 'micro realism', 'Miami tattoo artist', 'botanical tattoo'],
  authors: [{ name: 'Seaphiya' }],
  creator: 'Seaphiya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'es_ES',
    url: 'https://seaphiya.com',
    siteName: 'Seaphiya Tattoo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Seaphiya - Fine Line Tattoo Artist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@seaphiya',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${manrope.variable} ${kalam.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
