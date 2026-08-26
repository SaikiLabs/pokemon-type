# PLAN — Calculadora de Tipos Pokémon (estilo Gen 3)

Calculadora de efectividad de tipos con estética GBA (FireRed/Emerald).
**v0.2: migrada a React + Vite + TypeScript + Tailwind v4** (reescritura limpia sobre el prototipo vanilla, commit `5ad8ec3`).

## Alcance
- **Solo Pokémon de las generaciones 1–3 (IDs 1–386).** Toda búsqueda fuera de rango se rechaza.
- Stack: React 19 · Vite · TypeScript strict · Tailwind v4 (`@theme` con paleta GBA) · Vitest.

## Comandos
```
npm install        instalar dependencias
npm run dev        servidor de desarrollo
npm test           vitest run (motor + API + narrativa)
npm run build      tsc (strict) + build producción → dist/
```

## Decisiones
| Detalle | Elección |
|---|---|
| Idioma | Bilingüe ES/EN con toggle; contexto React + `localStorage` (`ptc-lang`) |
| Búsqueda | Nombre inglés o número; datalist con los 386 nombres |
| Nombres mostrados | Localizados vía `/pokemon-species/{id}` |
| Tabla de efectividad | Hardcodeada y tipada en `src/engine/effectiveness.ts` (17 tipos, sin Hada) |
| Tipos Hada modernos | Corregidos a su tipado Gen 3 (`GEN3_TYPE_FIXES`: Clefairy→Normal, Gardevoir→Psíquico, Mawile→Acero… 18 líneas evolutivas) |
| Sprites | `generation-iii.firered-leafgreen` front/back; fallback a default / flip CSS |
| Caché | Map en memoria + `localStorage` (`ptc-cache-v1`); doble clave nombre/id; última búsqueda en `ptc-last` |
| Estado | `useState`/Context nativo — sin librerías externas |

## Estructura
```
index.html                     entrada Vite (fuente Press Start 2P)
vite.config.ts                 react + tailwindcss plugins, entorno de test node
src/
├── domain/pokemon.ts          TypeName(17), Pokemon, Category, Stats, MAX_DEX
├── domain/typeMeta.ts         colores clásicos + nombres ES/EN por tipo
├── engine/effectiveness.ts    matriz 17×17, multiplicadores, análisis def/of
├── engine/effectiveness.test.ts     casos canónicos (Charizard, Swampert, Magnemite…)
├── api/pokeApi.ts             fetch + caché + fixes Hada + normalizeQuery
├── api/pokeApi.test.ts        mocks de fetch/localStorage: guards, caché, fixes
├── i18n/strings.ts            diccionarios ES/EN tipados + joinList/capitalize
├── i18n/narrative.ts          mensajes estilo diálogo ("¡Charizard es DÉBIL ante AGUA!")
├── i18n/narrative.test.ts
├── hooks/usePokemon.ts        máquina idle→loading→success|error
├── hooks/useLanguage.tsx      contexto de idioma persistido
├── hooks/useTypewriter.ts     efecto máquina de escribir
└── components/                DialogBox, TypeBadge, CategoryRow, EffectivenessPanel,
                               Header, SearchBar, BattleScene, StatsPanel,
                               MessageDialog, Footer
```

## Motor de efectividad
Multiplicador = producto del tipo atacante contra cada tipo defensor.

| Clave | Mult | Defensivo ES/EN | Ofensivo ES/EN |
|---|---|---|---|
| quad | ×4 | Muy débil / Very weak | Devastador / Devastating |
| double | ×2 | Débil / Weak | Muy eficaz / Super effective |
| neutral | ×1 | Neutral / Neutral | Eficaz / Effective |
| half | ×0.5 | Resistente / Resistant | Poco eficaz / Not very effective |
| quarter | ×0.25 | Muy resistente / Very resistant | Casi sin efecto / Barely effective |
| immune | ×0 | Inmune / Immune | Sin efecto / No effect |

Análisis bidireccional: defensivo (17 atacantes vs tus tipos) y ofensivo (tus tipos vs 17 defensores, mejor movimiento disponible).

## API usada
- `GET /api/v2/pokemon/{nombre-en|id}` → tipos, sprites FRLG, stats base
- `GET /api/v2/pokemon-species/{id}` → nombre localizado ES/EN
- `GET /api/v2/pokemon?limit=386` → lista para el datalist

Entrada normalizada: minúsculas, sin puntos/apóstrofes, espacios→guiones colapsados, ♀/♂→-f/-m (`Mr. Mime`→`mr-mime`, `Nidoran♀`→`nidoran-f`).

## UI Gen 3
Paleta FireRed/Emerald como tokens `@theme` (`--color-gba-*`), cajas beige con doble borde azul (`DialogBox`), escena de batalla con plataformas ovaladas y sprites pixelados, insignias de tipo con colores clásicos, stats como barras GBA, mensajes narrados con typewriter. Responsive (breakpoint sm).

## Verificación
- [x] `npm test` — 39 tests en verde (14 matchups canónicos, clasificación, agrupación, normalización, guards gen3/notfound/network, caché doble clave, fixes Hada, narrativa ES/EN)
- [x] `npm run build` — TypeScript strict sin errores
- Casos manuales (`npm run dev`):
  - [ ] `charizard` → MUY DÉBIL ×4 ROCA · DÉBIL ×2 AGUA/ELÉCTRICO · INMUNE a TIERRA
  - [ ] `swampert` → INMUNE a ELÉCTRICO · MUY DÉBIL ×4 PLANTA
  - [ ] `magnemite` → MUY DÉBIL ×4 TIERRA · DÉBIL ×2 FUEGO/LUCHA
  - [ ] `umbreon` → INMUNE a PSÍQUICO · DÉBIL a LUCHA
  - [ ] `gastly` → INMUNE a NORMAL y LUCHA
  - [ ] `25` → pikachu · `CHARIZARD` (mayúsculas) funciona
  - [ ] `387` o `1000` → mensaje "solo Gen 1–3" · `xyzzy` → "no existe"
  - [ ] Toggle ES/EN re-renderiza sin recargar; recargar mantiene idioma y último Pokémon

## Roadmap (motivo de la migración a React)
Comparador de 2 Pokémon y/o analizador de equipo: el estado se extenderá a lista de slots reutilizando `usePokemon` por slot; el motor y la API ya son agnósticos del número de Pokémon.
