import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        appName="Eyes"
        name="Eyes"
        description="Visual acuity charts"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />
    );
    expect(screen.getAllByRole('heading', { name: 'Eyes' })).toHaveLength(1);
    expect(screen.getByText('Visual acuity charts')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});
