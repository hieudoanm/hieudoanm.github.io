import { render, screen } from '@testing-library/react';
import PromotionsPage from '@/app/(templates)/crm/promotions/page';

describe('PromotionsPage', () => {
  it('renders the PromotionsPage', () => {
    render(<PromotionsPage />);
    expect(screen.getByText('Spring Sale')).toBeInTheDocument();
  });
});
