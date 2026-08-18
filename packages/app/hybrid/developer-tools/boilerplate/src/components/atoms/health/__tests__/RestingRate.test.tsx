import { render, screen } from '@testing-library/react';
import { RestingRate } from '../RestingRate';

describe('RestingRate', () => {
  it('renders the resting bpm value', () => {
    render(<RestingRate bpm={62} />);
    expect(screen.getByTestId('resting-rate')).toHaveTextContent('62');
    expect(screen.getByTestId('resting-rate')).toHaveTextContent('bpm');
  });

  it('renders the label text', () => {
    render(<RestingRate bpm={62} />);
    expect(screen.getByText('Resting Rate')).toBeInTheDocument();
  });
});
