import { render, screen } from '@testing-library/react';
import { LyricsView } from '../LyricsView';

describe('LyricsView', () => {
  it('renders all lyric lines', () => {
    render(<LyricsView lines={['Line one', 'Line two']} />);
    expect(screen.getByText('Line one')).toBeInTheDocument();
    expect(screen.getByText('Line two')).toBeInTheDocument();
  });

  it('highlights the active line', () => {
    render(<LyricsView lines={['Line one', 'Line two']} activeLine={1} />);
    expect(screen.getByText('Line two')).toHaveClass('text-primary');
    expect(screen.getByText('Line one')).toHaveClass('text-base-content/40');
  });

  it('renders empty container for no lines', () => {
    render(<LyricsView lines={[]} />);
    expect(screen.getByTestId('lyrics-view')).toBeEmptyDOMElement();
  });
});
