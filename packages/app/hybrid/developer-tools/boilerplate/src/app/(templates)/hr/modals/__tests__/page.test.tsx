import { render, screen } from '@testing-library/react';
import ModalsPage from '@/app/(templates)/hr/modals/page';

describe('ModalsPage', () => {
  it('renders the modals showcase page', () => {
    render(<ModalsPage />);
    expect(
      screen.getByRole('heading', { name: 'Modals showcase' })
    ).toBeInTheDocument();
  });
});
