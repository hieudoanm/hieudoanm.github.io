import { render, screen } from '@testing-library/react';
import { FiBox } from 'react-icons/fi';
import { HomeTemplate } from '../HomeTemplate';

const base = {
  title: 'Food',
  description: 'Test app',
  items: [
    {
      label: 'Tool One',
      description: 'First tool',
      icon: FiBox,
      href: '/randomizer/',
    },
  ],
};

describe('HomeTemplate', () => {
  it('renders the title and description', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByRole('heading', { name: 'Food' })).toBeInTheDocument();
    expect(screen.getByText('Test app')).toBeInTheDocument();
  });

  it('renders tool cards', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByTestId('tool-card-randomizer')).toBeInTheDocument();
    expect(screen.getByText('Tool One')).toBeInTheDocument();
    expect(screen.getByText('First tool')).toBeInTheDocument();
  });

  it('links each tool card to its route', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByTestId('tool-card-randomizer')).toHaveAttribute(
      'href',
      '/randomizer'
    );
  });

  it('centers the main content', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByRole('main').className).toContain('justify-center');
  });
});
