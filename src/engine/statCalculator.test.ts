import { describe, expect, it } from 'vitest';
import { calculateHP, calculateStat, calculateAllStats, evTotal, ivTotal } from './statCalculator';
import type { Nature, IVs, EVs, Stats } from '../domain/pokemon';

const NEUTRAL: Nature = { name: 'Seria', nameEn: 'Serious', increase: null, decrease: null };

const MAX_IVS: IVs = { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 };
const ZERO_EVS: EVs = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
const MAX_EVS: EVs = { hp: 252, attack: 252, defense: 252, spAtk: 252, spDef: 252, speed: 252 };

describe('calculateHP', () => {
  it('Charizard base 78 HP, lv50, IV31, EV0 = 144', () => {
    expect(calculateHP(78, 31, 0, 50)).toBe(144);
  });

  it('Charizard base 78 HP, lv50, IV0, EV0 = 129', () => {
    expect(calculateHP(78, 0, 0, 50)).toBe(129);
  });

  it('Blissey base 255 HP, lv100, IV31, EV252 = 705', () => {
    expect(calculateHP(255, 31, 252, 100)).toBe(705);
  });

  it('Shedinja-like low base, lv5, IV0, EV0 = 6', () => {
    expect(calculateHP(1, 0, 0, 5)).toBe(6);
  });
});

describe('calculateStat (non-HP)', () => {
  it('Charizard attack 84, lv50, IV31, EV0, neutral = 104', () => {
    expect(calculateStat(84, 31, 0, 50, 1)).toBe(104);
  });

  it('Charizard spAtk 109, lv50, IV31, EV0, neutral = 129', () => {
    expect(calculateStat(109, 31, 0, 50, 1)).toBe(129);
  });

  it('Adamant nature boosts Attack by 10%', () => {
    const neutral = calculateStat(100, 31, 0, 50, 1);
    const adamant = calculateStat(100, 31, 0, 50, 1.1);
    expect(adamant).toBe(Math.floor(neutral * 1.1));
  });

  it('Modest nature lowers Attack by 10%', () => {
    const neutral = calculateStat(100, 31, 0, 50, 1);
    const modest = calculateStat(100, 31, 0, 50, 0.9);
    expect(modest).toBe(Math.floor(neutral * 0.9));
  });

  it('EVs 252 add 63 to stat at lv100', () => {
    const noEv = calculateStat(100, 31, 0, 100, 1);
    const maxEv = calculateStat(100, 31, 252, 100, 1);
    expect(maxEv - noEv).toBe(63);
  });

  it('IVs 31 vs IVs 0 adds 31 points at lv100', () => {
    const zeroIv = calculateStat(100, 0, 0, 100, 1);
    const maxIv = calculateStat(100, 31, 0, 100, 1);
    expect(maxIv - zeroIv).toBe(31);
  });
});

describe('calculateAllStats', () => {
  const charizardBases: Stats = { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 };

  it('Charizard lv50, all IV31, all EV0, neutral nature', () => {
    const stats = calculateAllStats(charizardBases, MAX_IVS, ZERO_EVS, 50, NEUTRAL);
    expect(stats.hp).toBe(144);
    expect(stats.attack).toBe(104);
    expect(stats.defense).toBe(98);
    expect(stats.spAtk).toBe(129);
    expect(stats.spDef).toBe(105);
    expect(stats.speed).toBe(120);
  });

  it('Charizard lv100, all IV31, all EV252, neutral nature', () => {
    const stats = calculateAllStats(charizardBases, MAX_IVS, MAX_EVS, 100, NEUTRAL);
    expect(stats.hp).toBe(351);
    expect(stats.attack).toBe(267);
    expect(stats.defense).toBe(255);
    expect(stats.spAtk).toBe(317);
    expect(stats.spDef).toBe(269);
    expect(stats.speed).toBe(299);
  });
});

describe('evTotal and ivTotal', () => {
  it('evTotal counts all EVs', () => {
    expect(evTotal(MAX_EVS)).toBe(252 * 6);
  });

  it('ivTotal counts all IVs', () => {
    expect(ivTotal(MAX_IVS)).toBe(31 * 6);
  });

  it('Zero EVs = 0', () => {
    expect(evTotal(ZERO_EVS)).toBe(0);
  });
});
