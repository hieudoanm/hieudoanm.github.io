import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { Artboard } from '../Artboard';
import { AspectRatio } from '../AspectRatio';
import { Avatar } from '../Avatar';
import { Badge } from '../Badge';
import { BrowserMockup } from '../BrowserMockup';
import { Button } from '../Button';
import { ButtonLink } from '../ButtonLink';
import { Checkbox } from '../Checkbox';
import { Clock } from '../Clock';
import { CodeBlock } from '../CodeBlock';
import { Collapse } from '../Collapse';
import { CopyButton } from '../CopyButton';
import { Countdown } from '../Countdown';
import { Cube } from '../Cube';
import { Divider } from '../Divider';
import { Dock } from '../Dock';
import { EditableText } from '../EditableText';
import { EmptyPlaceholder } from '../EmptyPlaceholder';
import { FileInput } from '../FileInput';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import { Indicator } from '../Indicator';
import { Kbd } from '../Kbd';
import { Label } from '../Label';
import { LetterAvatar } from '../LetterAvatar';
import { LinkButton } from '../LinkButton';
import { Mask } from '../Mask';
import { MiniMap } from '../MiniMap';
import { NumberField } from '../NumberField';
import { OTPInput } from '../OTPInput';
import { PasswordField } from '../PasswordField';
import { PhoneMockup } from '../PhoneMockup';
import { Progress } from '../Progress';
import { ProgressRing } from '../ProgressRing';
import { Radio } from '../Radio';
import { Rating } from '../Rating';
import { Select } from '../Select';
import { Separator } from '../Separator';
import { Skeleton } from '../Skeleton';
import { Slider } from '../Slider';
import { Spinner } from '../Spinner';
import { Stack } from '../Stack';
import { StatusDot } from '../StatusDot';
import { Swap } from '../Swap';
import { Switch } from '../Switch';
import { Tag } from '../Tag';
import { TagCloud } from '../TagCloud';
import { Text } from '../Text';
import { Textarea } from '../Textarea';
import { TextField } from '../TextField';
import { Tooltip } from '../Tooltip';
import { WindowMockup } from '../WindowMockup';

jest.mock('next/link', () => {
  return ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );
});

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

describe('Radio', () => {
  it('renders radio with label and checked state', () => {
    render(
      <Radio label="Option A" name="group" checked onChange={jest.fn()} />
    );
    const radio = screen.getByRole('radio', { name: 'Option A' });
    expect(radio).toBeChecked();
    expect(radio).toHaveClass('radio-primary');
  });

  it('calls onChange with next value', () => {
    const onChange = jest.fn();
    render(
      <Radio
        label="Option A"
        name="group"
        checked={false}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Option A' }));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('applies size classes and disables', () => {
    const { rerender } = render(
      <Radio label="A" name="g" checked onChange={jest.fn()} size="sm" />
    );
    expect(screen.getByRole('radio', { name: 'A' })).toHaveClass('radio-sm');
    rerender(
      <Radio
        label="A"
        name="g"
        checked
        disabled
        onChange={jest.fn()}
        size="lg"
      />
    );
    expect(screen.getByRole('radio', { name: 'A' })).toHaveClass('radio-lg');
    expect(screen.getByRole('radio', { name: 'A' })).toBeDisabled();
  });
});

describe('Select', () => {
  const options = [
    { label: 'Apples', value: 'apples' },
    { label: 'Oranges', value: 'oranges' },
  ];

  it('renders label and options', () => {
    render(
      <Select label="Fruit" value="" onChange={jest.fn()} options={options} />
    );
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Apples' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Oranges' })).toBeInTheDocument();
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(
      <Select
        label="Fruit"
        value="apples"
        onChange={onChange}
        options={options}
      />
    );
    fireEvent.change(screen.getByLabelText('Fruit'), {
      target: { value: 'oranges' },
    });
    expect(onChange).toHaveBeenCalledWith('oranges');
  });

  it('renders placeholder and applies size class', () => {
    const { rerender } = render(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        placeholder="Pick one"
      />
    );
    expect(
      screen.getByRole('option', { name: 'Pick one' })
    ).toBeInTheDocument();
    rerender(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        size="sm"
      />
    );
    expect(screen.getByLabelText('Fruit')).toHaveClass('select-sm');
  });

  it('disables when disabled', () => {
    render(
      <Select
        label="Fruit"
        value=""
        onChange={jest.fn()}
        options={options}
        disabled
      />
    );
    expect(screen.getByLabelText('Fruit')).toBeDisabled();
  });
});

describe('Slider', () => {
  it('renders a range input with label and defaults', () => {
    render(<Slider label="Volume" value={50} onChange={jest.fn()} />);
    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
    expect(slider).toHaveAttribute('value', '50');
  });

  it('calls onChange with numeric value', () => {
    const onChange = jest.fn();
    render(<Slider label="Volume" value={50} onChange={onChange} />);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '80' } });
    expect(onChange).toHaveBeenCalledWith(80);
  });

  it('shows value and respects custom bounds', () => {
    render(
      <Slider
        label="Volume"
        value={5}
        onChange={jest.fn()}
        min={0}
        max={10}
        step={1}
        showValue
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toHaveAttribute('max', '10');
  });

  it('disables when disabled', () => {
    render(<Slider label="Volume" value={50} onChange={jest.fn()} disabled />);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});

describe('Tag', () => {
  it('renders label with default variant', () => {
    render(<Tag label="React" />);
    expect(screen.getByText('React')).toHaveClass('badge-neutral');
  });

  it('applies variant class', () => {
    render(<Tag label="React" variant="primary" />);
    expect(screen.getByText('React')).toHaveClass('badge-primary');
  });

  it('renders remove button and calls onRemove', () => {
    const onRemove = jest.fn();
    render(<Tag label="React" onRemove={onRemove} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove React tag' }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});

describe('Kbd', () => {
  it('renders keyboard key text', () => {
    const { container } = render(<Kbd>Ctrl</Kbd>);
    expect(container.querySelector('kbd')).toHaveTextContent('Ctrl');
  });
});

describe('CodeBlock', () => {
  it('renders code and language title', () => {
    render(<CodeBlock code="const x = 1;" language="ts" />);
    expect(screen.getByText('ts')).toBeInTheDocument();
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('renders custom title', () => {
    render(<CodeBlock code="x" title="Example.ts" />);
    expect(screen.getByText('Example.ts')).toBeInTheDocument();
  });

  it('copies code when copy button is clicked', () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CodeBlock code="const x = 1;" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    expect(writeText).toHaveBeenCalledWith('const x = 1;');
  });

  it('hides copy button when showCopy is false', () => {
    render(<CodeBlock code="x" showCopy={false} />);
    expect(
      screen.queryByRole('button', { name: 'Copy code' })
    ).not.toBeInTheDocument();
  });
});

describe('FileInput', () => {
  it('renders label and file input', () => {
    render(<FileInput label="Avatar" />);
    expect(screen.getByLabelText('Avatar')).toBeInTheDocument();
    expect(screen.getByLabelText('Avatar')).toHaveAttribute('type', 'file');
  });

  it('calls onChange with files', () => {
    const onChange = jest.fn();
    render(<FileInput label="Avatar" onChange={onChange} />);
    const input = screen.getByLabelText('Avatar');
    fireEvent.change(input, {
      target: { files: [new File(['x'], 'x.png')] },
    });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('renders hint and applies multiple/accept', () => {
    render(<FileInput label="Docs" hint="PDF only" accept=".pdf" multiple />);
    expect(screen.getByText('PDF only')).toBeInTheDocument();
    expect(screen.getByLabelText('Docs')).toHaveAttribute('accept', '.pdf');
    expect(screen.getByLabelText('Docs')).toHaveAttribute('multiple');
  });
});

describe('PasswordField', () => {
  it('renders a password input with label', () => {
    render(
      <PasswordField label="Password" value="secret" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveValue('secret');
  });

  it('toggles visibility with the show button', () => {
    render(
      <PasswordField label="Password" value="secret" onChange={jest.fn()} />
    );
    const input = screen.getByLabelText('Password');
    fireEvent.click(screen.getByRole('button', { name: 'Show Password' }));
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(screen.getByRole('button', { name: 'Hide Password' }));
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<PasswordField label="Password" value="" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'hunter2' },
    });
    expect(onChange).toHaveBeenCalledWith('hunter2');
  });

  it('shows error and disables toggle', () => {
    render(
      <PasswordField
        label="Password"
        value="x"
        onChange={jest.fn()}
        error="Too short"
        disabled
      />
    );
    expect(screen.getByText('Too short')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Show Password' })
    ).toBeDisabled();
    expect(screen.getByLabelText('Password')).toBeDisabled();
  });
});

describe('CopyButton', () => {
  it('copies text on click and calls onCopy', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    const onCopy = jest.fn();
    render(<CopyButton text="npm i x" label="Copy command" onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy command' }));
    expect(writeText).toHaveBeenCalledWith('npm i x');
    await waitFor(() => expect(onCopy).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Copied')).toBeInTheDocument();
  });

  it('does not call onCopy when clipboard fails', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
    });
    const onCopy = jest.fn();
    render(<CopyButton text="x" onCopy={onCopy} />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    await waitFor(() => expect(onCopy).not.toHaveBeenCalled());
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });
});

describe('NumberField', () => {
  it('renders label and value', () => {
    render(<NumberField label="Quantity" value={2} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Quantity')).toHaveValue(2);
  });

  it('increments and decrements via buttons', () => {
    const onChange = jest.fn();
    render(<NumberField label="Quantity" value={2} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Increase Quantity' }));
    expect(onChange).toHaveBeenCalledWith(3);
    fireEvent.click(screen.getByRole('button', { name: 'Decrease Quantity' }));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('clamps to min and max', () => {
    const onChange = jest.fn();
    render(
      <NumberField label="Qty" value={5} min={0} max={5} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Increase Qty' }));
    expect(onChange).toHaveBeenCalledWith(5);
    fireEvent.change(screen.getByLabelText('Qty'), { target: { value: '3' } });
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('disables buttons and input when disabled', () => {
    render(<NumberField label="Qty" value={1} onChange={jest.fn()} disabled />);
    expect(screen.getByLabelText('Qty')).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Increase Qty' })).toBeDisabled();
  });
});

describe('IconButton', () => {
  it('renders a round button with aria-label and icon', () => {
    const { container } = render(
      <IconButton icon={<span>+</span>} label="Add" />
    );
    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toHaveClass('btn-circle', 'btn-primary');
    expect(button.textContent).toBe('+');
    expect(container.querySelector('span')).toHaveTextContent('+');
  });

  it('applies variant and size classes', () => {
    const { rerender } = render(
      <IconButton icon={<span>x</span>} label="x" variant="ghost" size="sm" />
    );
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass(
      'btn-ghost',
      'btn-sm'
    );
    rerender(<IconButton icon={<span>x</span>} label="x" size="lg" />);
    expect(screen.getByRole('button', { name: 'x' })).toHaveClass('btn-lg');
  });

  it('calls onClick and disables when disabled', () => {
    const onClick = jest.fn();
    render(
      <IconButton icon={<span>x</span>} label="x" onClick={onClick} disabled />
    );
    expect(screen.getByRole('button', { name: 'x' })).toBeDisabled();
    fireEvent.click(screen.getByRole('button', { name: 'x' }));
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe('Divider', () => {
  it('renders a divider with label', () => {
    const { container } = render(<Divider label="OR" />);
    expect(container.querySelector('.divider')).toHaveTextContent('OR');
  });

  it('applies custom className', () => {
    const { container } = render(<Divider className="my-4" />);
    expect(container.querySelector('.divider')).toHaveClass('my-4');
  });
});

describe('Indicator', () => {
  it('renders badge and children', () => {
    render(
      <Indicator badge="3">
        <button>Inbox</button>
      </Indicator>
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Inbox' })).toBeInTheDocument();
  });

  it('applies position class', () => {
    const { container } = render(
      <Indicator badge="3" position="bottom-start">
        <button>Inbox</button>
      </Indicator>
    );
    expect(container.querySelector('.indicator-item')).toHaveClass(
      'indicator-bottom',
      'indicator-start'
    );
  });
});

describe('Swap', () => {
  it('shows active state class when on', () => {
    const { container } = render(
      <Swap
        first={<span>Sun</span>}
        second={<span>Moon</span>}
        on
        onToggle={jest.fn()}
      />
    );
    expect(container.querySelector('.swap')).toHaveClass('swap-active');
  });

  it('calls onToggle with next value', () => {
    const onToggle = jest.fn();
    render(
      <Swap
        first={<span>Sun</span>}
        second={<span>Moon</span>}
        on={false}
        onToggle={onToggle}
      />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'Toggle' }));
    expect(onToggle).toHaveBeenCalledWith(true);
  });

  it('uses custom aria-label', () => {
    render(
      <Swap
        first={<span>A</span>}
        second={<span>B</span>}
        on={false}
        ariaLabel="Theme"
        onToggle={jest.fn()}
      />
    );
    expect(screen.getByRole('checkbox', { name: 'Theme' })).toBeInTheDocument();
  });
});

describe('Countdown', () => {
  it('pads the value to the requested digits', () => {
    const { container } = render(<Countdown value={7} />);
    expect(container.querySelector('.countdown')).toHaveTextContent('07');
  });

  it('renders values above minDigits unpadded', () => {
    render(<Countdown value={123} minDigits={2} />);
    expect(screen.getByText('123')).toBeInTheDocument();
  });

  it('clamps negative values to zero', () => {
    render(<Countdown value={-3} />);
    expect(screen.getByText('00')).toBeInTheDocument();
  });
});

describe('Mask', () => {
  it('renders an image with the shape class', () => {
    const { container } = render(
      <Mask src="/x.png" alt="Logo" shape="hexagon" />
    );
    const img = screen.getByRole('img', { name: 'Logo' });
    expect(img).toHaveAttribute('src', '/x.png');
    expect(img).toHaveClass('mask-hexagon');
    expect(container.querySelector('img')).toHaveClass('mask');
  });

  it('defaults to squircle', () => {
    render(<Mask src="/x.png" alt="Logo" />);
    expect(screen.getByRole('img', { name: 'Logo' })).toHaveClass(
      'mask-squircle'
    );
  });
});

describe('Stack', () => {
  it('renders all items', () => {
    render(
      <Stack items={[<span key="1">One</span>, <span key="2">Two</span>]} />
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('One').closest('.stack')).toBeInTheDocument();
  });

  it('applies horizontal direction class', () => {
    const { container } = render(
      <Stack items={[<span key="1">A</span>]} direction="horizontal" />
    );
    expect(container.querySelector('.stack')).toHaveClass('stack-horizontal');
  });
});

describe('Text', () => {
  it('renders a paragraph by default', () => {
    render(<Text>Hello</Text>);
    expect(screen.getByText('Hello').tagName).toBe('P');
  });

  it('renders with the requested tag and classes', () => {
    render(
      <Text as="span" size="sm" weight="semibold" color="muted">
        Label
      </Text>
    );
    const el = screen.getByText('Label');
    expect(el.tagName).toBe('SPAN');
    expect(el).toHaveClass('text-sm', 'font-semibold', 'text-base-content/60');
  });

  it('applies primary color class', () => {
    render(<Text color="primary">Hi</Text>);
    expect(screen.getByText('Hi')).toHaveClass('text-primary');
  });
});

describe('ButtonLink', () => {
  it('renders a link with button classes and href', () => {
    render(
      <ButtonLink href="/signup" variant="outline" size="sm">
        Sign up
      </ButtonLink>
    );
    const link = screen.getByRole('link', { name: 'Sign up' });
    expect(link).toHaveAttribute('href', '/signup');
    expect(link).toHaveClass('btn', 'btn-outline', 'btn-sm');
  });
});

describe('OTPInput', () => {
  it('renders the expected number of digit boxes', () => {
    render(<OTPInput value="12" onChange={jest.fn()} length={4} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'One-time code' })
    ).toBeInTheDocument();
  });

  it('filters non-digits and calls onChange', () => {
    const onChange = jest.fn();
    render(<OTPInput value="" onChange={onChange} length={6} />);
    const input = screen.getByRole('textbox', { name: 'One-time code' });
    fireEvent.change(input, { target: { value: 'a1b2c3d4' } });
    expect(onChange).toHaveBeenCalledWith('1234');
  });

  it('uses the label as accessible name', () => {
    render(
      <OTPInput label="Verification code" value="" onChange={jest.fn()} />
    );
    expect(
      screen.getByRole('textbox', { name: 'Verification code' })
    ).toBeInTheDocument();
  });
});

describe('Collapse', () => {
  it('renders title and children', () => {
    render(<Collapse title="How to install?">Run pnpm install.</Collapse>);
    expect(screen.getByText('How to install?')).toBeInTheDocument();
    expect(screen.getByText('Run pnpm install.')).toBeInTheDocument();
  });

  it('reflects the open state and calls onChange', () => {
    const onChange = jest.fn();
    render(
      <Collapse title="Details" open onChange={onChange}>
        Body
      </Collapse>
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Details' });
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});

describe('ProgressRing', () => {
  it('renders a progressbar with the clamped value', () => {
    render(<ProgressRing value={42} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('clamps out-of-range values', () => {
    const { rerender } = render(<ProgressRing value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100'
    );
    rerender(<ProgressRing value={-5} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '0'
    );
  });

  it('shows the percentage when requested', () => {
    render(<ProgressRing value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});

describe('AspectRatio', () => {
  it('renders children inside a ratio box', () => {
    const { container } = render(
      <AspectRatio>
        <img src="/thumb.png" alt="Thumbnail" />
      </AspectRatio>
    );
    expect(screen.getByAltText('Thumbnail')).toBeInTheDocument();
    expect(
      container.querySelector('.relative')?.getAttribute('style')
    ).toContain('aspect-ratio');
  });

  it('applies a custom ratio', () => {
    const { container } = render(<AspectRatio ratio={1}>Square</AspectRatio>);
    expect(container.firstElementChild?.getAttribute('style')).toContain(
      'aspect-ratio: 1'
    );
  });
});

describe('Artboard', () => {
  it('renders a phone artboard with the default size', () => {
    render(<Artboard>Hello</Artboard>);
    expect(screen.getByRole('group')).toHaveClass(
      'artboard',
      'artboard-demo',
      'phone-1'
    );
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies a custom size and uses the title as the accessible name', () => {
    render(
      <Artboard size="phone-4" title="Frame">
        Hi
      </Artboard>
    );
    expect(screen.getByRole('group', { name: 'Frame' })).toHaveClass('phone-4');
  });
});

describe('BrowserMockup', () => {
  it('renders children and the address bar URL', () => {
    const { container } = render(
      <BrowserMockup url="https://example.com">Page</BrowserMockup>
    );
    expect(screen.getByText('https://example.com')).toBeInTheDocument();
    expect(screen.getByText('Page')).toBeInTheDocument();
    expect(
      container.querySelector('.browser-mockup-top-bar')
    ).toBeInTheDocument();
  });

  it('renders traffic light dots', () => {
    const { container } = render(<BrowserMockup />);
    expect(
      container.querySelectorAll('.bg-error, .bg-warning, .bg-success').length
    ).toBe(3);
  });
});

describe('Label', () => {
  it('renders children', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('passes htmlFor and extra classes', () => {
    const { container } = render(
      <Label htmlFor="email" className="font-bold">
        Email
      </Label>
    );
    expect(container.querySelector('label')).toHaveAttribute('for', 'email');
    expect(container.querySelector('label')).toHaveClass('font-bold');
  });
});

describe('LetterAvatar', () => {
  it('derives two initials from a full name', () => {
    render(<LetterAvatar name="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveTextContent(
      'JD'
    );
  });

  it('uses the first two characters for a single-word name', () => {
    render(<LetterAvatar name="Alex" />);
    expect(screen.getByRole('img', { name: 'Alex' })).toHaveTextContent('AL');
  });

  it('applies color and size classes', () => {
    const { container } = render(
      <LetterAvatar name="Jane Doe" color="accent" size="lg" />
    );
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toHaveClass(
      'bg-accent'
    );
    expect(container.querySelector('.text-2xl')).toBeInTheDocument();
  });
});

describe('PhoneMockup', () => {
  it('renders children and a camera by default', () => {
    const { container } = render(<PhoneMockup>Screen</PhoneMockup>);
    expect(screen.getByText('Screen')).toBeInTheDocument();
    expect(container.querySelector('.camera')).toBeInTheDocument();
  });

  it('hides the camera when disabled', () => {
    const { container } = render(
      <PhoneMockup camera={false}>Screen</PhoneMockup>
    );
    expect(container.querySelector('.camera')).not.toBeInTheDocument();
  });
});

describe('WindowMockup', () => {
  it('renders title and children', () => {
    render(<WindowMockup title="Terminal">Output</WindowMockup>);
    expect(screen.getByText('Terminal')).toBeInTheDocument();
    expect(screen.getByText('Output')).toBeInTheDocument();
  });

  it('renders the top bar without a title', () => {
    const { container } = render(<WindowMockup>Body</WindowMockup>);
    expect(
      container.querySelector('.window-mockup-top-bar')
    ).toBeInTheDocument();
  });
});

describe('Clock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2026, 0, 1, 13, 5, 9));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the time in 24h format with seconds', () => {
    render(<Clock />);
    expect(screen.getByText('13:05:09')).toBeInTheDocument();
  });

  it('hides seconds when disabled', () => {
    render(<Clock showSeconds={false} />);
    expect(screen.getByText('13:05')).toBeInTheDocument();
  });

  it('renders 12h format with AM/PM', () => {
    render(<Clock format="12h" />);
    expect(screen.getByText('01:05:09 PM')).toBeInTheDocument();
  });

  it('updates the displayed time on an interval', () => {
    render(<Clock />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(screen.getByText('13:05:10')).toBeInTheDocument();
  });
});

describe('Cube', () => {
  it('renders a spinning cube with six faces', () => {
    const { container } = render(<Cube />);
    expect(
      screen.getByRole('img', { name: 'Spinning cube' })
    ).toBeInTheDocument();
    expect(container.querySelectorAll('.absolute')).toHaveLength(6);
  });

  it('applies a custom size', () => {
    const { container } = render(<Cube size={128} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe('128px');
    expect(wrapper.style.height).toBe('128px');
  });

  it('applies a custom speed duration', () => {
    const { container } = render(<Cube speed="slow" />);
    const spinner = container.querySelector('.animate-spin') as HTMLElement;
    expect(spinner.style.animationDuration).toBe('8s');
  });
});

describe('Dock', () => {
  const items = [
    { key: 'home', label: 'Home', icon: '🏠', active: true },
    { key: 'mail', label: 'Mail', icon: '✉️' },
  ];

  it('renders items with icons and labels', () => {
    render(<Dock items={items} />);
    expect(
      screen.getByRole('navigation', { name: 'Dock' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mail' })).toBeInTheDocument();
  });

  it('marks the active item as pressed', () => {
    render(<Dock items={items} />);
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Mail' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
  });

  it('calls onClick for an item', () => {
    const onClick = jest.fn();
    render(
      <Dock items={[{ key: 'home', label: 'Home', icon: '🏠', onClick }]} />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Home' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders a custom dock label', () => {
    render(<Dock items={items} label="App launcher" />);
    expect(screen.getByText('App launcher')).toBeInTheDocument();
  });
});

describe('EditableText', () => {
  it('renders the value as editable text', () => {
    render(<EditableText value="Project name" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Project name'
    );
  });

  it('switches to an input and commits on Enter', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('New name');
    expect(
      screen.getByRole('button', { name: 'Edit text' })
    ).toBeInTheDocument();
  });

  it('cancels editing on Escape', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New name' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Old'
    );
  });

  it('commits on blur', () => {
    const onChange = jest.fn();
    render(<EditableText value="Old" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit text' }));
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Blurred' } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith('Blurred');
  });

  it('shows the placeholder when value is empty', () => {
    render(<EditableText value="" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Edit text' })).toHaveTextContent(
      'Click to edit'
    );
  });
});

describe('EmptyPlaceholder', () => {
  it('renders the default title', () => {
    render(<EmptyPlaceholder />);
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('renders icon, title, description, and action', () => {
    render(
      <EmptyPlaceholder
        icon="🗂"
        title="No files"
        description="Drop files to get started."
        action={<button>Add</button>}
      />
    );
    expect(screen.getByText('No files')).toBeInTheDocument();
    expect(screen.getByText('Drop files to get started.')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });
});

describe('LinkButton', () => {
  it('renders a link with the given href', () => {
    render(<LinkButton href="/about">About</LinkButton>);
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about'
    );
  });

  it('applies variant and size classes', () => {
    render(
      <LinkButton href="/about" variant="outline" size="sm">
        About
      </LinkButton>
    );
    expect(screen.getByRole('link', { name: 'About' })).toHaveClass(
      'btn',
      'btn-outline',
      'btn-sm'
    );
  });
});

describe('MiniMap', () => {
  const sections = [
    { id: 'overview', label: 'Overview' },
    { id: 'settings', label: 'Settings' },
    { id: 'billing', label: 'Billing' },
  ];

  it('renders all sections', () => {
    render(<MiniMap sections={sections} active="settings" />);
    expect(screen.getByLabelText('Page overview')).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Billing')).toBeInTheDocument();
  });

  it('marks the active section', () => {
    render(<MiniMap sections={sections} active="settings" />);
    expect(screen.getByText('Settings')).toHaveAttribute(
      'aria-current',
      'location'
    );
    expect(screen.getByText('Overview')).not.toHaveAttribute('aria-current');
  });
});

describe('TagCloud', () => {
  it('renders tags with their labels', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 10 },
          { label: 'typescript', weight: 3 },
        ]}
      />
    );
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('scales font size by weight', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 10 },
          { label: 'typescript', weight: 0 },
        ]}
      />
    );
    const heavy = screen.getByText('react');
    const light = screen.getByText('typescript');
    expect(parseFloat(heavy.style.fontSize)).toBeGreaterThan(
      parseFloat(light.style.fontSize)
    );
  });

  it('returns null when there are no tags', () => {
    const { container } = render(<TagCloud tags={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('handles equal weights without division errors', () => {
    render(
      <TagCloud
        tags={[
          { label: 'react', weight: 5 },
          { label: 'next', weight: 5 },
        ]}
      />
    );
    expect(screen.getByText('react').style.fontSize).toBe(
      screen.getByText('next').style.fontSize
    );
  });
});
