import { render, screen } from '@testing-library/react';
import ContactsPage from '@/app/(templates)/app/contacts/page';

describe('ContactsPage', () => {
  it('renders the ContactsPage', () => {
    render(<ContactsPage />);
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
  });
});
