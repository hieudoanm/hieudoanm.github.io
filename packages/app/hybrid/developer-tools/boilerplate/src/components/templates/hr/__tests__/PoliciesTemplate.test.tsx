import { fireEvent, render, screen } from '@testing-library/react';
import { PoliciesTemplate } from '../PoliciesTemplate';

describe('PoliciesTemplate', () => {
  it('renders all policies and the summary', () => {
    render(<PoliciesTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Policies' })
    ).toBeInTheDocument();
    expect(screen.getByText('6 policies')).toBeInTheDocument();
    expect(screen.getByText('Code of conduct')).toBeInTheDocument();
    expect(screen.getByText('Parental leave')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Read' })).toHaveLength(6);
  });

  it('expands and collapses a policy summary', () => {
    render(<PoliciesTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Read' })[0]);
    expect(
      screen.getByText('Outlines expected behavior and reporting channels.')
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Close' })).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(
      screen.queryByText('Outlines expected behavior and reporting channels.')
    ).not.toBeInTheDocument();
  });

  it('searches policies and shows the empty state', () => {
    render(<PoliciesTemplate />);
    fireEvent.change(screen.getByLabelText('Search policies'), {
      target: { value: 'PTO' },
    });
    expect(screen.getByText('1 policies')).toBeInTheDocument();
    expect(screen.getByText('PTO policy')).toBeInTheDocument();
    expect(screen.queryByText('Code of conduct')).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Search policies'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No policies found')).toBeInTheDocument();
    expect(screen.getByText('0 policies')).toBeInTheDocument();
  });
});
