import { render, screen } from '@testing-library/react';
import { TempValue } from '../TempValue';

describe('TempValue', () => {
  it('renders the temperature with the default unit', () => {
    render(<TempValue value={36.6} />);
    expect(screen.getByTestId('temp-value')).toHaveTextContent('36.6°');
    expect(screen.getByTestId('temp-value')).toHaveTextContent('C');
  });

  it('honors a custom unit', () => {
    render(<TempValue value={98.6} unit="F" />);
    expect(screen.getByTestId('temp-value')).toHaveTextContent('98.6°');
    expect(screen.getByTestId('temp-value')).toHaveTextContent('F');
  });
});
