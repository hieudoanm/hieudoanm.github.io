import { fireEvent, render, screen } from '@testing-library/react';
import { StreamingHomeTemplate } from '../StreamingHomeTemplate';

describe('StreamingHomeTemplate', () => {
  it('renders featured titles with type, year and rating', () => {
    render(<StreamingHomeTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Streaming' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 featured titles')).toBeInTheDocument();
    expect(screen.getByText('Neon Horizon')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getAllByText('2026')).toHaveLength(2);
    expect(screen.getAllByText('Movie')).toHaveLength(2);
    expect(screen.getAllByText('Series')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(4);
  });

  it('toggles a featured title to Watching', () => {
    render(<StreamingHomeTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Watch' })[0]);
    expect(
      screen.getByRole('button', { name: 'Watching' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Watching')).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Watch' })).toHaveLength(3);
  });
});
