import { fireEvent, render, screen } from '@testing-library/react';
import { GoalsTemplate } from '../GoalsTemplate';

describe('GoalsTemplate', () => {
  it('renders the four daily goals', () => {
    render(<GoalsTemplate />);
    expect(screen.getByRole('heading', { name: 'Goals' })).toBeInTheDocument();
    expect(screen.getByText('4 goals')).toBeInTheDocument();
    expect(screen.getByText('10,000/day')).toBeInTheDocument();
    expect(screen.getByText('8h')).toBeInTheDocument();
    expect(screen.getByText('8 glasses')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(4);
  });

  it('marks a goal as complete', () => {
    render(<GoalsTemplate />);
    fireEvent.click(
      screen.getAllByRole('button', { name: 'Mark complete' })[0]
    );
    expect(screen.getAllByText('Completed')).toHaveLength(1);
    expect(
      screen.getAllByRole('button', { name: 'Mark complete' })
    ).toHaveLength(3);
  });
});
