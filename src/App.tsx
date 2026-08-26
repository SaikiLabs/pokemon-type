import { useEffect, useMemo, useState } from 'react';
import { getNameList, type NameEntry } from './api/pokeApi';
import { groupByCategory, analyzeDefensive, analyzeOffensive } from './engine/effectiveness';
import { LanguageProvider, useLanguage } from './hooks/useLanguage';
import { usePokemon, type SearchError } from './hooks/usePokemon';
import { buildNarrative, displayName } from './i18n/narrative';
import type { Strings } from './i18n/strings';
import { BattleScene } from './components/BattleScene';
import { BattleSimulator } from './components/BattleSimulator';
import { EffectivenessPanel } from './components/EffectivenessPanel';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MessageDialog } from './components/MessageDialog';
import { SearchBar } from './components/SearchBar';
import { StatsPanel } from './components/StatsPanel';

function readLastId(): string {
  try {
    return globalThis.localStorage.getItem('ptc-last') ?? '6';
  } catch {
    return '6';
  }
}

function errorMessage(t: Strings, code: SearchError): string {
  switch (code) {
    case 'empty':
      return t.empty;
    case 'notfound':
      return t.notFound;
    default:
      return t.network;
  }
}

export default function App() {
  return (
    <LanguageProvider>
      <Calculator />
    </LanguageProvider>
  );
}

function Calculator() {
  const { lang, t } = useLanguage();
  const [names, setNames] = useState<NameEntry[]>([]);
  const [initialQuery] = useState<string>(readLastId);
  const search = usePokemon(initialQuery);
  const busy = search.status === 'loading';
  const [defenderQuery, setDefenderQuery] = useState('');

  useEffect(() => {
    let alive = true;
    getNameList()
      .then((list) => {
        if (alive) setNames(list);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    document.title = t.docTitle;
  }, [t]);

  const message = useMemo(() => {
    if (search.status === 'error' && search.error) {
      return errorMessage(t, search.error);
    }
    if (search.status === 'loading' || !search.pokemon) {
      return t.loading;
    }
    const name = displayName(search.pokemon, lang).toUpperCase();
    const groups = groupByCategory(analyzeDefensive(search.pokemon.types));
    return buildNarrative(name, groups, lang);
  }, [search.status, search.error, search.pokemon, t, lang]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 px-3 py-6 font-pixel">
      <Header />
      <SearchBar names={names} busy={busy} onSubmit={search.search} />

      {search.pokemon && <BattleScene pokemon={search.pokemon} />}
      <MessageDialog text={message} />

      {search.pokemon && (
        <>
          <StatsPanel pokemon={search.pokemon} />
          <EffectivenessPanel
            title={t.defTitle}
            subtitle={t.defSub}
            entries={analyzeDefensive(search.pokemon.types)}
            labels={t.catDef}
            lang={lang}
            offensive={false}
          />
          <EffectivenessPanel
            title={t.offTitle}
            subtitle={t.offSub}
            entries={analyzeOffensive(search.pokemon.types)}
            labels={t.catOff}
            lang={lang}
            offensive={true}
          />
          <SearchBar
            names={names}
            busy={busy}
            onSubmit={(q) => setDefenderQuery(q)}
            placeholder={t.defender + '...'}
          />
          {defenderQuery && (
            <SimulatorWrapper attackerQuery={search.pokemon.nameEn} defenderQuery={defenderQuery} />
          )}
          {!defenderQuery && (
            <div className="rounded-[10px] border-4 border-gba-blue bg-gba-beige p-4 text-center shadow-[0_0_0_4px_var(--color-gba-navy),inset_0_0_0_2px_var(--color-gba-blue-light)]">
              <p className="text-[9px] text-neutral-500">{t.selectMove}</p>
            </div>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

function SimulatorWrapper({ attackerQuery, defenderQuery }: { attackerQuery: string; defenderQuery: string }) {
  const attacker = usePokemon(attackerQuery);
  const defender = usePokemon(defenderQuery);

  if (attacker.status === 'loading' || defender.status === 'loading') {
    return <div className="text-[9px] text-neutral-500">Loading...</div>;
  }
  if (!attacker.pokemon || !defender.pokemon) {
    return <div className="text-[9px] text-neutral-500">Could not load Pokemon data.</div>;
  }

  return <BattleSimulator attacker={attacker.pokemon} defender={defender.pokemon} />;
}
