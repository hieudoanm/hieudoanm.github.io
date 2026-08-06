import { render, screen } from '@testing-library/react';
import AboutPage from '@/app/about/page';

describe('AboutPage', () => {
  it('renders the about template', () => {
    render(<AboutPage />);
    expect(screen.getByRole('heading', { name: 'SVG' })).toBeInTheDocument();
    expect(screen.getByText('SVG editor and generator')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getAllByText('Stable')).toHaveLength(1);
  });
});
