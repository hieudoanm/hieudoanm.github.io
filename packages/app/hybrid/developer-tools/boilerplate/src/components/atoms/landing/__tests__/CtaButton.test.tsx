import { fireEvent, render, screen } from '@testing-library/react';
import { CtaButton } from '../CtaButton';

describe('CtaButton', () => {
  it('renders the label', () => {
    render(<CtaButton label="Get started" />);
    expect(
      screen.getByRole('button', { name: 'Get started' })
    ).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<CtaButton label="Sign up" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign up' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies the variant class', () => {
    render(<CtaButton label="Learn more" variant="outline" />);
    expect(screen.getByRole('button', { name: 'Learn more' })).toHaveClass(
      'btn-outline'
    );
  });

  it('disables the button', () => {
    render(<CtaButton label="Buy" disabled />);
    expect(screen.getByRole('button', { name: 'Buy' })).toBeDisabled();
  });
});
