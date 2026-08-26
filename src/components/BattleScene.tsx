import type { Pokemon } from '../domain/pokemon';
import { displayName } from '../i18n/narrative';
import { useLanguage } from '../hooks/useLanguage';
import { TypeBadge } from './TypeBadge';

export function BattleScene({ pokemon }: { pokemon: Pokemon }) {
  const { lang, t } = useLanguage();
  const name = displayName(pokemon, lang);

  return (
    <section className="relative h-64 overflow-hidden rounded-[10px] border-4 border-gba-blue bg-[linear-gradient(#9cd8f8_0%,#bce8c8_52%,#7ab84e_53%,#4e8a2e_100%)] shadow-[0_0_0_4px_var(--color-gba-navy)] sm:h-80">
      <div className="absolute top-3 left-3 max-w-[calc(100%-1.5rem)] min-w-45 rounded-lg border-[3px] border-gba-blue-dark bg-gba-beige p-2 font-pixel text-[9px] shadow-[inset_0_0_0_2px_var(--color-gba-blue-light)]">
        <div className="flex items-center justify-between gap-2">
          <span>{name}</span>
          <span>{t.lv}</span>
        </div>
        <div className="my-1.5 flex flex-wrap gap-1.5">
          {pokemon.types.map((tp) => (
            <TypeBadge key={tp} type={tp} lang={lang} />
          ))}
        </div>
        <div className="h-2.5 overflow-hidden rounded-md border-2 border-black/70 bg-neutral-700">
          <div className="h-full w-full bg-gradient-to-b from-lime-300 to-green-500" />
        </div>
        <div className="mt-1.5 text-[8px] text-neutral-500">
          #{String(pokemon.id).padStart(3, '0')}
        </div>
      </div>

      <div className="pointer-events-none absolute top-[104px] right-4 h-12 w-40 rounded-full border-4 border-[#5a8c3a] bg-[#94c46a] shadow-[inset_0_-8px_0_rgba(0,0,0,.12)] sm:top-[118px] sm:h-14 sm:w-52" />
      <div className="pointer-events-none absolute bottom-4 left-3 h-13 w-47 rounded-full border-4 border-[#5a8c3a] bg-[#94c46a] shadow-[inset_0_-8px_0_rgba(0,0,0,.12)] sm:h-16 sm:w-62" />

      <img
        src={pokemon.spriteFront ?? ''}
        alt={name}
        className={`absolute top-10 right-13 w-18 [image-rendering:pixelated] drop-shadow-[0_6px_4px_rgba(0,0,0,.25)] sm:top-11 sm:right-19 sm:w-23 ${
          pokemon.spriteAnimated ? '' : 'animate-[sprite-idle_2s_ease-in-out_infinite]'
        }`}
      />
      <img
        src={pokemon.spriteBack ?? pokemon.spriteFront ?? ''}
        alt={name}
        className={`absolute bottom-11 left-8 w-26 [image-rendering:pixelated] drop-shadow-[0_6px_4px_rgba(0,0,0,.25)] sm:bottom-12 sm:left-14 sm:w-33 ${
          pokemon.spriteBack ? '' : '-scale-x-100'
        } ${
          pokemon.spriteAnimated ? '' : 'animate-[sprite-idle_2s_ease-in-out_infinite_0.3s]'
        }`}
      />
    </section>
  );
}
