import { render, screen } from '@testing-library/react';
import { PiCube } from 'react-icons/pi';
import { GamesTemplate } from '../GamesTemplate';

const PROPS = {
  title: 'Test Games',
  subtitle: 'A collection of test games',
  items: [
    {
      name: 'Test Game One',
      description: 'First test game',
      icon: PiCube,
      href: '/test-game-one/',
    },
    {
      name: 'Test Game Two',
      description: 'Second test game',
      icon: PiCube,
      href: '/test-game-two/',
    },
  ],
};

describe('GamesTemplate', () => {
  it('renders the Games label', () => {
    render(<GamesTemplate {...PROPS} />);
    expect(screen.getByText('Games')).toBeInTheDocument();
  });

  it('renders the title and subtitle', () => {
    render(<GamesTemplate {...PROPS} />);
    expect(screen.getByText('Test Games')).toBeInTheDocument();
    expect(screen.getByText('A collection of test games')).toBeInTheDocument();
  });

  it('renders item names and descriptions', () => {
    render(<GamesTemplate {...PROPS} />);
    expect(screen.getByText('Test Game One')).toBeInTheDocument();
    expect(screen.getByText('First test game')).toBeInTheDocument();
    expect(screen.getByText('Test Game Two')).toBeInTheDocument();
    expect(screen.getByText('Second test game')).toBeInTheDocument();
  });

  it('links each item to its href', () => {
    render(<GamesTemplate {...PROPS} />);
    const firstLink = screen.getByRole('link', {
      name: /Test Game One/,
    });
    expect(firstLink).toHaveAttribute('href', '/test-game-one');
    const secondLink = screen.getByRole('link', {
      name: /Test Game Two/,
    });
    expect(secondLink).toHaveAttribute('href', '/test-game-two');
  });
});
