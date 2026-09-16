import { render, screen } from '@testing-library/react';
import MathsPage from '@/app/(games)/(stem)/maths/page';

describe('MathsPage', () => {
  it('renders a hub with a link to each maths game', () => {
    render(<MathsPage />);
    expect(
      screen.getByRole('heading', { name: 'Maths games' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('maths-attractors')).toHaveAttribute(
      'href',
      '/maths/attractors'
    );
    expect(screen.getByTestId('maths-cyclic')).toHaveAttribute(
      'href',
      '/maths/cyclic'
    );
    expect(screen.getByTestId('maths-kaprekar-constant')).toHaveAttribute(
      'href',
      '/maths/kaprekar-constant'
    );
  });
});
