import { render, screen } from '@testing-library/react'

import AboutPage from '../page'

describe('AboutPage', () => {
  it('renders Header', () => {
    render(<AboutPage />)
    expect(screen.getByText('CALENDAR')).toBeInTheDocument()
  })

  it('renders AboutTemplate with name', () => {
    render(<AboutPage />)
    expect(screen.getByText('Calendar')).toBeInTheDocument()
  })

  it('renders package info', () => {
    render(<AboutPage />)
    expect(screen.getByText('@hieudoanm.github.io/calendar')).toBeInTheDocument()
  })

  it('renders framework info', () => {
    render(<AboutPage />)
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })
})
