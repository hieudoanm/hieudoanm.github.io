import { fireEvent, render, screen } from '@testing-library/react';
import { SavedPropertiesTemplate } from '../SavedPropertiesTemplate';

describe('SavedPropertiesTemplate', () => {
  it('renders saved properties with remove buttons', () => {
    render(<SavedPropertiesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Saved Properties' })
    ).toBeInTheDocument();
    expect(screen.getByText('Your shortlist.')).toBeInTheDocument();
    expect(screen.getByText('4 saved properties')).toBeInTheDocument();
    expect(screen.getByText('Maple Grove Family Home')).toBeInTheDocument();
    expect(screen.getByText('$845,000')).toBeInTheDocument();
    expect(screen.getAllByText('Saved')).toHaveLength(4);
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(4);
  });

  it('removes all saved properties and shows the empty state', () => {
    render(<SavedPropertiesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    expect(screen.getByText('3 saved properties')).toBeInTheDocument();
    expect(
      screen.queryByText('Maple Grove Family Home')
    ).not.toBeInTheDocument();
    for (let i = 0; i < 3; i += 1) {
      fireEvent.click(screen.getAllByRole('button', { name: 'Remove' })[0]);
    }
    expect(screen.getByText('0 saved properties')).toBeInTheDocument();
    expect(screen.getByText('No saved properties yet')).toBeInTheDocument();
  });
});
