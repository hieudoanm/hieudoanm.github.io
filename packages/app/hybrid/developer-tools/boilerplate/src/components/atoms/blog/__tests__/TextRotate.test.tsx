import { render, screen } from '@testing-library/react';
import { TextRotate } from '../TextRotate';

describe('TextRotate', () => {
  it('renders each word', () => {
    render(<TextRotate words={['one', 'two']} />);
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
  });

  it('applies the text-rotate class and duration', () => {
    render(<TextRotate words={['one']} duration={2000} />);
    const rotate = document.querySelector('.text-rotate');
    expect(rotate).toBeInTheDocument();
    expect(rotate).toHaveStyle({ '--duration': '2000ms' });
  });
});
