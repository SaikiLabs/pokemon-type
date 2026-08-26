import type { TypeName } from '../domain/pokemon';
import { TYPE_COLORS, TYPE_NAMES } from '../domain/typeMeta';
import { formatMult } from '../engine/effectiveness';
import type { Lang } from '../i18n/strings';

interface TypeBadgeProps {
  type: TypeName;
  lang: Lang;
  mult?: number;
  title?: string;
}

export function TypeBadge({ type, lang, mult, title }: TypeBadgeProps) {
  return (
    <span
      title={title}
      className="inline-flex items-center gap-1.5 rounded-md border-2 border-black/40 px-2 py-1.5 text-[8px] text-white [text-shadow:1px_1px_0_rgba(0,0,0,.45)]"
      style={{
        backgroundColor: TYPE_COLORS[type],
        boxShadow: 'inset 2px 2px 0 rgba(255,255,255,.35), inset -2px -2px 0 rgba(0,0,0,.25)'
      }}
    >
      {TYPE_NAMES[lang][type].toUpperCase()}
      {mult !== undefined && (
        <span className="rounded bg-black/35 px-1 py-0.5">{formatMult(mult)}</span>
      )}
    </span>
  );
}
