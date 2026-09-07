import { fireEvent, render, screen } from '@testing-library/react';
import HomePage from '../page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('HomePage', () => {
  it('renders heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Countries Games')).toBeInTheDocument();
  });

  it('renders all game cards', () => {
    render(<HomePage />);
    expect(screen.getByTestId('card-nyt/wordle')).toHaveTextContent(
      'Country Wordle'
    );
    expect(screen.getByTestId('card-nyt/connections')).toHaveTextContent(
      'Country Connections'
    );
    expect(screen.getByTestId('card-guess')).toHaveTextContent(
      'Guess the Country'
    );
    expect(screen.getByTestId('card-higher-or-lower')).toHaveTextContent(
      'Higher or Lower'
    );
  });

  it('renders game descriptions', () => {
    render(<HomePage />);
    expect(
      screen.getByText(/Guess the hidden country name/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Group sixteen countries/)).toBeInTheDocument();
  });

  it('navigates to game pages on Play button click', () => {
    render(<HomePage />);
    fireEvent.click(screen.getByTestId('open-nyt/wordle'));
    expect(mockPush).toHaveBeenCalledWith('/nyt/wordle');
    fireEvent.click(screen.getByTestId('open-nyt/connections'));
    expect(mockPush).toHaveBeenCalledWith('/nyt/connections');
    fireEvent.click(screen.getByTestId('open-guess'));
    expect(mockPush).toHaveBeenCalledWith('/guess');
    fireEvent.click(screen.getByTestId('open-higher-or-lower'));
    expect(mockPush).toHaveBeenCalledWith('/higher-or-lower');
    fireEvent.click(screen.getByTestId('open-sort/continents'));
    expect(mockPush).toHaveBeenCalledWith('/sort/continents');
  });
});
