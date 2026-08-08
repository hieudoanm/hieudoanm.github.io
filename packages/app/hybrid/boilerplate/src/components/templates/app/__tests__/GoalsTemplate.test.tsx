import { fireEvent, render, screen } from '@testing-library/react';
import { GoalsTemplate } from '../GoalsTemplate';

describe('GoalsTemplate', () => {
  it('renders goal cards with progress and an overall summary', () => {
    render(<GoalsTemplate />);
    expect(screen.getByText('Grow monthly revenue')).toBeInTheDocument();
    expect(screen.getByText('Ship the new dashboard')).toBeInTheDocument();
    expect(screen.getByText('48%')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '+ 10%' })).toHaveLength(4);
  });

  it('advances goal progress with a cap at 100%', () => {
    render(<GoalsTemplate />);
    fireEvent.click(screen.getAllByRole('button', { name: '+ 10%' })[0]);
    expect(screen.getAllByText('50%')).toHaveLength(2);
    const highGoal = screen.getAllByRole('button', { name: '+ 10%' })[1];
    fireEvent.click(highGoal);
    fireEvent.click(highGoal);
    fireEvent.click(highGoal);
    expect(screen.getByText('100%')).toBeInTheDocument();
  });
});
