import { fireEvent, render, screen } from '@testing-library/react';
import { PropertyDetailTemplate } from '../PropertyDetailTemplate';

describe('PropertyDetailTemplate', () => {
  it('renders property details with a features grid', () => {
    render(<PropertyDetailTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Property Detail' })
    ).toBeInTheDocument();
    expect(screen.getByText('A closer look at this home.')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getByText('Beds')).toBeInTheDocument();
    expect(screen.getByText('Baths')).toBeInTheDocument();
    expect(screen.getByText('Sqft')).toBeInTheDocument();
    expect(screen.getByText('Year Built')).toBeInTheDocument();
    expect(screen.getByText('2,400')).toBeInTheDocument();
    expect(screen.getByText('3 open houses this month')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Schedule tour' })
    ).toBeInTheDocument();
  });

  it('toggles the schedule tour state', () => {
    render(<PropertyDetailTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Schedule tour' }));
    expect(screen.getByText('Tour scheduled')).toHaveClass('badge-success');
    fireEvent.click(screen.getByRole('button', { name: 'Schedule tour' }));
    expect(screen.queryByText('Tour scheduled')).not.toBeInTheDocument();
  });
});
