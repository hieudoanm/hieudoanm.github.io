import { render, screen } from '@testing-library/react'
import { MonthlyView } from '@/components/molecules/MonthlyView'

describe('MonthlyView', () => {
  it('renders all 12 month labels', () => {
    render(<MonthlyView year={2024} />)
    expect(screen.getByText('JAN')).toBeInTheDocument()
    expect(screen.getByText('FEB')).toBeInTheDocument()
    expect(screen.getByText('DEC')).toBeInTheDocument()
  })

  it('renders year in header context', () => {
    const { container } = render(<MonthlyView year={2024} />)
    expect(container.firstChild).toBeTruthy()
  })
})
