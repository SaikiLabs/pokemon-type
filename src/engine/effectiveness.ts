import { POKEMON_TYPES, CATEGORY_ORDER, type Category, type EffectivenessEntry, type Mult, type OffensiveEntry, type TypeName } from '../domain/pokemon';

export const TYPE_CHART: Record<TypeName, Partial<Record<TypeName, Mult>>> = {
  normal:   { ghost: 0 },
  fire:     { fire: .5, water: .5, grass: 2, ice: 2, bug: 2, rock: .5, dragon: .5, steel: 2 },
  water:    { fire: 2, water: .5, grass: .5, ground: 2, rock: 2, dragon: .5 },
  electric: { water: 2, electric: .5, grass: .5, ground: 0, flying: 2, dragon: .5 },
  grass:    { fire: .5, water: 2, grass: .5, poison: .5, ground: 2, flying: .5, bug: .5, rock: 2, dragon: .5, steel: .5 },
  ice:      { fire: .5, water: .5, grass: 2, ice: .5, ground: 2, flying: 2, dragon: 2, steel: .5 },
  fighting: { normal: 2, ice: 2, poison: .5, flying: .5, psychic: .5, bug: .5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: .5 },
  poison:   { grass: 2, poison: .5, ground: .5, rock: .5, ghost: .5, steel: 0, fairy: 2 },
  ground:   { fire: 2, electric: 2, grass: .5, poison: 2, flying: 0, bug: .5, rock: 2, steel: 2 },
  flying:   { electric: .5, grass: 2, fighting: 2, bug: 2, rock: .5, steel: .5 },
  psychic:  { fighting: 2, poison: 2, psychic: .5, dark: 0, steel: .5 },
  bug:      { fire: .5, grass: 2, fighting: .5, poison: .5, flying: .5, psychic: 2, ghost: .5, dark: 2, steel: .5, fairy: .5 },
  rock:     { fire: 2, ice: 2, fighting: .5, ground: .5, flying: 2, bug: 2, steel: .5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: .5, steel: .5 },
  dragon:   { dragon: 2, steel: .5, fairy: 0 },
  dark:     { fighting: .5, psychic: 2, ghost: 2, dark: .5, steel: .5, fairy: .5 },
  steel:    { fire: .5, water: .5, electric: .5, ice: 2, rock: 2, steel: .5, fairy: 2 },
  fairy:    { fighting: 2, poison: .5, dragon: 2, dark: 2, steel: .5 }
};

export function getMultiplier(atkType: TypeName, defTypes: readonly TypeName[]): number {
  let mult = 1;
  for (const def of defTypes) {
    const m = TYPE_CHART[atkType][def];
    mult *= m !== undefined ? m : 1;
  }
  return mult;
}

export function classify(mult: number): Category {
  if (mult === 0) return 'immune';
  if (mult < 0.5) return 'quarter';
  if (mult < 1) return 'half';
  if (mult === 1) return 'neutral';
  if (mult <= 2) return 'double';
  return 'quad';
}

export function analyzeDefensive(defTypes: readonly TypeName[]): EffectivenessEntry[] {
  return POKEMON_TYPES.map((atk) => ({ type: atk, mult: getMultiplier(atk, defTypes) }));
}

export function analyzeOffensive(atkTypes: readonly TypeName[]): OffensiveEntry[] {
  return POKEMON_TYPES.map((def) => {
    let best = 0;
    let bestAtk: TypeName = atkTypes[0];
    for (const atk of atkTypes) {
      const m = getMultiplier(atk, [def]);
      if (m > best) {
        best = m;
        bestAtk = atk;
      }
    }
    return { type: def, mult: best, attacker: bestAtk };
  });
}

export function groupByCategory<T extends { mult: number }>(entries: readonly T[]): Record<Category, T[]> {
  const groups = {} as Record<Category, T[]>;
  for (const cat of CATEGORY_ORDER) groups[cat] = [];
  for (const e of entries) groups[classify(e.mult)].push(e);
  return groups;
}

export function formatMult(mult: number): string {
  return '×' + String(mult);
}
