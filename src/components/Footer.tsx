import { useLanguage } from '../hooks/useLanguage';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="pb-2 text-center text-[7px] leading-relaxed text-lime-100/80">
      {t.footer}
    </footer>
  );
}
