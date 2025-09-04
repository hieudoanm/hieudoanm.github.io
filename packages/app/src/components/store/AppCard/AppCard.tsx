import { App } from '@web/data/apps';
import Link from 'next/link';
import { FC, memo } from 'react';

type AppCardProps = {
  app: App;
  featured?: boolean;
};

export const AppCard: FC<AppCardProps> = memo(({ app, featured }) => {
  const { name, category, href, github } = app;

  return (
    <article
      tabIndex={0}
      aria-label={`${name} app`}
      className={[
        'group relative transition-all duration-300',
        // luxury glass surface
        'from-base-200/55 via-base-200/35 to-base-300/25 bg-gradient-to-br',
        'backdrop-blur-2xl backdrop-saturate-150',
        'border-base-300/40 border',
        'rounded-2xl',
        'shadow-[0_8px_30px_rgba(0,0,0,0.25)]',
        // motion
        'hover:-translate-y-1',
        'hover:shadow-[0_16px_40px_rgba(0,0,0,0.35)]',
        // focus
        'focus:ring-base-content/30 focus:ring-2 focus:outline-none',
        // featured
        featured && 'ring-primary/30 ring-2',
      ]
        .filter(Boolean)
        .join(' ')}>
      {/* Glass rim + sheen */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-white/5 opacity-60" />

      <div className="relative z-10 p-4">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div
            aria-hidden
            className="from-base-300/60 to-base-300/30 text-base-content flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg font-semibold shadow-inner ring-1 ring-white/10">
            {name.at(0)?.toUpperCase() ?? 'A'}
          </div>

          {/* Main content */}
          <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
            {/* Name + badge (vertical) */}
            <div className="min-w-0">
              <h2 className="text-base-content/90 truncate text-[15px] font-semibold tracking-tight">
                {name}
              </h2>
              <span className="bg-base-300/30 text-base-content/60 mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] tracking-wide uppercase">
                {category}
              </span>
            </div>

            {/* Actions (vertical) */}
            <div className="flex shrink-0 flex-col gap-2">
              <Link
                href={href}
                target="_blank"
                className="btn btn-xs bg-base-content text-base-100 hover:bg-base-content/90 shadow-md">
                Open
              </Link>

              <Link
                href={github}
                target="_blank"
                className="btn btn-xs btn-ghost bg-base-100/40 text-base-content/70 hover:text-base-content ring-1 ring-white/10 backdrop-blur-md">
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});

AppCard.displayName = 'AppCard';
