import { render, screen } from '@testing-library/react';
import { ExcerptText } from '../ExcerptText';

describe('ExcerptText', () => {
  it('renders full text when under the limit', () => {
    render(<ExcerptText text="A short excerpt" />);
    expect(screen.getByText('A short excerpt')).toBeInTheDocument();
  });

  it('truncates text over the limit', () => {
    render(<ExcerptText text="one two three four five" limit={3} />);
    expect(screen.getByText('one two three…')).toBeInTheDocument();
  });

  it('handles an empty string', () => {
    render(<ExcerptText text="" />);
    expect(screen.getByTestId('excerpt-text')).toHaveTextContent('');
  });
});
