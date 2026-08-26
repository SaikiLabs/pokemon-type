import { MAX_DEX, POKEMON_TYPES, type Pokemon, type TypeName, type PokemonMove } from '../domain/pokemon';

export type PokeErrorCode = 'notfound' | 'network';

export class PokeApiError extends Error {
  readonly code: PokeErrorCode;

  constructor(code: PokeErrorCode) {
    super(code);
    this.name = 'PokeApiError';
    this.code = code;
  }
}

const API_BASE = 'https://pokeapi.co/api/v2';
const CACHE_KEY = 'ptc-cache-v2';
const NAMELIST_KEY = 'namelist-v2';

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
    if (n > MAX_DEX) throw new PokeApiError('notfound');
    return String(n);
  }
  return q
    .toLowerCase()
    .replace(/[.'']+/g, '')
    .replace(/♀/g, '-f')
    .replace(/♂/g, '-m')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

interface RawPokemon {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string } }>;
  stats: Array<{ base_stat: number; stat: { name: string } }>;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    versions?: {
      'generation-v'?: {
        'black-white'?: {
          animated?: {
            front_default: string | null;
            back_default: string | null;
          };
          front_default: string | null;
          back_default: string | null;
        };
      };
      'generation-iv'?: {
        'diamond-pearl'?: {
          front_default: string | null;
          back_default: string | null;
        };
      };
      'generation-iii'?: {
        'firered-leafgreen'?: {
          front_default: string | null;
          back_default: string | null;
        };
      };
    };
  };
  moves?: Array<{
    move: { name: string; url: string };
    version_group_details: Array<{
      level_learned_at: number;
      move_learn_method: { name: string };
      version_group: { name: string };
    }>;
  }>;
}

interface RawSpecies {
  names: Array<{ name: string; language: { name: string } }>;
}

function toTypeName(name: string): TypeName | null {
  return (POKEMON_TYPES as readonly string[]).includes(name) ? (name as TypeName) : null;
}

function selectSprites(sprites: RawPokemon['sprites']): { front: string | null; back: string | null } {
  const bw = sprites.versions?.['generation-v']?.['black-white'];
  const animated = bw?.animated;
  if (animated?.front_default) {
    return { front: animated.front_default, back: animated.back_default ?? null };
  }
  if (bw?.front_default) {
    return { front: bw.front_default, back: bw.back_default ?? null };
  }
  const dp = sprites.versions?.['generation-iv']?.['diamond-pearl'];
  if (dp?.front_default) {
    return { front: dp.front_default, back: dp.back_default ?? null };
  }
  const frlg = sprites.versions?.['generation-iii']?.['firered-leafgreen'];
  if (frlg?.front_default) {
    return { front: frlg.front_default, back: frlg.back_default ?? null };
  }
  return { front: sprites.front_default, back: sprites.back_default ?? null };
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
  if (data.id > MAX_DEX) throw new PokeApiError('notfound');

  const species = await getSpecies(data.id);
  const { front, back } = selectSprites(data.sprites);

  let types: TypeName[] = data.types.map((t) => toTypeName(t.type.name)).filter((t): t is TypeName => t !== null);
  if (types.length === 0) types = ['normal'];

  const rawStats: Partial<Record<string, number>> = {};
  for (const s of data.stats) rawStats[s.stat.name] = s.base_stat;

  const latestVersion = 'scarlet-violet';
  const pokemonMoves: PokemonMove[] = (data.moves || []).map(m => {
    const details = m.version_group_details.find(d => d.version_group.name === latestVersion)
      || m.version_group_details[m.version_group_details.length - 1];
    return {
      name: m.move.name,
      url: m.move.url,
      learnMethod: details?.move_learn_method.name ?? 'unknown',
      levelLearnedAt: details?.level_learned_at ?? 0,
      versionGroup: details?.version_group.name ?? 'unknown'
    };
  }).filter(m => m.learnMethod === 'level-up' || m.learnMethod === 'machine' || m.learnMethod === 'tutor');

  const pokemon: Pokemon = {
    id: data.id,
    nameEn: data.name,
    nameEs: species.es || data.name,
    types,
    spriteFront: front,
    spriteBack: back,
    stats: {
      hp: rawStats.hp ?? 0,
      attack: rawStats.attack ?? 0,
      defense: rawStats.defense ?? 0,
      spAtk: rawStats['special-attack'] ?? 0,
      spDef: rawStats['special-defense'] ?? 0,
      speed: rawStats.speed ?? 0
    },
    moves: pokemonMoves
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
