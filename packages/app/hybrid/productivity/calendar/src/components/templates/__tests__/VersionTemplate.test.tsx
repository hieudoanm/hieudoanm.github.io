import { render, screen, fireEvent } from '@testing-library/react'
import { VersionTemplate } from '../VersionTemplate'

describe('VersionTemplate', () => {
  it('renders segmented version', () => {
    render(<VersionTemplate version="2024.01.15.12.34.56" />)
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
    expect(screen.getByText('34')).toBeInTheDocument()
    expect(screen.getByText('56')).toBeInTheDocument()
  })

  it('renders non-segmented version', () => {
    render(<VersionTemplate version="abc" />)
    expect(screen.getAllByText('abc').length).toBeGreaterThanOrEqual(1)
  })

  it('renders partial version without time segments', () => {
    render(<VersionTemplate version="2024.01.15" />)
    expect(screen.getByText('2024')).toBeInTheDocument()
    expect(screen.getByText('01')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  it('shows Copied after copy click', async () => {
    const mockWriteText = jest.fn().mockResolvedValue(undefined)
    Object.assign(navigator, { clipboard: { writeText: mockWriteText } })
    jest.useFakeTimers()
    render(<VersionTemplate version="2024.01.15.12.34.56" />)
    fireEvent.click(screen.getByText('Copy version'))
    expect(await screen.findByText('Copied')).toBeInTheDocument()
    jest.useRealTimers()
  })

  it('renders format hint', () => {
    render(<VersionTemplate version="2024.01.15.12.34.56" />)
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeInTheDocument()
  })
})
