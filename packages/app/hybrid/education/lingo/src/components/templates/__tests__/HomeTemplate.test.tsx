import { render, screen } from '@testing-library/react';
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
    render(
      <HomeTemplate
        appName="Lingo"
        description="desc"
        items={ITEMS}
        footer={<span>footer</span>}
      />
    );
    expect(screen.getByRole('heading', { name: 'Lingo' })).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-flashcards')).toBeInTheDocument();
    expect(screen.getByText('footer')).toBeInTheDocument();
  });
});
