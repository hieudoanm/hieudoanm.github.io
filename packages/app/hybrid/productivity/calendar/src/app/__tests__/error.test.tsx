import { render, screen, fireEvent } from '@testing-library/react'

import ErrorPage from '../error'

describe('ErrorPage', () => {
  const mockReset = jest.fn()
  const error = new Error('test error message')

  it('renders error message', () => {
    render(<ErrorPage error={error} reset={mockReset} />)
    expect(screen.getByText('test error message')).toBeInTheDocument()
  })

  it('renders heading', () => {
    render(<ErrorPage error={error} reset={mockReset} />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('calls reset when button is clicked', () => {
    render(<ErrorPage error={error} reset={mockReset} />)
    fireEvent.click(screen.getByText('Try again'))
    expect(mockReset).toHaveBeenCalledTimes(1)
  })
})
