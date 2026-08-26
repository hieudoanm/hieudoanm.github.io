import { render, screen } from '@testing-library/react'
import { NotFoundTemplate } from '../NotFoundTemplate'

describe('NotFoundTemplate', () => {
  it('renders 404 heading', () => {
    render(<NotFoundTemplate />)
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('Not Found')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<NotFoundTemplate description="Page not found" />)
    expect(screen.getByText('Page not found')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(<NotFoundTemplate action={<button>Go home</button>} />)
    expect(screen.getByText('Go home')).toBeInTheDocument()
  })
})
