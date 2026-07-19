'use client'

import type { FC } from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'calendar-theme'

const getInitialTheme = (): string => {
  if (typeof window === 'undefined') return 'calendar-dark'
  return localStorage.getItem(STORAGE_KEY) || 'calendar-dark'
}

export const Header: FC = () => {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((current) => (current === 'calendar-dark' ? 'calendar-light' : 'calendar-dark'))

  return (
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
          <button type="button" aria-label="Toggle theme" onClick={toggleTheme}>
            {theme === 'calendar-dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
Header.displayName = 'Header'
