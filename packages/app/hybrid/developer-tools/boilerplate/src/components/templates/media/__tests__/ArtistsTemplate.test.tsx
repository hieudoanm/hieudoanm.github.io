import { fireEvent, render, screen } from '@testing-library/react';
import { ArtistsTemplate } from '../ArtistsTemplate';

describe('ArtistsTemplate', () => {
  it('renders artists with follower counts', () => {
    render(<ArtistsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Artists' })
    ).toBeInTheDocument();
    expect(screen.getByText('4 artists')).toBeInTheDocument();
    expect(screen.getByText('Luna Vega')).toBeInTheDocument();
    expect(screen.getByText('1.2M followers')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Follow' })).toHaveLength(4);
  });

  it('toggles follow status', () => {
    render(<ArtistsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(screen.getAllByText('Following')).toHaveLength(1);
    expect(screen.getByText('Following')).toHaveClass('badge-success');
    fireEvent.click(screen.getAllByRole('button', { name: 'Follow' })[0]);
    expect(screen.queryByText('Following')).not.toBeInTheDocument();
  });
});
