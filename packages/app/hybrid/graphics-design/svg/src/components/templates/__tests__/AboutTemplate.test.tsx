import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, version, and items', () => {
    render(
      <AboutTemplate
        name="SVG"
        description="SVG editor and generator"
        version="v0.0.1"
        items={[
          { label: 'Framework', value: 'Next.js 16' },
          { label: 'Language', value: 'TypeScript 6' },
        ]}
      />
    );
    expect(screen.getByText('SVG')).toBeInTheDocument();
    expect(screen.getByText('SVG editor and generator')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
