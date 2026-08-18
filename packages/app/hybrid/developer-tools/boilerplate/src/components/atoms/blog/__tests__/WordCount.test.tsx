import { render, screen } from '@testing-library/react';
import { WordCount } from '../WordCount';

describe('WordCount', () => {
  it('counts words from text', () => {
    render(<WordCount text="Hello world from the tests" />);
    expect(screen.getByText('5 words')).toBeInTheDocument();
  });

  it('uses the explicit count prop when provided', () => {
    render(<WordCount count={42} />);
    expect(screen.getByText('42 words')).toBeInTheDocument();
  });

  it('uses singular wording for one word', () => {
    render(<WordCount text="Hello" />);
    expect(screen.getByText('1 word')).toBeInTheDocument();
  });

  it('handles an empty text', () => {
    render(<WordCount text="" />);
    expect(screen.getByText('0 words')).toBeInTheDocument();
  });
});
