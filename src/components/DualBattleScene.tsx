import type { Pokemon } from '../domain/pokemon';
import { displayName } from '../i18n/narrative';
import { useLanguage } from '../hooks/useLanguage';
import { TypeBadge } from './TypeBadge';

interface DualBattleSceneProps {
  attacker: Pokemon;
  defender: Pokemon;
  defenderHP?: number;
  defenderDamage?: number;
}

function hpPercent(current: number, max: number): number {
  return Math.max(0, Math.min(100, ((current - current) / max) * 100));
}

function hpBarColor(percent: number): string {
  if (percent > 50) return 'from-lime-300 to-green-500';
  if (percent > 20) return 'from-yellow-300 to-yellow-500';
  return 'from-red-400 to-red-600';
}

function InfoCard({
  pokemon,
  hpPercent,
  label,
}: {
  pokemon: Pokemon;
  hpPercent: number;
  label: string;
}) {
  const { lang, t } = useLanguage();
  const name = displayName(pokemon, lang);

  return (
    <div className="max-w-[calc(100%-1.5rem)] min-w-36 rounded-lg border-[3px] border-gba-blue-dark bg-gba-beige p-2 font-pixel text-[9px] shadow-[inset_0_0_0_2px_var(--color-gba-blue-light)] sm:min-w-44">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[7px] text-neutral-400">{label}</span>
        <span>{t.lv}</span>
      </div>
      <div className="mt-0.5 font-bold">{name}</div>
      <div className="my-1.5 flex flex-wrap gap-1.5">
        {pokemon.types.map((tp) => (
          <TypeBadge key={tp} type={tp} lang={lang} />
        ))}
      </div>
      <div className="h-2.5 overflow-hidden rounded-md border-2 border-black/70 bg-neutral-700">
        <div
          className={`h-full bg-gradient-to-r ${hpBarColor(hpPercent)} transition-all duration-500 ease-out`}
          style={{ width: `${hpPercent}%` }}
        />
      </div>
      <div className="mt-1.5 text-[8px] text-neutral-500">
        #{String(pokemon.id).padStart(3, '0')}
      </div>
    </div>
  );
}

export function DualBattleScene({ attacker, defender, defenderHP = 1, defenderDamage = 0 }: DualBattleSceneProps) {
  const { t } = useLanguage();
  const defHP = Math.max(0, defenderHP - defenderDamage);
  const defPercent = hpPercent(defHP, defenderHP);

  return (
    <section className="relative h-72 overflow-hidden rounded-[10px] border-4 border-gba-blue bg-[linear-gradient(#9cd8f8_0%,#bce8c8_52%,#7ab84e_53%,#4e8a2e_100%)] shadow-[0_0_0_4px_var(--color-gba-navy)] sm:h-88">
      {/* ── Fila superior: Rival ── */}
      <div className="absolute top-2 left-2 z-10 sm:top-3 sm:left-3">
        <InfoCard pokemon={defender} hpPercent={defPercent} label={t.rivalPokemon} />
      </div>

      {/* Plataforma rival (arriba-derecha) */}
      <div className="pointer-events-none absolute top-[96px] right-4 h-12 w-40 rounded-full border-4 border-[#5a8c3a] bg-[#94c46a] shadow-[inset_0_-8px_0_rgba(0,0,0,.12)] sm:top-[112px] sm:right-6 sm:h-14 sm:w-52" />

      {/* Front sprite rival */}
      <img
        src={defender.spriteFront ?? ''}
        alt={displayName(defender, 'en')}
        className="absolute top-6 right-10 w-20 [image-rendering:pixelated] drop-shadow-[0_6px_4px_rgba(0,0,0,.25)] sm:top-6 sm:right-14 sm:w-26"
      />

      {/* ── Fila inferior: Atacante ── */}
      {/* Plataforma atacante (abajo-izquierda) */}
      <div className="pointer-events-none absolute bottom-[60px] left-2 h-13 w-44 rounded-full border-4 border-[#5a8c3a] bg-[#94c46a] shadow-[inset_0_-8px_0_rgba(0,0,0,.12)] sm:bottom-[68px] sm:left-4 sm:h-16 sm:w-56" />

      {/* Back sprite atacante (de espaldas) */}
      <img
        src={attacker.spriteBack ?? attacker.spriteFront ?? ''}
        alt={displayName(attacker, 'en')}
        className={`absolute bottom-16 left-6 w-28 [image-rendering:pixelated] drop-shadow-[0_6px_4px_rgba(0,0,0,.25)] sm:bottom-18 sm:left-10 sm:w-36 ${
          attacker.spriteBack ? '' : '-scale-x-100'
        }`}
      />

      <div className="absolute bottom-2 right-2 z-10 sm:bottom-3 sm:right-3">
        <InfoCard pokemon={attacker} hpPercent={100} label={t.yourPokemon} />
      </div>
    </section>
  );
}
