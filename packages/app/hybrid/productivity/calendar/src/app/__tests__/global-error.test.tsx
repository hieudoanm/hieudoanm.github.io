import { render, screen, fireEvent } from '@testing-library/react'

import GlobalErrorPage from '../global-error'

describe('GlobalErrorPage', () => {
  const mockReset = jest.fn()
  const error = new Error('global error')

  it('renders 500 heading', () => {
    render(<GlobalErrorPage error={error} reset={mockReset} />)
    expect(screen.getByText('500')).toBeInTheDocument()
  })

  it('renders error label', () => {
    render(<GlobalErrorPage error={error} reset={mockReset} />)
    expect(screen.getByText('Error')).toBeInTheDocument()
  })

  it('renders description', () => {
    render(<GlobalErrorPage error={error} reset={mockReset} />)
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument()
  })

  it('calls reset when button is clicked', () => {
    render(<GlobalErrorPage error={error} reset={mockReset} />)
    fireEvent.click(screen.getByText('Try again'))
    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})
