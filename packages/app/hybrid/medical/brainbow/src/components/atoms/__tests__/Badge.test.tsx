import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/atoms/Badge';

describe('Badge', () => {
  it('renders its label', () => {
    render(<Badge variant="success">PNG</Badge>);
    expect(screen.getByText('PNG')).toHaveClass('badge-success');
  });
});
