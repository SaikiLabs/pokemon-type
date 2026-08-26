import type { Pokemon, Move, BattleConfig, DamageResult } from '../domain/pokemon';
import { findBestMoves } from './damageCalculator';

export interface MoveAnalysis {
  move: Move;
  result: DamageResult;
  rank: number;
}

export interface TypeAnalysis {
  type: string;
  moves: MoveAnalysis[];
  bestMove: MoveAnalysis;
}

export function analyzeMovesByType(
  attacker: Pokemon,
  defender: Pokemon,
  config: Partial<BattleConfig> = {}
): TypeAnalysis[] {
  const bestMoves = findBestMoves(attacker, defender, config, 50);

  const byType = new Map<string, MoveAnalysis[]>();
  for (const { move, result } of bestMoves) {
    const existing = byType.get(move.type) || [];
    existing.push({ move, result, rank: existing.length + 1 });
    byType.set(move.type, existing);
  }

  const analyses: TypeAnalysis[] = [];
  for (const [type, moves] of byType) {
    moves.sort((a, b) => b.result.avgDamage - a.result.avgDamage);
    analyses.push({
      type,
      moves,
      bestMove: moves[0]
    });
  }

  analyses.sort((a, b) => b.bestMove.result.avgDamage - a.bestMove.result.avgDamage);
  return analyses;
}

export function getPhysicalVsSpecial(
  attacker: Pokemon,
  defender: Pokemon,
  config: Partial<BattleConfig> = {}
): { physical: MoveAnalysis[]; special: MoveAnalysis[] } {
  const bestMoves = findBestMoves(attacker, defender, config, 30);

  const physical: MoveAnalysis[] = [];
  const special: MoveAnalysis[] = [];

  for (const { move, result } of bestMoves) {
    const analysis: MoveAnalysis = { move, result, rank: 0 };
    if (move.category === 'physical') {
      physical.push(analysis);
    } else if (move.category === 'special') {
      special.push(analysis);
    }
  }

  physical.sort((a, b) => b.result.avgDamage - a.result.avgDamage);
  special.sort((a, b) => b.result.avgDamage - a.result.avgDamage);

  physical.forEach((a, i) => a.rank = i + 1);
  special.forEach((a, i) => a.rank = i + 1);

  return { physical: physical.slice(0, 5), special: special.slice(0, 5) };
}
