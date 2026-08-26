import type { Category, StatKey } from '../domain/pokemon';

export type Lang = 'es' | 'en';

export interface Strings {
  docTitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  loading: string;
  empty: string;
  notFound: string;
  network: string;
  statsTitle: string;
  statsSub: string;
  defTitle: string;
  defSub: string;
  offTitle: string;
  offSub: string;
  lv: string;
  stats: Record<StatKey, string>;
  catDef: Record<Category, string>;
  catOff: Record<Category, string>;
  noNotes: string;
  footer: string;
  tabAnalyze: string;
  tabSimulate: string;
  level: string;
  nature: string;
  ivs: string;
  evs: string;
  ivTotal: string;
  evTotal: string;
  calcDamage: string;
  attacker: string;
  defender: string;
  selectMove: string;
  estimatedDmg: string;
  effectiveness: string;
  stabBonus: string;
  ohko: string;
  twoHko: string;
  threeHko: string;
  movesTitle: string;
  movesSub: string;
  power: string;
  accuracy: string;
  category: string;
  physical: string;
  special: string;
  status: string;
  priority: string;
  bestMoves: string;
  yourPokemon: string;
  rivalPokemon: string;
}

export const STRINGS: Record<Lang, Strings> = {
  es: {
    docTitle: 'Calculadora Pokémon Universal',
    searchPlaceholder: 'Nombre o nº (1–1025)...',
    searchBtn: 'Buscar',
    loading: 'Buscando datos...',
    empty: '¡Escribe un nombre o número para buscar!',
    notFound: '¡Ese Pokémon no existe! Prueba con otro nombre o número.',
    network: 'No se pudo conectar con PokéAPI. Inténtalo de nuevo.',
    statsTitle: 'ESTADÍSTICAS',
    statsSub: 'Base → Calculadas con IVs/EVs/Nivel:',
    defTitle: 'ANÁLISIS DEFENSIVO',
    defSub: 'Daño que RECIBE según el tipo del atacante:',
    offTitle: 'ANÁLISIS OFENSIVO',
    offSub: 'Daño que INFLIGE con sus tipos:',
    lv: 'Nv.50',
    stats: {
      hp: 'PS',
      attack: 'ATAQUE',
      defense: 'DEFENSA',
      spAtk: 'AT. ESP.',
      spDef: 'DEF. ESP.',
      speed: 'VELOCIDAD'
    },
    catDef: {
      immune: 'INMUNE',
      quarter: 'MUY RESISTENTE',
      half: 'RESISTENTE',
      neutral: 'NEUTRAL',
      double: 'DÉBIL',
      quad: 'MUY DÉBIL'
    },
    catOff: {
      immune: 'SIN EFECTO',
      quarter: 'CASÍ SIN EFECTO',
      half: 'POCO EFICAZ',
      neutral: 'EFICAZ',
      double: 'MUY EFICAZ',
      quad: 'DEVASTADOR'
    },
    noNotes: 'No tiene debilidades ni resistencias destacables.',
    footer: 'Datos: PokéAPI · Proyecto fan sin ánimo de lucro · Pokémon © Nintendo / Game Freak',
    tabAnalyze: 'ANALIZAR',
    tabSimulate: 'SIMULAR',
    level: 'NIVEL',
    nature: 'NATURALEZA',
    ivs: 'IVs',
    evs: 'EVs',
    ivTotal: 'Total IVs',
    evTotal: 'Total EVs',
    calcDamage: 'CALCULAR DAÑO',
    attacker: 'ATACANTE',
    defender: 'DEFENSOR',
    selectMove: 'Seleccionar movimiento',
    estimatedDmg: 'DAÑO ESTIMADO',
    effectiveness: 'EFECTIVIDAD',
    stabBonus: 'STAB',
    ohko: 'GOLPE LETAL',
    twoHko: '2 GOLPES',
    threeHko: '3 GOLPES',
    movesTitle: 'MOVIMIENTOS',
    movesSub: 'Movimientos aprendidos:',
    power: 'POT.',
    accuracy: 'PREC.',
    category: 'CATEG.',
    physical: 'FÍSICO',
    special: 'ESP.',
    status: 'ESTADO',
    priority: 'PRIOR.',
    bestMoves: 'MEJORES MOVIMIENTOS',
    yourPokemon: 'TU POKéMON',
    rivalPokemon: 'RIVAL'
  },
  en: {
    docTitle: 'Universal Pokémon Calculator',
    searchPlaceholder: 'Name or № (1–1025)...',
    searchBtn: 'Search',
    loading: 'Fetching data...',
    empty: 'Type a name or number to search!',
    notFound: "That Pokémon doesn't exist! Try another name or number.",
    network: 'Could not reach PokéAPI. Please try again.',
    statsTitle: 'STATS',
    statsSub: 'Base → Calculated with IVs/EVs/Level:',
    defTitle: 'DEFENSIVE ANALYSIS',
    defSub: 'Damage it TAKES based on attacker type:',
    offTitle: 'OFFENSIVE ANALYSIS',
    offSub: 'Damage it DEALS with its types:',
    lv: 'Lv.50',
    stats: {
      hp: 'HP',
      attack: 'ATTACK',
      defense: 'DEFENSE',
      spAtk: 'SP. ATK',
      spDef: 'SP. DEF',
      speed: 'SPEED'
    },
    catDef: {
      immune: 'IMMUNE',
      quarter: 'VERY RESISTANT',
      half: 'RESISTANT',
      neutral: 'NEUTRAL',
      double: 'WEAK',
      quad: 'VERY WEAK'
    },
    catOff: {
      immune: 'NO EFFECT',
      quarter: 'BARELY EFFECTIVE',
      half: 'NOT VERY EFFECTIVE',
      neutral: 'EFFECTIVE',
      double: 'SUPER EFFECTIVE',
      quad: 'DEVASTATING'
    },
    noNotes: 'It has no notable weaknesses or resistances.',
    footer: 'Data: PokéAPI · Non-profit fan project · Pokémon © Nintendo / Game Freak',
    tabAnalyze: 'ANALYZE',
    tabSimulate: 'SIMULATE',
    level: 'LEVEL',
    nature: 'NATURE',
    ivs: 'IVs',
    evs: 'EVs',
    ivTotal: 'IV Total',
    evTotal: 'EV Total',
    calcDamage: 'CALCULATE DAMAGE',
    attacker: 'ATTACKER',
    defender: 'DEFENDER',
    selectMove: 'Select a move',
    estimatedDmg: 'ESTIMATED DAMAGE',
    effectiveness: 'EFFECTIVENESS',
    stabBonus: 'STAB',
    ohko: 'ONE-HIT KO',
    twoHko: '2-HIT KO',
    threeHko: '3-HIT KO',
    movesTitle: 'MOVES',
    movesSub: 'Moves learned:',
    power: 'PWR',
    accuracy: 'ACC',
    category: 'CLASS',
    physical: 'PHYS',
    special: 'SPEC',
    status: 'STATUS',
    priority: 'PRIOR',
    bestMoves: 'BEST MOVES',
    yourPokemon: 'YOUR POKéMON',
    rivalPokemon: 'RIVAL'
  }
};

export function joinList(names: string[], lang: Lang): string {
  if (names.length === 1) return names[0];
  const tail = lang === 'es' ? ' y ' : ' and ';
  return names.slice(0, -1).join(', ') + tail + names[names.length - 1];
}

export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
