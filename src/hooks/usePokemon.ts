import { useCallback, useEffect, useState } from 'react';
import { getPokemon, PokeApiError, type PokeErrorCode } from '../api/pokeApi';
import type { Pokemon } from '../domain/pokemon';

export type SearchError = PokeErrorCode | 'empty';

export interface PokemonSearchState {
  status: 'idle' | 'loading' | 'success' | 'error';
  pokemon: Pokemon | null;
  error: SearchError | null;
  search: (query: string) => void;
}

export function usePokemon(initialQuery: string): PokemonSearchState {
  const [status, setStatus] = useState<PokemonSearchState['status']>('idle');
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<SearchError | null>(null);

  const search = useCallback(async (query: string) => {
    const q = query.trim();
    if (!q) {
      setStatus('error');
      setError('empty');
      return;
    }
    setStatus('loading');
    try {
      const p = await getPokemon(q);
      setPokemon(p);
      setStatus('success');
      setError(null);
      try {
        globalThis.localStorage.setItem('ptc-last', String(p.id));
      } catch {
        /* sin persistencia */
      }
    } catch (e) {
      setError(e instanceof PokeApiError ? e.code : 'network');
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void search(initialQuery);
  }, [initialQuery, search]);

  return { status, pokemon, error, search };
}
