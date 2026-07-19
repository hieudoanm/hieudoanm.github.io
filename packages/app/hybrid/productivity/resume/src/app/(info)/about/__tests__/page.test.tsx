import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the app name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Open Resume')).toBeInTheDocument();
  });

  it('renders the tech stack items', () => {
    render(<AboutPage />);
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6.+')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16.+')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4.+')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('DaisyUI 5.+')).toBeInTheDocument();
    expect(screen.getByText('Desktop')).toBeInTheDocument();
    expect(screen.getByText('Tauri 2.+')).toBeInTheDocument();
  });
});
