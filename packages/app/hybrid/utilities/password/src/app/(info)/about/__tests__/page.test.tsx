import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: 'Password' })
    ).toBeInTheDocument();
    expect(screen.getByText('Secure password manager')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('AES-256')).toBeInTheDocument();
  });
});
