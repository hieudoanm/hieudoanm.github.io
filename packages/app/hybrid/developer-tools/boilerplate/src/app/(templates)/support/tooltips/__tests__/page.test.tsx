import { render, screen } from '@testing-library/react';
import TooltipsPage from '@/app/(templates)/support/tooltips/page';

describe('TooltipsPage', () => {
  it('renders the tooltips page', () => {
    render(<TooltipsPage />);
    expect(
      screen.getAllByRole('heading', { name: 'Tooltips' }).length
    ).toBeGreaterThan(0);
  });
});
