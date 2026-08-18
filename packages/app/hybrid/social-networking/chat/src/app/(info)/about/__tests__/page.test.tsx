import { render, screen } from '@testing-library/react';
import AboutPage from '../page';

describe('AboutPage', () => {
  it('renders the about template with metadata items', () => {
    render(<AboutPage />);
    expect(screen.getByText('AI chat interface')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
  });
});
