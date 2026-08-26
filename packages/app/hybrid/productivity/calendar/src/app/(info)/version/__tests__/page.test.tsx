import { render, screen } from '@testing-library/react'

import VersionPage from '../page'

describe('VersionPage', () => {
  it('renders Header', () => {
    render(<VersionPage />)
    expect(screen.getByText('CALENDAR')).toBeInTheDocument()
  })

  it('renders version number', () => {
    render(<VersionPage />)
    expect(screen.getByText('0.0.0')).toBeInTheDocument()
  })
})
