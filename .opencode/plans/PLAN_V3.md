# PLAN V3 — Calculadora Pokémon Universal (Gen 1–9)

Expansión completa: todos los Pokemon (~1025), movimientos, cálculo de daño, IVs/EVs, sprites por generación, y simulador de batalla.

---

## Fase 1: Actualizar Dominio y Tipos

### 1.1 — Agregar tipo Hada (Fairy)
- **Archivo**: `src/domain/pokemon.ts`
- Agregar `'fairy'` al array `POKEMON_TYPES` → ahora 18 tipos
- Eliminar `GEN3_TYPE_FIXES` (ya no necesitamos corregir Hada a otros tipos)
- Eliminar `MAX_DEX = 386` → `MAX_DEX = 1025`
- Agregar tipo `'fairy'` a `TypeName`

### 1.2 — Actualizar tabla de efectividad
- **Archivo**: `src/engine/effectiveness.ts`
- Expandir `TYPE_CHART` de 17×17 a 18×18 (agregar todas las interacciones de Hada)
- Hada es: fuerte contra Lucha, Siniestro, Dragón; débil contra Veneno, Acero; inmune a Dragón

### 1.3 — Agregar tipos de dominio para movimientos
- **Archivo**: `src/domain/pokemon.ts`
- Nuevos tipos/interfaz:
```ts
type MoveCategory = 'physical' | 'special' | 'status'

interface Move {
  id: number
  nameEn: string
  nameEs: string
  type: TypeName
  category: MoveCategory
  power: number | null    // null = status move
  accuracy: number | null // null = nunca falla
  pp: number
  priority: number
  critRate: number        // 0-4
  effectChance: number | null
  ailment: string | null
  description: string
}

interface BattleConfig {
  attackerLevel: number
  defenderLevel: number
  attackerIVs: IVs
  attackerEVs: EVs
  defenderIVs: IVs
  defenderEVs: EVs
  attackerNature: Nature
  defenderNature: Nature
}

type IVs = {
  hp: number; attack: number; defense: number
  spAtk: number; spDef: number; speed: number
}

type EVs = IVs  // mismas claves, mismo rango 0-252

type Nature = {
  name: string
  increase: StatKey | null
  decrease: StatKey | null
}
```

### 1.4 — Agregar sprites por generación
- **Archivo**: `src/domain/pokemon.ts`
- Agregar campo `spriteGeneration` al `Pokemon` para rastrear de qué generación viene el sprite

---

## Fase 2: Base de Datos de Movimientos

### 2.1 — Crear archivo de datos de movimientos
- **Archivo nuevo**: `src/data/moves.ts`
- ~200 movimientos clave hardcodeados (uno por archivo no es práctico para este caso)
- Cada movimiento tiene: `id, nameEn, nameEs, type, category, power, accuracy, pp, priority, critRate`
- Incluir los movimientos más importantes por tipo:
  - Normal: Tackle, Body Slam, Hyper Beam, Quick Attack, Return, Facade, Endeavor, Extreme Speed
  - Fire: Flamethrower, Fire Blast, Overheat, Fire Punch, Flare Blitz, Heat Wave, Will-O-Wisp
  - Water: Surf, Hydro Pump, Ice Beam, Waterfall, Scald, Aqua Tail, Flip Turn
  - Electric: Thunderbolt, Thunder, Thunder Punch, Volt Switch, Wild Charge, Thunder Wave
  - Grass: Giga Drain, Energy Ball, Leaf Blade, Solar Beam, Spore, Sleep Powder, Leech Seed
  - Ice: Ice Beam, Blizzard, Ice Punch, Icicle Crash, Freeze-Dry
  - Fighting: Close Combat, High Jump Kick, Drain Punch, Mach Punch, Focus Blast, Aura Sphere
  - Poison: Sludge Bomb, Gunk Shot, Poison Jab, Toxic, Venoshock
  - Ground: Earthquake, Earth Power, Stone Edge, Stealth Rock, Toxic Spikes
  - Flying: Brave Bird, Hurricane, Acrobatics, Roost, Defog, U-turn
  - Psychic: Psychic, Psyshock, Moonblast, Calm Mind, Trick, Reflect
  - Bug: Bug Buzz, U-turn, Leech Life, Megahorn, Quiver Dance, Sticky Web
  - Rock: Stone Edge, Rock Slide, Rock Tomb, Sandstorm, Stealth Rock
  - Ghost: Shadow Ball, Shadow Claw, Poltergeist, Will-O-Wisp, Trick
  - Dragon: Draco Meteor, Outrage, Dragon Pulse, Dragon Dance, Roost
  - Dark: Knock Off, Dark Pulse, Sucker Punch, Crunch, Pursuit, Parting Shot
  - Steel: Iron Head, Flash Cannon, Meteor Mash, Bullet Punch, Swords Dance, Volt Switch
  - Fairy: Moonblast, Play Rough, Dazzling Gleam, Draining Kiss, Trick
- **~30 movimientos por tipo** promedio (algunos tipos tienen más que otros)

### 2.2 — Crear archivo de naturalezas
- **Archivo nuevo**: `src/data/natures.ts`
- Las 25 naturalezas con su stat boost/decrease
- Exportar array `NATURES` y tipo `NatureName`

### 2.3 — Mapeo de moves por Pokemon
- **Estrategia**: NO fetchear los 1025×moves individuales de PokeAPI (serían ~50,000 requests)
- En su lugar, usar el endpoint `/api/v2/pokemon/{id}` que YA incluye la lista de movimientos del Pokemon
- Pero para el daño necesitamos power/accuracy/type de cada movimiento
- **Solución**: Para los ~200 movimientos curated, hardcodear sus datos directamente. Para los moves que un Pokemon sabe, hacer match por nombre contra nuestra base de datos curated
- Los movimientos que no estén en nuestra base curated se muestran como "status" o se omiten del simulador

---

## Fase 3: Motor de Cálculo

### 3.1 — Calculadora de stats
- **Archivo nuevo**: `src/engine/statCalculator.ts`
- Funciones:
  - `calculateHP(base, iv, ev, level)` → HP final
  - `calculateStat(base, iv, ev, level, natureMult)` → stat final
  - `calculateAllStats(bases, ivs, evs, level, nature)` → `Stats` completa
  - `natureMultiplier(nature, statKey)` → 1.1 | 1.0 | 0.9
- Fórmulas (Gen 3+):
  - HP: `floor((2*Base + IV + floor(EV/4)) * Level/100) + Level + 10`
  - Stat: `floor((floor((2*Base + IV + floor(EV/4)) * Level/100) + 5) * Nature)`

### 3.2 — Calculadora de daño
- **Archivo nuevo**: `src/engine/damageCalculator.ts`
- Función principal:
```ts
function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  config: BattleConfig
): DamageResult
```
- `DamageResult`:
```ts
interface DamageResult {
  minDamage: number
  maxDamage: number
  avgDamage: number
  minPercent: number  // % HP del defensor
  maxPercent: number
  avgPercent: number
  effectiveness: number  // 0, 0.25, 0.5, 1, 2, 4
  stab: boolean
  critPossible: boolean
  ohko: boolean  // one-hit knockout?
  twHko: boolean // two-hit knockout?
  thHko: boolean // three-hit knockout?
}
```
- Fórmula simplificada (sin random, sin weather, sin items):
  - `base = floor(floor(floor(2*Level/5) + 2) * Power * A / D / 50) + 2`
  - `STAB = 1.5 si move.type ∈ attacker.types, 1 si no`
  - `Type = effectiveness chart`
  - `final = floor(base * STAB * Type)`
  - Para rango: calcular con A=neutral y A=+1 stage (o simplemente mostrar min/max como base_damage × 0.85 × 1.0 para simular random)
- Stats del atacante/defensor calculados con IVs/EVs/nivel

### 3.3 — Analizador de mejor movimiento
- **Archivo nuevo**: `src/engine/moveAnalyzer.ts`
- Para unPokemon dado, encontrar el movimiento de mayor daño contra un defensor específico
- Agrupar por tipo de movimiento (physical/special/status)
- Mostrar top 3 movimientos por categoría

---

## Fase 4: API y Datos

### 4.1 — Expandir fetch de Pokemon
- **Archivo**: `src/api/pokeApi.ts`
- Eliminar restricción de Gen3 en `getNameList()` → fetch todos (1025)
- Eliminar `GEN3_TYPE_FIXES` completo
- Seleccionar sprites por generación con prioridad:
  1. `generation-v.black-white.animated` (sprites animados Gen 5)
  2. `generation-iv.diamond-pearl` (Gen 4)
  3. `generation-iii.firered-leafgreen` (Gen 3)
  4. `front_default` (fallback)
- Mantener caché en localStorage pero separar Gen3 de Gen9

### 4.2 — Fetch de movimientos por Pokemon
- **Archivo**: `src/api/pokeApi.ts`
- Cuando se busca un Pokemon, también extraer su lista de movimientos del endpoint
- Hacer match contra nuestra base curated de ~200 movimientos
- Retornar solo los movimientos que están en nuestra base y que el Pokemon puede aprender
- Incluir método de aprendizaje (level-up, TM, tutor)

### 4.3 — Optimización de rendimiento
- Cachear la lista de nombres completa (1025 items) en localStorage
- Lazy loading de sprites (solo cargar cuando el Pokemon se selecciona)
- Paginación virtual para el datalist (usar virtual scroll o paginación por teclado)

---

## Fase 5: Componentes UI

### 5.1 — Panel de Stats Mejorado
- **Archivo**: `src/components/StatsPanel.tsx`
- Agregar selector de nivel (1-100, default 50)
- Agregar configurador de IVs (6 sliders 0-31, o inputs numéricos)
- Agregar configurador de EVs (6 inputs 0-252, con validación de total ≤ 510)
- Agregar selector de naturaleza (dropdown de 25 opciones)
- Mostrar stats calculados (no base stats) con nivel/IVs/EVs/naturaleza
- Indicador visual de IVs: barra de color (rojo <10, naranja 10-20, verde 21-31)
- Indicador de EVs totales consumidos (显示 "488/510")

### 5.2 — Simulador de Batalla
- **Archivo nuevo**: `src/components/BattleSimulator.tsx`
- Layout: dos paneles lado a lado (atacante vs defensor)
- Cada panel muestra: sprite, nombre, nivel, stats calculados, IVs/EVs, naturaleza
- Selector de movimiento para el atacante (dropdown o lista de sus movimientos aprendidos)
- Botón "Calcular Daño"
- Resultado: daño estimado (min/max/avg), % HP, efectividad, STAB, OHKO/2HKO/3HKO
- Animación estilo GBA: barras de HP que bajan

### 5.3 — Selector de Movimiento
- **Archivo nuevo**: `src/components/MoveSelector.tsx`
- Lista de movimientos del Pokemon (filtrados de los ~200 curated)
- Cada movimiento muestra: nombre, tipo (badge), poder, precisión, categoría (F/S), prioridad
- Hover: tooltip con descripción
- Click: selecciona el movimiento para el cálculo

### 5.4 — Panel de Movimientos
- **Archivo nuevo**: `src/components/MovesPanel.tsx`
- Lista completa de movimientos del Pokemon
- Agrupados por método de aprendizaje (level-up, TM, tutor)
- Ordenados por nivel de aprendizaje
- Incluir nombre, tipo, poder, precisión, PP

### 5.5 — Actualizar BattleScene
- **Archivo**: `src/components/BattleScene.tsx`
- Agregar nivel editable (click para cambiar)
- Agregar HP bar real (calculado con IVs/EVs/nivel)
- Mostrar stats calculados (no base stats)

### 5.6 — Actualizar App.tsx
- **Archivo**: `src/App.tsx`
- Agregar tabs/sección para "Simulador de Batalla"
- Mantener la funcionalidad actual de calculadora de tipos
- Dos modos: "Analizar" (actual) y "Simular Batalla" (nuevo)

---

## Fase 6: Internacionalización

### 6.1 — Actualizar strings
- **Archivo**: `src/i18n/strings.ts`
- Agregar strings para:
  - Nuevas categorías de movimientos
  - Labels de IVs, EVs, Niveles, Naturalezas
  - Textos del simulador de batalla
  - "Daño estimado", "Golpe letal", "2-3 golpes", etc.

---

## Fase 7: Tests

### 7.1 — Tests del motor de stats
- **Archivo nuevo**: `src/engine/statCalculator.test.ts`
- Test HP formula con valores conocidos (Charizard Nv50, IVs 31, EVs 0)
- Test stat formula con naturaleza boost/neutral/reduce
- Test IVs 0 vs IVs 31 (rango de stats)
- Test EVs 252 max vs 0

### 7.2 — Tests del motor de daño
- **Archivo nuevo**: `src/engine/damageCalculator.test.ts`
- Test daño base (sin STAB, neutral)
- Test STAB (1.5x)
- Test efectividad (2x, 0.5x, 0x, 4x)
- Test combinaciones STAB + efectividad
- Test physical vs special (usar Attack vs Defense, SpAtk vs SpDef)
- Test daño OHKO con Pokemon fuerte vs débil

### 7.3 — Tests de la tabla 18×18
- **Archivo**: `src/engine/effectiveness.test.ts`
- Agregar tests para matchups de Hada
- Test: Hada vs Dragón = 2x, Hada vs Lucha = 2x, Hada vs Siniestro = 2x
- Test: Veneno vs Hada = 2x, Acero vs Hada = 2x

### 7.4 — Tests del analizador de movimientos
- **Archivo nuevo**: `src/engine/moveAnalyzer.test.ts`
- Test: encontrar mejor movimiento de fuego contra Pokemon de planta
- Test: ignorar movimientos de estado
- Test: STAB breakers

---

## Fase 8: Verificación Final

### 8.1 — Verificar build
```bash
npm run build      # TypeScript strict sin errores
npm test           # Todos los tests pasan
```

### 8.2 — Casos manuales
- [ ] Buscar "pikachu" → ver todos sus movimientos, calcular daño con Thunderbolt
- [ ] Buscar "mewtwo" → IVs 31/31/31/31/31/31, EVs 252 SpAtk/252 Speed, Nature Modest
- [ ] Calcular Psychic vs Chansey → daño estimado
- [ ] Verificar que Hada funciona correctamente en la tabla de tipos
- [ ] Cambiar nivel 1→100 → stats cambian correctamente
- [ ] Verificar sprites de Pokemon de Gen 8/9 cargan correctamente
- [ ] Toggle ES/EN funciona con todos los textos nuevos

---

## Resumen de Archivos

### Nuevos archivos
| Archivo | Descripción |
|---|---|
| `src/data/moves.ts` | ~200 movimientos curated con stats completos |
| `src/data/natures.ts` | 25 naturalezas con boost/decrease |
| `src/engine/statCalculator.ts` | Fórmulas de stats (HP, Atk, Def, etc.) |
| `src/engine/statCalculator.test.ts` | Tests de cálculo de stats |
| `src/engine/damageCalculator.ts` | Fórmula de daño simplificada |
| `src/engine/damageCalculator.test.ts` | Tests de cálculo de daño |
| `src/engine/moveAnalyzer.ts` | Analizador de mejor movimiento |
| `src/engine/moveAnalyzer.test.ts` | Tests del analizador |
| `src/components/BattleSimulator.tsx` | Simulador de batalla completo |
| `src/components/MoveSelector.tsx` | Selector de movimientos |
| `src/components/MovesPanel.tsx` | Panel de movimientos del Pokemon |
| `src/components/IVConfig.tsx` | Configurador de IVs |
| `src/components/EVConfig.tsx` | Configurador de EVs |

### Archivos modificados
| Archivo | Cambios |
|---|---|
| `src/domain/pokemon.ts` | +Fairy, -MAX_DEX, +Move/IVs/EVs/Nature types |
| `src/domain/typeMeta.ts` | +Fairy color y nombres |
| `src/engine/effectiveness.ts` | 18×18 chart |
| `src/engine/effectiveness.test.ts` | +Fairy tests |
| `src/api/pokeApi.ts` | -Gen3 limit, +multi-gen sprites, +moves fetch |
| `src/api/pokeApi.test.ts` | +Fairy type tests, +Gen9 tests |
| `src/i18n/strings.ts` | +Simulador strings |
| `src/i18n/narrative.ts` | +Fairy en narrativa |
| `src/components/StatsPanel.tsx` | +IVs/EVs/Nature config, stats calculados |
| `src/components/BattleScene.tsx` | +nivel editable, HP bar real |
| `src/App.tsx` | +tabs Analizar/Simular, integrar simulador |

---

## Orden de Ejecución Recomendado

1. **Fase 1** (Dominio) → primero porque todo depende de los tipos
2. **Fase 2** (Datos) → movimientos y naturalezas hardcodeados
3. **Fase 3** (Motor) → statCalculator → damageCalculator → moveAnalyzer
4. **Fase 7.1-7.3** (Tests del motor) → verificar antes de UI
5. **Fase 4** (API) → expandir fetch, sprites multi-gen
6. **Fase 5** (UI) → componentes nuevos y modificados
7. **Fase 6** (i18n) → strings para nuevos componentes
8. **Fase 7.4** (Tests de UI) → tests de integración
9. **Fase 8** (Verificación) → build + tests + casos manuales
