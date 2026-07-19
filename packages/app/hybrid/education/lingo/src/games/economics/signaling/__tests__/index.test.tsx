import { fireEvent, render, screen } from '@testing-library/react';
import { JobMarketGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    scheduleCandidates: () => [
      'high',
      'high',
      'high',
      'high',
      'low',
      'low',
      'low',
      'low',
    ],
  };
});

describe('JobMarketGame', () => {
  it('renders the wage setup with both sliders', () => {
    render(<JobMarketGame />);
    expect(screen.getByTestId('wage-slider-0')).toBeInTheDocument();
    expect(screen.getByTestId('wage-slider-1')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Commit Wages' })
    ).toBeInTheDocument();
  });

  it('reveals all candidates after committing wages', () => {
    render(<JobMarketGame />);
    fireEvent.click(screen.getByTestId('submit-wages'));
    expect(screen.getByText(/Here.s who applied/)).toBeInTheDocument();
    for (let id = 0; id < 8; id++) {
      expect(screen.getByTestId(`candidate-row-${id}`)).toBeInTheDocument();
    }
    expect(screen.getAllByText('Hired')).toHaveLength(8);
    expect(
      screen.getByRole('button', { name: 'See Results' })
    ).toBeInTheDocument();
  });

  it('shows declined candidates when wages are too low', () => {
    render(<JobMarketGame />);
    fireEvent.change(screen.getByTestId('wage-slider-0'), {
      target: { value: '30' },
    });
    fireEvent.change(screen.getByTestId('wage-slider-1'), {
      target: { value: '40' },
    });
    fireEvent.click(screen.getByTestId('submit-wages'));
    expect(screen.getAllByText('Declined')).toHaveLength(8);
  });

  it('reaches the results screen and shows the lesson', () => {
    render(<JobMarketGame />);
    fireEvent.click(screen.getByTestId('submit-wages'));
    fireEvent.click(screen.getByRole('button', { name: 'See Results' }));
    expect(screen.getByText('Job Market Results')).toBeInTheDocument();
    expect(
      screen.getByText(/costly signal separates good workers/)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts the game from the results screen', () => {
    render(<JobMarketGame />);
    fireEvent.click(screen.getByTestId('submit-wages'));
    fireEvent.click(screen.getByRole('button', { name: 'See Results' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(
      screen.getByRole('button', { name: 'Commit Wages' })
    ).toBeInTheDocument();
  });
});
