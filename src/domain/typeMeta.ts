import type { TypeName } from './pokemon';

export const TYPE_COLORS: Record<TypeName, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0'
};

export const TYPE_NAMES = {
  es: {
    normal: 'Normal',
    fire: 'Fuego',
    water: 'Agua',
    electric: 'Eléctrico',
    grass: 'Planta',
    ice: 'Hielo',
    fighting: 'Lucha',
    poison: 'Veneno',
    ground: 'Tierra',
    flying: 'Volador',
    psychic: 'Psíquico',
    bug: 'Bicho',
    rock: 'Roca',
    ghost: 'Fantasma',
    dragon: 'Dragón',
    dark: 'Siniestro',
    steel: 'Acero'
  },
  en: {
    normal: 'Normal',
    fire: 'Fire',
    water: 'Water',
    electric: 'Electric',
    grass: 'Grass',
    ice: 'Ice',
    fighting: 'Fighting',
    poison: 'Poison',
    ground: 'Ground',
    flying: 'Flying',
    psychic: 'Psychic',
    bug: 'Bug',
    rock: 'Rock',
    ghost: 'Ghost',
    dragon: 'Dragon',
    dark: 'Dark',
    steel: 'Steel'
  }
} as const satisfies Record<'es' | 'en', Record<TypeName, string>>;
