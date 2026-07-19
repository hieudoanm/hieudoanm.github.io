import { render, screen } from '@testing-library/react';
import CrmContactsPage from '@/app/(templates)/crm/contacts/page';

describe('CrmContactsPage', () => {
  it('renders the CrmContactsPage', () => {
    render(<CrmContactsPage />);
    expect(screen.getByText('7 contacts')).toBeInTheDocument();
  });
});
