import { fireEvent, render, screen } from '@testing-library/react';
import { CommonsHarvest } from '../index';

const playToEnd = () => {
  for (let i = 0; i < 12; i++) {
    const submit = screen.queryByTestId('submit-harvest');
    if (!submit) break;
    fireEvent.click(submit);
    const next = screen.queryByTestId('next-round');
    if (!next) break;
    fireEvent.click(next);
  }
};

describe('CommonsHarvest', () => {
  it('renders the initial harvest screen', () => {
    render(<CommonsHarvest />);
    expect(screen.getByTestId('round-counter')).toHaveTextContent(
      'Round 1 / 10'
    );
    expect(screen.getByTestId('harvest-total')).toHaveTextContent(
      'Your harvest: 0'
    );
    expect(screen.getByTestId('submit-harvest')).toBeInTheDocument();
  });

  it('submits a harvest and shows the reveal panel', () => {
    render(<CommonsHarvest />);
    fireEvent.click(screen.getByTestId('submit-harvest'));
    expect(screen.getByText(/Round 1 results/)).toBeInTheDocument();
    expect(screen.getByText('🐄 Mira')).toBeInTheDocument();
    expect(screen.getByTestId('next-round')).toBeInTheDocument();
  });

  it('overuse collapses the commons', () => {
    render(<CommonsHarvest />);
    fireEvent.change(screen.getByTestId('harvest-slider'), {
      target: { value: '8' },
    });
    playToEnd();
    expect(screen.getByText('The commons collapsed.')).toBeInTheDocument();
    expect(screen.getByTestId('play-again')).toBeInTheDocument();
  });

  it('resets the game after collapse', () => {
    render(<CommonsHarvest />);
    playToEnd();
    fireEvent.click(screen.getByTestId('play-again'));
    expect(screen.getByTestId('round-counter')).toHaveTextContent(
      'Round 1 / 10'
    );
    expect(screen.getByTestId('harvest-total')).toHaveTextContent(
      'Your harvest: 0'
    );
  });

  it('finishes with harvest results when the commons survives', () => {
    render(<CommonsHarvest />);
    fireEvent.change(screen.getByTestId('harvest-input'), {
      target: { value: '0' },
    });
    playToEnd();
    expect(screen.getByText('Harvest complete')).toBeInTheDocument();
    expect(screen.getByTestId('play-again')).toBeInTheDocument();
  });

  it('shows the stock change in the reveal panel', () => {
    render(<CommonsHarvest />);
    fireEvent.click(screen.getByTestId('submit-harvest'));
    expect(screen.getByTestId('stock-change')).toHaveTextContent('Stock: 100');
    expect(screen.getByTestId('stock-change')).toHaveTextContent('92');
  });

  it('rejects negative harvest input', () => {
    render(<CommonsHarvest />);
    fireEvent.change(screen.getByTestId('harvest-input'), {
      target: { value: '-5' },
    });
    fireEvent.click(screen.getByTestId('submit-harvest'));
    expect(screen.queryByText(/Round 1 results/)).toBeNull();
  });

  it('shows a collapse warning in the reveal panel', () => {
    render(<CommonsHarvest />);
    fireEvent.change(screen.getByTestId('harvest-slider'), {
      target: { value: '8' },
    });
    for (let i = 0; i < 6; i++) {
      fireEvent.click(screen.getByTestId('submit-harvest'));
      fireEvent.click(screen.getByTestId('next-round'));
    }
    fireEvent.click(screen.getByTestId('submit-harvest'));
    expect(screen.getByText('The commons collapsed!')).toBeInTheDocument();
  });
});
