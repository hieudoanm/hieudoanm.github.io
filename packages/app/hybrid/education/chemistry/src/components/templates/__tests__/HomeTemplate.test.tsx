import { render, screen } from '@testing-library/react';
import { FiBox } from 'react-icons/fi';
import { HomeTemplate } from '../HomeTemplate';

describe('HomeTemplate', () => {
  const base = {
    appName: 'Chemistry',
    description: 'Test app',
    items: [
      {
        label: 'Tool One',
        description: 'First tool',
        icon: FiBox,
        href: '/periodic-table/',
      },
    ],
  };

  it('renders heading, description and tool cards', () => {
    render(<HomeTemplate {...base} />);
    expect(
      screen.getByRole('heading', { name: 'Chemistry' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test app')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-periodic-table')).toBeInTheDocument();
  });
});
