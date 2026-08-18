import { render, screen } from '@testing-library/react'

jest.mock('@/lib/fonts', () => ({
  sans: { variable: '--font-sans' },
  mono: { variable: '--font-mono' },
  serif: { variable: '--font-serif' },
}))

jest.mock('@/styles/globals.css', () => ({}))

import RootLayout, { metadata } from '../layout'

describe('RootLayout', () => {
  it('renders children', () => {
    render(
      <RootLayout>
        <div>child</div>
      </RootLayout>,
    )
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  it('sets html data-theme', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    )
    expect(document.documentElement).toHaveAttribute('data-theme', 'nothing')
  })

  it('renders apple touch icon link', () => {
    render(
      <RootLayout>
        <div />
      </RootLayout>,
    )
    const link = document.querySelector('link[rel="apple-touch-icon"]')
    expect(link).toHaveAttribute('href', '/icons/icon-192.png')
  })
})

describe('metadata', () => {
  it('has correct title', () => {
    expect(metadata.title).toBe('Calendar - Productivity')
  })

  it('has manifest', () => {
    expect(metadata.manifest).toBe('/manifest.json')
  })

  it('has appleWebApp config', () => {
    const app = metadata.appleWebApp as { capable: boolean; title: string }
    expect(app.capable).toBe(true)
    expect(app.title).toBe('Calendar')
  })
})
