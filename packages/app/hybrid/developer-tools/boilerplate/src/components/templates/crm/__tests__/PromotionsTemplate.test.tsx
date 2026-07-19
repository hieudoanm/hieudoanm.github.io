import { fireEvent, render, screen, within } from '@testing-library/react';
import { PromotionsTemplate } from '../PromotionsTemplate';

describe('PromotionsTemplate', () => {
  it('renders promotions with badges and spend progress', () => {
    render(<PromotionsTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Promotions' })
    ).toBeInTheDocument();
    expect(screen.getByText('Spring Sale')).toBeInTheDocument();
    expect(screen.getByText('$3,200')).toBeInTheDocument();
    expect(
      screen.getByRole('progressbar', { name: 'Progress for Spring Sale' })
    ).toBeInTheDocument();
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Active')).toHaveLength(2);
    expect(within(table).getAllByText('Scheduled')).toHaveLength(1);
    expect(within(table).getAllByText('Ended')).toHaveLength(2);
  });

  it('ends an active promotion', () => {
    render(<PromotionsTemplate />);
    expect(
      screen.getAllByRole('button', { name: 'End promotion' })
    ).toHaveLength(2);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'End promotion' })[0]
    );
    expect(
      screen.getAllByRole('button', { name: 'End promotion' })
    ).toHaveLength(1);
    const table = screen.getByRole('table');
    expect(within(table).getAllByText('Ended')).toHaveLength(3);
    expect(within(table).getAllByText('Active')).toHaveLength(1);
  });

  it('filters promotions by status', () => {
    render(<PromotionsTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Scheduled' }));
    expect(screen.getByText('Flash Friday')).toBeInTheDocument();
    expect(screen.queryByText('Spring Sale')).not.toBeInTheDocument();
  });
});
