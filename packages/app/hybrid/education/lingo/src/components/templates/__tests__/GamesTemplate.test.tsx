import { render, screen } from '@testing-library/react';
import { PiCards } from 'react-icons/pi';
import { GamesTemplate } from '../GamesTemplate';

const ITEMS = [
  {
    name: 'Languages',
    description: 'Vocabulary decks',
    icon: PiCards,
    href: '/languages/',
  },
];

describe('GamesTemplate', () => {
  it('renders title, subtitle and cards', () => {
    render(<GamesTemplate title="Lingo" subtitle="desc" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Lingo' })).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-languages')).toBeInTheDocument();
  });

  it('renders a custom testId when provided', () => {
    render(
      <GamesTemplate
        title="Lingo"
        subtitle="desc"
        items={[{ ...ITEMS[0], testId: 'card-custom' }]}
      />
    );
    expect(screen.getByTestId('card-custom')).toBeInTheDocument();
  });
});
