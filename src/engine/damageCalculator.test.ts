import { describe, expect, it } from 'vitest';
import { calculateDamage, findBestMoves, getKOHits } from './damageCalculator';
import type { Pokemon, Move, BattleConfig, Nature, IVs, EVs } from '../domain/pokemon';

const NEUTRAL: Nature = { name: 'Seria', nameEn: 'Serious', increase: null, decrease: null };
const ADAMANT: Nature = { name: 'Adamante', nameEn: 'Adamant', increase: 'attack', decrease: 'spAtk' };

const MAX_IVS: IVs = { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 };
const ZERO_EVS: EVs = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };

const CHARIZARD: Pokemon = {
  id: 6, nameEn: 'Charizard', nameEs: 'Charizard',
  types: ['fire', 'flying'],
  spriteFront: null, spriteBack: null, spriteAnimated: false,
  stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 }
};

const BLISSEY: Pokemon = {
  id: 242, nameEn: 'Blissey', nameEs: 'Blissey',
  types: ['normal'],
  spriteFront: null, spriteBack: null, spriteAnimated: false,
  stats: { hp: 255, attack: 10, defense: 10, spAtk: 75, spDef: 135, speed: 55 }
};

const CLEFABLE: Pokemon = {
  id: 36, nameEn: 'Clefable', nameEs: 'Clefable',
  types: ['fairy'],
  spriteFront: null, spriteBack: null, spriteAnimated: false,
  stats: { hp: 95, attack: 70, defense: 73, spAtk: 95, spDef: 90, speed: 60 }
};

const GARCHOMP: Pokemon = {
  id: 445, nameEn: 'Garchomp', nameEs: 'Garchomp',
  types: ['dragon', 'ground'],
  spriteFront: null, spriteBack: null, spriteAnimated: false,
  stats: { hp: 108, attack: 130, defense: 95, spAtk: 80, spDef: 85, speed: 102 }
};

const FLAMETHROWER: Move = {
  id: 53, nameEn: 'Flamethrower', nameEs: 'Lanzallamas',
  type: 'fire', category: 'special', power: 90, accuracy: 100,
  pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'burn',
  description: 'Rayo de fuego que puede causar quemaduras.'
};

const EARTHQUAKE: Move = {
  id: 89, nameEn: 'Earthquake', nameEs: 'Terremoto',
  type: 'ground', category: 'physical', power: 100, accuracy: 100,
  pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: null,
  description: 'Sacro telúrico de gran potencia.'
};

const THUNDERBOLT: Move = {
  id: 85, nameEn: 'Thunderbolt', nameEs: 'Rayo',
  type: 'electric', category: 'special', power: 90, accuracy: 100,
  pp: 15, priority: 0, critRate: 0, effectChance: 10, ailment: 'paralysis',
  description: 'Rayo eléctrico que puede paralizar.'
};

const TOXIC: Move = {
  id: 92, nameEn: 'Toxic', nameEs: 'Tóxico',
  type: 'poison', category: 'status', power: null, accuracy: 90,
  pp: 10, priority: 0, critRate: 0, effectChance: null, ailment: 'badly poisoned',
  description: 'Veneno severo que incrementa cada turno.'
};

const MOONBLAST: Move = {
  id: 585, nameEn: 'Moonblast', nameEs: 'Caramelo Lua',
  type: 'fairy', category: 'special', power: 95, accuracy: 100,
  pp: 15, priority: 0, critRate: 0, effectChance: 30, ailment: null,
  description: 'Energía lunar que puede bajar Sp.Atk.'
};

const config: Partial<BattleConfig> = {
  attackerLevel: 50,
  defenderLevel: 50,
  attackerIVs: MAX_IVS,
  attackerEVs: ZERO_EVS,
  defenderIVs: MAX_IVS,
  defenderEVs: ZERO_EVS,
  attackerNature: NEUTRAL,
  defenderNature: NEUTRAL
};

describe('calculateDamage', () => {
  it('Status moves return null', () => {
    const result = calculateDamage(CHARIZARD, BLISSEY, TOXIC, config);
    expect(result).toBeNull();
  });

  it('Flamethrower vs Blissey does positive damage', () => {
    const result = calculateDamage(CHARIZARD, BLISSEY, FLAMETHROWER, config)!;
    expect(result.minDamage).toBeGreaterThan(0);
    expect(result.maxDamage).toBeGreaterThanOrEqual(result.minDamage);
    expect(result.avgDamage).toBeGreaterThan(0);
  });

  it('STAB is applied when move type matches attacker type', () => {
    const result = calculateDamage(CHARIZARD, BLISSEY, FLAMETHROWER, config)!;
    expect(result.stab).toBe(true);
  });

  it('No STAB when types differ', () => {
    const result = calculateDamage(CHARIZARD, BLISSEY, THUNDERBOLT, config)!;
    expect(result.stab).toBe(false);
  });

  it('Effectiveness is calculated correctly', () => {
    const result = calculateDamage(CHARIZARD, GARCHOMP, FLAMETHROWER, config)!;
    expect(result.effectiveness).toBe(0.5);
    expect(result.stab).toBe(true);
  });

  it('Fairy vs Dragon is super effective (2x)', () => {
    const result = calculateDamage(CLEFABLE, GARCHOMP, MOONBLAST, config)!;
    expect(result.effectiveness).toBe(2);
  });

  it('OHKO detection works', () => {
    const result = calculateDamage(CHARIZARD, CLEFABLE, EARTHQUAKE, {
      ...config,
      attackerNature: ADAMANT,
      attackerEVs: { hp: 0, attack: 252, defense: 0, spAtk: 0, spDef: 0, speed: 0 }
    })!;
    expect(result.maxPercent).toBeGreaterThan(0);
  });

  it('Percentages are clamped to 100', () => {
    const result = calculateDamage(CHARIZARD, CLEFABLE, EARTHQUAKE, config)!;
    expect(result.maxPercent).toBeLessThanOrEqual(100);
    expect(result.minPercent).toBeLessThanOrEqual(100);
  });
});

describe('findBestMoves', () => {
  it('Returns moves sorted by damage', () => {
    const best = findBestMoves(CHARIZARD, GARCHOMP, config, 5);
    expect(best.length).toBeLessThanOrEqual(5);
    for (let i = 1; i < best.length; i++) {
      expect(best[i - 1].result.avgDamage).toBeGreaterThanOrEqual(best[i].result.avgDamage);
    }
  });

  it('Does not include status moves', () => {
    const best = findBestMoves(CHARIZARD, BLISSEY, config, 50);
    for (const { move } of best) {
      expect(move.category).not.toBe('status');
    }
  });
});

describe('getKOHits', () => {
  it('0 damage returns -', () => {
    expect(getKOHits(0, 100)).toBe('-');
  });

  it('OHKO when damage >= HP', () => {
    expect(getKOHits(100, 100)).toBe('OHKO');
    expect(getKOHits(150, 100)).toBe('OHKO');
  });

  it('2HKO when damage < HP but 2*damage >= HP', () => {
    expect(getKOHits(60, 100)).toBe('2HKO');
  });

  it('3HKO when 2*damage < HP but 3*damage >= HP', () => {
    expect(getKOHits(40, 100)).toBe('3HKO');
  });

  it('Higher hit count', () => {
    expect(getKOHits(10, 100)).toBe('10HKO');
  });
});
