import { render, screen } from '@testing-library/react';
import { PiStrategy } from 'react-icons/pi';
import { HomeTemplate } from '../HomeTemplate';

const ITEMS = [
  {
    label: "Prisoner's Dilemma",
    description: 'Iterated game theory against AI strategies',
    icon: PiStrategy,
    href: '/prisoners-dilemma/',
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
});
