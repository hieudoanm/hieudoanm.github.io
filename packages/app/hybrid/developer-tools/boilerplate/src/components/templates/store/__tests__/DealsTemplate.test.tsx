import { fireEvent, render, screen } from '@testing-library/react';
import DealsPage from '@/app/(templates)/store/deals/page';
import { DealsTemplate } from '../DealsTemplate';

describe('DealsTemplate', () => {
  it('renders deals with discounts and expiry', () => {
    render(<DealsTemplate />);
    expect(screen.getByText('40% OFF')).toBeInTheDocument();
    expect(screen.getByText('Ergonomic Chair')).toBeInTheDocument();
    expect(screen.getByText('$349')).toBeInTheDocument();
    expect(screen.getByText('$209')).toBeInTheDocument();
    expect(screen.getByText('Ends Aug 20, 2026')).toBeInTheDocument();
    expect(screen.getByText('0 deals claimed')).toBeInTheDocument();
  });

  it('claims a deal and updates the summary', () => {
    render(<DealsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Claim deal' })[0]);
    expect(screen.getByText('1 deals claimed')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Claimed' })).toHaveLength(1);
    expect(screen.getAllByRole('button', { name: 'Claim deal' })).toHaveLength(
      3
    );
  });

  it('claims all deals', () => {
    render(<DealsTemplate />);
    const buttons = screen.getAllByRole('button', { name: 'Claim deal' });
    buttons.forEach((button) => fireEvent.click(button));
    expect(screen.getByText('4 deals claimed')).toBeInTheDocument();
    expect(
      screen.queryAllByRole('button', { name: 'Claim deal' })
    ).toHaveLength(0);
    expect(screen.getAllByRole('button', { name: 'Claimed' })).toHaveLength(4);
  });

  it('renders the DealsPage', () => {
    render(<DealsPage />);
    expect(screen.getByText('40% OFF')).toBeInTheDocument();
  });
});
