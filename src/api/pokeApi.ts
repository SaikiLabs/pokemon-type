import { MAX_DEX, POKEMON_TYPES, type Pokemon, type TypeName } from '../domain/pokemon';

export type PokeErrorCode = 'notfound' | 'gen3' | 'network';

export class PokeApiError extends Error {
  readonly code: PokeErrorCode;

  constructor(code: PokeErrorCode) {
    super(code);
    this.name = 'PokeApiError';
    this.code = code;
  }
}

const API_BASE = 'https://pokeapi.co/api/v2';
const CACHE_KEY = 'ptc-cache-v1';
const NAMELIST_KEY = 'namelist-v1';

export interface NameEntry {
  name: string;
  id: number;
}

function safeStorage(): Storage | null {
  try {
    const storage = globalThis.localStorage;
    if (!storage) return null;
    storage.setItem('__ptc_probe__', '1');
    storage.removeItem('__ptc_probe__');
    return storage;
  } catch {
    return null;
  }
}

const memCache = new Map<string, unknown>();

(function loadPersisted() {
  const storage = safeStorage();
  if (!storage) return;
  try {
    const raw = storage.getItem(CACHE_KEY);
    if (raw) {
      const obj = JSON.parse(raw) as Record<string, unknown>;
      for (const key of Object.keys(obj)) memCache.set(key, obj[key]);
    }
  } catch {
    dropPersistedCache();
  }
})();

function dropPersistedCache(): void {
  const storage = safeStorage();
  if (!storage) return;
  try {
    storage.removeItem(CACHE_KEY);
  } catch {
    /* sin persistencia */
  }
}

function persist(): void {
  const storage = safeStorage();
  if (!storage) return;
  try {
    const obj: Record<string, unknown> = {};
    memCache.forEach((value, key) => {
      obj[key] = value;
    });
    storage.setItem(CACHE_KEY, JSON.stringify(obj));
  } catch {
    /* sin persistencia */
  }
}

export function clearCache(): void {
  memCache.clear();
}

async function fetchJson<T>(url: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url);
  } catch {
    throw new PokeApiError('network');
  }
  if (res.status === 404) throw new PokeApiError('notfound');
  if (!res.ok) throw new PokeApiError('network');
  return res.json() as Promise<T>;
}

export function normalizeQuery(raw: string): string {
  const q = raw.trim();
  if (/^\d+$/.test(q)) {
    const n = parseInt(q, 10);
    if (n > MAX_DEX) throw new PokeApiError('gen3');
    return String(n);
  }
  return q
    .toLowerCase()
    .replace(/[.’']+/g, '')
    .replace(/♀/g, '-f')
    .replace(/♂/g, '-m')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

const GEN3_TYPE_FIXES: Partial<Record<number, readonly TypeName[]>> = {
  35: ['normal'],
  36: ['normal'],
  39: ['normal'],
  40: ['normal'],
  122: ['psychic'],
  173: ['normal'],
  174: ['normal'],
  175: ['normal'],
  176: ['normal', 'flying'],
  183: ['water'],
  184: ['water'],
  209: ['normal'],
  210: ['normal'],
  280: ['psychic'],
  281: ['psychic'],
  282: ['psychic'],
  298: ['normal'],
  303: ['steel']
};

interface RawPokemon {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    versions?: {
      'generation-iii'?: {
        'firered-leafgreen'?: {
          front_default: string | null;
          back_default: string | null;
        };
      };
    };
  };
}

interface RawSpecies {
  names: Array<{ name: string; language: { name: string } }>;
}

function toTypeName(name: string): TypeName | null {
  return (POKEMON_TYPES as readonly string[]).includes(name) ? (name as TypeName) : null;
}

async function getSpecies(id: number): Promise<{ es: string; en: string }> {
  const key = 'species:' + id;
  const cached = memCache.get(key);
  if (cached) return cached as { es: string; en: string };
  const data = await fetchJson<RawSpecies>(`${API_BASE}/pokemon-species/${id}`);
  let es: string | null = null;
  let en: string | null = null;
  for (const n of data.names) {
    if (n.language.name === 'es' && !es) es = n.name;
    if (n.language.name === 'en' && !en) en = n.name;
  }
  const species = { es: es ?? '', en: en ?? '' };
  memCache.set(key, species);
  return species;
}

export async function getPokemon(query: string): Promise<Pokemon> {
  const norm = normalizeQuery(query);
  const key = 'pokemon:' + norm;
  const cached = memCache.get(key);
  if (cached) return cached as Pokemon;

  const data = await fetchJson<RawPokemon>(`${API_BASE}/pokemon/${encodeURIComponent(norm)}`);
  if (data.id > MAX_DEX) throw new PokeApiError('gen3');

  const species = await getSpecies(data.id);
  const g3 = data.sprites.versions?.['generation-iii']?.['firered-leafgreen'];
  const fixedTypes = GEN3_TYPE_FIXES[data.id];

  let types: TypeName[] = fixedTypes
    ? [...fixedTypes]
    : data.types.map((t) => toTypeName(t.type.name)).filter((t): t is TypeName => t !== null);
  if (types.length === 0) types = ['normal'];

  const rawStats: Partial<Record<string, number>> = {};
  for (const s of data.stats) rawStats[s.stat.name] = s.base_stat;

  const pokemon: Pokemon = {
    id: data.id,
    nameEn: data.name,
    nameEs: species.es || data.name,
    types,
    spriteFront: g3?.front_default ?? data.sprites.front_default,
    spriteBack: g3?.back_default ?? data.sprites.back_default ?? null,
    stats: {
      hp: rawStats.hp ?? 0,
      attack: rawStats.attack ?? 0,
      defense: rawStats.defense ?? 0,
      spAtk: rawStats['special-attack'] ?? 0,
      spDef: rawStats['special-defense'] ?? 0,
      speed: rawStats.speed ?? 0
    }
  };

  memCache.set(key, pokemon);
  memCache.set('pokemon:' + data.id, pokemon);
  persist();
  return pokemon;
}

interface RawNameList {
  results: Array<{ name: string; url: string }>;
}

export async function getNameList(): Promise<NameEntry[]> {
  const cached = memCache.get(NAMELIST_KEY);
  if (cached) return cached as NameEntry[];
  const data = await fetchJson<RawNameList>(`${API_BASE}/pokemon?limit=${MAX_DEX}`);
  const list = data.results.map((r) => ({
    name: r.name,
    id: parseInt(r.url.split('/').filter(Boolean).pop() ?? '0', 10)
  }));
  memCache.set(NAMELIST_KEY, list);
  persist();
  return list;
}
