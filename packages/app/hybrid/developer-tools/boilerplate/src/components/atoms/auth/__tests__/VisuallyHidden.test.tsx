import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from '../VisuallyHidden';

describe('VisuallyHidden', () => {
  it('renders content with the sr-only class', () => {
    render(<VisuallyHidden>Screen reader text</VisuallyHidden>);
    const el = screen.getByText('Screen reader text');
    expect(el).toHaveClass('sr-only');
  });
});
