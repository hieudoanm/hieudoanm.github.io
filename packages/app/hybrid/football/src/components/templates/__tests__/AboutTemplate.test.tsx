import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

const PROPS = {
  name: 'Football Manager',
  description: 'Pick a formation',
  version: 'v0.0.1',
  items: [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Desktop', value: 'Tauri 2' },
  ],
};

describe('AboutTemplate', () => {
  it('renders name and description', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getAllByText('Football Manager').length).toBeGreaterThan(0);
    expect(screen.getByText('Pick a formation')).toBeInTheDocument();
  });

  it('renders all info items', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Tauri 2')).toBeInTheDocument();
  });

  it('renders version and stable badge', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('links back to home', () => {
    render(<AboutTemplate {...PROPS} />);
    expect(document.querySelector('a[href="/"]')).toBeInTheDocument();
  });
});
