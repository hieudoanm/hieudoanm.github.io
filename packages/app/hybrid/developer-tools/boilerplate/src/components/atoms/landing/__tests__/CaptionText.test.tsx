import { render, screen } from '@testing-library/react';
import { CaptionText } from '../CaptionText';

describe('CaptionText', () => {
  it('renders the caption', () => {
    render(<CaptionText text="Terms apply" />);
    expect(screen.getByTestId('caption-text')).toHaveTextContent('Terms apply');
  });

  it('applies the muted text class', () => {
    render(<CaptionText text="Note" />);
    expect(screen.getByTestId('caption-text')).toHaveClass(
      'text-base-content/50'
    );
  });
});
