import { render, screen } from '@testing-library/react';
import BeckDepressionInventoryPage from '@/app/beck-depression-inventory/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('BeckDepressionInventoryPage', () => {
  it('renders its scale wizard', () => {
    render(<BeckDepressionInventoryPage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
