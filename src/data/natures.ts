import type { Nature, StatKey } from '../domain/pokemon';

export const NATURES: Nature[] = [
  { name: 'Fuerte', nameEn: 'Hardy', increase: null, decrease: null },
  { name: 'Huraña', nameEn: 'Lonely', increase: 'attack', decrease: 'defense' },
  { name: 'Audaz', nameEn: 'Brave', increase: 'attack', decrease: 'speed' },
  { name: 'Adamante', nameEn: 'Adamant', increase: 'attack', decrease: 'spAtk' },
  { name: 'Osada', nameEn: 'Naughty', increase: 'attack', decrease: 'spDef' },
  { name: 'Osada', nameEn: 'Bold', increase: 'defense', decrease: 'attack' },
  { name: 'Grosera', nameEn: 'Docile', increase: null, decrease: null },
  { name: 'Relajada', nameEn: 'Relaxed', increase: 'defense', decrease: 'speed' },
  { name: 'Agitada', nameEn: 'Impish', increase: 'defense', decrease: 'spAtk' },
  { name: 'Perezosa', nameEn: 'Lax', increase: 'defense', decrease: 'spDef' },
  { name: 'Timida', nameEn: 'Timid', increase: 'speed', decrease: 'attack' },
  { name: 'Activa', nameEn: 'Hasty', increase: 'speed', decrease: 'defense' },
  { name: 'Seria', nameEn: 'Serious', increase: null, decrease: null },
  { name: 'Firme', nameEn: 'Jolly', increase: 'speed', decrease: 'spAtk' },
  { name: 'Ingenua', nameEn: 'Naive', increase: 'speed', decrease: 'spDef' },
  { name: 'Modesta', nameEn: 'Modest', increase: 'spAtk', decrease: 'attack' },
  { name: 'Mansa', nameEn: 'Mild', increase: 'spAtk', decrease: 'defense' },
  { name: 'Informal', nameEn: 'Quiet', increase: 'spAtk', decrease: 'speed' },
  { name: 'Rara', nameEn: 'Bashful', increase: null, decrease: null },
  { name: 'Pingona', nameEn: 'Rash', increase: 'spAtk', decrease: 'spDef' },
  { name: 'Calmada', nameEn: 'Calm', increase: 'spDef', decrease: 'attack' },
  { name: 'Gentil', nameEn: 'Gentle', increase: 'spDef', decrease: 'defense' },
  { name: 'Caída', nameEn: 'Sassy', increase: 'spDef', decrease: 'speed' },
  { name: 'Amable', nameEn: 'Careful', increase: 'spDef', decrease: 'spAtk' },
  { name: 'Floja', nameEn: 'Quirky', increase: null, decrease: null }
];

export function getNatureMultiplier(nature: Nature, stat: StatKey): number {
  if (stat === 'hp') return 1;
  if (nature.increase === stat) return 1.1;
  if (nature.decrease === stat) return 0.9;
  return 1;
}
