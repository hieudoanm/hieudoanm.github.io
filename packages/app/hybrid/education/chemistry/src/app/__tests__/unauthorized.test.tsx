import { render, screen } from '@testing-library/react';
import UnauthorizedPage from '@/app/unauthorized';

describe('UnauthorizedPage', () => {
  it('renders unauthorized template', () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText('401')).toBeInTheDocument();
  });
});
