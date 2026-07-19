import { fireEvent, render, screen } from '@testing-library/react';
import { PortfolioOverviewTemplate } from '../PortfolioOverviewTemplate';

describe('PortfolioOverviewTemplate', () => {
  it('renders summary stat cards and a holdings preview', () => {
    render(<PortfolioOverviewTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Portfolio Overview' })
    ).toBeInTheDocument();
    expect(screen.getByText('$128,450')).toBeInTheDocument();
    expect(screen.getByText('6 holdings')).toBeInTheDocument();
    expect(screen.getByText('Total Gain')).toBeInTheDocument();
    expect(screen.getByText('Dividend Yield')).toBeInTheDocument();
    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Add funds' })
    ).toBeInTheDocument();
  });

  it('toggles between Add funds and Transfer scheduled', () => {
    render(<PortfolioOverviewTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Add funds' }));
    expect(
      screen.getByRole('button', { name: 'Transfer scheduled' })
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Transfer scheduled' }));
    expect(
      screen.getByRole('button', { name: 'Add funds' })
    ).toBeInTheDocument();
  });
});
