import { render, screen } from '@testing-library/react'

jest.mock('@/components/organisms/CalendarApp', () => ({
  CalendarApp: () => <div data-testid="calendar-app">CalendarApp</div>,
}))

import HomePage from '../page'

describe('HomePage', () => {
  it('renders CalendarApp', () => {
    render(<HomePage />)
    expect(screen.getByTestId('calendar-app')).toBeInTheDocument()
  })
})
