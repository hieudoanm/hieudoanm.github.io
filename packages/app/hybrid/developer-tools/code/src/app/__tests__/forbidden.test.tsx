import { render, screen } from '@testing-library/react';
import ForbiddenPage from '../forbidden';

describe('ForbiddenPage', () => {
  it('renders 403', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
  });
});
