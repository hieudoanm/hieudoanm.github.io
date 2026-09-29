import { fireEvent, render, screen } from '@testing-library/react';
import { BudgetLineGame } from '../index';

const pickCobb = () => {
  fireEvent.change(screen.getByTestId('preset'), {
    target: { value: 'cobb-douglas' },
  });
};

describe('BudgetLineGame', () => {
  it('renders budget sliders and bundle inputs', () => {
    render(<BudgetLineGame />);
    expect(screen.getByTestId('income')).toBeInTheDocument();
    expect(screen.getByTestId('px')).toBeInTheDocument();
    expect(screen.getByTestId('py')).toBeInTheDocument();
    expect(screen.getByTestId('qx')).toBeInTheDocument();
    expect(screen.getByTestId('qy')).toBeInTheDocument();
    expect(screen.getByTestId('utility-value')).toBeInTheDocument();
  });

  it('moves the bundle along the budget line as qx changes', () => {
    render(<BudgetLineGame />);
    pickCobb();
    fireEvent.change(screen.getByTestId('qx'), { target: { value: '25' } });
    expect(screen.getByTestId('qy')).toHaveValue(12.5);
  });

  it('judges the optimal bundle as a success', () => {
    render(<BudgetLineGame />);
    pickCobb();
    fireEvent.change(screen.getByTestId('qx'), { target: { value: '25' } });
    fireEvent.click(screen.getByTestId('optimize'));
    expect(screen.getByTestId('feedback')).toHaveTextContent(
      /Optimal bundle reached/
    );
  });

  it('flags a poor bundle as not optimal', () => {
    render(<BudgetLineGame />);
    pickCobb();
    fireEvent.change(screen.getByTestId('qx'), { target: { value: '0' } });
    fireEvent.click(screen.getByTestId('optimize'));
    expect(screen.getByTestId('feedback')).toHaveTextContent(/Not quite yet/);
  });

  it('resets from the feedback panel', () => {
    render(<BudgetLineGame />);
    pickCobb();
    fireEvent.change(screen.getByTestId('qx'), { target: { value: '25' } });
    fireEvent.click(screen.getByTestId('optimize'));
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.queryByTestId('feedback')).toBeNull();
    expect(screen.getByText('No attempts yet.')).toBeInTheDocument();
  });
});
