# Migración a Next.js 16 - Investigación y Plan SEO

> Documento de análisis técnico para la migración de Seaphiya Tattoo de React+Vite a Next.js 16
> Fecha: Diciembre 2025

---

## ⚠️ ALERTA DE SEGURIDAD - CVE-2025-66478

> **Actualizado: 11 Diciembre 2025**

Una vulnerabilidad crítica (CVSS 10.0) afecta a React Server Components y Next.js App Router.

| CVE | Componente | Severidad |
|-----|------------|-----------|
| CVE-2025-55182 | React Server Components | Crítica (10.0) |
| CVE-2025-66478 | Next.js App Router | Crítica (10.0) |

### Versión segura a usar
```
Next.js 16.0.7 ✅ (parcheado)
```

### Referencias
- [Next.js Security Advisory](https://nextjs.org/blog/CVE-2025-66478)
- [AWS Security Blog - Explotación activa](https://aws.amazon.com/blogs/security/china-nexus-cyber-threat-groups-rapidly-exploit-react2shell-vulnerability-cve-2025-55182/)

**IMPORTANTE**: Después de deploy, rotar todos los secrets y variables de entorno.

---

## Resumen Ejecutivo

### Situación Actual
- **Stack**: React 19 + Vite 6 + TypeScript
- **Routing**: Estado interno de React (no URLs reales)
- **SEO**: Limitado (SPA sin SSR/SSG)
- **i18n**: react-i18next

### Recomendación
**Sí, migrar a Next.js 16.0.7** (versión parcheada) es la decisión correcta para este proyecto por razones de SEO, performance y escalabilidad.

### Complejidad Estimada
**Media-Baja** - El proyecto es relativamente pequeño y las librerías principales son compatibles.

---

## 1. Análisis: ¿Por qué Next.js para SEO?

### 1.1 Problemas del Stack Actual (React + Vite SPA)

| Problema | Impacto SEO |
|----------|-------------|
| No hay URLs reales | Google no puede indexar páginas individuales |
| Sin SSR/SSG | Contenido depende de JavaScript para renderizar |
| Sin meta tags dinámicos | Cada página comparte los mismos meta tags |
| Sin sitemap automático | Requiere generación manual |
| Sin Open Graph dinámico | Links compartidos no muestran preview correcto |

### 1.2 Beneficios de Next.js 16 para SEO

Según [FocusReactive](https://focusreactive.com/how-nextjs-can-improve-seo/), un estudio de 2025 reveló que **89% de equipos usando Next.js cumplieron los Core Web Vitals de Google en su primer deploy**.

| Feature | Beneficio SEO |
|---------|---------------|
| **SSR/SSG** | HTML completo para crawlers |
| **Metadata API** | Meta tags dinámicos por página |
| **Image Optimization** | Core Web Vitals (LCP) |
| **Automatic Code Splitting** | Mejor TTI y FCP |
| **Sitemap Generation** | Indexación automática |
| **JSON-LD Support** | Structured data para rich snippets |

### 1.3 Caso Específico: Portfolio de Tatuajes

Para un portfolio de artista de tatuajes, el SEO es **CRÍTICO**:

```
Búsquedas objetivo:
├── "tatuador fine line Miami" → Home
├── "cuidados post tatuaje" → /info (contenido indexable)
├── "tatuajes minimalistas portfolio" → /work
└── "reservar cita tatuaje Miami" → /booking
```

**Sin Next.js**: Google ve una página vacía hasta que ejecuta JavaScript.
**Con Next.js**: Google recibe HTML completo con contenido indexable.

---

## 2. Next.js 16 vs 15: ¿Cuál Usar?

### 2.1 Estado Actual (Diciembre 2025)

Según la [documentación oficial de Next.js](https://nextjs.org/blog/next-16):

| Versión | Estado | Recomendación |
|---------|--------|---------------|
| Next.js 15 | Estable, maduro | ✅ Opción segura |
| Next.js 16 | Estable, reciente | ✅ Recomendado para nuevos proyectos |

### 2.2 Novedades de Next.js 16 Relevantes

Basado en [análisis comparativo](https://javascript.plainenglish.io/next-js-15-vs-next-js-16-the-real-differences-developers-should-know-f6f5fa97cead):

1. **Turbopack por defecto**: Bundler más rápido (antes era opcional)
2. **Cache Components**: Nuevo modelo de programación con PPR (Partial Pre-Rendering)
3. **Async Request APIs**: APIs completamente asíncronas (breaking change desde v15)
4. **proxy.ts**: Reemplaza middleware.ts para mejor control de red

### 2.3 Decisión

**Usar Next.js 16** porque:
- Es un proyecto nuevo (no hay legacy)
- Aprovechamos Turbopack desde el inicio
- Mejor preparación para el futuro
- La documentación ya está actualizada

---

## 3. Compatibilidad de Librerías Actuales

### 3.1 Framer Motion

Según [análisis de compatibilidad](https://staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js):

| Estado | Notas |
|--------|-------|
| ✅ Compatible | Requiere `"use client"` en componentes animados |

**Cambios necesarios:**
```tsx
// Antes (Vite)
import { motion } from 'framer-motion';

// Después (Next.js 16)
"use client";
import { motion } from 'motion/react';  // Nuevo path de import
```

**Estrategia:**
- Crear wrapper components para animaciones
- Marcar como Client Components
- Server Components pueden importar los wrappers

### 3.2 Lenis Smooth Scroll

Según [discusiones de GitHub](https://github.com/darkroomengineering/lenis/discussions/412):

| Estado | Notas |
|--------|-------|
| ✅ Compatible | Desde v1.1.14, `lenis/react` no requiere `"use client"` |

**Cambios necesarios:**
```tsx
// layout.tsx
import { ReactLenis } from 'lenis/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReactLenis root>
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
```

**Consideraciones:**
- Posible issue con navegación: si Lenis no ha parado, la siguiente página puede empezar scrolleada
- Solución: resetear scroll en navegación

### 3.3 Internacionalización (i18n)

Según [comparativa 2025](https://intlayer.org/blog/next-i18next-vs-next-intl-vs-intlayer):

| Librería | App Router | Recomendación |
|----------|------------|---------------|
| react-i18next | ⚠️ Limitado | No recomendado |
| next-i18next | ❌ No compatible | No usar |
| **next-intl** | ✅ Nativo | **Recomendado** |

**next-intl** tiene:
- 931,000 descargas semanales
- Soporte nativo para App Router
- URLs localizadas para SEO (`/en/info`, `/es/info`)
- TypeScript completo

**Cambio requerido**: Migrar de `react-i18next` a `next-intl`

### 3.4 Tailwind CSS

| Estado | Notas |
|--------|-------|
| ✅ 100% Compatible | Configuración idéntica |

### 3.5 Lucide Icons

| Estado | Notas |
|--------|-------|
| ✅ 100% Compatible | Sin cambios necesarios |

---

## 4. Nueva Estructura de Proyecto

### 4.1 Estructura Actual (Vite)

```
seaphiya-tattoo/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   └── components/
│       ├── Navbar.tsx
│       ├── BookingPage.tsx
│       ├── InfoPage.tsx
│       └── ...
├── public/
├── locales/
│   ├── en/translation.json
│   └── es/translation.json
├── index.html
└── vite.config.ts
```

### 4.2 Nueva Estructura (Next.js 16)

```
seaphiya-tattoo/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (html, body, providers)
│   │   ├── page.tsx             # Home (/)
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # Locale layout
│   │   │   ├── page.tsx         # Home localizado
│   │   │   ├── info/
│   │   │   │   └── page.tsx     # /en/info, /es/info
│   │   │   ├── booking/
│   │   │   │   └── page.tsx     # /en/booking, /es/booking
│   │   │   └── work/
│   │   │       └── page.tsx     # /en/work, /es/work (opcional)
│   │   ├── sitemap.ts           # Generación automática
│   │   └── robots.ts            # robots.txt dinámico
│   │
│   ├── components/
│   │   ├── ui/                  # Componentes reutilizables
│   │   │   ├── Navbar.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   └── CustomCursor.tsx
│   │   ├── sections/            # Secciones de página
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Studios.tsx
│   │   │   └── Gallery.tsx
│   │   └── animations/          # Wrappers de Framer Motion
│   │       ├── MotionDiv.tsx
│   │       └── ScrollReveal.tsx
│   │
│   ├── lib/
│   │   ├── i18n.ts              # Configuración next-intl
│   │   └── utils.ts
│   │
│   └── messages/                # Traducciones (next-intl format)
│       ├── en.json
│       └── es.json
│
├── public/
│   ├── tattoos/
│   └── about/
│
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 5. Configuración SEO Detallada

### 5.1 Metadata por Página

```tsx
// app/[locale]/info/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cuidados Post-Tatuaje | Seaphiya Tattoo',
  description: 'Guía completa de cuidados antes y después de tu tatuaje. Consejos profesionales de Seaphiya, artista de fine line en Miami.',
  keywords: ['cuidados tatuaje', 'aftercare tattoo', 'fine line Miami'],
  openGraph: {
    title: 'Cuidados Post-Tatuaje | Seaphiya',
    description: 'Todo lo que necesitas saber para cuidar tu tatuaje',
    images: ['/og-info.jpg'],
    locale: 'es_ES',
    alternateLocale: 'en_US',
  },
  alternates: {
    canonical: 'https://seaphiya.com/es/info',
    languages: {
      'en': 'https://seaphiya.com/en/info',
      'es': 'https://seaphiya.com/es/info',
    },
  },
};
```

### 5.2 JSON-LD Structured Data

```tsx
// app/[locale]/layout.tsx
export default function LocaleLayout({ children, params }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: 'Seaphiya Tattoo',
    image: 'https://seaphiya.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      addressCountry: 'US',
    },
    priceRange: '$$',
    telephone: '+1-XXX-XXX-XXXX',
    url: 'https://seaphiya.com',
    sameAs: [
      'https://instagram.com/seaphiya.tat',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
```

### 5.3 Sitemap Automático

```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en', 'es'];
  const pages = ['', '/info', '/booking'];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `https://seaphiya.com/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
```

### 5.4 robots.txt Dinámico

```tsx
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/booking/success'],
    },
    sitemap: 'https://seaphiya.com/sitemap.xml',
  };
}
```

---

## 6. Estrategia de Git y Repositorio

### 6.1 Opciones Evaluadas

| Opción | Descripción | Pros | Contras |
|--------|-------------|------|---------|
| **A) Mismo repo, rama nueva** | Crear rama `nextjs-migration` | Mantiene historial, fácil rollback | Estructura diferente |
| B) Carpeta nueva en repo | Crear `/nextjs` temporal | Comparar lado a lado | Estructura fea |
| C) Repo nuevo | Fresh start | Limpio | Pierde historial |

### 6.2 Decisión: Opción A - Mismo Repo, Rama Nueva

**Elegimos Opción A** por las siguientes razones:

1. **Mantiene historial de Git** - Podemos ver la evolución del proyecto
2. **Rollback fácil** - Si algo falla, `main` sigue intacto
3. **Preview deploys** - Vercel puede hacer deploy por rama
4. **Práctica profesional estándar** - Es como se hace en producción

### 6.3 Flujo de Git

```
main (React + Vite actual)
    │
    └── nextjs-migration (nueva rama)
            │
            ├── Fase 1: Setup inicial
            ├── Fase 2: Migrar componentes
            ├── Fase 3: Migrar páginas
            ├── Fase 4: SEO y testing
            │
            └── PR → main (cuando esté listo)
```

### 6.4 Comandos de Git

```bash
# Crear y cambiar a rama de migración
git checkout -b nextjs-migration

# Durante desarrollo, commits frecuentes
git add .
git commit -m "feat: migrate component X to Next.js"

# Push a remoto para preview deploys
git push -u origin nextjs-migration

# Cuando esté listo, merge a main
git checkout main
git merge nextjs-migration
git push
```

### 6.5 Estrategia de Archivos

La migración **reemplazará** la estructura actual, no coexistirá:

```bash
# Archivos a ELIMINAR (Vite)
- vite.config.ts
- index.html
- src/App.tsx
- src/index.tsx

# Archivos a CREAR (Next.js)
+ next.config.ts
+ src/app/layout.tsx
+ src/app/page.tsx
+ src/app/[locale]/...

# Archivos a MANTENER/ADAPTAR
~ src/components/* → adaptar con "use client"
~ public/* → copiar sin cambios
~ locales/* → reestructurar para next-intl
```

---

## 7. Plan de Migración - Pasos Detallados

### Fase 0: Git Setup

- [ ] **0.1** Commit de cambios pendientes en `main`
- [ ] **0.2** Crear rama `nextjs-migration`:
  ```bash
  git checkout -b nextjs-migration
  ```
- [ ] **0.3** Push inicial:
  ```bash
  git push -u origin nextjs-migration
  ```

### Fase 1: Preparación (1 día)

- [ ] **1.1** Documentar todas las rutas/páginas existentes
- [ ] **1.2** Listar todas las dependencias y versiones
- [ ] **1.3** Eliminar archivos de Vite:
  ```bash
  rm -rf vite.config.ts index.html src/App.tsx src/index.tsx
  ```
- [ ] **1.4** Inicializar Next.js 16.0.7 en el mismo directorio:
  ```bash
  npx create-next-app@16.0.7 . --typescript --tailwind --app --src-dir --no-git
  ```
  > Nota: `--no-git` porque ya tenemos repo, `.` para instalar en directorio actual

### Fase 2: Configuración Base (1 día)

- [ ] **2.1** Configurar Tailwind con la misma configuración (colores, fuentes)
- [ ] **2.2** Copiar assets (public/tattoos, public/about)
- [ ] **2.3** Configurar fuentes (Clash Display, Playfair, Manrope)
- [ ] **2.4** Instalar dependencias:
  ```bash
  npm install framer-motion@latest lenis@latest next-intl@latest lucide-react@latest
  ```
- [ ] **2.5** Configurar next-intl para i18n
- [ ] **2.6** Migrar traducciones de react-i18next a next-intl format
- [ ] **2.7** Commit: `feat: setup Next.js 16 base configuration`

### Fase 3: Layout y Componentes Core (2 días)

- [ ] **3.1** Crear Root Layout con:
  - Fuentes
  - Metadata global
  - Providers (Lenis, i18n)
  - CustomCursor
  - Noise overlay
- [ ] **3.2** Migrar Navbar (adaptado para Next.js Link)
- [ ] **3.3** Crear wrappers de Framer Motion como Client Components
- [ ] **3.4** Migrar componentes de UI:
  - MagneticButton
  - ScrollRevealText
  - PeonyTransition

### Fase 4: Páginas (2 días)

- [ ] **4.1** Home Page (`/[locale]/page.tsx`):
  - Hero section
  - About section
  - Studios section
  - Gallery section
  - Footer
- [ ] **4.2** Info Page (`/[locale]/info/page.tsx`):
  - Migrar contenido completo
  - Añadir metadata SEO
- [ ] **4.3** Booking Page (`/[locale]/booking/page.tsx`):
  - Migrar formulario
  - Considerar Server Actions para el submit

### Fase 5: SEO y Optimización (1 día)

- [ ] **5.1** Configurar metadata por página
- [ ] **5.2** Añadir JSON-LD structured data
- [ ] **5.3** Crear sitemap.ts
- [ ] **5.4** Crear robots.ts
- [ ] **5.5** Configurar Open Graph images
- [ ] **5.6** Verificar Core Web Vitals

### Fase 6: Testing y QA (1 día)

- [ ] **6.1** Test de navegación entre páginas
- [ ] **6.2** Test de animaciones y transiciones
- [ ] **6.3** Test de i18n (cambio de idioma)
- [ ] **6.4** Test responsive (mobile/tablet/desktop)
- [ ] **6.5** Test SEO con Lighthouse
- [ ] **6.6** Verificar smooth scroll con Lenis
- [ ] **6.7** Test de formulario de booking

### Fase 7: Deploy (1 día)

- [ ] **7.1** Configurar Vercel (recomendado para Next.js)
- [ ] **7.2** Configurar dominio
- [ ] **7.3** Configurar redirects si es necesario
- [ ] **7.4** Verificar build de producción
- [ ] **7.5** Monitorear Core Web Vitals post-deploy

---

## 8. Tiempo Estimado Total

| Fase | Duración |
|------|----------|
| Git Setup | 0.5 día |
| Preparación | 0.5 día |
| Configuración Base | 1 día |
| Layout y Componentes | 2 días |
| Páginas | 2 días |
| SEO y Optimización | 1 día |
| Testing y QA | 1 día |
| Deploy | 1 día |
| **TOTAL** | **~9 días laborables** |

**Con experiencia en Next.js**: 5-7 días
**Sin experiencia previa**: 10-14 días

---

## 9. Riesgos y Mitigaciones

| Riesgo | Probabilidad | Mitigación |
|--------|--------------|------------|
| Animaciones rotas en SSR | Media | Usar `"use client"` estratégicamente |
| Lenis bugs en navegación | Baja | Resetear scroll en cambio de ruta |
| Pérdida de smooth scroll feel | Baja | Mantener mismos parámetros de Lenis |
| Traducciones incompatibles | Baja | Formato JSON similar, solo reestructurar |
| Performance regression | Muy baja | Next.js generalmente mejora performance |

---

## 10. Checklist Pre-Migración

- [ ] ¿Cambios pendientes commiteados en `main`?
- [ ] ¿Rama `nextjs-migration` creada?
- [ ] ¿Dominio disponible para deploy?
- [ ] ¿Acceso a Vercel o hosting alternativo?
- [ ] ¿Todas las imágenes optimizadas?
- [ ] ¿Contenido de traducciones finalizado?
- [ ] ¿Formulario de booking conectado a backend/servicio?

---

## 11. Referencias y Recursos

### Documentación Oficial
- [Next.js 16 Migration Guide](https://nextjs.org/docs/app/guides/migrating/from-vite)
- [Next.js SEO Guide](https://nextjs.org/docs/app/guides/seo)
- [next-intl Documentation](https://next-intl.dev/docs/getting-started/app-router)

### Artículos y Guías
- [Next.js SEO Benefits 2025](https://focusreactive.com/how-nextjs-can-improve-seo/)
- [Next.js 15 vs 16 Comparison](https://javascript.plainenglish.io/next-js-15-vs-next-js-16-the-real-differences-developers-should-know-f6f5fa97cead)
- [Framer Motion with Next.js](https://staticmania.com/blog/how-to-use-framer-motion-for-animations-in-next-js)
- [Lenis + Next.js Implementation](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap)

### Herramientas
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría SEO
- [Schema.org Validator](https://validator.schema.org/) - Validar JSON-LD
- [Open Graph Debugger](https://developers.facebook.com/tools/debug/) - Preview de links

---

## 12. Conclusión

### ¿Vale la pena migrar?

**Sí, definitivamente.** Para un portfolio de artista de tatuajes donde el SEO es crucial para atraer clientes:

1. **Búsquedas locales** ("tatuador fine line Miami") necesitan contenido indexable
2. **Página de cuidados** puede rankear para búsquedas informacionales
3. **Links compartibles** son importantes para referencias de clientes
4. **Core Web Vitals** afectan ranking en Google

### Alternativa: ¿Solo React Router?

Podríamos añadir React Router sin migrar a Next.js, pero:
- Seguiríamos sin SSR/SSG
- SEO seguiría siendo subóptimo
- Más trabajo manual para meta tags
- No aprovecharíamos optimizaciones de Next.js

**La inversión de ~9 días en migrar a Next.js 16 se justifica ampliamente por los beneficios de SEO a largo plazo.**

---

*Documento preparado para Seaphiya Tattoo - Diciembre 2025*
