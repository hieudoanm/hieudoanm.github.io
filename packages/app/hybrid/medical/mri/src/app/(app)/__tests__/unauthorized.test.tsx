import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '@/app/unauthorized';

describe('UnauthorizedPage', () => {
  it('renders the 401 template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(
      screen.getByText('You must be authenticated to access this page.')
    ).toBeInTheDocument();
  });
});
