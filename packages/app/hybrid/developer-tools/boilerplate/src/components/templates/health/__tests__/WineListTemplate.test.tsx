import { fireEvent, render, screen } from '@testing-library/react';
import { WineListTemplate } from '../WineListTemplate';

describe('WineListTemplate', () => {
  it('renders the wine list with vintages and prices', () => {
    render(<WineListTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Wine List' })
    ).toBeInTheDocument();
    expect(screen.getByText('7 wines')).toBeInTheDocument();
    expect(screen.getByText('Barolo Riserva')).toBeInTheDocument();
    expect(screen.getByText('$42')).toBeInTheDocument();
    expect(screen.getAllByText('2021')).toHaveLength(2);
    expect(screen.getAllByText('Sommelier pick')).toHaveLength(3);
  });

  it('filters wines by type tab', () => {
    render(<WineListTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'White' }));
    expect(screen.getByText('2 wines')).toBeInTheDocument();
    expect(screen.getByText('Chablis Premier Cru')).toBeInTheDocument();
    expect(screen.queryByText('Barolo Riserva')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sparkling' }));
    expect(screen.getByText('2 wines')).toBeInTheDocument();
    expect(screen.getByText('Champagne Brut')).toBeInTheDocument();
    expect(screen.getAllByText('Sommelier pick')).toHaveLength(1);
  });
});
