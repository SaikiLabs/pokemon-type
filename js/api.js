'use strict';

const API_BASE = 'https://pokeapi.co/api/v2';
const MAX_DEX = 386;
const CACHE_KEY = 'ptc-cache-v1';
const NAMELIST_KEY = 'namelist-v1';

const memCache = new Map();

(function loadPersistedCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw) {
      const obj = JSON.parse(raw);
      for (const k in obj) memCache.set(k, obj[k]);
    }
  } catch (e) { /* caché no disponible */ }
})();

function persistCache() {
  try {
    const obj = {};
    for (const [k, v] of memCache) obj[k] = v;
    localStorage.setItem(CACHE_KEY, JSON.stringify(obj));
  } catch (e) { /* sin persistencia */ }
}

function ptcError(code) {
  const err = new Error(code);
  err.code = code;
  return err;
}

async function fetchJson(url) {
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    throw ptcError('network');
  }
  if (res.status === 404) throw ptcError('notfound');
  if (!res.ok) throw ptcError('network');
  return res.json();
}

function normalizeQuery(raw) {
  const q = String(raw).trim();
  if (/^\d+$/.test(q)) {
    const n = parseInt(q, 10);
    if (n > MAX_DEX) throw ptcError('gen3');
    return String(n);
  }
  return q
    .toLowerCase()
    .replace(/[.’']+/g, '')
    .replace(/\s+/g, '-')
    .replace(/♀/g, '-f')
    .replace(/♂/g, '-m');
}

const GEN3_TYPE_FIXES = {
  35: ['normal'], 36: ['normal'], 39: ['normal'], 40: ['normal'],
  122: ['psychic'],
  173: ['normal'], 174: ['normal'], 175: ['normal'], 176: ['normal', 'flying'],
  183: ['water'], 184: ['water'],
  209: ['normal'], 210: ['normal'],
  280: ['psychic'], 281: ['psychic'], 282: ['psychic'],
  298: ['normal'],
  303: ['steel']
};

async function getSpecies(id) {
  const key = 'species:' + id;
  if (memCache.has(key)) return memCache.get(key);
  const data = await fetchJson(API_BASE + '/pokemon-species/' + id);
  let es = null;
  let en = null;
  for (const n of data.names) {
    if (n.language.name === 'es' && !es) es = n.name;
    if (n.language.name === 'en' && !en) en = n.name;
  }
  const species = { es: es || en || data.name, en: en || data.name };
  memCache.set(key, species);
  return species;
}

async function getPokemon(query) {
  const norm = normalizeQuery(query);
  const key = 'pokemon:' + norm;
  if (memCache.has(key)) return memCache.get(key);

  const data = await fetchJson(API_BASE + '/pokemon/' + encodeURIComponent(norm));
  if (data.id > MAX_DEX) throw ptcError('gen3');

  const species = await getSpecies(data.id);
  const g3 = data.sprites &&
    data.sprites.versions &&
    data.sprites.versions['generation-iii'] &&
    data.sprites.versions['generation-iii']['firered-leafgreen'];

  const rawStats = {};
  for (const s of data.stats) rawStats[s.stat.name] = s.base_stat;

  const pokemon = {
    id: data.id,
    nameEn: data.name,
    nameEs: species.es,
    types: GEN3_TYPE_FIXES[data.id] || data.types.map(function (t) { return t.type.name; }),
    spriteFront: (g3 && g3.front_default) || data.sprites.front_default,
    spriteBack: (g3 && g3.back_default) || data.sprites.back_default || null,
    stats: {
      hp: rawStats.hp,
      attack: rawStats.attack,
      defense: rawStats.defense,
      spAtk: rawStats['special-attack'],
      spDef: rawStats['special-defense'],
      speed: rawStats.speed
    }
  };

  memCache.set(key, pokemon);
  persistCache();
  return pokemon;
}

async function getNameList() {
  if (memCache.has(NAMELIST_KEY)) return memCache.get(NAMELIST_KEY);
  const data = await fetchJson(API_BASE + '/pokemon?limit=' + MAX_DEX);
  const list = data.results.map(function (r) {
    const parts = r.url.split('/').filter(Boolean);
    return { name: r.name, id: parseInt(parts[parts.length - 1], 10) };
  });
  memCache.set(NAMELIST_KEY, list);
  persistCache();
  return list;
}
