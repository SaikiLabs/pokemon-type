import type { Category, Pokemon, TypeName } from '../domain/pokemon';
import { TYPE_NAMES } from '../domain/typeMeta';
import { capitalize, joinList, type Lang } from './strings';

export function displayName(pokemon: Pokemon, lang: Lang): string {
  return lang === 'es' ? pokemon.nameEs : capitalize(pokemon.nameEn);
}

interface TypedEntry {
  type: TypeName;
}

function localizedNames(entries: readonly TypedEntry[], lang: Lang): string[] {
  return entries.map((e) => TYPE_NAMES[lang][e.type].toUpperCase());
}

export function buildNarrative(
  name: string,
  groups: Record<Category, readonly TypedEntry[]>,
  lang: Lang
): string {
  const parts: string[] = [];

  if (groups.quad.length > 0) {
    parts.push(
      lang === 'es'
        ? `¡${name} es MUY DÉBIL ante ${joinList(localizedNames(groups.quad, lang), lang)}!`
        : `${name} is VERY WEAK against ${joinList(localizedNames(groups.quad, lang), lang)}!`
    );
  } else if (groups.double.length > 0) {
    parts.push(
      lang === 'es'
        ? `${name} es DÉBIL ante ${joinList(localizedNames(groups.double, lang), lang)}.`
        : `${name} is WEAK against ${joinList(localizedNames(groups.double, lang), lang)}.`
    );
  }

  if (groups.quarter.length > 0) {
    parts.push(
      lang === 'es'
        ? `Resiste muy bien ${joinList(localizedNames(groups.quarter, lang), lang)}.`
        : `It strongly resists ${joinList(localizedNames(groups.quarter, lang), lang)}.`
    );
  }

  if (groups.half.length > 0) {
    parts.push(
      lang === 'es'
        ? `Resiste ${joinList(localizedNames(groups.half, lang), lang)}.`
        : `It resists ${joinList(localizedNames(groups.half, lang), lang)}.`
    );
  }

  if (groups.immune.length > 0) {
    parts.push(
      lang === 'es'
        ? `¡Y es INMUNE a ${joinList(localizedNames(groups.immune, lang), lang)}!`
        : `And it is IMMUNE to ${joinList(localizedNames(groups.immune, lang), lang)}!`
    );
  }

  if (parts.length === 0) {
    return lang === 'es'
      ? `${name} no tiene debilidades ni resistencias destacables.`
      : `${name} has no notable weaknesses or resistances.`;
  }
  return parts.join(' ');
}
