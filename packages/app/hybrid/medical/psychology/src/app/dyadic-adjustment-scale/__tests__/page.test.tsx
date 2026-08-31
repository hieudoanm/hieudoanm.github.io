import { render, screen } from '@testing-library/react';
import DyadicAdjustmentScalePage from '@/app/dyadic-adjustment-scale/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('DyadicAdjustmentScalePage', () => {
  it('renders its scale wizard', () => {
    render(<DyadicAdjustmentScalePage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
