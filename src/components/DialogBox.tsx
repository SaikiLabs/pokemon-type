import type { ReactNode } from 'react';

const DIALOG_CLASSES =
  'rounded-[10px] border-4 border-gba-blue bg-gba-beige p-4 ' +
  'shadow-[0_0_0_4px_var(--color-gba-navy),inset_0_0_0_4px_var(--color-gba-blue-light)]';

interface DialogBoxProps {
  children: ReactNode;
  className?: string;
}

export function DialogBox({ children, className = '' }: DialogBoxProps) {
  return <section className={`${DIALOG_CLASSES} ${className}`}>{children}</section>;
}
