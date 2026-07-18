import type { CSSProperties, FC, ReactNode } from 'react';

export interface BackgroundProps {
  center?: boolean;
  textAlign?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  gap?: 'none' | 'sm' | 'md' | 'lg';
  overflow?: boolean;
  bg?: string;
  border?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const PADDING_MAP = {
  none: '',
  sm: 'p-4',
  md: 'p-8',
  lg: 'p-12',
} as const;

const GAP_MAP = {
  none: '',
  sm: 'gap-3',
  md: 'gap-4',
  lg: 'gap-6',
} as const;

export const Background: FC<BackgroundProps> = ({
  center = false,
  textAlign = false,
  padding = 'md',
  gap = 'none',
  overflow = false,
  bg = 'bg-base-100',
  border = '',
  className = '',
  style,
  children,
}) => {
  const classes = [
    bg,
    'flex',
    'h-full',
    'w-full',
    'flex-col',
    center && 'items-center justify-center',
    textAlign && 'text-center',
    PADDING_MAP[padding],
    GAP_MAP[gap],
    overflow && 'overflow-hidden',
    border,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
