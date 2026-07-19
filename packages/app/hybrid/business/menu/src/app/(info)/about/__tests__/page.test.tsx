import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the app name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AboutPage />);
    expect(
      screen.getByText('Create restaurant menus and share them with a QR code')
    ).toBeInTheDocument();
  });

  it('renders the tech stack', () => {
    render(<AboutPage />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
  });
});
