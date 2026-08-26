import { render, screen } from '@testing-library/react'
import { DayView } from '@/components/molecules/DayView'

describe('DayView', () => {
  it('renders time labels', () => {
    render(<DayView year={2024} month={0} day={15} />)
    expect(screen.getByText('12 AM')).toBeInTheDocument()
    expect(screen.getByText('11 PM')).toBeInTheDocument()
  })

  it('renders without day header', () => {
    render(<DayView year={2024} month={0} day={15} />)
    expect(screen.queryByText('Mon')).not.toBeInTheDocument()
  })
})
