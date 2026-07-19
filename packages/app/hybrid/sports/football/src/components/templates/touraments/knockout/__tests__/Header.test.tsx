import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

describe('Header', () => {
  it('renders tournament year and label', () => {
    render(<Header year={2014} tournament="world-cup" />);
    expect(screen.getByText('Knockout Bracket')).toBeInTheDocument();
    expect(screen.getByText(/2014/)).toBeInTheDocument();
  });
});
