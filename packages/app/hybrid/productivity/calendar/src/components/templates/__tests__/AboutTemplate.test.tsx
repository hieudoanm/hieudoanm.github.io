import { render, screen } from '@testing-library/react'
import { AboutTemplate } from '../AboutTemplate'

describe('AboutTemplate', () => {
  it('renders the app name', () => {
    render(
      <AboutTemplate
        name="Calendar"
        description="Test description"
        version="1.0.0"
        items={[{ label: 'Package', value: '@test/calendar' }]}
      />,
    )
    expect(screen.getByText('Calendar')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(
      <AboutTemplate name="Calendar" description="Test description" version="1.0.0" items={[]} />,
    )
    expect(screen.getByText('Test description')).toBeInTheDocument()
  })

  it('renders info items', () => {
    render(
      <AboutTemplate
        name="Calendar"
        description="Test description"
        version="1.0.0"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />,
    )
    expect(screen.getByText('Framework')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
  })

  it('renders version badge', () => {
    render(
      <AboutTemplate name="Calendar" description="Test description" version="1.0.0" items={[]} />,
    )
    expect(screen.getByText('1.0.0')).toBeInTheDocument()
  })
})
