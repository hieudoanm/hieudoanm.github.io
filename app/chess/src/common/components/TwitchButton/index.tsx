'use client';

import Link from 'next/link';
import { FaTwitch } from 'react-icons/fa';

type TwitchButtonProperties = { href?: string };

export const TwitchButton: React.FC<TwitchButtonProperties> = ({
  href = '',
}) => {
  if (!href) return <></>;

  return (
    <Link href={href} target="_blank">
      <button className="btn btn-sm bg-teal-500 text-white" type="button">
        <FaTwitch />
      </button>
    </Link>
  );
};

TwitchButton.displayName = 'TwitchButton';
