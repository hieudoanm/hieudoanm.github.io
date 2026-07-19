import { fireEvent, render, screen } from '@testing-library/react';
import { BranchManager } from '../BranchManager';

const branches = [
  { id: 'main', name: 'main', ahead: 2, behind: 1, updated: '2h ago' },
  { id: 'feature', name: 'feature/login', updated: '1d ago' },
];

describe('BranchManager', () => {
  it('renders branches with ahead/behind badges', () => {
    render(<BranchManager branches={branches} />);
    expect(screen.getByText('main')).toBeInTheDocument();
    expect(screen.getByText('feature/login')).toBeInTheDocument();
    expect(screen.getByText('↑2')).toBeInTheDocument();
    expect(screen.getByText('↓1')).toBeInTheDocument();
  });

  it('selects a branch on click and fires onCheckout', () => {
    const onCheckout = jest.fn();
    render(<BranchManager branches={branches} onCheckout={onCheckout} />);
    fireEvent.click(screen.getAllByTestId('branch-item')[1]);
    fireEvent.click(screen.getByTestId('branch-checkout'));
    expect(onCheckout).toHaveBeenCalledWith('feature');
  });
});
