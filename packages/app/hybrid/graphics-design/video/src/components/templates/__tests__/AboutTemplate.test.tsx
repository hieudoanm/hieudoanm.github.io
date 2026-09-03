import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        name="Video Tools"
        description="Minimal video editor"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getAllByText('Video Tools').length).toBeGreaterThan(0);
    expect(screen.getByText('Minimal video editor')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('renders Stable badge and About label', () => {
    render(
      <AboutTemplate
        name="Video Tools"
        description="desc"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getByText('Stable')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
