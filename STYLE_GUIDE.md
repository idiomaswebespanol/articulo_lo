# Modernismo Editorial Cálido — Guía de Estilo Portable

> Sistema visual usado en «La complejidad del LO». Filosofía: **la pantalla como
> un libro académico anotado** — estructura de imprenta clásica + movimiento físico digital.

---

## 1. Concepto

- **Editorial + vivo**: hairlines, notas al margen, numeración de secciones (§ 01…), comillas angulares «», asteriscos como viñetas… pero todo respira con springs, morphs y parallax.
- El color es **semántico**, no decorativo: cada acento codifica una categoría de contenido.
- Nunca negro puro ni blanco puro: todo lleva temperatura cálida.

## 2. Paleta

| Token | Hex | Uso |
|---|---|---|
| `paper` | `#F5EEDF` | fondo principal |
| `parch` | `#EDE2C9` | paneles y secciones alternas |
| `ink` | `#191410` | texto / negro cálido |
| `soot` | `#221A14` | fondos de capítulos oscuros |
| `cream` | `#F2E9D6` | texto sobre oscuro |
| `crimson` | `#C2391E` | acento primario (marca, categoría B) |
| `viridian` | `#0E5B4F` | categoría A |
| `gold` | `#9C6A0B` | categoría C sobre claro |
| variantes sobre oscuro | `#54C7AB` · `#FF7457` · `#E5B04C` | mismas categorías, más luminosas |

**Proporción:** ~70 % neutros cálidos · 25 % tintas · 5 % acentos.
**Contraste dual:** cada color de categoría tiene versión oscura (fondo claro) y brillante (fondo oscuro).

## 3. Tipografía (3 familias, roles fijos)

```css
--font-display: "Fraunces", serif;        /* titulares: black 900, itálica para emoción */
--font-sans:    "Space Grotesk", sans;    /* cuerpo y UI */
--font-mono:    "IBM Plex Mono", mono;    /* metadatos: uppercase, tracking 0.22–0.3em, 10–11px */
```

- Titular héroe: `clamp(3.4rem, 11.5vw, 10.5rem)`, leading 1.0, tracking tight.
- Secciones: `text-4xl → md:text-6xl`, leading 1.02.
- Itálica serif **dentro** de párrafos sans para énfasis (`em.font-display`).
- Ghost numerals: números gigantes con `-webkit-text-stroke` y color transparente.

## 4. Layout

- Contenedor `max-w-[1400px]`, gutters `px-5 md:px-8`.
- Capítulos alternos claro/oscuro (crema → tinta) + **marquee** como transición.
- Overline de sección: `§ NN` + regla de 40px + etiqueta mono.
- Bordes: hairlines `1px` a tinta 10–15 % (nunca bordes gruesos).
- Tarjetas: `rounded-2xl`, borde hairline, sombra profunda y suave: `0 18px 40px -30px rgba(25,20,16,.35)`.
- Watermarks tipográficos gigantes en footer (itálica, solo contorno).

## 5. Textura y ornamento

- **Film grain**: SVG `feTurbulence` como data-URI, overlay fijo, opacidad 0.05.
- Slots/variables gramaticales: borde dashed mono.
- Píldoras con punto de color (sistema de categorías).
- Ilustración: collage/risografía en papel crema, formas recortadas, paleta limitada.

## 6. Lenguaje de movimiento

- Entradas: `opacity 0→1, y 28→0`, `duration .8`, easing `cubic-bezier(.22,1,.36,1)`, delays escalonados 0.08–0.16.
- Morphs de elementos compartidos: `layoutId` + spring `stiffness 380, damping 33`.
- Marquee infinito lineal 36–48 s (pausado en hover).
- Chips flotantes: `floaty` 7 s ease-in-out con rotación sutil (`--rot: ±3deg`).
- Parallax solo en el héroe (restricción = elegancia).
- Hover: flechas que se desplazan 1–4 px, swap de color/borde, 300–500 ms.
- Respetar `prefers-reduced-motion`.

## 7. Patrones de componentes reutilizables

1. **Overline + SectionHead** con numeral fantasma.
2. **Formula bar**: tokens `[dato] → resultado` (sólido / dashed / operador / serif itálica).
3. **Transformer**: antes/después donde la pieza reemplazada "vuela" a su nueva posición.
4. **Filter chips con conteo** + tabla-ledger filtrable (filas con raíl de color).
5. **Wizard de diagnóstico** (árbol de decisión con breadcrumbs-chips).
6. **Quiz**: opciones agrupadas por categoría, feedback pedagógico inline, anillo de puntuación SVG.
7. **Stat strip**: 3 celdas con divisores, numeral serif grande + label mono.

## 8. Reglas de oro (do / don't)

- ✅ Lucide icons (o SVG propio trazo 2px). ❌ Emojis.
- ✅ Acentos cálidos oscurecidos sobre papel, aclarados sobre tinta.
- ✅ Comillas «» tipográficas y viñetas con † * · 
- ❌ Nada de #000, #FFF, sombras duras, bordes gruesos, gradientes de neón.
- ✅ El movimiento explica el contenido (el morph demuestra la gramática).

## 9. Receta en un párrafo (para pegar en un prompt)

> "Estilo editorial académico cálido: fondo papel crema #F5EEDF, tinta cálida #191410, acentos semánticos terracota #C2391E / verde viridian #0E5B4F / oro #9C6A0B; tipografía Fraunces black itálica para titulares gigantes, Space Grotesk para cuerpo, IBM Plex Mono mayúscula espaciada para metadatos; hairlines, numerales § fantasma con contorno, comillas «», grano fílmico sutil, capítulos alternos claro/oscuro con marquees tipográficos, animaciones spring con morphs (layoutId), sombras profundas suaves, iconos de línea, sin emojis, sin blanco/negro puros."
