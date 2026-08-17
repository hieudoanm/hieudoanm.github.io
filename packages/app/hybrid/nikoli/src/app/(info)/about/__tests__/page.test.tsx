import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('Nikoli')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Seven classic logic puzzle games from Nikoli publishers'
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
