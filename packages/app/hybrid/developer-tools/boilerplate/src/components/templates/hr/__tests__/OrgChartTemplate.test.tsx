import { fireEvent, render, screen } from '@testing-library/react';
import { OrgChartTemplate } from '../OrgChartTemplate';

describe('OrgChartTemplate', () => {
  it('renders departments and the summary', () => {
    render(<OrgChartTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Org Chart' })
    ).toBeInTheDocument();
    expect(screen.getByText('3 departments')).toBeInTheDocument();
    expect(screen.getByText('Engineering')).toBeInTheDocument();
    expect(screen.getByText('Head: Priya Patel')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Show team' })).toHaveLength(
      3
    );
  });

  it('shows and hides a department team', () => {
    render(<OrgChartTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: 'Show team' })[0]);
    expect(screen.getByText('Sofia Rossi')).toBeInTheDocument();
    expect(screen.getByText('David Chen')).toBeInTheDocument();
    expect(screen.getByText('Ana Garcia')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Hide team' }));
    expect(screen.queryByText('Sofia Rossi')).not.toBeInTheDocument();
  });
});
