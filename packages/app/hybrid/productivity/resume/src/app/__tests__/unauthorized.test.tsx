import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '../unauthorized';

describe('UnauthorizedPage', () => {
  it('renders 401', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});
