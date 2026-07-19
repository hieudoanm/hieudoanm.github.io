import { fireEvent, render, screen } from '@testing-library/react';
import { OpportunityCostGame } from '../index';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return { ...actual };
});

describe('OpportunityCostGame', () => {
  it('renders the sandbox panel with sliders', () => {
    render(<OpportunityCostGame />);
    expect(
      screen.getByText(/Explore how opportunity cost works/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('wages')).toBeInTheDocument();
    expect(screen.getByTestId('business-income')).toBeInTheDocument();
  });

  it('starts challenge rounds from sandbox', () => {
    render(<OpportunityCostGame />);
    fireEvent.click(screen.getByTestId('start-challenges'));
    expect(screen.getByText(/You can attend/)).toBeInTheDocument();
    expect(screen.getByTestId('option-a')).toBeInTheDocument();
    expect(screen.getByTestId('option-b')).toBeInTheDocument();
  });

  it('reveals opportunity costs after picking an option', () => {
    render(<OpportunityCostGame />);
    fireEvent.click(screen.getByTestId('start-challenges'));
    fireEvent.click(screen.getByTestId('option-a'));
    expect(screen.getByTestId('oc-a')).toBeInTheDocument();
    expect(screen.getByTestId('oc-b')).toBeInTheDocument();
    expect(screen.getByTestId('next')).toBeInTheDocument();
  });

  it('plays through all rounds and shows results', () => {
    render(<OpportunityCostGame />);
    fireEvent.click(screen.getByTestId('start-challenges'));
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByTestId('option-a'));
      fireEvent.click(screen.getByTestId('next'));
    }
    expect(screen.getByText('Challenge Complete!')).toBeInTheDocument();
    expect(screen.getByTestId('reset')).toBeInTheDocument();
  });

  it('resets from results screen', () => {
    render(<OpportunityCostGame />);
    fireEvent.click(screen.getByTestId('start-challenges'));
    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByTestId('option-a'));
      fireEvent.click(screen.getByTestId('next'));
    }
    fireEvent.click(screen.getByTestId('reset'));
    expect(
      screen.getByText(/Explore how opportunity cost works/)
    ).toBeInTheDocument();
  });
});
