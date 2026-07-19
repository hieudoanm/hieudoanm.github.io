import { render, screen } from '@testing-library/react';
import { Validator } from '../Validator';

describe('Validator', () => {
  it('adds the validator class to the child input', () => {
    render(
      <Validator hint="Enter a value">
        <input aria-label="name" />
      </Validator>
    );
    expect(screen.getByLabelText('name')).toHaveClass('validator');
  });

  it('shows the hint text', () => {
    render(
      <Validator hint="Enter a value">
        <input aria-label="name" />
      </Validator>
    );
    expect(screen.getByText('Enter a value')).toBeInTheDocument();
  });

  it('flags invalid state when an error is provided', () => {
    render(
      <Validator hint="Enter a value" error="Required">
        <input aria-label="name" />
      </Validator>
    );
    expect(screen.getByLabelText('name')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.queryByText('Enter a value')).not.toBeInTheDocument();
  });

  it('leaves non-input children untouched', () => {
    render(
      <Validator hint="Pick one">
        <textarea aria-label="bio" />
      </Validator>
    );
    expect(screen.getByLabelText('bio')).not.toHaveClass('validator');
  });
});
