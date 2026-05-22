import { useEffect, useState } from 'react';

interface CountUpProps {
  to: number;
  durationMs?: number;
  delayMs?: number;
}

export function CountUp({ to, durationMs = 1200, delayMs = 0 }: CountUpProps) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf = 0;
    let startTs = 0;
    const timer = window.setTimeout(() => {
      const tick = (ts: number) => {
        if (!startTs) startTs = ts;
        const elapsed = ts - startTs;
        const progress = Math.min(elapsed / durationMs, 1);
        // easeOut cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(to * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, durationMs, delayMs]);

  return <>{value.toLocaleString()}</>;
}
