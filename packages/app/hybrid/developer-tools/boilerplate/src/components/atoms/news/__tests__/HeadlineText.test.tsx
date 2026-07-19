import { render, screen } from '@testing-library/react';
import { HeadlineText } from '../HeadlineText';

describe('HeadlineText', () => {
  it('renders the headline text', () => {
    render(<HeadlineText>Market rallies on new policy</HeadlineText>);
    expect(screen.getByTestId('headline-text')).toHaveTextContent(
      'Market rallies on new policy'
    );
  });

  it('renders as a heading', () => {
    render(<HeadlineText>Big story</HeadlineText>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('applies size class', () => {
    render(<HeadlineText size="lg">Big story</HeadlineText>);
    expect(screen.getByTestId('headline-text')).toHaveClass('text-3xl');
  });

  it('merges custom className', () => {
    render(<HeadlineText className="my-4">Big story</HeadlineText>);
    expect(screen.getByTestId('headline-text')).toHaveClass('my-4');
  });
});
