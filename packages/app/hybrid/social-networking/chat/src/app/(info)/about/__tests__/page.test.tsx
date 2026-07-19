import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the app name', () => {
    render(<AboutPage />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AboutPage />);
    expect(screen.getByText('AI chat interface')).toBeInTheDocument();
  });

  it('renders the tech stack', () => {
    render(<AboutPage />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
  });
});
