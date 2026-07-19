import Link from 'next/link';
import { FC } from 'react';
import { PiBookOpenText, PiGameController } from 'react-icons/pi';

export interface CardActionsProps {
  href: string;
  gameHref?: string;
}

const keyOf = (href: string): string => href.replaceAll('/', '');

export const CardActions: FC<CardActionsProps> = ({ href, gameHref }) => (
  <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
    <Link
      href={href}
      className="btn btn-primary btn-sm gap-1"
      data-testid={`study-${keyOf(href)}`}>
      <PiBookOpenText className="text-sm" />
      Study
    </Link>
    {gameHref && (
      <Link
        href={gameHref}
        className="btn btn-outline btn-primary btn-sm gap-1"
        data-testid={`play-${keyOf(href)}`}>
        <PiGameController className="text-sm" />
        Play
      </Link>
    )}
  </div>
);

CardActions.displayName = 'CardActions';
