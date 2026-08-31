import { fireEvent, render, screen } from '@testing-library/react';
import { PiCards } from 'react-icons/pi';
import { HomeTemplate } from '../HomeTemplate';

const ITEMS = [
  {
    label: 'Flashcards',
    description: 'Vocabulary decks',
    icon: PiCards,
    href: '/flashcards/',
  },
];

describe('HomeTemplate', () => {
  it('renders app name, description and cards', () => {
    render(<HomeTemplate appName="Lingo" description="desc" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Lingo' })).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-flashcards')).toBeInTheDocument();
  });

  it('renders xp and streak stats', () => {
    render(
      <HomeTemplate
        appName="Lingo"
        description="desc"
        items={ITEMS}
        stats={{ xp: 120, streak: 3 }}
      />
    );
    expect(screen.getByTestId('stat-xp')).toHaveTextContent('120 XP');
    expect(screen.getByTestId('stat-streak')).toHaveTextContent('3 days');
  });

  it('renders singular streak label', () => {
    render(
      <HomeTemplate
        appName="Lingo"
        description="desc"
        items={ITEMS}
        stats={{ xp: 0, streak: 1 }}
      />
    );
    expect(screen.getByTestId('stat-streak')).toHaveTextContent('1 day');
  });

  it('toggles theme from the home header', () => {
    localStorage.clear();
    render(<HomeTemplate appName="Lingo" description="desc" items={ITEMS} />);
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(localStorage.getItem('lingo:theme')).toBe('lingo-dark');
  });
});
