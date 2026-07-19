import { render, screen } from '@testing-library/react';
import { FiBox } from 'react-icons/fi';
import { HomeTemplate } from '../HomeTemplate';

const base = {
  title: 'Office',
  description: 'Test app',
  items: [
    {
      label: 'Calendar',
      description: 'A calendar productivity app',
      icon: FiBox,
      href: '/calendar/',
    },
  ],
};

describe('HomeTemplate', () => {
  it('renders the title and description', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByRole('heading', { name: 'Office' })).toBeInTheDocument();
    expect(screen.getByText('Test app')).toBeInTheDocument();
  });

  it('renders tool cards', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByTestId('tool-card-calendar')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('A calendar productivity app')).toBeInTheDocument();
  });

  it('links each tool card to its route', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.getByTestId('tool-card-calendar')).toHaveAttribute(
      'href',
      '/calendar'
    );
  });
});
