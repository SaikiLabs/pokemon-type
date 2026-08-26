import type { Pokemon, StatKey, IVs, EVs, Nature } from '../domain/pokemon';
import { useLanguage } from '../hooks/useLanguage';
import { DialogBox } from './DialogBox';
import { calculateAllStats } from '../engine/statCalculator';
import { NATURES } from '../data/natures';
import { useState } from 'react';

const STAT_ORDER: readonly StatKey[] = ['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'];

function statColor(value: number): string {
  if (value < 60) return '#e8503c';
  if (value < 110) return '#f0a838';
  return '#68c848';
}

interface Props {
  pokemon: Pokemon;
  level?: number;
  ivs?: IVs;
  evs?: EVs;
  nature?: Nature;
}

export function StatsPanel({ pokemon, level: initialLevel = 50, ivs: initialIvs, evs: initialEvs, nature: initialNature }: Props) {
  const { t } = useLanguage();
  const [level, setLevel] = useState(initialLevel);
  const [ivs, setIvs] = useState<IVs>(initialIvs ?? { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 });
  const [evs, setEvs] = useState<EVs>(initialEvs ?? { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 });
  const [nature, setNature] = useState<Nature>(initialNature ?? NATURES.find(n => n.nameEn === 'Serious')!);

  const calculated = calculateAllStats(pokemon.stats, ivs, evs, level, nature);
  const evTotal = evs.hp + evs.attack + evs.defense + evs.spAtk + evs.spDef + evs.speed;

  return (
    <DialogBox>
      <h2 className="mb-1 text-[11px] font-normal text-gba-blue-dark">{t.statsTitle}</h2>
      <p className="mb-2 text-[8px] leading-relaxed text-neutral-500">{t.statsSub}</p>

      <div className="mb-3 flex flex-wrap gap-2">
        <label className="text-[8px] text-gba-blue-dark">
          {t.level}:
          <input
            type="number"
            min={1}
            max={100}
            value={level}
            onChange={(e) => setLevel(Math.max(1, Math.min(100, Number(e.target.value) || 50)))}
            className="ml-1 w-12 rounded border-2 border-gba-blue-dark bg-gba-beige px-1 py-0.5 text-[8px]"
          />
        </label>
        <label className="text-[8px] text-gba-blue-dark">
          {t.nature}:
          <select
            value={nature.nameEn}
            onChange={(e) => setNature(NATURES.find(n => n.nameEn === e.target.value) || NATURES[0])}
            className="ml-1 rounded border-2 border-gba-blue-dark bg-gba-beige px-1 py-0.5 text-[8px]"
          >
            {NATURES.map(n => (
              <option key={n.nameEn} value={n.nameEn}>{n.nameEn}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[8px] font-normal text-gba-blue-dark">{t.ivs}</span>
          <span className="text-[7px] text-neutral-500">
            {Object.values(ivs).reduce((a, b) => a + b, 0)}/186
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {STAT_ORDER.map(key => (
            <div key={key} className="flex flex-col items-center">
              <span className="text-[6px] text-neutral-500">{t.stats[key].slice(0, 3)}</span>
              <input
                type="number"
                min={0}
                max={31}
                value={ivs[key]}
                onChange={(e) => setIvs({ ...ivs, [key]: Math.max(0, Math.min(31, Number(e.target.value) || 0)) })}
                className="w-full rounded border border-neutral-400 bg-white px-0.5 py-0.5 text-center text-[7px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[8px] font-normal text-gba-blue-dark">{t.evs}</span>
          <span className={`text-[7px] ${evTotal > 510 ? 'text-red-500' : 'text-neutral-500'}`}>
            {evTotal}/510
          </span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {STAT_ORDER.map(key => (
            <div key={key} className="flex flex-col items-center">
              <span className="text-[6px] text-neutral-500">{t.stats[key].slice(0, 3)}</span>
              <input
                type="number"
                min={0}
                max={252}
                value={evs[key]}
                onChange={(e) => setEvs({ ...evs, [key]: Math.max(0, Math.min(252, Number(e.target.value) || 0)) })}
                className="w-full rounded border border-neutral-400 bg-white px-0.5 py-0.5 text-center text-[7px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        {STAT_ORDER.map((key) => {
          const base = pokemon.stats[key];
          const calc = calculated[key];
          return (
            <div key={key} className="my-1.5 flex items-center gap-2">
              <span className="w-20 shrink-0 text-right text-[8px] text-gba-blue-dark sm:w-24">
                {t.stats[key]}
              </span>
              <span className="text-[7px] text-neutral-400">({base})</span>
              <span className="h-3 flex-1 overflow-hidden rounded-md border-2 border-neutral-800 bg-neutral-600">
                <span
                  className="block h-full"
                  style={{
                    width: `${Math.min(100, Math.round((calc / 400) * 100))}%`,
                    backgroundColor: statColor(calc)
                  }}
                />
              </span>
              <span className="w-9 shrink-0 text-[8px]">{calc}</span>
            </div>
          );
        })}
      </div>
    </DialogBox>
  );
}
