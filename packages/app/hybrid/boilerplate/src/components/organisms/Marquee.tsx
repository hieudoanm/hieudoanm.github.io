import type { FC, ReactNode } from 'react';

interface MarqueeProps {
  items: ReactNode[];
  title?: string;
  className?: string;
}

export const Marquee: FC<MarqueeProps> = ({ items, title, className = '' }) => (
  <div className={className}>
    {title && <h2 className="mb-4 text-center text-2xl">{title}</h2>}
    <div className="border-base-content/10 overflow-hidden border-y py-4">
      <div className="animate-marquee flex w-max gap-8 pr-8">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="text-base-content/50 flex shrink-0 items-center gap-2 text-lg">
            {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);
