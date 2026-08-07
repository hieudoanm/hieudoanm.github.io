import { fireEvent, render, screen } from '@testing-library/react';
import { InputGroup } from '../InputGroup';

describe('InputGroup', () => {
  it('renders label, leading, input, and trailing', () => {
    render(
      <InputGroup
        label="Amount"
        value="100"
        onChange={jest.fn()}
        leading={<span>$</span>}
        trailing={<span>USD</span>}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('100');
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<InputGroup value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith('42');
  });

  it('shows error or hint', () => {
    const { rerender } = render(
      <InputGroup value="" onChange={jest.fn()} hint="No fees" />
    );
    expect(screen.getByText('No fees')).toBeInTheDocument();
    rerender(<InputGroup value="" onChange={jest.fn()} error="Invalid" />);
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('No fees')).not.toBeInTheDocument();
  });
});
