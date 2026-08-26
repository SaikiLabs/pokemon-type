import type { Category, StatKey } from '../domain/pokemon';

export type Lang = 'es' | 'en';

export interface Strings {
  docTitle: string;
  searchPlaceholder: string;
  searchBtn: string;
  loading: string;
  empty: string;
  notFound: string;
  gen3: string;
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
}

export const STRINGS: Record<Lang, Strings> = {
  es: {
    docTitle: 'Calculadora de Tipos Pokémon · Gen 3',
    searchPlaceholder: 'Nombre o nº (1–386)...',
    searchBtn: 'Buscar',
    loading: 'Buscando datos...',
    empty: '¡Escribe un nombre o número para buscar!',
    notFound: '¡Ese Pokémon no existe! Prueba con otro nombre o número.',
    gen3: '¡Solo están disponibles los Pokémon de la 1ª a la 3ª generación (nº 1–386)!',
    network: 'No se pudo conectar con PokéAPI. Inténtalo de nuevo.',
    statsTitle: 'ESTADÍSTICAS BASE',
    statsSub: 'Valores base del Pokémon:',
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
    footer: 'Datos: PokéAPI · Proyecto fan sin ánimo de lucro · Pokémon © Nintendo / Game Freak'
  },
  en: {
    docTitle: 'Pokémon Type Calculator · Gen 3',
    searchPlaceholder: 'Name or № (1–386)...',
    searchBtn: 'Search',
    loading: 'Fetching data...',
    empty: 'Type a name or number to search!',
    notFound: "That Pokémon doesn't exist! Try another name or number.",
    gen3: 'Only Gen 1–3 Pokémon (№ 1–386) are available!',
    network: 'Could not reach PokéAPI. Please try again.',
    statsTitle: 'BASE STATS',
    statsSub: 'Base values of the Pokémon:',
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
    footer: 'Data: PokéAPI · Non-profit fan project · Pokémon © Nintendo / Game Freak'
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
