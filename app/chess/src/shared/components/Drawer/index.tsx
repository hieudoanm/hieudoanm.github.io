import { APP_NAME } from '@chess/common/constants/app.constants';
import Link from 'next/link';
import { ReactNode } from 'react';
import { PageHeading } from '../PageHeading';

export type DrawerProperties = { children?: ReactNode };

export const Drawer: React.FC<DrawerProperties> = ({ children = <></> }) => {
  return (
    <div className="drawer">
      <input id="chess-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">{children}</div>
      <div className="drawer-side">
        <label
          htmlFor="chess-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <div className="border-b pb-4">
            <PageHeading>{APP_NAME}</PageHeading>
          </div>
          <div className="flex flex-col gap-y-4 py-4">
            <Link href="/">Insights</Link>
            <Link href="/players">Players</Link>
            <Link href="/openings">Openings</Link>
            <Link href="/rating">Rating</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Drawer.displayName = 'Drawer';
