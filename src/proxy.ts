import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match root path
    '/',
    // Match locale paths
    '/(en|es)',
    '/(en|es)/:path*',
    // Match all pathnames except for static files
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
