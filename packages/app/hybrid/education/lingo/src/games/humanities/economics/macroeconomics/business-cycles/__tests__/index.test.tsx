import { fireEvent, render, screen } from '@testing-library/react';
import { BusinessCyclesGame } from '../index';

const submitForecast = () => {
  fireEvent.click(screen.getAllByTestId('submit-prediction')[0]);
  return screen;
};

describe('BusinessCyclesGame', () => {
  it('renders the forecast prompt for the first year', () => {
    render(<BusinessCyclesGame />);
    expect(screen.getByText(/Business Cycle Lab/)).toBeInTheDocument();
    expect(screen.getByText(/growth forecast/)).toBeInTheDocument();
    expect(screen.getByTestId('growth-input')).toBeInTheDocument();
    expect(screen.getByTestId('category-recession')).toBeInTheDocument();
    expect(screen.getByTestId('category-expansion')).toBeInTheDocument();
  });

  it('reveals the actual growth after submitting a phase call', () => {
    render(<BusinessCyclesGame />);
    fireEvent.click(screen.getByTestId('category-expansion'));
    submitForecast();
    expect(screen.getByTestId('reveal-panel')).toBeInTheDocument();
    expect(screen.getByText('3.1%')).toBeInTheDocument();
    expect(screen.getByTestId('round-score')).toHaveTextContent('—');
    expect(
      screen.getByRole('button', { name: 'Next Year' })
    ).toBeInTheDocument();
  });

  it('scores an exact numeric forecast', () => {
    render(<BusinessCyclesGame />);
    fireEvent.change(screen.getByTestId('growth-input'), {
      target: { value: '3.1' },
    });
    submitForecast();
    expect(screen.getByTestId('round-score')).toHaveTextContent('5.0');
    expect(screen.getByText(/Your forecast:/)).toHaveTextContent('3.1%');
  });

  it('reaches the summary after the full cycle', () => {
    render(<BusinessCyclesGame />);
    for (let year = 0; year < 7; year++) {
      fireEvent.click(screen.getByTestId('category-expansion'));
      submitForecast();
      fireEvent.click(screen.getByTestId('next-round'));
    }
    expect(screen.getByTestId('summary-panel')).toBeInTheDocument();
    expect(screen.getByText('The lesson')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the summary screen', () => {
    render(<BusinessCyclesGame />);
    for (let year = 0; year < 7; year++) {
      fireEvent.click(screen.getByTestId('category-expansion'));
      submitForecast();
      fireEvent.click(screen.getByTestId('next-round'));
    }
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByText(/growth forecast/)).toBeInTheDocument();
    expect(screen.getByTestId('growth-input')).toBeInTheDocument();
  });
});
