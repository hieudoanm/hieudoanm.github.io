import { render, screen } from '@testing-library/react';
import { DestinationTag } from '../DestinationTag';

describe('DestinationTag', () => {
  it('renders the destination name', () => {
    render(<DestinationTag name="Tokyo" />);
    expect(screen.getByTestId('destination-tag')).toHaveTextContent('Tokyo');
  });

  it('renders the city when provided', () => {
    render(<DestinationTag name="Haneda" city="Tokyo" />);
    expect(screen.getByTestId('destination-tag')).toHaveTextContent('(Tokyo)');
  });

  it('omits the city when not provided', () => {
    render(<DestinationTag name="Paris" />);
    expect(screen.getByTestId('destination-tag')).not.toHaveTextContent('(');
  });
});
