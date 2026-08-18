import { fireEvent, render, screen } from '@testing-library/react';
import { ContrastChecker } from '../ContrastChecker';

describe('ContrastChecker', () => {
  it('shows the black on white ratio and passes every level', () => {
    render(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByText('21.00:1')).toBeInTheDocument();
    expect(screen.getAllByText('Pass')).toHaveLength(4);
    expect(screen.queryByText('Fail')).not.toBeInTheDocument();
  });

  it('passes only large text when the contrast drops', () => {
    render(<ContrastChecker baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Background hex value'), {
      target: { value: '#ffffff' },
    });
    fireEvent.blur(screen.getByLabelText('Background hex value'));
    expect(screen.getByText('3.97:1')).toBeInTheDocument();
    expect(screen.getByText('AA Large text')).toBeInTheDocument();
    expect(screen.getAllByText('Pass')).toHaveLength(1);
    expect(screen.getAllByText('Fail')).toHaveLength(3);
  });

  it('updates the foreground via its color picker', () => {
    render(<ContrastChecker baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Foreground color picker'), {
      target: { value: '#ffffff' },
    });
    expect(screen.getByText('21.00:1')).toBeInTheDocument();
  });

  it('keeps the preview colors in sync with the fields', () => {
    render(<ContrastChecker baseColor="#ff0030" />);
    fireEvent.change(screen.getByLabelText('Foreground hex value'), {
      target: { value: '#ffffff' },
    });
    fireEvent.blur(screen.getByLabelText('Foreground hex value'));
    expect(screen.getByLabelText('Foreground hex value')).toHaveValue(
      '#ffffff'
    );
  });

  it('follows a new base color via its effect', () => {
    const { rerender } = render(<ContrastChecker baseColor="#ff0030" />);
    rerender(<ContrastChecker baseColor="#ffffff" />);
    expect(screen.getByLabelText('Foreground hex value')).toHaveValue(
      '#ffffff'
    );
  });
});
