import { render, screen } from '@testing-library/react';
import ForbiddenPage from '@/app/forbidden';

describe('ForbiddenPage', () => {
  it('renders 403', () => {
    const { getByText } = render(<ForbiddenPage />);
    expect(getByText('403')).toBeInTheDocument();
  });
});
