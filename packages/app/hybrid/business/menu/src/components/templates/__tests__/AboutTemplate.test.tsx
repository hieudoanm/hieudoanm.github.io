import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and version', () => {
    render(
      <AboutTemplate
        name="Menu"
        description="Restaurant menu client"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Restaurant menu client')).toBeInTheDocument();
    expect(screen.getByText('Version v0.0.1')).toBeInTheDocument();
  });

  it('renders version badge', () => {
    render(
      <AboutTemplate
        name="Menu"
        description="Restaurant menu client"
        version="v1.2.3"
        items={[]}
      />
    );
    expect(screen.getByText('Version v1.2.3')).toBeInTheDocument();
  });

  it('renders tech stack items', () => {
    render(
      <AboutTemplate
        name="Menu"
        description="Restaurant menu client"
        version="v0.0.1"
        items={[
          { label: 'Framework', value: 'Next.js 16' },
          { label: 'UI', value: 'DaisyUI' },
        ]}
      />
    );
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('DaisyUI')).toBeInTheDocument();
  });

  it('renders tech stack heading', () => {
    render(
      <AboutTemplate
        name="Menu"
        description="Restaurant menu client"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getByText('Tech stack')).toBeInTheDocument();
  });
});
