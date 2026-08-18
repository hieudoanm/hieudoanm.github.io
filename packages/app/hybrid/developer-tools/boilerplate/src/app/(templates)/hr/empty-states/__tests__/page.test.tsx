import { render, screen } from '@testing-library/react';
import EmptyStatesPage from '@/app/(templates)/hr/empty-states/page';

describe('EmptyStatesPage', () => {
  it('renders the empty states page', () => {
    render(<EmptyStatesPage />);
    expect(
      screen.getByRole('heading', { name: 'Empty states' })
    ).toBeInTheDocument();
  });
});
