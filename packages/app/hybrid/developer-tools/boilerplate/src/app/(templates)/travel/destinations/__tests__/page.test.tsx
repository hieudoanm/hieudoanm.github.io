import { render, screen } from '@testing-library/react';
import DestinationsPage from '@/app/(templates)/travel/destinations/page';

describe('DestinationsPage', () => {
  it('renders the destinations page', () => {
    render(<DestinationsPage />);
    expect(screen.getByText('9 destinations')).toBeInTheDocument();
  });
});
