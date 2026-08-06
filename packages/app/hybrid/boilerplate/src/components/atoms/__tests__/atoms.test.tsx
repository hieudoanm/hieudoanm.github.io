import { render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Separator } from '../Separator';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import { TextField } from '../TextField';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.png" alt="Jane Doe" />);
    const img = screen.getByRole('img', { name: 'Jane Doe' });
    expect(img).toHaveAttribute('src', '/avatar.png');
  });

  it('renders initials from alt when no src', () => {
    render(<Avatar alt="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders fallback initials when provided', () => {
    render(<Avatar alt="Jane Doe" fallback="X" />);
    expect(screen.getByText('X')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Avatar size="sm" alt="A B" />);
    expect(screen.getByText('AB').parentElement).toHaveClass('w-8');
    rerender(<Avatar size="lg" alt="A B" />);
    expect(screen.getByText('AB').parentElement).toHaveClass('w-16');
  });
});

describe('Badge', () => {
  it('renders children with default neutral variant', () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText('New');
    expect(badge).toHaveClass('badge', 'badge-neutral');
  });

  it('applies variant and outline classes', () => {
    render(
      <Badge variant="success" outline>
        Done
      </Badge>
    );
    expect(screen.getByText('Done')).toHaveClass(
      'badge-success',
      'badge-outline'
    );
  });

  it.each(['primary', 'secondary', 'accent', 'warning', 'error', 'info'])(
    'supports %s variant',
    (variant) => {
      render(<Badge variant={variant as 'primary'}>{variant}</Badge>);
      expect(screen.getByText(variant)).toHaveClass(`badge-${variant}`);
    }
  );
});

describe('Separator', () => {
  it('renders an hr with default and custom classes', () => {
    const { container, rerender } = render(<Separator />);
    expect(container.querySelector('hr')).toHaveClass('border-base-content/20');
    rerender(<Separator className="my-8" />);
    expect(container.querySelector('hr')).toHaveClass('my-8');
  });
});

describe('Skeleton', () => {
  it('renders a skeleton placeholder with className', () => {
    const { container } = render(<Skeleton className="h-20" />);
    expect(container.querySelector('.skeleton')).toHaveClass('h-20');
  });
});

describe('Spinner', () => {
  it('renders spinner with default size', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { container, rerender } = render(<Spinner size="sm" />);
    expect(container.querySelector('.loading-sm')).toBeInTheDocument();
    rerender(<Spinner size="lg" />);
    expect(container.querySelector('.loading-lg')).toBeInTheDocument();
  });
});

describe('TextField', () => {
  it('renders label, input, and derived id', () => {
    render(<TextField label="Email address" />);
    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('id', 'email-address');
    expect(input).toHaveClass('input-bordered');
  });

  it('uses provided id', () => {
    render(<TextField label="Email" id="custom-id" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('id', 'custom-id');
  });

  it('shows error message and error class', () => {
    render(<TextField label="Email" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toHaveClass('input-error');
  });

  it('forwards input attributes', () => {
    render(<TextField label="Email" type="email" placeholder="you@x.com" />);
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'you@x.com');
  });
});
