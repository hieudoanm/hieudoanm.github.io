import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';

describe('Button', () => {
  it('renders children and handles clicks', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Import study</Button>);
    fireEvent.click(screen.getByText('Import study'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant and size classes', () => {
    render(
      <Button variant="outline" size="lg">
        Styled
      </Button>
    );
    const button = screen.getByText('Styled');
    expect(button).toHaveClass('btn', 'btn-outline', 'btn-lg');
  });

  it('defaults to type button', () => {
    render(<Button>Default</Button>);
    expect(screen.getByText('Default')).toHaveAttribute('type', 'button');
  });
});

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
