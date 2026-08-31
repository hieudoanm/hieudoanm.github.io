import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

describe('AboutTemplate', () => {
  const items = [
    { label: 'Framework', value: 'Next.js 16' },
    { label: 'Desktop', value: 'Tauri 2' },
  ];

  it('renders name, description, and info rows', () => {
    render(
      <AboutTemplate
        name="MRI"
        description="An MRI research workspace"
        version="v0.0.1"
        items={items}
      />
    );
    expect(screen.getByText('MRI')).toBeInTheDocument();
    expect(screen.getByText('An MRI research workspace')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders an empty card without items', () => {
    render(
      <AboutTemplate name="MRI" description="" version="v0.0.1" items={[]} />
    );
    expect(screen.queryByText('Framework')).not.toBeInTheDocument();
  });
});
