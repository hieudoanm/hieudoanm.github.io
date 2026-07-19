import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '../unauthorized';

describe('UnauthorizedPage', () => {
  it('renders the 401 error code and description', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(
      screen.getByText('You must be authenticated to access this page.')
    ).toBeInTheDocument();
  });
});
