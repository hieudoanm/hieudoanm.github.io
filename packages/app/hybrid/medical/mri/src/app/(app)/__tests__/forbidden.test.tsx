import { render, screen } from '@testing-library/react';
import ForbiddenPage from '@/app/forbidden';

describe('ForbiddenPage', () => {
  it('renders the 403 template', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
  });
});
