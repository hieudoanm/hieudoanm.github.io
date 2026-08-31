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

  it('renders xp and streak stats when provided', () => {
    render(<HomeTemplate {...base} stats={{ xp: 120, streak: 3 }} />);
    expect(screen.getByTestId('stat-xp').textContent).toContain('120');
    expect(screen.getByTestId('stat-streak').textContent).toContain('3');
  });

  it('omits stats when not provided', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.queryByTestId('stat-xp')).not.toBeInTheDocument();
  });

  it('renders footer links when provided', () => {
    render(<HomeTemplate {...base} footer={<a href="/about">About</a>} />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
  });
});
