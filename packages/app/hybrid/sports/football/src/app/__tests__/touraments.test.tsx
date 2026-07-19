import { render, screen } from '@testing-library/react';
import TournamentsPage from '../(app)/touraments/page';

describe('TouramentsPage', () => {
  it('renders tournament cards', () => {
    render(<TournamentsPage />);
    expect(
      screen.getByRole('heading', { name: 'World Cup' })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Euro' })).toBeInTheDocument();
  });
});
