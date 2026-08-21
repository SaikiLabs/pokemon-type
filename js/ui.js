'use strict';

const I18N = {
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
    stats: { hp: 'PS', attack: 'ATAQUE', defense: 'DEFENSA', spAtk: 'AT. ESP.', spDef: 'DEF. ESP.', speed: 'VELOCIDAD' },
    catDef: { immune: 'INMUNE', quarter: 'MUY RESISTENTE', half: 'RESISTENTE', neutral: 'NEUTRAL', double: 'DÉBIL', quad: 'MUY DÉBIL' },
    catOff: { immune: 'SIN EFECTO', quarter: 'CASÍ SIN EFECTO', half: 'POCO EFICAZ', neutral: 'EFICAZ', double: 'MUY EFICAZ', quad: 'DEVASTADOR' },
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
    stats: { hp: 'HP', attack: 'ATTACK', defense: 'DEFENSE', spAtk: 'SP. ATK', spDef: 'SP. DEF', speed: 'SPEED' },
    catDef: { immune: 'IMMUNE', quarter: 'VERY RESISTANT', half: 'RESISTANT', neutral: 'NEUTRAL', double: 'WEAK', quad: 'VERY WEAK' },
    catOff: { immune: 'NO EFFECT', quarter: 'BARELY EFFECTIVE', half: 'NOT VERY EFFECTIVE', neutral: 'EFFECTIVE', double: 'SUPER EFFECTIVE', quad: 'DEVASTATING' },
    noNotes: 'It has no notable weaknesses or resistances.',
    footer: 'Data: PokéAPI · Non-profit fan project · Pokémon © Nintendo / Game Freak'
  }
};

function $(id) {
  return document.getElementById(id);
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function displayName(pokemon, lang) {
  return lang === 'es' ? pokemon.nameEs : cap(pokemon.nameEn);
}

function typeName(typeKey, lang) {
  return TYPE_NAMES[lang][typeKey] || cap(typeKey);
}

let typeTimer = null;

function typeText(el, text) {
  if (typeTimer) clearInterval(typeTimer);
  el.textContent = '';
  let i = 0;
  typeTimer = setInterval(function () {
    i++;
    el.textContent = text.slice(0, i);
    if (i >= text.length) clearInterval(typeTimer);
  }, 16);
}

function makeBadge(typeKey, lang, mult) {
  const badge = document.createElement('span');
  badge.className = 'type-badge';
  badge.style.backgroundColor = TYPE_COLORS[typeKey];
  const label = document.createElement('span');
  label.textContent = typeName(typeKey, lang).toUpperCase();
  badge.appendChild(label);
  if (mult !== undefined) {
    const m = document.createElement('span');
    m.className = 'mult';
    m.textContent = formatMult(mult);
    badge.appendChild(m);
  }
  return badge;
}

function renderCategoryRows(container, entries, labels, lang, offensive) {
  container.innerHTML = '';
  const groups = groupByCategory(entries);
  for (const cat of CATEGORY_ORDER) {
    if (!groups[cat].length) continue;
    const row = document.createElement('div');
    row.className = 'cat-row';

    const label = document.createElement('span');
    label.className = 'cat-label cat-' + cat;
    label.textContent = labels[cat];
    row.appendChild(label);

    const badges = document.createElement('div');
    badges.className = 'cat-badges';
    for (const item of groups[cat]) {
      const b = makeBadge(item.type, lang, item.mult === 1 ? undefined : item.mult);
      if (offensive && item.attacker && item.mult > 1) {
        b.title = typeName(item.attacker, lang);
      }
      badges.appendChild(b);
    }
    row.appendChild(badges);
    container.appendChild(row);
  }
}

function joinList(keys, lang) {
  const names = keys.map(function (k) { return typeName(k, lang).toUpperCase(); });
  if (names.length === 1) return names[0];
  const tail = lang === 'es' ? ' y ' : ' and ';
  return names.slice(0, -1).join(', ') + tail + names[names.length - 1];
}

function buildNarrative(pokemon, lang) {
  const groups = groupByCategory(analyzeDefensive(pokemon.types));
  const nm = displayName(pokemon, lang).toUpperCase();
  const parts = [];

  if (groups.quad.length) {
    parts.push(lang === 'es'
      ? '¡' + nm + ' es MUY DÉBIL ante ' + joinList(pluck(groups.quad), lang) + '!'
      : nm + ' is VERY WEAK against ' + joinList(pluck(groups.quad), lang) + '!');
  } else if (groups.double.length) {
    parts.push(lang === 'es'
      ? nm + ' es DÉBIL ante ' + joinList(pluck(groups.double), lang) + '.'
      : nm + ' is WEAK against ' + joinList(pluck(groups.double), lang) + '.');
  }
  if (groups.quarter.length) {
    parts.push(lang === 'es'
      ? 'Resiste muy bien ' + joinList(pluck(groups.quarter), lang) + '.'
      : 'It strongly resists ' + joinList(pluck(groups.quarter), lang) + '.');
  }
  if (groups.half.length) {
    parts.push(lang === 'es'
      ? 'Resiste ' + joinList(pluck(groups.half), lang) + '.'
      : 'It resists ' + joinList(pluck(groups.half), lang) + '.');
  }
  if (groups.immune.length) {
    parts.push(lang === 'es'
      ? '¡Y es INMUNE a ' + joinList(pluck(groups.immune), lang) + '!'
      : 'And it is IMMUNE to ' + joinList(pluck(groups.immune), lang) + '!');
  }

  if (!parts.length) return lang === 'es'
    ? nm + ' no tiene debilidades ni resistencias destacables.'
    : nm + ' has no notable weaknesses or resistances.';
  return parts.join(' ');
}

function pluck(entries) {
  return entries.map(function (e) { return e.type; });
}

function renderBattle(pokemon, lang) {
  const t = I18N[lang];
  $('battle-scene').classList.remove('hidden');

  const enemy = $('enemy-sprite');
  enemy.src = pokemon.spriteFront || '';
  enemy.alt = displayName(pokemon, lang);

  const player = $('player-sprite');
  if (pokemon.spriteBack) {
    player.src = pokemon.spriteBack;
    player.classList.remove('flip');
  } else {
    player.src = pokemon.spriteFront || '';
    player.classList.add('flip');
  }
  player.alt = displayName(pokemon, lang);

  $('info-name').textContent = displayName(pokemon, lang);
  $('info-lv').textContent = t.lv;
  $('info-id').textContent = '#' + String(pokemon.id).padStart(3, '0');

  const typesBox = $('info-types');
  typesBox.innerHTML = '';
  for (const tp of pokemon.types) typesBox.appendChild(makeBadge(tp, lang));
}

function renderStats(pokemon, lang) {
  const t = I18N[lang];
  $('stats-panel').classList.remove('hidden');
  $('stats-title').textContent = t.statsTitle;
  $('stats-sub').textContent = t.statsSub;

  const body = $('stats-body');
  body.innerHTML = '';
  const order = ['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'];
  for (const key of order) {
    const val = pokemon.stats[key];

    const row = document.createElement('div');
    row.className = 'stat-row';

    const label = document.createElement('span');
    label.className = 'stat-label';
    label.textContent = t.stats[key];

    const track = document.createElement('span');
    track.className = 'stat-track';

    const fill = document.createElement('span');
    fill.className = 'stat-fill';
    fill.style.width = Math.min(100, Math.round(val / 255 * 100)) + '%';
    fill.style.backgroundColor = val < 60 ? '#e8503c' : (val < 110 ? '#f0a838' : '#68c848');

    const value = document.createElement('span');
    value.className = 'stat-value';
    value.textContent = val;

    track.appendChild(fill);
    row.appendChild(label);
    row.appendChild(track);
    row.appendChild(value);
    body.appendChild(row);
  }
}

function renderEffectiveness(pokemon, lang) {
  const t = I18N[lang];

  $('defense-panel').classList.remove('hidden');
  $('defense-title').textContent = t.defTitle;
  $('defense-sub').textContent = t.defSub;
  renderCategoryRows($('defense-body'), analyzeDefensive(pokemon.types), t.catDef, lang, false);

  $('offense-panel').classList.remove('hidden');
  $('offense-title').textContent = t.offTitle;
  $('offense-sub').textContent = t.offSub;
  renderCategoryRows($('offense-body'), analyzeOffensive(pokemon.types), t.catOff, lang, true);
}

function applyStaticText(lang) {
  const t = I18N[lang];
  document.title = t.docTitle;
  $('search-input').placeholder = t.searchPlaceholder;
  $('search-btn').textContent = t.searchBtn;
  $('footer-text').textContent = t.footer;
}

function showError(code, lang) {
  const t = I18N[lang];
  const msg = t[code] || t.network;
  typeText($('message-text'), msg);
}

function renderAll(pokemon, lang) {
  applyStaticText(lang);
  if (!pokemon) return;
  renderBattle(pokemon, lang);
  renderStats(pokemon, lang);
  renderEffectiveness(pokemon, lang);
  typeText($('message-text'), buildNarrative(pokemon, lang));
}
