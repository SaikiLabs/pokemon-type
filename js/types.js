'use strict';

const TYPES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting',
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost',
  'dragon', 'dark', 'steel'
];

const TYPE_CHART = {
  normal:   { ghost: 0 },
  fire:     { fire: .5, water: .5, grass: 2, ice: 2, bug: 2, rock: .5, dragon: .5, steel: 2 },
  water:    { fire: 2, water: .5, grass: .5, ground: 2, rock: 2, dragon: .5 },
  electric: { water: 2, electric: .5, grass: .5, ground: 0, flying: 2, dragon: .5 },
  grass:    { fire: .5, water: 2, grass: .5, poison: .5, ground: 2, flying: .5, bug: .5, rock: 2, dragon: .5, steel: .5 },
  ice:      { fire: .5, water: .5, grass: 2, ice: .5, ground: 2, flying: 2, dragon: 2, steel: .5 },
  fighting: { normal: 2, ice: 2, poison: .5, flying: .5, psychic: .5, bug: .5, rock: 2, ghost: 0, dark: 2, steel: 2 },
  poison:   { grass: 2, poison: .5, ground: .5, rock: .5, ghost: .5, steel: 0 },
  ground:   { fire: 2, electric: 2, grass: .5, poison: 2, flying: 0, bug: .5, rock: 2, steel: 2 },
  flying:   { electric: .5, grass: 2, fighting: 2, bug: 2, rock: .5, steel: .5 },
  psychic:  { fighting: 2, poison: 2, psychic: .5, dark: 0, steel: .5 },
  bug:      { fire: .5, grass: 2, fighting: .5, poison: .5, flying: .5, psychic: 2, ghost: .5, dark: 2, steel: .5 },
  rock:     { fire: 2, ice: 2, fighting: .5, ground: .5, flying: 2, bug: 2, steel: .5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: .5, steel: .5 },
  dragon:   { dragon: 2, steel: .5 },
  dark:     { fighting: .5, psychic: 2, ghost: 2, dark: .5, steel: .5 },
  steel:    { fire: .5, water: .5, electric: .5, ice: 2, rock: 2, steel: .5 }
};

const TYPE_COLORS = {
  normal: '#A8A878', fire: '#F08030', water: '#6890F0', electric: '#F8D030',
  grass: '#78C850', ice: '#98D8D8', fighting: '#C03028', poison: '#A040A0',
  ground: '#E0C068', flying: '#A890F0', psychic: '#F85888', bug: '#A8B820',
  rock: '#B8A038', ghost: '#705898', dragon: '#7038F8', dark: '#705848',
  steel: '#B8B8D0'
};

const TYPE_NAMES = {
  es: {
    normal: 'Normal', fire: 'Fuego', water: 'Agua', electric: 'Eléctrico',
    grass: 'Planta', ice: 'Hielo', fighting: 'Lucha', poison: 'Veneno',
    ground: 'Tierra', flying: 'Volador', psychic: 'Psíquico', bug: 'Bicho',
    rock: 'Roca', ghost: 'Fantasma', dragon: 'Dragón', dark: 'Siniestro',
    steel: 'Acero'
  },
  en: {
    normal: 'Normal', fire: 'Fire', water: 'Water', electric: 'Electric',
    grass: 'Grass', ice: 'Ice', fighting: 'Fighting', poison: 'Poison',
    ground: 'Ground', flying: 'Flying', psychic: 'Psychic', bug: 'Bug',
    rock: 'Rock', ghost: 'Ghost', dragon: 'Dragon', dark: 'Dark',
    steel: 'Steel'
  }
};

const CATEGORY_ORDER = ['quad', 'double', 'neutral', 'half', 'quarter', 'immune'];

function getMultiplier(atkType, defTypes) {
  let mult = 1;
  for (const def of defTypes) {
    const row = TYPE_CHART[atkType] || {};
    mult *= (row[def] !== undefined) ? row[def] : 1;
  }
  return mult;
}

function classify(mult) {
  if (mult === 0) return 'immune';
  if (mult < 0.5) return 'quarter';
  if (mult < 1) return 'half';
  if (mult === 1) return 'neutral';
  if (mult <= 2) return 'double';
  return 'quad';
}

function analyzeDefensive(defTypes) {
  return TYPES.map(function (atk) {
    return { type: atk, mult: getMultiplier(atk, defTypes) };
  });
}

function analyzeOffensive(atkTypes) {
  return TYPES.map(function (def) {
    let best = 0;
    let bestAtk = atkTypes[0];
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

function groupByCategory(entries) {
  const groups = {};
  for (const cat of CATEGORY_ORDER) groups[cat] = [];
  for (const e of entries) groups[classify(e.mult)].push(e);
  return groups;
}

function formatMult(mult) {
  return '×' + mult;
}
