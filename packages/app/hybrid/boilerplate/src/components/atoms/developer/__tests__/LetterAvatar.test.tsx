import { render, screen } from '@testing-library/react';
import { LetterAvatar } from '../LetterAvatar';

describe('LetterAvatar', () => {
  it('derives two initials from a full name', () => {
    render(<LetterAvatar name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent(
      'JD'
    );
  });

  it('uses the first two characters for a single-word name', () => {
    render(<LetterAvatar name="Alex" />);
    expect(screen.getByRole('img', { name: 'Alex' })).toHaveTextContent('AL');
  });

  it('applies color and size classes', () => {
    const { container } = render(
      <LetterAvatar name="Jane Doe" color="accent" size="lg" />
    );
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveClass(
      'bg-accent'
    );
    expect(container.querySelector('.text-2xl')).toBeInTheDocument();
  });
});
