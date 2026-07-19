import { render, screen } from '@testing-library/react';
import { EpisodeBadge } from '../EpisodeBadge';

describe('EpisodeBadge', () => {
  it('renders the episode number', () => {
    render(<EpisodeBadge episode={5} />);
    expect(screen.getByTestId('episode-badge')).toHaveTextContent('Episode 5');
  });

  it('renders a custom label', () => {
    render(<EpisodeBadge episode={3} label="Ep" />);
    expect(screen.getByTestId('episode-badge')).toHaveTextContent('Ep 3');
  });

  it('applies the badge class', () => {
    render(<EpisodeBadge episode={1} />);
    expect(screen.getByTestId('episode-badge')).toHaveClass('badge');
  });
});
