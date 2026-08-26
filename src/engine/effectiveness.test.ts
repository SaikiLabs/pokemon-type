import { describe, expect, it } from 'vitest';
import { analyzeDefensive, classify, getMultiplier, groupByCategory } from './effectiveness';

describe('getMultiplier (casos canónicos Gen 3)', () => {
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
    expect(total).toBe(17);
  });

  it('Swampert es inmune a eléctrico y muy débil a planta', () => {
    const groups = groupByCategory(analyzeDefensive(['water', 'ground']));
    expect(groups.immune.map((e) => e.type)).toEqual(['electric']);
    expect(groups.quad.map((e) => e.type)).toEqual(['grass']);
  });
});
