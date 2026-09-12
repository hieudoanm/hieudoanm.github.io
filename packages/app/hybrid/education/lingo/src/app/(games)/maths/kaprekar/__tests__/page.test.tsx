import { render, screen } from '@testing-library/react';
import KaprekarPage from '@/app/(games)/maths/kaprekar/page';

describe('KaprekarPage', () => {
  it('renders the Kaprekar routine game inside a tool shell', () => {
    render(<KaprekarPage />);
    expect(screen.getByRole('spinbutton')).toHaveValue(6174);
    expect(
      screen.getByText("Kaprekar's Constant · 4 digits")
    ).toBeInTheDocument();
  });
});
