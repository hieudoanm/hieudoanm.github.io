import { fireEvent, render, screen } from '@testing-library/react';
import { MigrationGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    generateQuizParams: () => ({ w0: 30000, w1: 46000, m: 5000, p: 0.8 }),
  };
});

const setSlider = (testid: string, value: number) => {
  const slider = screen.getByTestId(testid) as HTMLInputElement;
  fireEvent.change(slider, { target: { value: String(value) } });
};

describe('MigrationGame', () => {
  it('renders the worker decision controls', () => {
    render(<MigrationGame />);
    expect(screen.getByTestId('origin-wage')).toBeInTheDocument();
    expect(screen.getByTestId('destination-wage')).toBeInTheDocument();
    expect(screen.getByTestId('moving-cost')).toBeInTheDocument();
    expect(screen.getByTestId('job-probability')).toBeInTheDocument();
  });

  it('evaluates a wage gap as a decision to move', () => {
    render(<MigrationGame />);
    fireEvent.click(screen.getByTestId('compute'));
    expect(screen.getByTestId('decision')).toHaveTextContent('Move');
    expect(
      Number(screen.getByTestId('npv').textContent?.replace(/[^0-9\-]/g, ''))
    ).toBeGreaterThan(0);
  });

  it('stays when moving costs outweigh the wage gap', () => {
    render(<MigrationGame />);
    setSlider('origin-wage', 50000);
    setSlider('destination-wage', 30000);
    setSlider('moving-cost', 12000);
    setSlider('job-probability', 0.7);
    fireEvent.click(screen.getByTestId('compute'));
    expect(screen.getByTestId('decision')).toHaveTextContent('Stay');
  });

  it('runs the macro simulation and shows native effects', () => {
    render(<MigrationGame />);
    setSlider('migrant-count', 20);
    fireEvent.click(screen.getByTestId('simulate'));
    expect(screen.getByTestId('equilibrium-wage')).toBeInTheDocument();
    expect(screen.getByTestId('native-wage')).toBeInTheDocument();
    expect(screen.getByTestId('migrants')).toHaveTextContent('20');
    expect(screen.getByTestId('economic-surplus')).toBeInTheDocument();
  });

  it('plays a quiz round and scores after checking', () => {
    render(<MigrationGame />);
    fireEvent.click(screen.getByTestId('quiz'));
    fireEvent.click(screen.getByTestId('answer-move'));
    expect(screen.getByTestId('decision')).toHaveTextContent('move');
    fireEvent.click(screen.getByTestId('check'));
  });

  it('resets back to the untouched controls', () => {
    render(<MigrationGame />);
    fireEvent.click(screen.getByTestId('compute'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByTestId('origin-wage')).toBeInTheDocument();
  });
});
