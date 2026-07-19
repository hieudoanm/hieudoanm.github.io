import { render, screen } from '@testing-library/react';
import { SectionLabel } from '../SectionLabel';

describe('SectionLabel', () => {
  it('renders the text', () => {
    render(<SectionLabel text="Features" />);
    expect(screen.getByTestId('section-label')).toHaveTextContent('Features');
  });

  it('applies the uppercase tracking classes', () => {
    render(<SectionLabel text="Pricing" />);
    expect(screen.getByTestId('section-label')).toHaveClass(
      'uppercase',
      'tracking-widest'
    );
  });
});
