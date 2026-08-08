import { render, screen } from '@testing-library/react';
import { TheoryNote } from '../TheoryNote';

describe('TheoryNote', () => {
  it('renders the title as a heading', () => {
    render(
      <TheoryNote title="Color Harmony">
        Complementary colors sit opposite.
      </TheoryNote>
    );
    expect(
      screen.getByRole('heading', { name: 'Color Harmony' })
    ).toBeInTheDocument();
  });

  it('renders the explanation content', () => {
    render(
      <TheoryNote title="Contrast">
        WCAG contrast is based on relative luminance.
      </TheoryNote>
    );
    expect(
      screen.getByText('WCAG contrast is based on relative luminance.')
    ).toBeInTheDocument();
  });
});
