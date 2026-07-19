import { fireEvent, render, screen, within } from '@testing-library/react';
import { PropertyListingsTemplate } from '../PropertyListingsTemplate';

describe('PropertyListingsTemplate', () => {
  it('renders property cards with status badges', () => {
    render(<PropertyListingsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Property Listings' })
    ).toBeInTheDocument();
    expect(screen.getByText('Browse homes for sale.')).toBeInTheDocument();
    expect(screen.getByText('6 properties')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getAllByText('For Sale')).toHaveLength(5);
    expect(screen.getByText('Sold')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove')).toBeInTheDocument();
    expect(screen.getByText('4 beds')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Save' })).toHaveLength(6);
  });

  it('saves a property card and toggles back', () => {
    render(<PropertyListingsTemplate />);
    const card = screen.getByText('Maple Grove Family Home').closest('.card');
    expect(card).not.toBeNull();
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(screen.getAllByText('Saved')).toHaveLength(1);
    expect(screen.getByText('Saved')).toHaveClass('badge-success');
    fireEvent.click(
      within(card as HTMLElement).getByRole('button', { name: 'Save' })
    );
    expect(screen.queryAllByText('Saved')).toHaveLength(0);
  });
});
