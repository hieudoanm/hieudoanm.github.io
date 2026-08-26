'use client'

import type { FC } from 'react'
import Link from 'next/link'

export const Header: FC = () => (
  <header className="border-base-content/10 bg-base-100 sticky top-0 z-10 border-b px-4 py-2">
    <div className="flex items-center justify-between">
      <Link href="/" className="text-primary text-xs font-bold tracking-wider">
        CALENDAR
      </Link>

      <nav className="flex items-center gap-1">
        <Link
          href="/about"
          className="text-base-content/60 hover:text-base-content px-2 py-1 text-[10px] transition-colors"
        >
          About
        </Link>
        <Link
          href="/downloads"
          className="text-base-content/60 hover:text-base-content px-2 py-1 text-[10px] transition-colors"
        >
          Downloads
        </Link>
        <Link
          href="/version"
          className="text-base-content/60 hover:text-base-content px-2 py-1 text-[10px] transition-colors"
        >
          Version
        </Link>
      </nav>
    </div>
  </header>
)
Header.displayName = 'Header'
