export const MAX_DEX = 386;

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel'
] as const;

export type TypeName = (typeof POKEMON_TYPES)[number];

export type Mult = 0 | 0.5 | 1 | 2;

export type StatKey = 'hp' | 'attack' | 'defense' | 'spAtk' | 'spDef' | 'speed';

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  nameEn: string;
  nameEs: string;
  types: TypeName[];
  spriteFront: string | null;
  spriteBack: string | null;
  stats: Stats;
}

export type Category = 'quad' | 'double' | 'neutral' | 'half' | 'quarter' | 'immune';

export const CATEGORY_ORDER: readonly Category[] = [
  'quad',
  'double',
  'neutral',
  'half',
  'quarter',
  'immune'
];

export interface EffectivenessEntry {
  type: TypeName;
  mult: number;
}

export interface OffensiveEntry {
  type: TypeName;
  mult: number;
  attacker: TypeName;
}
