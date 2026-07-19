import { render, screen } from '@testing-library/react';
import SecurityPage from '@/app/(templates)/auth/home-security/page';

describe('SecurityPage', () => {
  it('renders the SecurityPage', () => {
    render(<SecurityPage />);
    expect(
      screen.getByRole('heading', { name: 'Security' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 cameras')).toBeInTheDocument();
  });
});
