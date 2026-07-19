import { render, screen } from '@testing-library/react';
import { TextField } from '../TextField';

describe('TextField', () => {
  it('renders label, input, and derived id', () => {
    render(<TextField label="Email address" />);
    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('id', 'email-address');
    expect(input).toHaveClass('input-bordered');
  });

  it('uses provided id', () => {
    render(<TextField label="Email" id="custom-id" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'custom-id');
  });

  it('shows error message and error class', () => {
    render(<TextField label="Email" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveClass('input-error');
  });

  it('forwards input attributes', () => {
    render(<TextField label="Email" type="email" placeholder="you@x.com" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@x.com');
  });
});
