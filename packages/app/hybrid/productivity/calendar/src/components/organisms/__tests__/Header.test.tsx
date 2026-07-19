import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '../Header'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

beforeEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
})

describe('Header', () => {
  it('renders the app name', () => {
    render(<Header />)
    expect(screen.getByText('CALENDAR')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Downloads')).toBeInTheDocument()
    expect(screen.getByText('Version')).toBeInTheDocument()
  })

  it('links to correct routes', () => {
    render(<Header />)
    expect(screen.getByText('About')).toHaveAttribute('href', '/about')
    expect(screen.getByText('Downloads')).toHaveAttribute('href', '/downloads')
    expect(screen.getByText('Version')).toHaveAttribute('href', '/version')
  })

  it('links home from the logo', () => {
    render(<Header />)
    expect(screen.getByText('CALENDAR')).toHaveAttribute('href', '/')
  })

  it('renders theme toggle button', () => {
    render(<Header />)
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('sets default data-theme to nothing', () => {
    render(<Header />)
    expect(document.documentElement.getAttribute('data-theme')).toBe('calendar-dark')
  })

  it('toggles theme on click', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(document.documentElement.getAttribute('data-theme')).toBe('calendar-light')
  })

  it('toggles back to nothing theme', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /toggle theme/i })
    fireEvent.click(toggle)
    fireEvent.click(toggle)
    expect(document.documentElement.getAttribute('data-theme')).toBe('calendar-dark')
  })

  it('persists theme to localStorage', () => {
    render(<Header />)
    fireEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(localStorage.getItem('calendar-theme')).toBe('calendar-light')
  })
})
