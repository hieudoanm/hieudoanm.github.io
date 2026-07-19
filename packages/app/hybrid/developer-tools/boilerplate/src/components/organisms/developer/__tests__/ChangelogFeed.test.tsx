import { render, screen } from '@testing-library/react';
import { ChangelogFeed } from '../ChangelogFeed';

describe('ChangelogFeed', () => {
  it('renders versions with changes and dates', () => {
    render(
      <ChangelogFeed
        entries={[
          {
            id: '1',
            version: 'v2.0.0',
            date: 'Feb 2026',
            changes: ['Added dark mode', 'Fixed bugs'],
          },
        ]}
      />
    );
    expect(screen.getByText('Changelog')).toBeInTheDocument();
    expect(screen.getByText('v2.0.0')).toBeInTheDocument();
    expect(screen.getByText('Feb 2026')).toBeInTheDocument();
    expect(screen.getByText('Added dark mode')).toBeInTheDocument();
    expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<ChangelogFeed entries={[]} />);
    expect(screen.getByText('No changes released.')).toBeInTheDocument();
  });
});
