import { useState, type FormEvent } from 'react';
import type { NameEntry } from '../api/pokeApi';
import { resolveEnglishName } from '../data/pokemonNamesEs';
import { useLanguage } from '../hooks/useLanguage';
import { DialogBox } from './DialogBox';

interface SearchBarProps {
  names: NameEntry[];
  busy: boolean;
  onSubmit: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ names, busy, onSubmit, placeholder }: SearchBarProps) {
  const { lang, t } = useLanguage();
  const [value, setValue] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = value.trim();
    if (!q) {
      onSubmit(q);
      return;
    }
    if (/^\d+$/.test(q)) {
      onSubmit(q);
      return;
    }
    if (lang === 'es') {
      onSubmit(resolveEnglishName(q));
    } else {
      onSubmit(q);
    }
  }

  return (
    <DialogBox>
      <form className="flex flex-wrap gap-2.5" onSubmit={handleSubmit}>
        <input
          list="pokemon-list"
          autoComplete="off"
          value={value}
          disabled={busy}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder ?? t.searchPlaceholder}
          className="min-w-48 flex-1 rounded-md border-[3px] border-gba-blue-dark bg-white px-2.5 py-2.5 font-pixel text-[10px] text-gba-ink shadow-inner outline-none focus:ring-4 focus:ring-yellow-300 disabled:opacity-60"
        />
        <datalist id="pokemon-list">
          {names.map((n) => (
            <option key={n.id} value={lang === 'es' ? n.nameEs : n.name} />
          ))}
        </datalist>
        <button
          type="submit"
          disabled={busy}
          className="cursor-pointer rounded-md border-[3px] border-gba-blue-dark bg-gba-blue px-3.5 py-2.5 font-pixel text-[10px] text-white shadow-[inset_-3px_-3px_0_#3838a0,inset_3px_3px_0_#8888e8] active:translate-x-px active:translate-y-px disabled:cursor-wait disabled:opacity-60"
        >
          {t.searchBtn}
        </button>
      </form>
    </DialogBox>
  );
}
