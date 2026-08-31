import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders app info and tech stack', () => {
    render(<AboutPage />);
    expect(screen.getAllByText('Tax').length).toBeGreaterThan(0);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Tauri 2')).toBeInTheDocument();
  });
});
