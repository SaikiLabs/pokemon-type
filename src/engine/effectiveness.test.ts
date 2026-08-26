import { describe, expect, it } from 'vitest';
import { analyzeDefensive, classify, getMultiplier, groupByCategory } from './effectiveness';

describe('getMultiplier (casos canónicos)', () => {
  const cases: Array<[string, Parameters<typeof getMultiplier>, number]> = [
    ['charizard × roca', ['rock', ['fire', 'flying']], 4],
    ['charizard × agua', ['water', ['fire', 'flying']], 2],
    ['charizard × eléctrico', ['electric', ['fire', 'flying']], 2],
    ['charizard × tierra', ['ground', ['fire', 'flying']], 0],
    ['swampert × eléctrico', ['electric', ['water', 'ground']], 0],
    ['swampert × planta', ['grass', ['water', 'ground']], 4],
    ['magnemite × tierra', ['ground', ['electric', 'steel']], 4],
    ['magnemite × lucha', ['fighting', ['electric', 'steel']], 2],
    ['magnemite × fuego', ['fire', ['electric', 'steel']], 2],
    ['umbreon × psíquico', ['psychic', ['dark']], 0],
    ['umbreon × lucha', ['fighting', ['dark']], 2],
    ['gastly × normal', ['normal', ['ghost', 'poison']], 0],
    ['gastly × lucha', ['fighting', ['ghost', 'poison']], 0],
    ['gastly × psíquico', ['psychic', ['ghost', 'poison']], 2]
  ];

  it.each(cases)('%s', (_label, [atk, def], expected) => {
    expect(getMultiplier(atk, def)).toBe(expected);
  });
});

describe('Fairy type matchups', () => {
  it('Fairy vs Dragon = 2x', () => {
    expect(getMultiplier('fairy', ['dragon'])).toBe(2);
  });

  it('Fairy vs Fighting = 2x', () => {
    expect(getMultiplier('fairy', ['fighting'])).toBe(2);
  });

  it('Fairy vs Dark = 2x', () => {
    expect(getMultiplier('fairy', ['dark'])).toBe(2);
  });

  it('Poison vs Fairy = 2x', () => {
    expect(getMultiplier('poison', ['fairy'])).toBe(2);
  });

  it('Steel vs Fairy = 2x', () => {
    expect(getMultiplier('steel', ['fairy'])).toBe(2);
  });

  it('Fairy is immune to Dragon', () => {
    expect(getMultiplier('dragon', ['fairy'])).toBe(0);
  });

  it('Fairy resists Fighting (0.5x)', () => {
    expect(getMultiplier('fighting', ['fairy'])).toBe(0.5);
  });

  it('Fairy resists Bug (0.5x)', () => {
    expect(getMultiplier('bug', ['fairy'])).toBe(0.5);
  });

  it('Fairy resists Dark (0.5x)', () => {
    expect(getMultiplier('dark', ['fairy'])).toBe(0.5);
  });

  it('Gardevoir (Psychic/Fairy) weak to Poison and Steel', () => {
    expect(getMultiplier('poison', ['psychic', 'fairy'])).toBe(2);
    expect(getMultiplier('steel', ['psychic', 'fairy'])).toBe(2);
  });

  it('Garchomp (Dragon/Ground) immune to Electric, weak to Fairy/Ice/Dragon', () => {
    expect(getMultiplier('electric', ['dragon', 'ground'])).toBe(0);
    expect(getMultiplier('fairy', ['dragon', 'ground'])).toBe(2);
    expect(getMultiplier('ice', ['dragon', 'ground'])).toBe(4);
  });
});

describe('classify', () => {
  it.each([
    [0, 'immune'],
    [0.25, 'quarter'],
    [0.5, 'half'],
    [1, 'neutral'],
    [2, 'double'],
    [4, 'quad']
  ] as const)('classify(%s) → %s', (mult, category) => {
    expect(classify(mult)).toBe(category);
  });
});

describe('analyzeDefensive + groupByCategory', () => {
  it('Charizard agrupa en las categorías correctas', () => {
    const groups = groupByCategory(analyzeDefensive(['fire', 'flying']));
    expect(groups.quad.map((e) => e.type)).toEqual(['rock']);
    expect([...groups.double.map((e) => e.type)].sort()).toEqual(['electric', 'water']);
    expect(groups.immune.map((e) => e.type)).toEqual(['ground']);
    const total = Object.values(groups).reduce((n, list) => n + list.length, 0);
    expect(total).toBe(18);
  });

  it('Swampert es inmune a eléctrico y muy débil a planta', () => {
    const groups = groupByCategory(analyzeDefensive(['water', 'ground']));
    expect(groups.immune.map((e) => e.type)).toEqual(['electric']);
    expect(groups.quad.map((e) => e.type)).toEqual(['grass']);
  });

  it('Sylveon (Fairy) resists Fighting, Bug, Dark; immune to Dragon', () => {
    const groups = groupByCategory(analyzeDefensive(['fairy']));
    expect(groups.immune.map((e) => e.type)).toEqual(['dragon']);
    expect(groups.half.map((e) => e.type).sort()).toEqual(['bug', 'dark', 'fighting']);
  });
});
