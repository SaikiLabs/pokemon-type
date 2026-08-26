export const MAX_DEX = 1025;

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
  'steel',
  'fairy'
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
  spriteAnimated: boolean;
  stats: Stats;
  moves?: PokemonMove[];
}

export interface PokemonMove {
  name: string;
  url: string;
  learnMethod: string;
  levelLearnedAt: number;
  versionGroup: string;
}

export type MoveCategory = 'physical' | 'special' | 'status';

export interface Move {
  id: number;
  nameEn: string;
  nameEs: string;
  type: TypeName;
  category: MoveCategory;
  power: number | null;
  accuracy: number | null;
  pp: number;
  priority: number;
  critRate: number;
  effectChance: number | null;
  ailment: string | null;
  description: string;
}

export interface IVs {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface EVs {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
}

export interface Nature {
  name: string;
  nameEn: string;
  increase: StatKey | null;
  decrease: StatKey | null;
}

export const DEFAULT_IVS: IVs = { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 };
export const DEFAULT_EVS: EVs = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };

export interface BattleConfig {
  attackerLevel: number;
  defenderLevel: number;
  attackerIVs: IVs;
  attackerEVs: EVs;
  defenderIVs: IVs;
  defenderEVs: EVs;
  attackerNature: Nature;
  defenderNature: Nature;
}

export interface DamageResult {
  minDamage: number;
  maxDamage: number;
  avgDamage: number;
  minPercent: number;
  maxPercent: number;
  avgPercent: number;
  effectiveness: number;
  stab: boolean;
  critPossible: boolean;
  ohko: boolean;
  twHko: boolean;
  thHko: boolean;
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
