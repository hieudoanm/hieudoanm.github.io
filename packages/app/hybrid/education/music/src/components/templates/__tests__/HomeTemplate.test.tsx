import { render, screen } from '@testing-library/react';
import { FiBox } from 'react-icons/fi';
import { HomeTemplate } from '../HomeTemplate';

describe('HomeTemplate', () => {
  const base = {
    appName: 'Music',
    description: 'Test app',
    items: [
      {
        label: 'Tool One',
        description: 'First tool',
        icon: FiBox,
        href: '/pitch/',
      },
    ],
  };

  it('renders heading, description and tool cards', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByRole('heading', { name: 'Music' })).toBeInTheDocument();
    expect(screen.getByText('Test app')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-pitch')).toBeInTheDocument();
  });

  it('omits stats when not provided', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.queryByTestId('stat-xp')).not.toBeInTheDocument();
  });
});
