import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Langues supportées avec leurs configurations
const supportedLocales = ['fr', 'en'];
const defaultLocale = 'fr';

// Configuration des langues avec leurs propriétés
const localeConfig = {
  fr: { name: 'Français', dir: 'ltr', isRTL: false },
  en: { name: 'English', dir: 'ltr', isRTL: false }
};

// Liste des préfixes d'assets statiques à exclure de la redirection multilingue
const staticAssetPaths = [
  '/icons',
  '/test-languages',
  '/images',
  '/screenshots',
  '/videos',
  '/uploads',
  '/_next/static',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/manifest.json',
];

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // ==============================
  // 🔐 PROTECTION DES ROUTES ADMIN
  // ==============================
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    const token = request.cookies.get('admin_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key');
      const { payload } = await jwtVerify(token, secret, {
        issuer: 'dev-universal',
        audience: 'dev-universal-admin',
      });
    } catch (error) {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  // ==============================
  // 🚫 EXCLUSION DES ASSETS STATIQUES DE LA REDIRECTION MULTILINGUE
  // ==============================
  const isStaticAsset = staticAssetPaths.some(path => pathname.startsWith(path));
  if (isStaticAsset) {
    return NextResponse.next(); // Ne fait rien, laisse Next.js servir le fichier directement
  }

  // ==============================
  // 🌐 GESTION MULTILINGUE
  // ==============================
  const pathnameIsApiOrAdmin = pathname.startsWith('/api') || pathname.startsWith('/admin');
  const pathnameHasLocale = supportedLocales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameIsApiOrAdmin && !pathnameHasLocale) {
    const acceptLanguage = request.headers.get('accept-language');
    let preferredLocale = defaultLocale;
    if (acceptLanguage) {
      const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
      for (const lang of languages) {
        const code = lang.split('-')[0];
        if (supportedLocales.includes(code)) {
          preferredLocale = code;
          break;
        }
      }
    }
    return NextResponse.redirect(new URL(`/${preferredLocale}${pathname}`, request.url));
  }

  // ==============================
  // 🛡️ HEADERS DE SÉCURITÉ ET GESTION DU THÈME
  // ==============================
  const response = NextResponse.next();

  const theme = request.cookies.get('theme')?.value || 'light';
  if (theme === 'dark') {
    response.headers.set('X-Theme', 'dark');
  }
  response.cookies.set('theme', theme, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 365 * 24 * 60 * 60,
    path: '/',
  });

  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  // ==============================
  // 🗃️ CACHE POUR ASSETS STATIQUES
  // ==============================
  if (
    pathname.startsWith('/uploads') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/icons') ||
    /\.(png|jpg|jpeg|gif|webp|mp4|webm|ico|svg|css|js)$/i.test(pathname)
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // ==============================
  // 🍪 COOKIE DE LANGUE ET DIRECTION DU TEXTE
  // ==============================
  const currentLocale = supportedLocales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (currentLocale) {
    // Cookie de langue
    response.cookies.set('NEXT_LOCALE', currentLocale, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 365 * 24 * 60 * 60,
      path: '/',
    });

    // Cookie de direction du texte (pour le support RTL/LTR)
    const localeInfo = localeConfig[currentLocale];
    if (localeInfo) {
      response.cookies.set('TEXT_DIRECTION', localeInfo.dir, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60,
        path: '/',
      });

      // Header pour la direction du texte (utile pour les composants serveur)
      response.headers.set('X-Text-Direction', localeInfo.dir);
      response.headers.set('X-Is-RTL', localeInfo.isRTL.toString());
    }
  }

  // ==============================
  // 📱 HEADERS POUR LE SUPPORT MULTILINGUE
  // ==============================
  // Ajouter les langues supportées dans les headers pour les composants
  response.headers.set('X-Supported-Locales', JSON.stringify(supportedLocales));
  response.headers.set('X-Default-Locale', defaultLocale);

  // Headers pour les propriétés des langues (encodage pour éviter les problèmes Unicode)
  try {
    // Créer une version simplifiée de la configuration pour les headers
    const simpleLocaleConfig = {
      fr: { name: 'Francais', dir: 'ltr', isRTL: false },
      en: { name: 'English', dir: 'ltr', isRTL: false }
    };

    response.headers.set('X-Simple-Locale-Config', JSON.stringify(simpleLocaleConfig));
    response.headers.set('X-Full-Locale-Config', 'available-in-component');
  } catch (error) {
    console.warn('Erreur configuration locale:', error);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};
