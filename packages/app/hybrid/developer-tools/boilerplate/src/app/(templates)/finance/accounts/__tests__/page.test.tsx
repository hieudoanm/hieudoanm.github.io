import { render, screen } from '@testing-library/react';
import AccountsPage from '@/app/(templates)/finance/accounts/page';

describe('AccountsPage', () => {
  it('renders the AccountsPage', () => {
    render(<AccountsPage />);
    expect(screen.getByText('Business Checking')).toBeInTheDocument();
  });
});
