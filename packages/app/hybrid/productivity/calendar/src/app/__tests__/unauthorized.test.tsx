import { render, screen } from '@testing-library/react'

import UnauthorizedPage from '../unauthorized'

describe('UnauthorizedPage', () => {
  it('renders 401 code', () => {
    render(<UnauthorizedPage />)
    expect(screen.getByText('401')).toBeInTheDocument()
  })

  it('renders authentication description', () => {
    render(<UnauthorizedPage />)
    expect(screen.getByText('You must be authenticated to access this page.')).toBeInTheDocument()
  })
})
