import { render, screen } from '@testing-library/react';
import { PiCards } from 'react-icons/pi';
import { HomeTemplate } from '../HomeTemplate';

const ITEMS = [
  {
    label: 'Languages',
    description: 'Vocabulary decks',
    icon: PiCards,
    href: '/languages/',
  },
];

describe('HomeTemplate', () => {
  it('renders app name, description and cards', () => {
    render(<HomeTemplate appName="Lingo" description="desc" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Lingo' })).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-languages')).toBeInTheDocument();
  });
});
