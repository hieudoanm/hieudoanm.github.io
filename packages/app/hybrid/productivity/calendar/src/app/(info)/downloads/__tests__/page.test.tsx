import { render, screen } from '@testing-library/react'

import DownloadsPage from '../page'

describe('DownloadsPage', () => {
  it('renders Header', () => {
    render(<DownloadsPage />)
    expect(screen.getByText('CALENDAR')).toBeInTheDocument()
  })

  it('renders platform names', () => {
    render(<DownloadsPage />)
    expect(screen.getByText('Web')).toBeInTheDocument()
    expect(screen.getByText('macOS')).toBeInTheDocument()
    expect(screen.getByText('Windows')).toBeInTheDocument()
    expect(screen.getByText('Linux')).toBeInTheDocument()
  })

  it('renders download links', () => {
    render(<DownloadsPage />)
    const links = screen.getAllByText('Download')
    expect(links.length).toBeGreaterThanOrEqual(1)
  })
})
