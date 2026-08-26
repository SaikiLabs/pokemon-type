import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STRINGS, type Lang, type Strings } from '../i18n/strings';

interface LanguageContextValue {
  lang: Lang;
  t: Strings;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLang(): Lang {
  try {
    return globalThis.localStorage.getItem('ptc-lang') === 'en' ? 'en' : 'es';
  } catch {
    return 'es';
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStoredLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      t: STRINGS[lang],
      setLang: (next) => {
        setLangState(next);
        try {
          globalThis.localStorage.setItem('ptc-lang', next);
        } catch {
          /* sin persistencia */
        }
      }
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  return ctx;
}
