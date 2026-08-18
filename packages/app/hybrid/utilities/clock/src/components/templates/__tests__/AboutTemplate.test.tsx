import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  const props = {
    name: 'Clock',
    description: 'A clock app',
    version: '1.0.0',
    items: [
      { label: 'Framework', value: 'Next.js' },
      { label: 'UI', value: 'DaisyUI' },
    ],
  };

  it('renders the app name', () => {
    render(<AboutTemplate {...props} />);
    expect(screen.getByText('Clock')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AboutTemplate {...props} />);
    expect(screen.getByText('A clock app')).toBeInTheDocument();
  });

  it('renders the version badge', () => {
    render(<AboutTemplate {...props} />);
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
  });

  it('renders all info items', () => {
    render(<AboutTemplate {...props} />);
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('UI')).toBeInTheDocument();
    expect(screen.getByText('DaisyUI')).toBeInTheDocument();
  });

  it('renders with a single item', () => {
    render(
      <AboutTemplate
        name="Test"
        description="Desc"
        version="0.0.1"
        items={[{ label: 'Key', value: 'Value' }]}
      />
    );
    expect(screen.getByText('Key')).toBeInTheDocument();
    expect(screen.getByText('Value')).toBeInTheDocument();
  });
});
