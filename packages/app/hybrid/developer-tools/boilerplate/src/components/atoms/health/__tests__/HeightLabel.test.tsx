import { render, screen } from '@testing-library/react';
import { HeightLabel } from '../HeightLabel';

describe('HeightLabel', () => {
  it('renders the height with the default unit', () => {
    render(<HeightLabel height={175} />);
    expect(screen.getByTestId('height-label')).toHaveTextContent('175');
    expect(screen.getByTestId('height-label')).toHaveTextContent('cm');
  });

  it('renders the label text', () => {
    render(<HeightLabel height={68} unit="in" />);
    expect(screen.getByText('Height')).toBeInTheDocument();
  });

  it('honors a custom unit', () => {
    render(<HeightLabel height={68} unit="in" />);
    expect(screen.getByTestId('height-label')).toHaveTextContent('in');
  });
});
