import type {
  Category,
  EffectivenessEntry,
  OffensiveEntry
} from '../domain/pokemon';
import type { Lang } from '../i18n/strings';
import { TYPE_NAMES } from '../domain/typeMeta';
import { TypeBadge } from './TypeBadge';

const CATEGORY_BG: Record<Category, string> = {
  quad: 'bg-[#d84030]',
  double: 'bg-[#e88838]',
  neutral: 'bg-[#b8a040]',
  half: 'bg-[#58a048]',
  quarter: 'bg-[#3898a8]',
  immune: 'bg-[#787880]'
};

interface CategoryRowProps {
  label: string;
  category: Category;
  entries: ReadonlyArray<EffectivenessEntry | OffensiveEntry>;
  lang: Lang;
  offensive: boolean;
}

export function CategoryRow({ label, category, entries, lang, offensive }: CategoryRowProps) {
  return (
    <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
      <span
        className={`w-full rounded-md border-2 border-black/35 px-2 py-1.5 text-center text-[8px] text-white [text-shadow:1px_1px_0_rgba(0,0,0,.45)] sm:w-44 ${CATEGORY_BG[category]}`}
      >
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {entries.map((entry) => {
          const attacker = offensive && 'attacker' in entry ? entry.attacker : null;
          const title =
            attacker && entry.mult > 1
              ? `${TYPE_NAMES[lang][attacker]} ×${entry.mult}`
              : undefined;
          return (
            <TypeBadge
              key={entry.type}
              type={entry.type}
              lang={lang}
              mult={entry.mult === 1 ? undefined : entry.mult}
              title={title}
            />
          );
        })}
      </div>
    </div>
  );
}
