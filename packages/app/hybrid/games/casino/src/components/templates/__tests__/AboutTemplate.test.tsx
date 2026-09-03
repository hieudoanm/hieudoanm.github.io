import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and item values', () => {
    render(
      <AboutTemplate
        name="Casino"
        description="A collection of classic casino games"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js' }]}
      />
    );
    expect(screen.getByText('Casino')).toBeInTheDocument();
    expect(
      screen.getByText('A collection of classic casino games')
    ).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders version and stable badge', () => {
    render(
      <AboutTemplate
        name="Casino"
        description="A collection of classic casino games"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});
