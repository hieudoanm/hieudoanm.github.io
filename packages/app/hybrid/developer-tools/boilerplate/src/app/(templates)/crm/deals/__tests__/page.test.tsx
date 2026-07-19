import { render, screen } from '@testing-library/react';
import DealsPage from '@/app/(templates)/crm/deals/page';

describe('DealsPage', () => {
  it('renders the DealsPage', () => {
    render(<DealsPage />);
    expect(screen.getByText('$125,850')).toBeInTheDocument();
  });
});
