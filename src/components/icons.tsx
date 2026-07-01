import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

/**
 * Arete Groupp brand mark (the "A" logo). Rendered from the official PNG in
 * /public/logo.png, which is landscape (≈1.37:1). `object-contain` is baked
 * in so any square `h-N w-N` className from callers scales it down without
 * distortion. `style` is forwarded so existing drop-shadow/glow effects keep
 * working.
 */
export const Logo = ({ className, style }: LogoProps) => (
  <Image
    src="/logo.png"
    alt="Arete Groupp"
    width={919}
    height={670}
    className={cn('object-contain', className)}
    style={style}
  />
);
