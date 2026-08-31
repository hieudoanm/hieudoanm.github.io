import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, version, and info rows', () => {
    render(
      <AboutTemplate
        name="PDF"
        description="A viewer"
        version="v1.0.0"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Language', value: 'TypeScript' },
        ]}
      />
    );
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('A viewer')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
