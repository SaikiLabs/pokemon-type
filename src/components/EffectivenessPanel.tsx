import { CATEGORY_ORDER, type Category } from '../domain/pokemon';
import type {
  EffectivenessEntry,
  OffensiveEntry
} from '../domain/pokemon';
import { groupByCategory } from '../engine/effectiveness';
import type { Lang } from '../i18n/strings';
import { CategoryRow } from './CategoryRow';
import { DialogBox } from './DialogBox';

interface EffectivenessPanelProps {
  title: string;
  subtitle: string;
  entries: EffectivenessEntry[] | OffensiveEntry[];
  labels: Record<Category, string>;
  lang: Lang;
  offensive: boolean;
}

export function EffectivenessPanel({
  title,
  subtitle,
  entries,
  labels,
  lang,
  offensive
}: EffectivenessPanelProps) {
  const groups = groupByCategory(entries);
  return (
    <DialogBox>
      <h2 className="mb-1 text-[11px] font-normal text-gba-blue-dark">{title}</h2>
      <p className="mb-3.5 text-[8px] leading-relaxed text-neutral-500">{subtitle}</p>
      {CATEGORY_ORDER.map((cat) =>
        groups[cat].length > 0 ? (
          <CategoryRow
            key={cat}
            label={labels[cat]}
            category={cat}
            entries={groups[cat]}
            lang={lang}
            offensive={offensive}
          />
        ) : null
      )}
    </DialogBox>
  );
}
