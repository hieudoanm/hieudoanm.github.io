import { render, screen } from '@testing-library/react'
import { Header } from '../Header'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

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
})
