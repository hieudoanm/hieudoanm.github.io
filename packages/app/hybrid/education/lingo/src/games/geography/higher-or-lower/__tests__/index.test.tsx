import { fireEvent, render, screen } from '@testing-library/react';
import { HigherOrLower } from '../index';

describe('HigherOrLower', () => {
  it('renders two cards and the VS divider', () => {
    render(<HigherOrLower />);
    expect(screen.getByTestId('hl-card-left')).toBeInTheDocument();
    expect(screen.getByTestId('hl-card-right')).toBeInTheDocument();
    expect(screen.getByText('VS')).toBeInTheDocument();
  });

  it('reveals values and shows feedback after a pick', () => {
    render(<HigherOrLower />);
    fireEvent.click(screen.getByTestId('hl-card-left'));
    expect(screen.getByTestId('hl-message')).toBeInTheDocument();
    expect(screen.getByTestId('hl-value-left')).toBeInTheDocument();
    expect(screen.getByTestId('hl-value-right')).toBeInTheDocument();
    expect(screen.getByTestId('hl-card-left')).toBeDisabled();
  });

  it('advances to a fresh pair after Next', () => {
    render(<HigherOrLower />);
    fireEvent.click(screen.getByTestId('hl-card-right'));
    fireEvent.click(screen.getByTestId('hl-next'));
    expect(screen.queryByTestId('hl-message')).toBeNull();
    expect(screen.getByTestId('hl-card-left')).toBeEnabled();
  });

  it('switches to passport mode', () => {
    render(<HigherOrLower />);
    fireEvent.click(screen.getByTestId('mode-passport'));
    expect(
      screen.getByText('Which country has a stronger passport?')
    ).toBeInTheDocument();
  });

  it('switches back to population mode', () => {
    render(<HigherOrLower />);
    fireEvent.click(screen.getByTestId('mode-passport'));
    fireEvent.click(screen.getByTestId('mode-population'));
    expect(
      screen.getByText('Which country has a larger population?')
    ).toBeInTheDocument();
  });
});
