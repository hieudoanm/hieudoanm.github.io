import { render, screen } from '@testing-library/react';
import OpenHousesPage from '@/app/(templates)/travel/open-houses/page';

describe('OpenHousesPage', () => {
  it('renders the open houses page', () => {
    render(<OpenHousesPage />);
    expect(
      screen.getByRole('heading', { name: 'Open Houses' })
    ).toBeInTheDocument();
    expect(screen.getByText('Tour homes this week.')).toBeInTheDocument();
  });
});
