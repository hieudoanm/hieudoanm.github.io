import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders the name, description, and version', () => {
    render(
      <AboutTemplate
        name="Colors"
        description="A design toolkit"
        version="1.0.0"
        items={[]}
      />
    );
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('A design toolkit')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
  });

  it('renders each info row label and value', () => {
    const items = [
      { label: 'Author', value: 'Hieu' },
      { label: 'License', value: 'MIT' },
    ];
    render(
      <AboutTemplate
        name="Colors"
        description="A design toolkit"
        version="1.0.0"
        items={items}
      />
    );
    expect(screen.getByText('Author')).toBeInTheDocument();
    expect(screen.getByText('Hieu')).toBeInTheDocument();
    expect(screen.getByText('License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders the Stable badge', () => {
    render(
      <AboutTemplate
        name="Colors"
        description="A design toolkit"
        version="1.0.0"
        items={[]}
      />
    );
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
