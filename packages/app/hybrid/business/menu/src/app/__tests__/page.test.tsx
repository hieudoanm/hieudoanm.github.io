import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

jest.mock('@/components/organisms/RestaurantDashboard', () => ({
  __esModule: true,
  default: ({ store }: { store: unknown }) => (
    <div data-testid="dashboard">Dashboard</div>
  ),
}));

jest.mock('@/hooks/useMenuStore', () => ({
  useMenuStore: jest.fn(() => ({ items: [], addItem: jest.fn() })),
}));

describe('HomePage', () => {
  it('renders the dashboard', () => {
    render(<HomePage />);
    expect(screen.getByTestId('dashboard')).toBeInTheDocument();
  });
});
