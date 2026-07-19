import { render, screen } from '@testing-library/react';
import { CustomerSegment } from '../CustomerSegment';

describe('CustomerSegment', () => {
  it('renders name, description and customer count', () => {
    render(
      <CustomerSegment
        name="Enterprise"
        count={42}
        description="Large accounts"
      />
    );
    expect(screen.getByText('Enterprise')).toBeInTheDocument();
    expect(screen.getByText('Large accounts')).toBeInTheDocument();
    expect(screen.getByText('42 customers')).toBeInTheDocument();
  });

  it('renders average order value when provided', () => {
    render(<CustomerSegment name="SMB" count={10} avgOrderValue={1500} />);
    expect(screen.getByText('Avg order: $1,500')).toBeInTheDocument();
  });

  it('applies the color swatch class', () => {
    const { container } = render(
      <CustomerSegment name="SMB" count={10} color="accent" />
    );
    const swatch = container.querySelector('.bg-accent');
    expect(swatch).toBeInTheDocument();
  });
});
