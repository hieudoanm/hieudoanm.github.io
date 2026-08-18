import { render, screen } from '@testing-library/react';
import AddressesPage from '@/app/(templates)/store/addresses/page';

describe('AddressesPage', () => {
  it('renders the addresses page', () => {
    render(<AddressesPage />);
    expect(screen.getByText('Address book (2)')).toBeInTheDocument();
  });
});
