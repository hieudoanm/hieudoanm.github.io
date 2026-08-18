import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('8-Bit Games')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Four classic 8-bit arcade games: Maze, Snake, DinoRun, and Rock Paper Scissors'
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
