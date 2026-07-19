import { render, screen } from '@testing-library/react';
import MenuPage from '@/app/(templates)/health/menu/page';

describe('MenuPage', () => {
  it('renders the MenuPage', () => {
    render(<MenuPage />);
    expect(screen.getByText('0 items · $0')).toBeInTheDocument();
  });
});
