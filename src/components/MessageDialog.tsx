import { useTypewriter } from '../hooks/useTypewriter';
import { DialogBox } from './DialogBox';

export function MessageDialog({ text }: { text: string }) {
  const shown = useTypewriter(text);
  return (
    <DialogBox className="min-h-19">
      <p className="text-[11px] leading-loose text-neutral-700">{shown}</p>
    </DialogBox>
  );
}
