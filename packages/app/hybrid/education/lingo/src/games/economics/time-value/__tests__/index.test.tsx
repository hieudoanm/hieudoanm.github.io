import { fireEvent, render, screen } from '@testing-library/react';
import { TimeValueGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
  };
});

describe('TimeValueGame', () => {
  it('renders the calculator controls', () => {
    render(<TimeValueGame />);
    expect(screen.getByTestId('principal')).toBeInTheDocument();
    expect(screen.getByTestId('rate')).toBeInTheDocument();
    expect(screen.getByTestId('years')).toBeInTheDocument();
    expect(screen.getByTestId('compounding')).toBeInTheDocument();
    expect(screen.getByTestId('future-value')).toBeInTheDocument();
    expect(screen.getByTestId('present-value')).toBeInTheDocument();
  });

  it('updates future value when sliders change', () => {
    render(<TimeValueGame />);
    fireEvent.change(screen.getByTestId('principal'), {
      target: { value: '2000' },
    });
    fireEvent.change(screen.getByTestId('rate'), { target: { value: '8' } });
    fireEvent.change(screen.getByTestId('years'), { target: { value: '10' } });
    expect(screen.getByText('$2,000')).toBeInTheDocument();
  });

  it('shows doubling and rule-72 stats', () => {
    render(<TimeValueGame />);
    fireEvent.change(screen.getByTestId('rate'), { target: { value: '8' } });
    expect(screen.getByTestId('doubling-time')).toBeInTheDocument();
    expect(screen.getByTestId('rule-72')).toHaveTextContent('9.0');
  });

  it('starts investment rounds on check', () => {
    render(<TimeValueGame />);
    fireEvent.click(screen.getByTestId('check'));
    expect(screen.getByTestId('offer-a')).toBeInTheDocument();
    expect(screen.getByTestId('offer-b')).toBeInTheDocument();
  });

  it('plays through offers to the results screen', () => {
    render(<TimeValueGame />);
    fireEvent.click(screen.getByTestId('check'));
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('offer-a'));
    }
    fireEvent.click(screen.getByTestId('offer-a'));
    fireEvent.click(screen.getByTestId('accept'));
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Play Again' })
    ).toBeInTheDocument();
  });

  it('restarts from the results screen', () => {
    render(<TimeValueGame />);
    fireEvent.click(screen.getByTestId('check'));
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByTestId('offer-a'));
    }
    fireEvent.click(screen.getByTestId('offer-a'));
    fireEvent.click(screen.getByTestId('accept'));
    fireEvent.click(screen.getByRole('button', { name: 'Play Again' }));
    expect(screen.getByTestId('principal')).toBeInTheDocument();
  });
});
