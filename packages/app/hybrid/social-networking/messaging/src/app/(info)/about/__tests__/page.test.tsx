import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/(info)/about/page';

describe('AboutPage', () => {
  it('renders the about content', () => {
    render(<AboutPage />);
    expect(screen.getByText('Messaging')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Real-time messaging application with chat, threads, and media sharing.'
      )
    ).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Styling')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
  });
});
