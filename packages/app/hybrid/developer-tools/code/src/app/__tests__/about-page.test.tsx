import { render, screen } from '@testing-library/react';
import AboutPage from '../(info)/about/page';
import { buildVersion } from '@/content/version';

describe('AboutPage', () => {
  it('renders the about template content', () => {
    render(<AboutPage />);
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Code' })).toBeInTheDocument();
    expect(screen.getByText('Web-based code editor')).toBeInTheDocument();
    expect(screen.getByText(buildVersion)).toBeInTheDocument();
  });

  it('renders all info items', () => {
    render(<AboutPage />);
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('TypeScript 6')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS 4 + DaisyUI 5')).toBeInTheDocument();
    expect(screen.getByText('CodeMirror 6')).toBeInTheDocument();
  });
});
