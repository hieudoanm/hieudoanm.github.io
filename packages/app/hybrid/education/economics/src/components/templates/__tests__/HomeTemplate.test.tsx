import { fireEvent, render, screen } from '@testing-library/react';
import { PiStrategy, PiTarget, PiWind } from 'react-icons/pi';
import { HomeTemplate } from '../HomeTemplate';

const ITEMS = [
  {
    label: "Prisoner's Dilemma",
    description: 'Iterated game theory against AI strategies',
    icon: PiStrategy,
    href: '/prisoners-dilemma/',
    badge: 'Nobel 1994',
    category: 'Game Theory',
  },
  {
    label: 'Nash Equilibrium',
    description: 'The stable point where no one wants to deviate alone',
    icon: PiTarget,
    href: '/nash-equilibrium/',
    category: 'Game Theory',
  },
  {
    label: 'Externalities',
    description: 'When your actions affect strangers',
    icon: PiWind,
    href: '/externalities/',
    category: 'Public & Macro',
  },
];

describe('HomeTemplate', () => {
  it('renders app name, description and cards', () => {
    render(
      <HomeTemplate appName="Economics" description="desc" items={ITEMS} />
    );
    expect(
      screen.getByRole('heading', { name: 'Economics' })
    ).toBeInTheDocument();
    expect(screen.getByText('desc')).toBeInTheDocument();
    expect(
      screen.getByTestId('tool-card-prisoners-dilemma')
    ).toBeInTheDocument();
  });

  it('hides the search and filter controls when showFilters is false', () => {
    render(
      <HomeTemplate
        appName="Economics"
        description="desc"
        items={ITEMS}
        showFilters={false}
      />
    );
    expect(screen.queryByTestId('home-search')).not.toBeInTheDocument();
  });

  it('filters cards by search query', () => {
    render(
      <HomeTemplate appName="Economics" description="desc" items={ITEMS} />
    );
    expect(
      screen.getByTestId('tool-card-prisoners-dilemma')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('tool-card-nash-equilibrium')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('home-search'), {
      target: { value: 'nash' },
    });
    expect(screen.queryByTestId('tool-card-prisoners-dilemma')).toBeNull();
    expect(
      screen.getByTestId('tool-card-nash-equilibrium')
    ).toBeInTheDocument();
  });

  it('filters cards by category', () => {
    render(
      <HomeTemplate appName="Economics" description="desc" items={ITEMS} />
    );
    expect(screen.getByTestId('tool-card-externalities')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('category-Game Theory'));
    expect(
      screen.getByTestId('tool-card-prisoners-dilemma')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('tool-card-externalities')).toBeNull();

    fireEvent.click(screen.getByTestId('category-Public & Macro'));
    expect(screen.getByTestId('tool-card-externalities')).toBeInTheDocument();
    expect(screen.queryByTestId('tool-card-prisoners-dilemma')).toBeNull();

    fireEvent.click(screen.getByTestId('category-All'));
    expect(screen.getByTestId('tool-card-externalities')).toBeInTheDocument();
    expect(
      screen.getByTestId('tool-card-prisoners-dilemma')
    ).toBeInTheDocument();
  });

  it('shows a message when no cards match', () => {
    render(
      <HomeTemplate appName="Economics" description="desc" items={ITEMS} />
    );
    fireEvent.change(screen.getByTestId('home-search'), {
      target: { value: 'zzzz' },
    });
    expect(
      screen.getByText('No theories match your search.')
    ).toBeInTheDocument();
    expect(screen.queryByTestId('tool-card-prisoners-dilemma')).toBeNull();
  });
});
