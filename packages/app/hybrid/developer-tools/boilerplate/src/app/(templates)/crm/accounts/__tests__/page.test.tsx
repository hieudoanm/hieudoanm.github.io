import { render, screen } from '@testing-library/react';
import AccountsPage from '@/app/(templates)/crm/accounts/page';

describe('AccountsPage', () => {
  it('renders the AccountsPage', () => {
    render(<AccountsPage />);
    expect(screen.getByText('4 accounts')).toBeInTheDocument();
  });
});
