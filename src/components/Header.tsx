import { useLanguage } from '../hooks/useLanguage';
import type { Lang } from '../i18n/strings';

const LANGS: readonly Lang[] = ['es', 'en'];

export function Header() {
  const { lang, setLang } = useLanguage();
  return (
    <header className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-[15px] leading-relaxed text-gba-beige [text-shadow:2px_2px_0_#10301a,4px_4px_0_rgba(0,0,0,.35)]">
          Pokémon <span className="text-yellow-300">Type Calculator</span>
        </h1>
        <p className="mt-2 text-[8px] text-lime-100/90">Kanto · Johto · Hoenn · Sinnoh · Unova · Kalos · Alola · Galar · Paldea (1–1025)</p>
      </div>
      <div className="flex overflow-hidden rounded-md border-[3px] border-[#10301a] bg-gba-beige">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`cursor-pointer px-2.5 py-2 font-pixel text-[9px] transition-colors ${
              l !== 'es' ? 'border-l-[3px] border-[#10301a]' : ''
            } ${lang === l ? 'bg-gba-blue text-white' : 'text-gba-blue-dark hover:bg-yellow-100'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );
}
