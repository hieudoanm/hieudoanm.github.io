import { render, screen } from '@testing-library/react';
import { Badge } from '@/components/atoms/Badge';

describe('Badge', () => {
  it('renders with the default variant', () => {
    render(<Badge>DICOM</Badge>);
    expect(screen.getByText('DICOM')).toHaveClass('badge', 'badge-neutral');
  });

  it('applies the requested variant', () => {
    render(<Badge variant="success">NIfTI</Badge>);
    expect(screen.getByText('NIfTI')).toHaveClass('badge-success');
  });
});
