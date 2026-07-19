import { render, screen } from '@testing-library/react';
import { GenreTag } from '../GenreTag';

describe('GenreTag', () => {
  it('renders the genre text', () => {
    render(<GenreTag genre="Jazz" />);
    expect(screen.getByTestId('genre-tag')).toHaveTextContent('Jazz');
  });

  it('applies the outline badge style', () => {
    render(<GenreTag genre="Rock" />);
    expect(screen.getByTestId('genre-tag')).toHaveClass('badge-outline');
  });

  it('renders a multi-word genre', () => {
    render(<GenreTag genre="Lo-Fi" />);
    expect(screen.getByTestId('genre-tag')).toHaveTextContent('Lo-Fi');
  });
});
