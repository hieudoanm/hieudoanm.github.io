import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Progress } from '../Progress';
import { Rating } from '../Rating';
import { Separator } from '../Separator';
import { Skeleton } from '../Skeleton';
import { Spinner } from '../Spinner';
import { StatusDot } from '../StatusDot';
import { Switch } from '../Switch';
import { Textarea } from '../Textarea';
import { TextField } from '../TextField';
import { Tooltip } from '../Tooltip';

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

describe('Button', () => {
  it('renders children with default variant and size', () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toHaveClass('btn', 'btn-primary');
    expect(button).not.toHaveClass('btn-sm', 'btn-lg');
  });

  it.each(['secondary', 'accent', 'ghost', 'outline', 'link'] as const)(
    'applies %s variant',
    (variant) => {
      render(<Button variant={variant}>{variant}</Button>);
      expect(screen.getByRole('button', { name: variant })).toHaveClass(
        `btn-${variant}`
      );
    }
  );

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">x</Button>);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-sm');
    rerender(<Button size="lg">x</Button>);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-lg');
  });

  it('renders a spinner and disables when loading', () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole('button', { name: 'Save' });
    expect(button).toBeDisabled();
    expect(button.querySelector('.loading-spinner')).toBeInTheDocument();
  });

  it('disables when disabled prop is set', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('calls onClick and forwards type', () => {
    const onClick = jest.fn();
    render(
      <Button onClick={onClick} type="submit">
        Save
      </Button>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Save' })).toHaveAttribute(
      'type',
      'submit'
    );
  });
});

describe('Checkbox', () => {
  it('renders label and checked state', () => {
    render(<Checkbox label="Terms" checked onChange={jest.fn()} />);
    const input = screen.getByRole('checkbox', { name: 'Terms' });
    expect(input).toBeChecked();
  });

  it('calls onChange with next checked value', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Terms" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Terms' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies size classes and disables', () => {
    const { rerender } = render(
      <Checkbox label="Terms" checked onChange={jest.fn()} size="sm" />
    );
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toHaveClass(
      'checkbox-sm'
    );
    rerender(<Checkbox label="Terms" checked disabled onChange={jest.fn()} />);
    expect(screen.getByRole('checkbox', { name: 'Terms' })).toBeDisabled();
  });
});

describe('Icon', () => {
  it.each(['bell', 'home', 'user', 'search', 'star'] as const)(
    'renders %s icon as svg',
    (name) => {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    }
  );

  it('applies size classes', () => {
    const { container, rerender } = render(<Icon name="home" size="sm" />);
    expect(container.querySelector('svg')).toHaveClass('h-4');
    rerender(<Icon name="home" size="lg" />);
    expect(container.querySelector('svg')).toHaveClass('h-6');
  });
});

describe('Progress', () => {
  it('renders a progress element with value and max', () => {
    render(<Progress value={50} max={100} />);
    const bar = screen.getByRole('progressbar', { name: 'Progress' });
    expect(bar).toHaveAttribute('value', '50');
    expect(bar).toHaveAttribute('max', '100');
  });

  it('clamps value into range', () => {
    render(<Progress value={150} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('value', '100');
  });

  it('falls back to 100 when max is invalid', () => {
    render(<Progress value={10} max={0} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('max', '100');
  });

  it('shows label and percentage when requested', () => {
    render(<Progress value={25} label="Disk" showValue />);
    expect(screen.getByText('Disk')).toBeInTheDocument();
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('applies variant and size classes', () => {
    render(<Progress value={10} variant="success" size="sm" />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveClass('progress-success', 'h-1');
  });
});

describe('Rating', () => {
  it('renders read-only stars with filled count', () => {
    render(<Rating value={3} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(3);
    expect(screen.getAllByLabelText(/empty/)).toHaveLength(2);
  });

  it('clamps value to max', () => {
    render(<Rating value={8} max={5} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(5);
  });

  it('calls onChange with star index when interactive', () => {
    const onChange = jest.fn();
    render(<Rating value={2} onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    fireEvent.click(radios[4]);
    expect(onChange).toHaveBeenCalledWith(5);
    expect(radios[0]).toHaveAttribute('aria-checked', 'true');
  });

  it('handles invalid max', () => {
    render(<Rating value={1} max={0} />);
    expect(screen.getAllByLabelText(/filled/)).toHaveLength(1);
  });
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

describe('StatusDot', () => {
  const cases: {
    status: 'online' | 'away' | 'busy' | 'offline';
    className: string;
  }[] = [
    { status: 'online', className: 'bg-success' },
    { status: 'away', className: 'bg-warning' },
    { status: 'busy', className: 'bg-error' },
    { status: 'offline', className: 'bg-base-content/30' },
  ];

  it.each(cases)(
    'renders $status dot with correct class',
    ({ status, className }) => {
      const { container } = render(<StatusDot status={status} />);
      const dot = container.querySelector(`[aria-label="${status} dot"]`);
      expect(dot).toHaveClass(className);
    }
  );

  it('renders optional label', () => {
    render(<StatusDot status="online" label="Online" />);
    expect(screen.getByText('Online')).toBeInTheDocument();
  });
});

describe('Switch', () => {
  it('renders a switch with label and checked state', () => {
    render(<Switch label="Dark mode" checked onChange={jest.fn()} />);
    const input = screen.getByRole('switch', { name: /Dark mode/ });
    expect(input).toBeChecked();
    expect(input).toHaveClass('toggle-primary');
  });

  it('calls onChange when toggled', () => {
    const onChange = jest.fn();
    render(<Switch label="Dark mode" checked={false} onChange={onChange} />);
    fireEvent.click(screen.getByRole('switch', { name: /Dark mode/ }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('shows description and size class', () => {
    render(
      <Switch
        label="Dark mode"
        checked
        onChange={jest.fn()}
        description="Applies after reload"
        size="sm"
      />
    );
    expect(screen.getByText('Applies after reload')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveClass('toggle-sm');
  });

  it('disables when disabled', () => {
    render(<Switch label="Dark mode" checked disabled onChange={jest.fn()} />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });
});

describe('Textarea', () => {
  it('renders label, textarea, and derived id', () => {
    render(<Textarea label="Message" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('id', 'message');
    expect(textarea).toHaveClass('textarea-bordered');
  });

  it('shows error message and class', () => {
    render(<Textarea label="Message" error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toHaveClass('textarea-error');
  });

  it('forwards textarea attributes', () => {
    render(
      <Textarea
        label="Message"
        rows={4}
        placeholder="Type here..."
        maxLength={10}
      />
    );
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('rows', '4');
    expect(textarea).toHaveAttribute('placeholder', 'Type here...');
    expect(textarea).toHaveAttribute('maxlength', '10');
  });

  it('uses provided id', () => {
    render(<Textarea label="Message" id="custom" />);
    expect(screen.getByLabelText('Message')).toHaveAttribute('id', 'custom');
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

describe('Tooltip', () => {
  it('renders content data-tip and children', () => {
    const { container } = render(
      <Tooltip content="Help text">
        <button>Info</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Info' })).toBeInTheDocument();
    expect(
      container.querySelector('[data-tip="Help text"]')
    ).toBeInTheDocument();
  });

  it('applies position class', () => {
    const { container } = render(
      <Tooltip content="x" position="right">
        <button>Info</button>
      </Tooltip>
    );
    expect(container.querySelector('.tooltip-right')).toBeInTheDocument();
  });
});
