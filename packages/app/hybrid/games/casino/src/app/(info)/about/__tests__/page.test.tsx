import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('Casino')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Ten casino classics — cards, dice, reels and lucky numbers'
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
