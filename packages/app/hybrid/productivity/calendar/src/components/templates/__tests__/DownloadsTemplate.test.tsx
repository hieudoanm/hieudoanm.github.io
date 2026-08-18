import { render, screen } from '@testing-library/react'
import { DownloadsTemplate } from '../DownloadsTemplate'

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe('DownloadsTemplate', () => {
  it('renders the heading', () => {
    render(
      <DownloadsTemplate
        version="1.0.0"
        items={[
          {
            platform: 'Web',
            requirements: 'Any browser',
            label: 'Open',
            href: '/',
          },
        ]}
      />,
    )
    expect(screen.getByText('Installers')).toBeInTheDocument()
  })

  it('renders download items', () => {
    render(
      <DownloadsTemplate
        version="1.0.0"
        items={[
          {
            platform: 'macOS',
            requirements: 'macOS 10.15+',
            label: 'Download',
            href: '/download',
          },
        ]}
      />,
    )
    expect(screen.getByText('macOS')).toBeInTheDocument()
    expect(screen.getByText('macOS 10.15+')).toBeInTheDocument()
  })

  it('renders version badge', () => {
    render(<DownloadsTemplate version="1.0.0" items={[]} />)
    expect(screen.getByText('1.0.0')).toBeInTheDocument()
  })
})
