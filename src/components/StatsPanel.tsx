import type { Pokemon, StatKey } from '../domain/pokemon';
import { useLanguage } from '../hooks/useLanguage';
import { DialogBox } from './DialogBox';

const STAT_ORDER: readonly StatKey[] = ['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'];

function statColor(value: number): string {
  if (value < 60) return '#e8503c';
  if (value < 110) return '#f0a838';
  return '#68c848';
}

export function StatsPanel({ pokemon }: { pokemon: Pokemon }) {
  const { t } = useLanguage();
  return (
    <DialogBox>
      <h2 className="mb-1 text-[11px] font-normal text-gba-blue-dark">{t.statsTitle}</h2>
      <p className="mb-3.5 text-[8px] leading-relaxed text-neutral-500">{t.statsSub}</p>
      <div>
        {STAT_ORDER.map((key) => {
          const value = pokemon.stats[key];
          return (
            <div key={key} className="my-1.5 flex items-center gap-2">
              <span className="w-20 shrink-0 text-right text-[8px] text-gba-blue-dark sm:w-24">
                {t.stats[key]}
              </span>
              <span className="h-3 flex-1 overflow-hidden rounded-md border-2 border-neutral-800 bg-neutral-600">
                <span
                  className="block h-full"
                  style={{
                    width: `${Math.min(100, Math.round((value / 255) * 100))}%`,
                    backgroundColor: statColor(value)
                  }}
                />
              </span>
              <span className="w-9 shrink-0 text-[8px]">{value}</span>
            </div>
          );
        })}
      </div>
    </DialogBox>
  );
}
