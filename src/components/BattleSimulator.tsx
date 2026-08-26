import { useState } from 'react';
import type { Pokemon, Move, IVs, EVs, Nature, BattleConfig } from '../domain/pokemon';
import { useLanguage } from '../hooks/useLanguage';
import { DialogBox } from './DialogBox';
import { calculateDamage, findBestMoves } from '../engine/damageCalculator';
import { calculateAllStats } from '../engine/statCalculator';
import { NATURES } from '../data/natures';
import { MOVES } from '../data/moves';
import { TYPE_COLORS } from '../domain/typeMeta';

const STAT_KEYS = ['hp', 'attack', 'defense', 'spAtk', 'spDef', 'speed'] as const;

interface Props {
  attacker: Pokemon;
  defender: Pokemon;
}

export function BattleSimulator({ attacker, defender }: Props) {
  const { lang, t } = useLanguage();
  const [level, setLevel] = useState(50);
  const [nature, setNature] = useState<Nature>(NATURES.find(n => n.nameEn === 'Serious')!);
  const [ivs, setIvs] = useState<IVs>({ hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 });
  const [evs, setEvs] = useState<EVs>({ hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 });
  const [selectedMove, setSelectedMove] = useState<Move | null>(null);

  const config: BattleConfig = {
    attackerLevel: level,
    defenderLevel: level,
    attackerIVs: ivs,
    attackerEVs: evs,
    defenderIVs: { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 },
    defenderEVs: { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 },
    attackerNature: nature,
    defenderNature: NATURES.find(n => n.nameEn === 'Serious')!
  };

  const atkStats = calculateAllStats(attacker.stats, ivs, evs, level, nature);
  const defStats = calculateAllStats(defender.stats, config.defenderIVs, config.defenderEVs, level, config.defenderNature);

  const result = selectedMove ? calculateDamage(attacker, defender, selectedMove, config) : null;
  const bestMoves = findBestMoves(attacker, defender, config, 5);

  const evTotal = evs.hp + evs.attack + evs.defense + evs.spAtk + evs.spDef + evs.speed;

  const availableMoves = attacker.moves
    ? attacker.moves
        .map(m => {
          const moveData = MOVES.find(mv => mv.nameEn.toLowerCase() === m.name.toLowerCase());
          return moveData && moveData.category !== 'status' ? moveData : null;
        })
        .filter((m): m is Move => m !== null)
    : [];

  return (
    <div className="flex flex-col gap-4">
      {/* Attacker Config */}
      <DialogBox>
        <div className="mb-2 flex items-center gap-2">
          <img src={attacker.spriteFront ?? ''} alt="" className="h-10 w-10 [image-rendering:pixelated]" />
          <div>
            <div className="text-[10px] font-normal text-gba-blue-dark">{t.attacker}</div>
            <div className="text-[9px] font-normal text-neutral-500">{lang === 'es' ? attacker.nameEs : attacker.nameEn}</div>
          </div>
        </div>

        {/* Level & Nature */}
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
                <option key={n.nameEn} value={n.nameEn}>
                  {lang === 'es' ? n.name : n.nameEn}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* IVs */}
        <div className="mb-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-normal text-gba-blue-dark">{t.ivs}</span>
            <span className="text-[7px] text-neutral-500">{t.ivTotal}: {Object.values(ivs).reduce((a, b) => a + b, 0)}/186</span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {STAT_KEYS.map(key => (
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

        {/* EVs */}
        <div className="mb-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-normal text-gba-blue-dark">{t.evs}</span>
            <span className={`text-[7px] ${evTotal > 510 ? 'text-red-500' : 'text-neutral-500'}`}>
              {t.evTotal}: {evTotal}/510
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {STAT_KEYS.map(key => (
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

        {/* Calculated Stats */}
        <div>
          {STAT_KEYS.map(key => {
            const base = attacker.stats[key];
            const calc = atkStats[key];
            return (
              <div key={key} className="my-1 flex items-center gap-2">
                <span className="w-16 shrink-0 text-right text-[7px] text-gba-blue-dark">{t.stats[key]}</span>
                <span className="text-[7px] text-neutral-400">({base})</span>
                <span className="h-2 flex-1 overflow-hidden rounded-sm border border-neutral-600 bg-neutral-600">
                  <span
                    className="block h-full"
                    style={{
                      width: `${Math.min(100, (calc / 400) * 100)}%`,
                      backgroundColor: calc < 60 ? '#e8503c' : calc < 110 ? '#f0a838' : '#68c848'
                    }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right text-[8px] font-normal">{calc}</span>
              </div>
            );
          })}
        </div>
      </DialogBox>

      {/* Move Selection */}
      <DialogBox>
        <h2 className="mb-1 text-[10px] font-normal text-gba-blue-dark">{t.selectMove}</h2>
        <div className="max-h-48 overflow-y-auto">
          {availableMoves.map(move => {
            const res = calculateDamage(attacker, defender, move, config);
            return (
              <button
                key={move.id}
                onClick={() => setSelectedMove(move)}
                className={`mb-1 flex w-full items-center gap-2 rounded border-2 px-2 py-1.5 text-left transition-colors ${
                  selectedMove?.id === move.id
                    ? 'border-gba-blue bg-gba-blue/10'
                    : 'border-transparent hover:bg-neutral-100'
                }`}
              >
                <span
                  className="inline-block h-4 w-12 shrink-0 rounded text-center text-[7px] leading-4 text-white"
                  style={{ backgroundColor: TYPE_COLORS[move.type] }}
                >
                  {move.type}
                </span>
                <span className="text-[8px] font-normal text-gba-blue-dark">{lang === 'es' ? move.nameEs : move.nameEn}</span>
                <span className="ml-auto text-[7px] text-neutral-500">
                  {move.power !== null ? `${t.power} ${move.power}` : '—'}
                </span>
                <span className="text-[7px] text-neutral-500">
                  {move.accuracy !== null ? `${t.accuracy} ${move.accuracy}%` : '∞'}
                </span>
                {res && (
                  <span className="text-[7px] font-normal text-neutral-700">
                    ~{res.avgDamage} ({res.avgPercent}%)
                  </span>
                )}
              </button>
            );
          })}
          {availableMoves.length === 0 && (
            <p className="text-[8px] text-neutral-500">No damaging moves available in curated database.</p>
          )}
        </div>
      </DialogBox>

      {/* Damage Result */}
      {result && selectedMove && (
        <DialogBox>
          <h2 className="mb-2 text-[10px] font-normal text-gba-blue-dark">{t.estimatedDmg}</h2>
          <div className="mb-3 flex items-center gap-3">
            <span
              className="inline-block h-5 w-16 rounded text-center text-[8px] leading-5 text-white"
              style={{ backgroundColor: TYPE_COLORS[selectedMove.type] }}
            >
              {selectedMove.type}
            </span>
            <span className="text-[9px] font-normal">{lang === 'es' ? selectedMove.nameEs : selectedMove.nameEn}</span>
          </div>

          <div className="mb-3 flex items-center gap-4">
            <div className="text-center">
              <div className="text-[8px] text-neutral-500">{t.effectiveness}</div>
              <div className={`text-[12px] font-normal ${
                result.effectiveness >= 2 ? 'text-red-500' :
                result.effectiveness > 0 && result.effectiveness < 1 ? 'text-green-600' :
                result.effectiveness === 0 ? 'text-gray-400' : 'text-neutral-700'
              }`}>
                {result.effectiveness === 0 ? '0' : result.effectiveness === 0.5 ? '½' : result.effectiveness === 2 ? '2×' : result.effectiveness === 4 ? '4×' : result.effectiveness}
              </div>
            </div>
            {result.stab && (
              <div className="text-center">
                <div className="text-[8px] text-neutral-500">{t.stabBonus}</div>
                <div className="text-[12px] font-normal text-blue-600">1.5×</div>
              </div>
            )}
            {result.critPossible && (
              <div className="text-center">
                <div className="text-[8px] text-neutral-500">Crit</div>
                <div className="text-[12px] font-normal text-purple-600">2×</div>
              </div>
            )}
          </div>

          {/* HP Bar */}
          <div className="mb-2">
            <div className="mb-1 text-[8px] text-neutral-500">
              {lang === 'es' ? defender.nameEs : defender.nameEn} — {defStats.hp} HP
            </div>
            <div className="h-4 overflow-hidden rounded-md border-2 border-neutral-800 bg-neutral-600">
              <div className="flex h-full">
                <div
                  className="h-full bg-gradient-to-b from-lime-300 to-green-500 transition-all"
                  style={{ width: `${Math.max(0, 100 - result.maxPercent)}%` }}
                />
                <div
                  className="h-full bg-gradient-to-b from-yellow-300 to-yellow-500 transition-all"
                  style={{ width: `${Math.max(0, result.maxPercent - result.minPercent)}%` }}
                />
                <div
                  className="h-full bg-gradient-to-b from-red-400 to-red-600 transition-all"
                  style={{ width: `${result.minPercent}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[7px] text-neutral-500">Min</div>
              <div className="text-[11px] font-normal">{result.minDamage}</div>
              <div className="text-[8px] text-neutral-500">{result.minPercent}%</div>
            </div>
            <div>
              <div className="text-[7px] text-neutral-500">Avg</div>
              <div className="text-[11px] font-normal">{result.avgDamage}</div>
              <div className="text-[8px] text-neutral-500">{result.avgPercent}%</div>
            </div>
            <div>
              <div className="text-[7px] text-neutral-500">Max</div>
              <div className="text-[11px] font-normal">{result.maxDamage}</div>
              <div className="text-[8px] text-neutral-500">{result.maxPercent}%</div>
            </div>
          </div>

          {(result.ohko || result.twHko || result.thHko) && (
            <div className={`mt-2 rounded border-2 px-2 py-1 text-center text-[9px] font-normal ${
              result.ohko ? 'border-red-500 bg-red-50 text-red-700' :
              result.twHko ? 'border-orange-400 bg-orange-50 text-orange-700' :
              'border-yellow-400 bg-yellow-50 text-yellow-700'
            }`}>
              {result.ohko ? t.ohko : result.twHko ? t.twoHko : t.threeHko}
            </div>
          )}
        </DialogBox>
      )}

      {/* Best Moves */}
      <DialogBox>
        <h2 className="mb-2 text-[10px] font-normal text-gba-blue-dark">{t.bestMoves}</h2>
        <p className="mb-2 text-[7px] text-neutral-500">
          vs {lang === 'es' ? defender.nameEs : defender.nameEn} (Nv.{level})
        </p>
        {bestMoves.map(({ move, result: res }, i) => (
          <div key={`${move.id}-${i}`} className="mb-1.5 flex items-center gap-2">
            <span className="w-4 text-[8px] text-neutral-400">{i + 1}.</span>
            <span
              className="inline-block h-4 w-12 shrink-0 rounded text-center text-[7px] leading-4 text-white"
              style={{ backgroundColor: TYPE_COLORS[move.type] }}
            >
              {move.type}
            </span>
            <span className="text-[8px] font-normal text-gba-blue-dark">{lang === 'es' ? move.nameEs : move.nameEn}</span>
            <span className="ml-auto text-[8px] text-neutral-600">
              ~{res.avgDamage} ({res.avgPercent}%)
            </span>
            <span className={`text-[7px] font-normal ${
              res.ohko ? 'text-red-600' : res.twHko ? 'text-orange-500' : 'text-neutral-500'
            }`}>
              {res.ohko ? t.ohko : res.twHko ? t.twoHko : res.thHko ? t.threeHko : ''}
            </span>
          </div>
        ))}
      </DialogBox>
    </div>
  );
}
