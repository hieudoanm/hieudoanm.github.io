import { render, screen } from '@testing-library/react';
import KaprekarConstantPage from '@/app/(games)/(stem)/maths/kaprekar-constant/page';

describe('KaprekarConstantPage', () => {
  it('renders the Kaprekar constant routine game inside a tool shell', () => {
    render(<KaprekarConstantPage />);
    expect(screen.getByRole('spinbutton')).toHaveValue(6174);
    expect(
      screen.getByText("Kaprekar's Constant · 4 digits")
    ).toBeInTheDocument();
  });
});
