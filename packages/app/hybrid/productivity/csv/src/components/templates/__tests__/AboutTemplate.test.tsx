import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="CSV Importer"
        description="Work with tabular data"
        version="v1.0.0"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Format', value: 'TSV' },
        ]}
      />
    );
    expect(screen.getByText('CSV Importer')).toBeInTheDocument();
    expect(screen.getByText('Work with tabular data')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('TSV')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
