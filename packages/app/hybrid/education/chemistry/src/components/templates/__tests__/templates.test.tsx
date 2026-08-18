import { fireEvent, render, screen } from '@testing-library/react';
import { FiBox } from 'react-icons/fi';
import { HomeTemplate } from '../HomeTemplate';
import { ThemeToggle } from '@/components/atoms/ThemeToggle';
import { VersionTemplate } from '../VersionTemplate';

describe('HomeTemplate', () => {
  const base = {
    appName: 'Chemistry',
    description: 'Test app',
    items: [
      {
        label: 'Tool One',
        description: 'First tool',
        icon: FiBox,
        href: '/periodic-table/',
      },
    ],
  };

  it('renders heading, description and tool cards', () => {
    render(<HomeTemplate {...base} />);
    expect(
      screen.getByRole('heading', { name: 'Chemistry' })
    ).toBeInTheDocument();
    expect(screen.getByText('Test app')).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-periodic-table')).toBeInTheDocument();
  });

  it('renders xp and streak stats when provided', () => {
    render(<HomeTemplate {...base} stats={{ xp: 120, streak: 3 }} />);
    expect(screen.getByTestId('stat-xp').textContent).toContain('120');
    expect(screen.getByTestId('stat-streak').textContent).toContain('3');
  });

  it('omits stats when not provided', () => {
    render(<HomeTemplate {...base} />);
    expect(screen.queryByTestId('stat-xp')).not.toBeInTheDocument();
  });

  it('renders footer links when provided', () => {
    render(<HomeTemplate {...base} footer={<a href="/about">About</a>} />);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
  });
});

describe('ThemeToggle', () => {
  it('switches between light and dark themes', () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    expect(document.documentElement.dataset.theme).toBe('chemistry');
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('chemistry-dark');
    fireEvent.click(button);
    expect(document.documentElement.dataset.theme).toBe('chemistry');
  });
});

describe('VersionTemplate', () => {
  it('renders date segments for a timestamp version', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(
      <VersionTemplate appName="Chemistry" version="2026.08.09.10.20.30" />
    );
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    await screen.findByText('Copied');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '2026.08.09.10.20.30'
    );
  });

  it('falls back to raw version text for non-timestamp versions', () => {
    render(<VersionTemplate appName="Chemistry" version="v0.0.1" />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});
