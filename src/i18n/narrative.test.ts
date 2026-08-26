import { describe, expect, it } from 'vitest';
import { analyzeDefensive, groupByCategory } from '../engine/effectiveness';
import { buildNarrative, displayName } from './narrative';
import { joinList } from './strings';
import type { Pokemon } from '../domain/pokemon';

const CHARIZARD: Pokemon = {
  id: 6,
  nameEn: 'charizard',
  nameEs: 'Charizard',
  types: ['fire', 'flying'],
  spriteFront: null,
  spriteBack: null,
  spriteAnimated: false,
  stats: { hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 }
};

describe('joinList', () => {
  it('usa "y" en español y "and" en inglés', () => {
    expect(joinList(['AGUA', 'ELÉCTRICO'], 'es')).toBe('AGUA y ELÉCTRICO');
    expect(joinList(['WATER', 'ELECTRIC'], 'en')).toBe('WATER and ELECTRIC');
  });
});

describe('displayName', () => {
  it('localiza según idioma y capitaliza el inglés', () => {
    expect(displayName(CHARIZARD, 'es')).toBe('Charizard');
    expect(displayName(CHARIZARD, 'en')).toBe('Charizard');
  });
});

describe('buildNarrative', () => {
  it('charizard en español menciona MUY DÉBIL ante ROCA e INMUNE a TIERRA', () => {
    const groups = groupByCategory(analyzeDefensive(CHARIZARD.types));
    const text = buildNarrative('CHARIZARD', groups, 'es');
    expect(text).toContain('MUY DÉBIL ante ROCA');
    expect(text).not.toContain('ante AGUA');
    expect(text).toContain('Resiste FUEGO, LUCHA y ACERO');
    expect(text).toContain('INMUNE a TIERRA');
  });

  it('charizard en inglés usa "VERY WEAK against ROCK"', () => {
    const groups = groupByCategory(analyzeDefensive(CHARIZARD.types));
    const text = buildNarrative('CHARIZARD', groups, 'en');
    expect(text).toContain('VERY WEAK against ROCK');
    expect(text).toContain('IMMUNE to GROUND');
  });
});
