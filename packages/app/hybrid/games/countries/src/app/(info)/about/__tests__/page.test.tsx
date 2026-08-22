import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('Countries')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Geography word games — Wordle and Connections with country answers'
      )
    ).toBeInTheDocument();
  });

  it('renders tech stack items', () => {
    render(<AboutPage />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
  });

  it('renders version', () => {
    render(<AboutPage />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});
