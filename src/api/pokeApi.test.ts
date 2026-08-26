import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { clearCache, getPokemon, getNameList, normalizeQuery, PokeApiError } from './pokeApi';

function makeStorage(): Storage {
  const map = new Map<string, string>();
  return {
    get length() {
      return map.size;
    },
    clear: () => map.clear(),
    getItem: (k) => (map.has(k) ? (map.get(k) as string) : null),
    key: () => null,
    removeItem: (k) => void map.delete(k),
    setItem: (k, v) => void map.set(k, String(v))
  };
}

type FetchResult = { status?: number; json: unknown };

function stubFetch(handler: (url: string) => FetchResult) {
  const fetchMock = vi.fn(async (input: string | URL | Request) => {
    const res = handler(String(input));
    const status = res.status ?? 200;
    return {
      ok: status >= 200 && status < 300,
      status,
      json: async () => res.json
    } as Response;
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

const CHARIZARD = {
  id: 6,
  name: 'charizard',
  types: [
    { slot: 1, type: { name: 'fire' } },
    { slot: 2, type: { name: 'flying' } }
  ],
  stats: [
    { base_stat: 78, stat: { name: 'hp' } },
    { base_stat: 84, stat: { name: 'attack' } },
    { base_stat: 78, stat: { name: 'defense' } },
    { base_stat: 109, stat: { name: 'special-attack' } },
    { base_stat: 85, stat: { name: 'special-defense' } },
    { base_stat: 100, stat: { name: 'speed' } }
  ],
  sprites: {
    front_default: 'https://raw.example/charizard-front.png',
    back_default: 'https://raw.example/charizard-back.png',
    versions: {
      'generation-iii': {
        'firered-leafgreen': {
          front_default: 'frlg-front.png',
          back_default: 'frlg-back.png'
        }
      }
    }
  }
};

const SPECIES_ES_EN = {
  names: [
    { name: 'Charizard', language: { name: 'en' } },
    { name: 'Charizard', language: { name: 'es' } }
  ]
};

const CLEFAIRY_MODERN = {
  id: 35,
  name: 'clefairy',
  types: [{ slot: 1, type: { name: 'fairy' } }],
  stats: [{ base_stat: 70, stat: { name: 'hp' } }],
  sprites: { front_default: null, back_default: null }
};

beforeEach(() => {
  vi.stubGlobal('localStorage', makeStorage());
  clearCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('normalizeQuery', () => {
  it.each([
    ['CHARIZARD', 'charizard'],
    ['  Mr. Mime ', 'mr-mime'],
    ["farfetch'd", 'farfetchd'],
    ['nidoran ♀', 'nidoran-f'],
    [' 25 ', '25']
  ])('%s → %s', (input, expected) => {
    expect(normalizeQuery(input)).toBe(expected);
  });

  it('rechaza números fuera del rango Gen 3', () => {
    expect(() => normalizeQuery('1000')).toThrowError(PokeApiError);
    try {
      normalizeQuery('1000');
    } catch (e) {
      expect((e as PokeApiError).code).toBe('gen3');
    }
  });
});

describe('getPokemon', () => {
  it('mapea tipos, sprites FRLG y stats de la respuesta cruda', async () => {
    const fetchMock = stubFetch((url) => {
      if (url.includes('/pokemon-species/')) return { json: SPECIES_ES_EN };
      return { json: CHARIZARD };
    });

    const p = await getPokemon('CHARIZARD');
    expect(p.id).toBe(6);
    expect(p.nameEs).toBe('Charizard');
    expect(p.types).toEqual(['fire', 'flying']);
    expect(p.spriteFront).toBe('frlg-front.png');
    expect(p.spriteBack).toBe('frlg-back.png');
    expect(p.stats).toEqual({ hp: 78, attack: 84, defense: 78, spAtk: 109, spDef: 85, speed: 100 });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('sirve desde caché en memoria en la segunda llamada', async () => {
    const fetchMock = stubFetch((url) => {
      if (url.includes('/pokemon-species/')) return { json: SPECIES_ES_EN };
      return { json: CHARIZARD };
    });
    await getPokemon('charizard');
    await getPokemon('6');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('corrige el tipo Hada moderno a su tipado de Gen 3', async () => {
    stubFetch((url) => {
      if (url.includes('/pokemon-species/')) return { json: { names: [] } };
      return { json: CLEFAIRY_MODERN };
    });
    const p = await getPokemon('clefairy');
    expect(p.types).toEqual(['normal']);
  });

  it('lanza notfound ante 404', async () => {
    stubFetch(() => ({ status: 404, json: {} }));
    await expect(getPokemon('xyzzy')).rejects.toMatchObject({ code: 'notfound' });
  });

  it('lanza gen3 si el id devuelto excede el rango', async () => {
    stubFetch(() => ({ json: { ...CHARIZARD, id: 400, name: 'futuremon' } }));
    await expect(getPokemon('futuremon')).rejects.toMatchObject({ code: 'gen3' });
  });

  it('lanza network si fetch falla', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('offline'); }));
    await expect(getPokemon('charizard')).rejects.toMatchObject({ code: 'network' });
  });
});

describe('getNameList', () => {
  it('extrae id y nombre de cada resultado', async () => {
    stubFetch(() => ({
      json: {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      }
    }));
    const list = await getNameList();
    expect(list).toEqual([
      { name: 'bulbasaur', id: 1 },
      { name: 'ivysaur', id: 2 }
    ]);
  });
});
