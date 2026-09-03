import { render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        name="Wallet"
        description="Minimal banking client"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getByText('Wallet')).toBeInTheDocument();
    expect(
      screen.getByText('Minimal banking client')
    ).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });

  it('renders Stable badge', () => {
    render(
      <AboutTemplate
        name="Wallet"
        description="desc"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders About label', () => {
    render(
      <AboutTemplate
        name="Wallet"
        description="desc"
        version="v0.0.1"
        items={[]}
      />
    );
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
