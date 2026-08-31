import { render, screen } from '@testing-library/react';
import BigFiveInventoryPage from '@/app/big-five-inventory/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('BigFiveInventoryPage', () => {
  it('renders its scale wizard', () => {
    render(<BigFiveInventoryPage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
