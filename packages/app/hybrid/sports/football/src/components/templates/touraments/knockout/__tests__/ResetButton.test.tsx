import { render, screen, fireEvent } from '@testing-library/react';
import { ResetButton } from '../ResetButton';

describe('ResetButton', () => {
  it('renders and calls onReset', () => {
    const onReset = jest.fn();
    render(<ResetButton onReset={onReset} />);
    fireEvent.click(screen.getByText('Reset bracket'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
