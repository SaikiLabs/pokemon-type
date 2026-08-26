import type { Pokemon, Move, BattleConfig, DamageResult, IVs, EVs, Nature } from '../domain/pokemon';
import { getMultiplier } from './effectiveness';
import { calculateAllStats } from './statCalculator';
import { MOVES } from '../data/moves';

const DEFAULT_IVS: IVs = { hp: 31, attack: 31, defense: 31, spAtk: 31, spDef: 31, speed: 31 };
const DEFAULT_EVS: EVs = { hp: 0, attack: 0, defense: 0, spAtk: 0, spDef: 0, speed: 0 };
const NEUTRAL_NATURE: Nature = { name: 'Seria', nameEn: 'Serious', increase: null, decrease: null };

const DEFAULT_CONFIG: BattleConfig = {
  attackerLevel: 50,
  defenderLevel: 50,
  attackerIVs: DEFAULT_IVS,
  attackerEVs: DEFAULT_EVS,
  defenderIVs: DEFAULT_IVS,
  defenderEVs: DEFAULT_EVS,
  attackerNature: NEUTRAL_NATURE,
  defenderNature: NEUTRAL_NATURE
};

function floor(n: number): number {
  return Math.floor(n);
}

function baseDamage(level: number, power: number, attack: number, defense: number): number {
  return floor(floor(floor((2 * level) / 5 + 2) * power * attack / defense) / 50) + 2;
}

export function calculateDamage(
  attacker: Pokemon,
  defender: Pokemon,
  move: Move,
  config: Partial<BattleConfig> = {}
): DamageResult | null {
  if (move.category === 'status' || move.power === null) return null;

  const cfg = { ...DEFAULT_CONFIG, ...config };
  const atkStats = calculateAllStats(attacker.stats, cfg.attackerIVs, cfg.attackerEVs, cfg.attackerLevel, cfg.attackerNature);
  const defStats = calculateAllStats(defender.stats, cfg.defenderIVs, cfg.defenderEVs, cfg.defenderLevel, cfg.defenderNature);

  const isPhysical = move.category === 'physical';
  const A = isPhysical ? atkStats.attack : atkStats.spAtk;
  const D = isPhysical ? defStats.defense : defStats.spDef;

  if (A === 0 || D === 0) {
    return { minDamage: 0, maxDamage: 0, avgDamage: 0, minPercent: 0, maxPercent: 0, avgPercent: 0, effectiveness: 0, stab: false, critPossible: false, ohko: false, twHko: false, thHko: false };
  }

  const stab = attacker.types.includes(move.type);
  const stabMult = stab ? 1.5 : 1;

  const effMult = getMultiplier(move.type, defender.types);
  const effectiveness = effMult;

  const critPossible = move.critRate > 0;
  const baseDmg = baseDamage(cfg.attackerLevel, move.power!, A, D);
  const noRandomDmg = floor(baseDmg * stabMult * effMult);

  const randomMin = floor(noRandomDmg * 0.85);
  const randomMax = noRandomDmg;

  const defenderHP = floor(((2 * defender.stats.hp + cfg.defenderIVs.hp + Math.floor(cfg.defenderEVs.hp / 4)) * cfg.defenderLevel) / 100) + cfg.defenderLevel + 10;

  const minPercent = defenderHP > 0 ? (randomMin / defenderHP) * 100 : 0;
  const maxPercent = defenderHP > 0 ? (randomMax / defenderHP) * 100 : 0;
  const avgPercent = (minPercent + maxPercent) / 2;

  return {
    minDamage: randomMin,
    maxDamage: randomMax,
    avgDamage: floor((randomMin + randomMax) / 2),
    minPercent: Math.min(100, Math.round(minPercent * 10) / 10),
    maxPercent: Math.min(100, Math.round(maxPercent * 10) / 10),
    avgPercent: Math.min(100, Math.round(avgPercent * 10) / 10),
    effectiveness,
    stab,
    critPossible,
    ohko: randomMin >= defenderHP,
    twHko: randomMax >= defenderHP && randomMin < defenderHP,
    thHko: randomMax * 2 >= defenderHP && randomMax < defenderHP
  };
}

export function calculateDamageVsDefender(
  attacker: Pokemon,
  defender: Pokemon,
  moveName: string,
  config: Partial<BattleConfig> = {}
): DamageResult | null {
  const move = MOVES.find(m => m.nameEn.toLowerCase() === moveName.toLowerCase());
  if (!move) return null;
  return calculateDamage(attacker, defender, move, config);
}

export function findBestMoves(
  attacker: Pokemon,
  defender: Pokemon,
  config: Partial<BattleConfig> = {},
  count: number = 5
): { move: Move; result: DamageResult }[] {
  const results: { move: Move; result: DamageResult }[] = [];

  for (const move of MOVES) {
    if (move.category === 'status' || move.power === null) continue;
    const result = calculateDamage(attacker, defender, move, config);
    if (result) {
      results.push({ move, result });
    }
  }

  results.sort((a, b) => b.result.avgDamage - a.result.avgDamage);
  return results.slice(0, count);
}

export function getKOHits(dmg: number, defenderHP: number): string {
  if (dmg <= 0) return '-';
  const hits = Math.ceil(defenderHP / dmg);
  if (hits === 1) return 'OHKO';
  if (hits === 2) return '2HKO';
  if (hits === 3) return '3HKO';
  return `${hits}HKO`;
}
