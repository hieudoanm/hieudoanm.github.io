import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  it('renders group headings when items have a group', () => {
    render(
      <GamesTemplate
        title="Lingo"
        subtitle="desc"
        items={[
          { ...ITEMS[0], group: 'Humanities' },
          {
            ...ITEMS[0],
            name: 'Chemistry',
            href: '/chemistry/',
            group: 'STEM',
          },
        ]}
      />
    );
    expect(
      screen.getByRole('heading', { level: 2, name: 'Humanities' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'STEM' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(2);
  });

  it('omits the group heading when no group is set', () => {
    render(<GamesTemplate title="Lingo" subtitle="desc" items={ITEMS} />);
    expect(screen.queryAllByRole('heading', { level: 2 })).toHaveLength(0);
  });

  it('hides the search input when not searchable', () => {
    render(<GamesTemplate title="Lingo" subtitle="desc" items={ITEMS} />);
    expect(screen.queryByTestId('games-search')).not.toBeInTheDocument();
  });

  it('filters items by search query', async () => {
    const user = userEvent.setup();
    render(
      <GamesTemplate
        title="Lingo"
        subtitle="desc"
        items={[
          { ...ITEMS[0], group: 'Humanities' },
          {
            ...ITEMS[0],
            name: 'Chemistry',
            href: '/chemistry/',
            group: 'STEM',
          },
        ]}
        searchable
      />
    );
    await user.type(screen.getByTestId('games-search'), 'chem');
    expect(screen.getByTestId('tool-card-chemistry')).toBeInTheDocument();
    expect(screen.queryByTestId('tool-card-languages')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { level: 2, name: 'Humanities' })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'STEM' })
    ).toBeInTheDocument();
  });

  it('shows a message when no items match the search', async () => {
    const user = userEvent.setup();
    render(
      <GamesTemplate title="Lingo" subtitle="desc" items={ITEMS} searchable />
    );
    await user.type(screen.getByTestId('games-search'), 'zzz');
    expect(screen.getByText('No games match your search.')).toBeInTheDocument();
    expect(screen.queryByTestId('tool-card-languages')).not.toBeInTheDocument();
  });
});
