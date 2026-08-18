import { render, screen } from '@testing-library/react';
import ForbiddenPage from '../forbidden';
import LoadingPage from '../loading';
import UnauthorizedPage from '../unauthorized';

describe('ForbiddenPage', () => {
  it('renders 403', () => {
    render(<ForbiddenPage />);
    expect(screen.getByText('403')).toBeInTheDocument();
    expect(
      screen.getByText('You do not have permission to access this page.')
    ).toBeInTheDocument();
  });
});

describe('UnauthorizedPage', () => {
  it('renders 401', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
    expect(
      screen.getByText('You must be authenticated to access this page.')
    ).toBeInTheDocument();
  });
});

describe('LoadingPage', () => {
  it('renders a spinner', () => {
    const { container } = render(<LoadingPage />);
    expect(container.querySelector('.loading')).toBeInTheDocument();
  });
});
