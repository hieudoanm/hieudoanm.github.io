import { fireEvent, render, screen } from '@testing-library/react';
import { SizePicker } from '../SizePicker';

describe('SizePicker', () => {
  it('renders all size options', () => {
    render(<SizePicker sizes={['S', 'M', 'L']} />);
    expect(screen.getByRole('button', { name: 'S' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'M' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'L' })).toBeInTheDocument();
  });

  it('preselects the default size', () => {
    render(<SizePicker sizes={['S', 'M', 'L']} defaultSelected="M" />);
    expect(screen.getByRole('button', { name: 'M' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'M' })).toHaveClass(
      'btn-primary'
    );
  });

  it('selects a size on click and fires onSelect', () => {
    const onSelect = jest.fn();
    render(<SizePicker sizes={['S', 'M', 'L']} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button', { name: 'L' }));
    expect(onSelect).toHaveBeenCalledWith('L');
    expect(screen.getByRole('button', { name: 'L' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'S' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });
});
