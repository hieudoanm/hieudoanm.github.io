import { render, screen } from '@testing-library/react';
import PropertyPage from '@/app/(templates)/travel/property/page';

describe('PropertyPage', () => {
  it('renders the property detail page', () => {
    render(<PropertyPage />);
    expect(
      screen.getByRole('heading', { name: 'Property Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('A closer look at this home.')).toBeInTheDocument();
  });
});
