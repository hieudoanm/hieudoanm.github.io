import { fireEvent, render, screen } from '@testing-library/react';
import { OkunLab } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    sampleStartGap: () => 1,
    sampleTrueCoef: () => 0.4,
    generateDataset: () => [
      { growth: -1, du: 1.4 },
      { growth: 0, du: 1.0 },
      { growth: 0, du: 1.05 },
      { growth: 1, du: 0.6 },
      { growth: 1, du: 0.55 },
      { growth: 2, du: 0.2 },
      { growth: 2, du: 0.15 },
      { growth: 3, du: -0.2 },
      { growth: 4, du: -0.6 },
      { growth: 5, du: -1.0 },
    ],
    estimateLine: () => ({ slope: -0.4, intercept: 1.0 }),
    closestCoef: () => 0.4,
  };
});

const setGrowth = (value: string) =>
  fireEvent.change(screen.getByTestId('growth'), { target: { value } });

describe('OkunLab', () => {
  it('renders the model configuration screen', () => {
    render(<OkunLab />);
    expect(screen.getByText(/Δu = −c·\(g − g\*\)/)).toBeInTheDocument();
    expect(screen.getByTestId('potential-growth')).toBeInTheDocument();
    expect(screen.getByTestId('okun-coef')).toBeInTheDocument();
    expect(screen.getByTestId('natural-rate')).toBeInTheDocument();
  });

  it('steers unemployment to the natural rate across two years', () => {
    render(<OkunLab />);
    fireEvent.click(screen.getByRole('button', { name: 'Steady the Rate' }));
    expect(screen.getByTestId('target-unemployment')).toHaveTextContent('5.0%');
    expect(screen.getByTestId('unemployment')).toHaveTextContent('6.0%');
    expect(screen.getByTestId('quarter')).toBeInTheDocument();

    setGrowth('4.5');
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('unemployment')).toHaveTextContent('5.0%');

    setGrowth('2.5');
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('score')).toHaveTextContent('100 / 100');
    expect(screen.getByText(/on target/i)).toBeInTheDocument();
  });

  it('estimates the coefficient from the mystery data table', () => {
    render(<OkunLab />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Estimate the Coefficient' })
    );
    expect(screen.getAllByTestId('quarter')).toHaveLength(10);
    expect(screen.getByTestId('choose-coef')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('choose-coef-0.4'));
    fireEvent.click(screen.getByTestId('estimate'));
    expect(screen.getByText(/closest to/i)).toBeInTheDocument();
    expect(screen.getByTestId('best-fit')).toHaveTextContent('-0.40');
    expect(screen.getByTestId('score')).toHaveTextContent('100 / 100');
  });

  it('returns to the configuration screen on reset', () => {
    render(<OkunLab />);
    fireEvent.click(screen.getByRole('button', { name: 'Steady the Rate' }));
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByTestId('check'));
    fireEvent.click(screen.getByTestId('reset'));
    expect(screen.getByText('Configure the model')).toBeInTheDocument();
    expect(screen.getByTestId('potential-growth')).toBeInTheDocument();
  });
});
