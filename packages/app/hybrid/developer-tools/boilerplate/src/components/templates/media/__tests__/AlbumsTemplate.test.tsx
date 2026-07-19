import { fireEvent, render, screen } from '@testing-library/react';
import { AlbumsTemplate } from '../AlbumsTemplate';

describe('AlbumsTemplate', () => {
  it('renders albums with photo counts', () => {
    render(<AlbumsTemplate />);
    expect(screen.getByRole('heading', { name: 'Albums' })).toBeInTheDocument();
    expect(screen.getByText('3 albums')).toBeInTheDocument();
    expect(screen.getByText('Summer trip')).toBeInTheDocument();
    expect(screen.getByText('4 photos')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'View photos' })).toHaveLength(
      3
    );
  });

  it('expands and hides album photos', () => {
    render(<AlbumsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'View photos' })[0]);
    expect(screen.getByText('Beach sunset')).toBeInTheDocument();
    expect(screen.getByText('Boardwalk')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide photos' }));
    expect(screen.queryByText('Beach sunset')).not.toBeInTheDocument();
  });

  it('creates an album with validation', () => {
    render(<AlbumsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Create album' }));
    expect(screen.getByText('Enter an album title')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Album title'), {
      target: { value: 'Holiday snaps' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create album' }));
    expect(screen.getByText('Album created')).toBeInTheDocument();
    expect(screen.getByText('Holiday snaps')).toBeInTheDocument();
    expect(screen.getByText('4 albums')).toBeInTheDocument();
  });
});
