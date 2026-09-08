import { fireEvent, render, screen } from '@testing-library/react';
import { InstitutionsGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    runSimulation: jest.fn(() => ({
      years: [
        { year: 1, tfp: 120, capital: 1000, gdp: 1500 },
        { year: 10, tfp: 120, capital: 2000, gdp: 1500 },
      ],
      gdpPerCapita: 1500,
      growthPct: 50,
      investmentRate: 20,
      tfp: 120,
    })),
  };
});

describe('InstitutionsGame', () => {
  it('lets the player pick a country preset', () => {
    render(<InstitutionsGame />);
    expect(screen.getByTestId('target-growth')).toHaveTextContent('50%');
    fireEvent.click(screen.getByTestId('preset-inclusive'));
    expect(screen.getByTestId('property-rights')).toBeInTheDocument();
    expect(screen.getByTestId('contracts')).toBeInTheDocument();
    expect(screen.getByTestId('stability')).toBeInTheDocument();
  });

  it('adjusts sliders and simulates a result', () => {
    render(<InstitutionsGame />);
    fireEvent.click(screen.getByTestId('preset-inclusive'));
    fireEvent.change(screen.getByTestId('stability'), {
      target: { value: '40' },
    });
    fireEvent.click(screen.getByTestId('simulate'));
    expect(screen.getByTestId('gdp-growth')).toHaveTextContent('50%');
    expect(screen.getByTestId('investment-rate')).toHaveTextContent('20%');
    expect(screen.getByTestId('capital')).toBeInTheDocument();
    expect(screen.getByTestId('gdp-capita')).toHaveTextContent('1500');
    expect(screen.getByText(/Target hit/)).toBeInTheDocument();
  });

  it('resets the game via the reset button', () => {
    render(<InstitutionsGame />);
    fireEvent.click(screen.getByTestId('preset-inclusive'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.queryByTestId('property-rights')).toBeNull();
    expect(
      screen.getByText(/Choose a starting country profile/)
    ).toBeInTheDocument();
  });
});
