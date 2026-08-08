import { render, screen } from '@testing-library/react';
import { HeroSection } from '../HeroSection';

describe('HeroSection', () => {
  it('renders the title and subtitle', () => {
    render(<HeroSection title="Build faster" subtitle="Ship in days." />);
    expect(screen.getByText('Build faster')).toBeInTheDocument();
    expect(screen.getByText('Ship in days.')).toBeInTheDocument();
  });

  it('renders the badge', () => {
    render(<HeroSection title="Build faster" badge="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders default action buttons', () => {
    render(<HeroSection title="Build faster" />);
    expect(
      screen.getByRole('button', { name: 'Get started' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Learn more' })
    ).toBeInTheDocument();
  });

  it('hides subtitle and badge when omitted', () => {
    render(<HeroSection title="Build faster" />);
    expect(screen.queryByText('Ship in days.')).not.toBeInTheDocument();
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });
});
