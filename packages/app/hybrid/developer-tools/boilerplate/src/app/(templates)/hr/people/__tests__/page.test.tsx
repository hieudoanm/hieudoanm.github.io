import { render, screen } from '@testing-library/react';
import PeopleDirectoryPage from '@/app/(templates)/hr/people/page';

describe('PeopleDirectoryPage', () => {
  it('renders the PeopleDirectoryPage', () => {
    render(<PeopleDirectoryPage />);
    expect(screen.getByText('8 employees')).toBeInTheDocument();
  });
});
