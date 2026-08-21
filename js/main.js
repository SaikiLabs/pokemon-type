'use strict';

const state = {
  lang: 'es',
  pokemon: null
};

function updateLangToggle() {
  $('lang-es').classList.toggle('active', state.lang === 'es');
  $('lang-en').classList.toggle('active', state.lang === 'en');
}

function setLang(lang) {
  state.lang = lang;
  try { localStorage.setItem('ptc-lang', lang); } catch (e) { /* sin persistencia */ }
  document.documentElement.lang = lang;
  updateLangToggle();
  renderAll(state.pokemon, state.lang);
}

function setSearching(busy) {
  $('search-btn').disabled = busy;
  $('search-input').disabled = busy;
}

async function doSearch(query) {
  const q = String(query).trim();
  if (!q) {
    showError('empty', state.lang);
    return;
  }
  setSearching(true);
  typeText($('message-text'), I18N[state.lang].loading);
  try {
    const pokemon = await getPokemon(q);
    state.pokemon = pokemon;
    try { localStorage.setItem('ptc-last', String(pokemon.id)); } catch (e) { /* sin persistencia */ }
    renderAll(pokemon, state.lang);
  } catch (err) {
    showError(err.code || 'network', state.lang);
  } finally {
    setSearching(false);
  }
}

function populateDatalist(list) {
  $('pokemon-list').innerHTML = list
    .map(function (p) { return '<option value="' + p.name + '"></option>'; })
    .join('');
}

function init() {
  let savedLang = null;
  try { savedLang = localStorage.getItem('ptc-lang'); } catch (e) { /* sin persistencia */ }
  state.lang = savedLang === 'en' ? 'en' : 'es';
  document.documentElement.lang = state.lang;
  updateLangToggle();

  $('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
    doSearch($('search-input').value);
  });
  $('lang-es').addEventListener('click', function () { setLang('es'); });
  $('lang-en').addEventListener('click', function () { setLang('en'); });

  getNameList().then(populateDatalist).catch(function () { /* datalist opcional */ });

  let last = null;
  try { last = localStorage.getItem('ptc-last'); } catch (e) { /* sin persistencia */ }
  doSearch(last || '6');
}

document.addEventListener('DOMContentLoaded', init);
