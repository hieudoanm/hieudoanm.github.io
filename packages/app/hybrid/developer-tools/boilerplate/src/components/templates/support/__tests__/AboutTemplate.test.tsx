import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('AboutTemplate', () => {
  it('renders name, description, items, and version', () => {
    render(
      <AboutTemplate
        name="My App"
        description="A description"
        version="1.0.0"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Router', value: 'App Router' },
        ]}
      />
    );
    expect(screen.getByRole('heading', { name: 'My App' })).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
