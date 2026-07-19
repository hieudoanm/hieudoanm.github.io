import { fireEvent, render, screen } from '@testing-library/react';
import { SprintsTemplate } from '../SprintsTemplate';

describe('SprintsTemplate', () => {
  it('renders sprints with status badges and story points', () => {
    render(<SprintsTemplate />);
    expect(screen.getByText('Sprint 12')).toBeInTheDocument();
    expect(screen.getByText('Sprint 13')).toBeInTheDocument();
    expect(screen.getByText('34')).toBeInTheDocument();
    expect(screen.getAllByText('Active')).toHaveLength(1);
    expect(screen.getAllByText('Planned')).toHaveLength(2);
  });

  it('starts a planned sprint', () => {
    render(<SprintsTemplate />);
    expect(
      screen.getAllByRole('button', { name: 'Start sprint' })
    ).toHaveLength(2);
    fireEvent.click(screen.getAllByRole('button', { name: 'Start sprint' })[0]);
    expect(
      screen.getAllByRole('button', { name: 'Start sprint' })
    ).toHaveLength(1);
    expect(screen.getAllByText('Active')).toHaveLength(2);
    expect(screen.getAllByText('Planned')).toHaveLength(1);
  });
});
