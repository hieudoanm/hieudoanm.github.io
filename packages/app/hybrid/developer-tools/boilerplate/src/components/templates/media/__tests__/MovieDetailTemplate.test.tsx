import { fireEvent, render, screen } from '@testing-library/react';
import { MovieDetailTemplate } from '../MovieDetailTemplate';

describe('MovieDetailTemplate', () => {
  it('renders movie details with genre badges', () => {
    render(<MovieDetailTemplate />);
    expect(screen.getByRole('heading', { name: 'Movie' })).toBeInTheDocument();
    expect(screen.getByText('Starfall Protocol')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('2h 10m')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getByText('Sci-Fi')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });

  it('toggles play to paused', () => {
    render(<MovieDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Play' }));
    expect(screen.getByRole('button', { name: 'Paused' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Paused' }));
    expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
  });

  it('toggles like to liked with an error badge', () => {
    render(<MovieDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Like' }));
    expect(screen.getByRole('button', { name: 'Liked' })).toBeInTheDocument();
    expect(screen.getAllByText('Liked')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Liked' }));
    expect(screen.getByRole('button', { name: 'Like' })).toBeInTheDocument();
  });
});
