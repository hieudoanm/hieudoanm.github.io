import { render, screen } from '@testing-library/react';
import MathsPage from '@/app/(games)/maths/page';

describe('MathsPage', () => {
  it('renders a hub with a link to the Kaprekar game', () => {
    render(<MathsPage />);
    expect(
      screen.getByRole('heading', { name: 'Maths games' })
    ).toBeInTheDocument();
    expect(screen.getByTestId('maths-kaprekar')).toHaveAttribute(
      'href',
      '/maths/kaprekar'
    );
  });
});
