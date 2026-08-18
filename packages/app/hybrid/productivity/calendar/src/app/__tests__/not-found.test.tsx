import { render, screen } from '@testing-library/react'

import NotFoundPage from '../not-found'

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('404')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<NotFoundPage />)
    expect(screen.getByText('This page does not exist.')).toBeInTheDocument()
  })

  it('renders back link', () => {
    render(<NotFoundPage />)
    const link = screen.getByText('Back to calendar')
    expect(link).toHaveAttribute('href', '/')
  })
})
