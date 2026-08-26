import type { Stats, IVs, EVs, StatKey, Nature } from '../domain/pokemon';
import { getNatureMultiplier } from '../data/natures';

const STAT_KEYS: StatKey[] = ['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'];

export function calculateHP(base: number, iv: number, ev: number, level: number): number {
  return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + level + 1;
}

export function calculateStat(base: number, iv: number, ev: number, level: number, natureMult: number): number {
  return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * natureMult);
}

export function calculateAllStats(
  bases: Stats,
  ivs: IVs,
  evs: EVs,
  level: number,
  nature: Nature
): Stats {
  const result: Stats = {
    hp: calculateHP(bases.hp, ivs.hp, evs.hp, level),
    attack: 0,
    defense: 0,
    spAtk: 0,
    spDef: 0,
    speed: 0
  };

  for (const key of STAT_KEYS) {
    if (key === 'hp') continue;
    const natureMult = getNatureMultiplier(nature, key);
    result[key] = calculateStat(bases[key], ivs[key], evs[key], level, natureMult);
  }

  return result;
}

export function statToEVsNeeded(base: number, iv: number, targetStat: number, level: number, nature: Nature, stat: StatKey): number {
  if (stat === 'hp') {
    const needed = ((targetStat - level - 10) * 100) / level - 2 * base - iv;
    return Math.max(0, Math.min(252, Math.ceil(needed * 4)));
  }
  const natureMult = getNatureMultiplier(nature, stat);
  const inner = Math.ceil(targetStat / natureMult) - 5;
  const needed = ((inner * 100) / level - 2 * base - iv) * 4;
  return Math.max(0, Math.min(252, Math.ceil(needed)));
}

export function evTotal(evs: EVs): number {
  return evs.hp + evs.attack + evs.defense + evs.spAtk + evs.spDef + evs.speed;
}

export function ivTotal(ivs: IVs): number {
  return ivs.hp + ivs.attack + ivs.defense + ivs.spAtk + ivs.spDef + ivs.speed;
}
