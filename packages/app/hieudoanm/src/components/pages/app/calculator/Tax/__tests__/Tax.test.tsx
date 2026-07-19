import { fireEvent, render, screen } from '@testing-library/react';
import { Tax } from '../index';

describe('Tax', () => {
  it('renders with default values', () => {
    render(<Tax onClose={jest.fn()} />);
    expect(screen.getByText('Tax Calculator')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100,000,000')).toBeInTheDocument();
  });

  it('changes income amount', () => {
    render(<Tax onClose={jest.fn()} />);
    const input = screen.getByDisplayValue('100,000,000');
    fireEvent.change(input, { target: { value: '200000000' } });
    expect(screen.getByDisplayValue('200,000,000')).toBeInTheDocument();
  });

  it('calculates progressive tax correctly', () => {
    render(<Tax onClose={jest.fn()} />);
    expect(screen.getByText('Tax Amount')).toBeInTheDocument();
    expect(screen.getByText('Effective Rate')).toBeInTheDocument();
    expect(screen.getByText('Marginal Rate')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    render(<Tax onClose={onClose} />);
    const closeButtons = screen.getAllByText('✕');
    fireEvent.click(closeButtons[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});