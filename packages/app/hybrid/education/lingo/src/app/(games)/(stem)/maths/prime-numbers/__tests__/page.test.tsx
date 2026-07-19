import { render, screen } from '@testing-library/react';

import PrimeNumbersPage from '@/app/(games)/(stem)/maths/prime-numbers/page';

describe('PrimeNumbersPage', () => {
  it('renders the prime number game', () => {
    render(<PrimeNumbersPage />);
    expect(screen.getByLabelText('Sieve up to')).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /Sieve of Eratosthenes/ })
    ).toBeInTheDocument();
  });
});
