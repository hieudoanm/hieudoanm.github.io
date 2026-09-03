import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the app name and description', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(
      screen.getByText(/create restaurant menus and share them with a QR code/i)
    ).toBeInTheDocument();
  });

  it('lists the tech stack', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
    expect(screen.getByText('Tauri 2')).toBeInTheDocument();
  });
});
