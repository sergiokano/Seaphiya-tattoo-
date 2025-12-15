# Guía de Internacionalización (i18n)

## Estado Actual

✅ **Completado:**
- i18next y react-i18next instalados
- Archivos de configuración i18n.ts creado
- Traducción JSON completa para ES y EN (260+ strings)
- Navbar.tsx completamente traducido
- Preloader.tsx parcialmente traducido
- LanguageSwitcher component creado

⏳ **En Progreso:**
- App.tsx - Remaining sections
- BookingPage.tsx - All sections
- Verification que no haya strings sin traducir

---

## Estructura de Traducciones

Todos los strings están organizados en `locales/{es,en}/translation.json`:

### Namespaces disponibles:

- `navbar.*` - Barra de navegación
- `hero.*` - Sección hero principal
- `preloader.*` - Pantalla de carga
- `about.*` - Sección "Sobre la artista"
- `studios.*` - Sección de estudios y guestspots
- `gallery.*` - Sección de galería
- `footer.*` - Pie de página
- `booking.*` - Formulario de reserva completo
- `styles.*` - Estilos de tatuaje
- `sizes.*` - Tamaños disponibles
- `budgets.*` - Rangos de presupuesto
- `locations.*` - Nombres de ciudades/ubicaciones
- `countries.*` - Nombres de países
- `buttons.*` - Etiquetas de botones
- `suggestCity.*` - Formulario de sugerir ciudad
- `social.*` - Redes sociales

---

## Cómo Usar i18n en los Componentes

### Paso 1: Importar useTranslation
```tsx
import { useTranslation } from 'react-i18next';
```

### Paso 2: Usar el hook
```tsx
const MyComponent: React.FC = () => {
  const { t } = useTranslation();

  return <h1>{t('navbar.brand')}</h1>;
};
```

### Paso 3: Reemplazar strings
```tsx
// Antes:
<span>Loading</span>

// Después:
<span>{t('preloader.loading')}</span>
```

---

## Strings Pendientes en App.tsx

### Hero Section (líneas 716-854)
- "Location" → t('hero.location')
- "Next Guests" → t('hero.nextGuests')
- "Status" → t('hero.status')
- "Now booking" → t('hero.nowBooking')
- "Follow" → t('hero.follow')
- "Instagram" → t('social.instagram')
- Coordenadas (25.7617° N, 80.1918° W)
- Nombres de ciudades (Zurich, Valencia, New York, Vienna)
- "Gently," → t('hero.tagline.center1')
- "forever" → t('hero.tagline.center2')
- "Specializing in" → t('hero.specializing')
- "Fine Line", "Micro-Realism", "Botanical", "Minimalist"
- "Scroll" → t('hero.scroll')

### About Section (líneas 878-938)
- "The Artist" → t('about.title')
- Descripción completa → t('about.description')
- Estilos (Fine Line, Micro-Realism, etc.)
- "Fine Line Artist" → t('about.profession')
- "Miami, FL — Noble Art Studio" → t('about.location')
- "Book a Session" → t('about.cta')

### Studios & Guest Spots (líneas 982-1234)
- "[ Studios & Guests ]" → t('studios.title')
- "Worldwide" → t('studios.worldwide')
- "Studios" → t('studios.studioLabel')
- "Noble Art" → t('studios.nobleArt')
- "Current" → t('studios.current')
- Fechas y ciudades con sus respectivas claves
- "Past Guest Spots" → t('studios.pastGuestSpots')
- "Upcoming" → t('studios.upcoming')
- "Book a guest spot" → t('studios.cta')

### Gallery Section (líneas 1248-1282)
- "[ Selected Works ]" → t('gallery.title')
- "2020 — 2025" → t('gallery.years')
- "Fine Line Art", "Micro Realism", "Botanical Flow", "Delicate Details"
- "View Case Study" → t('gallery.viewCaseStudy')

### Footer (líneas 1287-1308)
- "© Seaphiya 2025" → t('footer.copyright')
- "Make it permanent" → t('footer.tagline')
- "Book Now" → t('footer.bookNow')
- "Top" → t('footer.top')
- "Instagram" → t('social.instagram')

### Suggest City Form (líneas 490-632)
- Todos los strings del formulario con sus claves en t('suggestCity.*')

---

## Strings Pendientes en BookingPage.tsx

### Header (líneas 807-812)
- "seaphiya" → t('booking.header.brand')
- "Book a Session" → t('booking.header.title')
- "Back" → t('booking.header.back')

### Location Selection (líneas 870-1018)
- "Select Location" → t('booking.location.title')
- Estados y mensajes
- Nombres de ciudades y países
- Tooltip text

### Form Steps (líneas 465-725)
- Todos los labels, placeholders y mensajes con sus respectivas claves

### Success Page (líneas 760-787)
- "Request Sent" → t('booking.success.title')
- "Thank you" → t('booking.success.subtitle')
- Mensaje de confirmación

---

## Cómo Completar la Traducción

### Opción 1: Manual (Recomendado para Control Total)
1. Abre cada sección del código
2. Reemplaza strings uno por uno usando el Edit tool
3. Verifica que las claves coincidan con translation.json

### Opción 2: Automático (Más Rápido)
1. Usa un script de búsqueda y reemplazo
2. Verifica cambios antes de hacer commit

### Verificación
```bash
# Buscar strings sin traducir en App.tsx
grep -E '"[A-Z][^"]*"' App.tsx | head -20

# Buscar en BookingPage.tsx
grep -E '"[A-Z][^"]*"' components/BookingPage.tsx | head -20
```

---

## Cambiar Idioma

El usuario puede cambiar idioma usando el botón LanguageSwitcher en la esquina superior derecha.
El idioma seleccionado se guarda en localStorage automáticamente.

---

## Próximos Pasos

1. **Completar App.tsx:** Reemplazar ~100 strings adicionales
2. **Completar BookingPage.tsx:** Reemplazar ~80 strings
3. **Verificación Final:** Asegurar que no hay strings hardcoded sin traducir
4. **Testing:** Cambiar idioma y verificar que todo funciona correctamente
5. **Git commit:** Hacer commit final de todos los cambios

---

## Notas Técnicas

- **Fallback Language:** Español (es)
- **Default Language:** Basado en localStorage o navegador
- **Interpolación:** Soportada para variables dinámicas
- **Nested Keys:** Soportadas completamente
- **Performance:** Strings precargados, sin lazy loading

---

## Comandos Útiles

```bash
# Ver estado actual del proyecto
git status

# Ver traducción JSON
cat locales/es/translation.json | jq '.navbar'

# Validar JSON
python -m json.tool locales/es/translation.json > /dev/null && echo "Valid"
```

---

**Última actualización:** 2025-12-15
**Estado:** 35% Completado (Navbar + Preloader básico)
**Estimado de Trabajo Restante:** 2-3 horas de reemplazos manuales o 30 minutos con script automatizado
