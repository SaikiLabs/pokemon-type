# PLAN — Calculadora de Tipos Pokémon (estilo Gen 3)

Calculadora de efectividad de tipos con estética GBA (FireRed/Emerald), vanilla JS, sin build.

## Alcance
- **Solo Pokémon de las generaciones 1–3 (IDs 1–386).** Toda búsqueda fuera de rango se rechaza.
- Sin frameworks ni empaquetado: abrir `index.html` directamente en el navegador.

## Decisiones
| Detalle | Elección |
|---|---|
| Idioma | Bilingüe ES/EN con toggle, persistido en `localStorage` (`ptc-lang`) |
| Búsqueda | Nombre inglés o número; datalist con los 386 nombres |
| Nombres mostrados | Localizados vía `/pokemon-species/{id}` (`names[]`) |
| Tabla de efectividad | Hardcodeada en `js/types.js` (17 tipos, sin Hada/Fairy) |
| Tipos Hada modernos | Corregidos a su tipado de Gen 3 (`GEN3_TYPE_FIXES`: Clefairy→Normal, Gardevoir→Psíquico, Mawile→Acero, etc.) |
| Sprites | `generation-iii.firered-leafgreen` front/back; fallback a `front_default`/flip CSS |
| Caché | `Map` en memoria + `localStorage` (`ptc-cache-v1`); última búsqueda en `ptc-last` |

## Estructura
```
index.html        Escena de batalla, cajas de diálogo, paneles
css/styles.css    Paleta FireRed/Emerald, tipografía Press Start 2P
js/types.js       Tabla 17×17, análisis defensivo/ofensivo, clasificación
js/api.js         PokéAPI + caché memoria/localStorage + normalización de entrada
js/ui.js          Diccionario i18n ES/EN, render, efecto máquina de escribir
js/main.js        Estado global, eventos, init
```

## Motor de efectividad
Multiplicador = producto del tipo atacante contra cada tipo defensor.
Categorías (clave → ×mult):

| Clave | Mult | Defensivo ES/EN | Ofensivo ES/EN |
|---|---|---|---|
| quad | ×4 | Muy débil / Very weak | Devastador / Devastating |
| double | ×2 | Débil / Weak | Muy eficaz / Super effective |
| neutral | ×1 | Neutral / Neutral | Eficaz / Effective |
| half | ×0.5 | Resistente / Resistant | Poco eficaz / Not very effective |
| quarter | ×0.25 | Muy resistente / Very resistant | Casi sin efecto / Barely effective |
| immune | ×0 | Inmune / Immune | Sin efecto / No effect |

Análisis bidireccional:
- **Defensivo**: los 17 tipos atacantes vs los tipos del Pokémon.
- **Ofensivo**: los tipos del Pokémon vs los 17 defensores (mejor multiplicador disponible).

## API usada
- `GET /api/v2/pokemon/{nombre-en|id}` → tipos, sprites, stats base
- `GET /api/v2/pokemon-species/{id}` → nombre localizado ES/EN
- `GET /api/v2/pokemon?limit=386` → lista para el datalist

Entrada normalizada: minúsculas, sin puntos/apóstrofes, espacios→guiones (`Mr. Mime`→`mr-mime`).

## UI Gen 3
- Paleta FireRed/Emerald: fondo verde esmeralda, cajas beige `#f8f8d0` con doble borde azul.
- Tipografía *Press Start 2P* (Google Fonts) con fallback monospace.
- Escena de batalla: plataformas ovaladas, sprite frontal arriba-derecha y trasero abajo-izquierda, barra HP decorativa.
- Insignias de tipo con colores clásicos y multiplicador.
- Resultados narrados con efecto máquina de escribir: *"¡Charizard es DÉBIL ante AGUA!"*.
- Stats base como barras horizontales estilo GBA.

## Verificación manual (abrir index.html)
Casos canónicos:
- [ ] `charizard` → MUY DÉBIL ×4 ROCA · DÉBIL ×2 AGUA/ELÉCTRICO · INMUNE a TIERRA
- [ ] `swampert` → INMUNE a ELÉCTRICO · MUY DÉBIL ×4 PLANTA
- [ ] `magnemite` → MUY DÉBIL ×4 TIERRA · DÉBIL ×2 FUEGO/LUCHA
- [ ] `umbreon` → INMUNE a PSÍQUICO · DÉBIL a LUCHA
- [ ] `gastly` → INMUNE a NORMAL y LUCHA
- [ ] `25` → pikachu · `CHARIZARD` (mayúsculas) funciona
- [ ] `387` o `1000` → mensaje "solo Gen 1–3"
- [ ] `xyzzy` → mensaje "no existe"
- [ ] Toggle ES/EN re-renderiza todo sin recargar; recargar mantiene idioma y último Pokémon (caché instantánea)

Sintaxis JS validada con `node --check js/*.js`.
