import { duration } from '@/src/theme/motion';
import { motion } from '@/src/theme/tokens';

type StreamHandle = {
  stop: () => void;
};

export function streamText(
  text: string,
  reducedMotion: boolean,
  onUpdate: (value: string) => void,
  onDone: () => void,
): StreamHandle {
  if (reducedMotion || text.length < 8) {
    onUpdate(text);
    onDone();
    return { stop() {} };
  }

  const parts = text.split(/(\s+)/);
  const step = text.length > 420 ? 3 : 1;
  let index = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let stopped = false;

  const tick = () => {
    if (stopped) return;
    index = Math.min(parts.length, index + step);
    onUpdate(parts.slice(0, index).join(''));
    if (index >= parts.length) {
      onDone();
      return;
    }
    timer = setTimeout(tick, duration(motion.stream));
  };

  tick();

  return {
    stop() {
      stopped = true;
      if (timer) clearTimeout(timer);
    },
  };
}
