import { fireEvent, render, screen, within } from '@testing-library/react';
import { DestinationsTemplate } from '../DestinationsTemplate';

describe('DestinationsTemplate', () => {
  it('renders destinations with a count summary', () => {
    render(<DestinationsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Destinations' })
    ).toBeInTheDocument();
    expect(screen.getByText('Find your next trip.')).toBeInTheDocument();
    expect(screen.getByText('9 destinations')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('France')).toBeInTheDocument();
    expect(screen.getByText('from $840')).toBeInTheDocument();
    expect(screen.getByText('4.8 rating')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(9);
  });

  it('filters destinations by region tab', () => {
    render(<DestinationsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Europe' }));
    expect(screen.getByText('3 destinations')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Hanoi')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Asia' }));
    expect(screen.getByText('3 destinations')).toBeInTheDocument();
    expect(screen.getByText('Hanoi')).toBeInTheDocument();
    expect(screen.queryByText('Paris')).not.toBeInTheDocument();
  });

  it('saves a destination card', () => {
    render(<DestinationsTemplate />);
    const card = screen.getByText('Paris').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(within(card as HTMLElement).getByText('Saved')).toHaveClass(
      'badge-success'
    );
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(
      within(card as HTMLElement).queryByText('Saved')
    ).not.toBeInTheDocument();
  });
});
