import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders app details', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getAllByText('Database').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('SQLite database manager')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
    expect(screen.getByText('SQLite')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
