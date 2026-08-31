import { render, screen } from '@testing-library/react';
import RelationshipClosenessInventoryPage from '@/app/relationship-closeness-inventory/page';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('RelationshipClosenessInventoryPage', () => {
  it('renders its scale wizard', () => {
    render(<RelationshipClosenessInventoryPage />);
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0);
  });
});
