import { render, screen } from '@testing-library/react'

import VersionPage from '../page'

describe('VersionPage', () => {
  it('renders version number', () => {
    render(<VersionPage />)
    expect(screen.getByText('0.0.0')).toBeInTheDocument()
  })
})
