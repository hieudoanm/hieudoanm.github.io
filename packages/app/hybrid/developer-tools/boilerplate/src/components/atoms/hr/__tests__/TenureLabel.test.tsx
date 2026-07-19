import { render, screen } from '@testing-library/react';
import { TenureLabel } from '../TenureLabel';

describe('TenureLabel', () => {
  it('renders years and months', () => {
    render(<TenureLabel years={3} months={4} />);
    expect(screen.getByTestId('tenure-label')).toHaveTextContent(
      '3 years 4 months'
    );
  });

  it('uses singular units for one', () => {
    render(<TenureLabel years={1} />);
    expect(screen.getByTestId('tenure-label')).toHaveTextContent('1 year');
  });

  it('renders a fallback for zero tenure', () => {
    render(<TenureLabel years={0} />);
    expect(screen.getByTestId('tenure-label')).toHaveTextContent('New hire');
  });
});
