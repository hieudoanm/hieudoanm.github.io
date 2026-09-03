import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        name="Brainbow"
        description="Minimal image processing"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getAllByText('Brainbow').length).toBeGreaterThan(0);
    expect(
      screen.getByText('Minimal image processing')
    ).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('renders hardcoded Brainbow header and Stable badge', () => {
    render(
      <AboutTemplate
        name="Brainbow"
        description="desc"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getAllByText('Brainbow').length).toBeGreaterThan(0);
    expect(screen.getByText('Stable')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
