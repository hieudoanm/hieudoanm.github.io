import { render, screen } from '@testing-library/react';
import { PlayCount } from '../PlayCount';

describe('PlayCount', () => {
  it('renders the play count with a comma separator', () => {
    render(<PlayCount count={1200} />);
    expect(screen.getByTestId('play-count')).toHaveTextContent('1,200 plays');
  });

  it('renders a custom label', () => {
    render(<PlayCount count={9} label="listens" />);
    expect(screen.getByTestId('play-count')).toHaveTextContent('9 listens');
  });

  it('renders a play icon alongside the count', () => {
    const { container } = render(<PlayCount count={1} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
