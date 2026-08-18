import { render, screen } from '@testing-library/react'

import ForbiddenPage from '../forbidden'

describe('ForbiddenPage', () => {
  it('renders 403 code', () => {
    render(<ForbiddenPage />)
    expect(screen.getByText('403')).toBeInTheDocument()
  })

  it('renders permission description', () => {
    render(<ForbiddenPage />)
    expect(screen.getByText('You do not have permission to access this page.')).toBeInTheDocument()
  })
})
