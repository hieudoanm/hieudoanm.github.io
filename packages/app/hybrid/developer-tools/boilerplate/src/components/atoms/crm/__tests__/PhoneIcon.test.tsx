import { render, screen } from '@testing-library/react';
import { PhoneIcon } from '../PhoneIcon';

describe('PhoneIcon', () => {
  it('renders an accessible svg icon', () => {
    render(<PhoneIcon />);
    expect(screen.getByTestId('phone-icon')).toBeInTheDocument();
    expect(screen.getByTestId('phone-icon')).toHaveAttribute('aria-hidden');
  });

  it('applies the size prop as width and height', () => {
    render(<PhoneIcon size={32} />);
    expect(screen.getByTestId('phone-icon')).toHaveAttribute('width', '32');
    expect(screen.getByTestId('phone-icon')).toHaveAttribute('height', '32');
  });

  it('uses the default size when none is given', () => {
    render(<PhoneIcon />);
    expect(screen.getByTestId('phone-icon')).toHaveAttribute('width', '20');
  });
});
