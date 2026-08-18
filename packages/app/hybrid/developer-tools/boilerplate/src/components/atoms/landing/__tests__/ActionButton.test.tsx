import { fireEvent, render, screen } from '@testing-library/react';
import { ActionButton } from '../ActionButton';

describe('ActionButton', () => {
  it('renders the label', () => {
    render(<ActionButton label="Save" />);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<ActionButton label="Delete" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies the variant class', () => {
    render(<ActionButton label="Edit" variant="secondary" />);
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveClass(
      'btn-secondary'
    );
  });

  it('disables the button', () => {
    render(<ActionButton label="Submit" disabled />);
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
  });
});
