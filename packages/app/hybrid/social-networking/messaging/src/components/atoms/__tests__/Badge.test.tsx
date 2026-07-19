import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/atoms/Badge';

describe('Badge', () => {
  it('renders nothing for a zero count', () => {
    const { container } = render(<Badge count={0} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the count', () => {
    render(<Badge count={5} />);
    expect(screen.getByLabelText('5 unread messages')).toHaveTextContent('5');
  });

  it('caps the display at 99+', () => {
    render(<Badge count={150} />);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('uses a neutral variant when muted', () => {
    render(<Badge count={2} muted />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});
