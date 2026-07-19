import { render, screen } from '@testing-library/react';
import SavedPage from '@/app/(templates)/travel/saved/page';

describe('SavedPage', () => {
  it('renders the saved properties page', () => {
    render(<SavedPage />);
    expect(
      screen.getByRole('heading', { name: 'Saved Properties' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your shortlist.')).toBeInTheDocument();
  });
});
