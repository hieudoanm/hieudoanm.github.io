import { render, screen } from '@testing-library/react';
import { GitCommitFeed } from '../GitCommitFeed';

describe('GitCommitFeed', () => {
  it('renders commits with messages and hashes', () => {
    render(
      <GitCommitFeed
        commits={[
          {
            id: '1',
            message: 'Fix login bug',
            author: 'Jane',
            hash: 'a1b2c3d',
            time: '2h ago',
            branch: 'main',
          },
        ]}
      />
    );
    expect(screen.getByText('Recent commits')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('a1b2c3d')).toBeInTheDocument();
    expect(screen.getByText('main')).toBeInTheDocument();
  });

  it('shows empty state', () => {
    render(<GitCommitFeed commits={[]} />);
    expect(screen.getByText('No commits.')).toBeInTheDocument();
  });
});
