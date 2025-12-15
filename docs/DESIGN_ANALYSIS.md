# Seaphiya Tattoo - Análisis de Diseño y Sistema de Colores

> Documento de referencia para ajustes de diseño y mantenimiento visual del proyecto.

---

## 1. Estado Actual del Sistema de Colores

### 1.1 Arquitectura de Estilos

El proyecto usa **Tailwind CSS via CDN** con configuración centralizada en `index.html`.

**No existe** archivo `tailwind.config.js` separado. Todo está inline.

```
Punto de control único: index.html (líneas 14-38)
```

### 1.2 Paleta Actual

| Token | Hex | Uso |
|-------|-----|-----|
| `ink-black` | `#000000` | Fondo principal |
| `off-black` | `#0a0a0a` | Fondo alternativo (poco usado) |
| `paper-white` | `#e5e5e5` | Cursor custom |
| `pure-white` | `#ffffff` | Texto principal |
| `chrome` | `#a1a1aa` | Detalles sutiles, hover states |

#### Colores de Acento (Tailwind nativos)

| Color | Uso |
|-------|-----|
| `green-400` | Estados activos, "Now booking", indicadores online |
| `amber-400` | CTAs, focus states, "Upcoming", formularios |

### 1.3 Sistema de Jerarquía por Opacidad

El diseño actual usa opacidades de `white` para crear jerarquía visual:

```
white/5   → Bordes muy sutiles, fondos casi invisibles
white/10  → Elementos de fondo decorativos
white/20  → Bordes secundarios
white/25  → Etiquetas pequeñas
white/30  → Texto terciario, metadatos
white/40  → Texto secundario moderado
white/50  → Texto secundario
white/60  → Texto intermedio
white/70  → Texto destacado secundario
white/80  → Texto destacado
white/90  → Casi texto principal
```

---

## 2. Mapeo de Archivos y Colores

### 2.1 Archivos que Definen Colores

| Archivo | Líneas | Qué define |
|---------|--------|------------|
| `index.html` | 14-38 | Tailwind theme (tokens de color) |
| `index.html` | 59-64 | CSS global (body bg/color) |

### 2.2 Archivos que Consumen Colores

| Archivo | Impacto | Colores usados |
|---------|---------|----------------|
| `App.tsx` | **ALTO** | Todos los tokens, white/X, green-400, amber-400 |
| `components/Navbar.tsx` | MEDIO | white/X, chrome |
| `components/BookingPage.tsx` | MEDIO | white/X, green-400, amber-400 |
| `components/CustomCursor.tsx` | BAJO | paper-white, mix-blend-mode |
| `components/PeonyTransition.tsx` | BAJO | ink-black, stroke white |

### 2.3 Colores Hardcodeados (Atención Especial)

Estos valores están inline y NO usan tokens:

```tsx
// App.tsx líneas 211-212
color: isHero ? '#ffffff' : 'transparent'
WebkitTextStroke: isHero ? '1px transparent' : '1px #ffffff'

// Gradientes varios
'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)'
```

---

## 3. Propuesta: Nueva Paleta Basada en Feed Instagram

### 3.1 Análisis Visual del Feed

El feed de Seaphiya transmite:
- **Calidez**: Tonos beige/crema dominantes (piel como canvas)
- **Delicadeza**: Colores suaves, nada saturado
- **Naturaleza**: Predominancia de tonos orgánicos (coral, verde sage)
- **Feminidad elegante**: Rosa suave, terracota

### 3.2 Paleta Propuesta

#### Colores Base

| Rol | Actual | Propuesto | Hex |
|-----|--------|-----------|-----|
| Fondo principal | `#000000` | Beige cálido | `#F5EBE0` |
| Fondo alternativo | `#0a0a0a` | Crema suave | `#FAF6F2` |
| Texto principal | `#ffffff` | Gris carbón cálido | `#2D2D2D` |
| Detalle sutil | `#a1a1aa` | Gris medio cálido | `#8B8680` |

#### Colores de Acento

| Rol | Actual | Propuesto | Hex |
|-----|--------|-----------|-----|
| Acento primario (CTA) | `amber-400` | Coral/Terracota | `#C4756E` |
| Acento secundario | `green-400` | Verde sage | `#8A9A7B` |
| Acento terciario | - | Rosa pétalo | `#E8B4B4` |

### 3.3 Mapeo de Tokens

```javascript
// Nueva configuración para index.html
colors: {
  'ink-black': '#2D2D2D',      // Ahora es el texto oscuro
  'off-black': '#3D3D3D',      // Texto secundario oscuro
  'paper-white': '#F5EBE0',    // Fondo beige principal
  'pure-white': '#FAF6F2',     // Fondo crema claro
  'chrome': '#8B8680',         // Gris cálido para detalles

  // Nuevos tokens sugeridos
  'accent': '#C4756E',         // Coral principal
  'accent-soft': '#E8B4B4',    // Rosa suave
  'nature': '#8A9A7B',         // Verde sage
}
```

---

## 4. Plan de Migración de Colores

### 4.1 Fase 1: Actualizar Definiciones (1 archivo)

**Archivo:** `index.html`

1. Actualizar objeto `colors` en Tailwind config (líneas 24-30)
2. Actualizar estilos CSS globales del body (líneas 59-64)
3. Añadir nuevos tokens si es necesario

### 4.2 Fase 2: Invertir Lógica de Opacidades

El sistema actual usa `white/X` sobre fondo negro.
El nuevo sistema necesitará `dark/X` sobre fondo claro.

**Estrategia:** Crear clase utility o variable CSS para el color de contraste.

### 4.3 Fase 3: Actualizar Componentes

| Prioridad | Archivo | Cambios estimados |
|-----------|---------|-------------------|
| 1 | `App.tsx` | ~50 clases de color |
| 2 | `BookingPage.tsx` | ~20 clases |
| 3 | `Navbar.tsx` | ~10 clases |
| 4 | `CustomCursor.tsx` | Revisar mix-blend-mode |
| 5 | `PeonyTransition.tsx` | ~3 cambios |

### 4.4 Fase 4: Valores Hardcodeados

Buscar y reemplazar:
- `#ffffff` → nuevo color de texto/acento
- `#000000` → nuevo color de fondo
- `rgba(255,255,255,X)` → nuevos valores rgba

---

## 5. Consideraciones UX/UI

### 5.1 Contraste y Accesibilidad

| Combinación | Ratio Actual | Ratio Propuesto | WCAG |
|-------------|--------------|-----------------|------|
| Texto/Fondo | 21:1 (blanco/negro) | ~11:1 (carbón/beige) | AAA |
| Acento/Fondo | Variable | ~4.5:1 (coral/beige) | AA |

### 5.2 Elementos que Requieren Atención

1. **Cursor custom**: El `mix-blend-mode: difference` puede comportarse diferente con fondos claros
2. **Gradientes**: Revisar que sigan siendo sutiles
3. **Estados hover/focus**: Verificar visibilidad
4. **Footer invertido**: Actualmente es blanco con texto negro, revisar lógica

### 5.3 Consistencia con el Feed

Para mantener coherencia con Instagram:
- Evitar colores muy saturados
- Mantener sensación "airy" y espaciosa
- Los acentos deben ser sutiles, no llamativos
- Considerar fotos del feed como hero images

---

## 6. Checklist de Implementación

```
[ ] Backup del index.html actual
[ ] Actualizar tokens en Tailwind config
[ ] Actualizar CSS global del body
[ ] Probar contraste de texto principal
[ ] Actualizar App.tsx - secciones hero
[ ] Actualizar App.tsx - galería
[ ] Actualizar App.tsx - footer
[ ] Actualizar BookingPage.tsx
[ ] Actualizar Navbar.tsx
[ ] Revisar CustomCursor.tsx
[ ] Revisar PeonyTransition.tsx
[ ] Test de accesibilidad (contrast checker)
[ ] Test en móvil
[ ] Test en diferentes navegadores
```

---

## 7. Referencias Rápidas

### Archivos Clave
```
/index.html                      → Tailwind config + CSS global
/App.tsx                         → Componente principal
/components/Navbar.tsx           → Navegación
/components/BookingPage.tsx      → Formulario reservas
/components/CustomCursor.tsx     → Cursor personalizado
/components/PeonyTransition.tsx  → Animación transición
```

### Búsquedas Útiles (grep)
```bash
# Encontrar todos los usos de colores
grep -r "white/" --include="*.tsx"
grep -r "ink-black\|pure-white\|paper-white" --include="*.tsx"
grep -r "green-400\|amber-400" --include="*.tsx"
grep -r "#ffffff\|#000000" --include="*.tsx"
```

---

## 8. Historial de Cambios

| Fecha | Cambio | Autor |
|-------|--------|-------|
| 2024-XX-XX | Documento inicial - Análisis pre-migración | - |

---

*Documento generado para el proyecto Seaphiya Tattoo Art*
