import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, items and version', () => {
    render(
      <AboutTemplate
        name="Database"
        description="Browse and query your database"
        version="v3.2.0"
        items={[
          { label: 'Engine', value: 'SQLite' },
          { label: 'License', value: 'MIT' },
        ]}
      />
    );
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(
      screen.getByText('Browse and query your database')
    ).toBeInTheDocument();
    expect(screen.getByText('Engine')).toBeInTheDocument();
    expect(screen.getByText('SQLite')).toBeInTheDocument();
    expect(screen.getByText('License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
    expect(screen.getByText('v3.2.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
