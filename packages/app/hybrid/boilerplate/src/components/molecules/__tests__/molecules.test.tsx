import { act, fireEvent, render, screen } from '@testing-library/react';
import { FiTrash, FiUser } from 'react-icons/fi';
import { Accordion } from '../Accordion';
import { Alert } from '../Alert';
import { AvatarGroup } from '../AvatarGroup';
import { Backdrop } from '../Backdrop';
import { Banner } from '../Banner';
import { BottomNavigation } from '../BottomNavigation';
import { Breadcrumbs } from '../Breadcrumbs';
import { ButtonGroup } from '../ButtonGroup';
import { Card } from '../Card';
import { Carousel } from '../Carousel';
import { ChatBubble } from '../ChatBubble';
import { CheckboxGroup } from '../CheckboxGroup';
import { Chip } from '../Chip';
import { ColorPicker } from '../ColorPicker';
import { Combobox } from '../Combobox';
import { ConfirmDialog } from '../ConfirmDialog';
import { ContextMenu } from '../ContextMenu';
import { DangerZone } from '../DangerZone';
import { DatePicker } from '../DatePicker';
import { DateRange } from '../DateRange';
import { Dialog } from '../Dialog';
import { Drawer } from '../Drawer';
import { Dropdown } from '../Dropdown';
import { EmptyState } from '../EmptyState';
import { Fieldset } from '../Fieldset';
import { FileUpload } from '../FileUpload';
import { FilterGroup } from '../FilterGroup';
import { FloatingActionButton } from '../FloatingActionButton';
import { FormRow } from '../FormRow';
import { HoverCard } from '../HoverCard';
import { ImageGallery } from '../ImageGallery';
import { InfoList } from '../InfoList';
import { InlineAlert } from '../InlineAlert';
import { InputGroup } from '../InputGroup';
import { InputStepper } from '../InputStepper';
import { KeyValue } from '../KeyValue';
import { List } from '../List';
import { LoadingOverlay } from '../LoadingOverlay';
import { Menu } from '../Menu';
import { MenuGroup } from '../MenuGroup';
import { Menubar } from '../Menubar';
import { Modal } from '../Modal';
import { MultiSelect } from '../MultiSelect';
import { NavItem } from '../NavItem';
import { NumberInput } from '../NumberInput';
import { Pagination } from '../Pagination';
import { Popover } from '../Popover';
import { RadioGroup } from '../RadioGroup';
import { Resizable } from '../Resizable';
import { ScrollArea } from '../ScrollArea';
import { SearchBar } from '../SearchBar';
import { Sheet } from '../Sheet';
import { SpeedDial } from '../SpeedDial';
import { Stat } from '../Stat';
import { Steps } from '../Steps';
import { Table } from '../Table';
import { Tabs } from '../Tabs';
import { TagInput } from '../TagInput';
import { Timeline } from '../Timeline';
import { TimePicker } from '../TimePicker';
import { Toast } from '../Toast';
import { ToggleGroup } from '../ToggleGroup';
import { TransferList } from '../TransferList';
import { TreeView } from '../TreeView';
import { Button } from '../../atoms/Button';

describe('Alert', () => {
  it('renders title and description with default info variant', () => {
    render(<Alert title="Note" description="Saved" />);
    expect(screen.getByText('Note')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveClass('alert-info');
  });

  it.each(['success', 'warning', 'error'] as const)(
    'applies %s variant',
    (variant) => {
      render(<Alert variant={variant}>Body</Alert>);
      expect(screen.getByRole('alert')).toHaveClass(`alert-${variant}`);
    }
  );

  it('renders dismiss button and calls onClose', () => {
    const onClose = jest.fn();
    render(<Alert dismissible onClose={onClose} title="Note" />);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render dismiss button by default', () => {
    render(<Alert title="Note" />);
    expect(
      screen.queryByRole('button', { name: 'Dismiss alert' })
    ).not.toBeInTheDocument();
  });
});

describe('AvatarGroup', () => {
  const avatars = [
    { alt: 'A', src: '/a.png' },
    { alt: 'B', src: '/b.png' },
    { alt: 'C', src: '/c.png' },
    { alt: 'D', src: '/d.png' },
  ];

  it('renders all avatars when no max', () => {
    render(<AvatarGroup avatars={avatars} />);
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('limits avatars and shows overflow count', () => {
    render(<AvatarGroup avatars={avatars} max={2} />);
    expect(screen.getAllByRole('img')).toHaveLength(2);
    expect(screen.getByLabelText('2 more members')).toHaveTextContent('+2');
  });

  it('shows initials fallback for avatar without src', () => {
    render(<AvatarGroup avatars={[{ alt: 'Jane Doe' }]} />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });
});

describe('Breadcrumbs', () => {
  const items = [
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile' },
  ];

  it('renders links for items with href', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute(
      'href',
      '/settings'
    );
  });

  it('marks the last item as current page', () => {
    render(<Breadcrumbs items={items} />);
    expect(screen.getByText('Profile')).toHaveAttribute('aria-current', 'page');
  });

  it('renders plain text for items without href', () => {
    render(<Breadcrumbs items={[{ label: 'Home' }, { label: 'Profile' }]} />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});

describe('Card', () => {
  it('renders children only', () => {
    render(<Card>Body</Card>);
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders title, description, and action', () => {
    render(
      <Card title="Title" description="Desc" action={<button>Go</button>}>
        Body
      </Card>
    );
    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go' })).toBeInTheDocument();
  });
});

describe('EmptyState', () => {
  it('renders icon, title, and description', () => {
    render(
      <EmptyState icon={<FiTrash />} title="No data" description="Empty" />
    );
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.getByText('Empty')).toBeInTheDocument();
  });

  it('renders action when provided', () => {
    render(
      <EmptyState
        icon={<FiTrash />}
        title="No data"
        action={<button>Add</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });
});

describe('Dropdown', () => {
  const items = [
    { label: 'Edit', onClick: jest.fn() },
    { label: 'Delete', onClick: jest.fn(), danger: true, icon: <FiTrash /> },
  ];

  it('hides menu initially and opens on trigger click', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('calls item onClick and closes on select', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(items[0].onClick).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('marks danger items', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveClass(
      'text-error'
    );
  });

  it('renders item icons', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    expect(
      screen.getByRole('menuitem', { name: 'Delete' }).querySelector('svg')
    ).toBeInTheDocument();
  });

  it('closes on outside click', () => {
    render(
      <>
        <div>Outside</div>
        <Dropdown trigger={<button>Menu</button>} items={items} />
      </>
    );
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.mouseDown(screen.getByText('Outside'));
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(<Dropdown trigger={<button>Menu</button>} items={items} />);
    fireEvent.click(screen.getByText('Menu'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Fieldset', () => {
  it('renders legend, description, and children', () => {
    render(
      <Fieldset legend="Profile" description="Basic info">
        <input aria-label="Name" />
      </Fieldset>
    );
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Basic info')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('disables children when disabled', () => {
    render(
      <Fieldset legend="Profile" disabled>
        <button>Save</button>
      </Fieldset>
    );
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });
});

describe('Modal', () => {
  it('returns null when closed', () => {
    const { container } = render(<Modal open={false}>Body</Modal>);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, children, and action when open', () => {
    render(
      <Modal open title="Confirm" action={<button>Ok</button>}>
        Body
      </Modal>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Ok')).toBeInTheDocument();
  });

  it('calls onClose from backdrop button', () => {
    const onClose = jest.fn();
    render(
      <Modal open onClose={onClose}>
        Body
      </Modal>
    );
    fireEvent.click(screen.getByText('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('NavItem', () => {
  it('renders a link with label and href', () => {
    render(<NavItem label="Dashboard" href="/dashboard" />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute(
      'href',
      '/dashboard'
    );
  });

  it('marks active item', () => {
    render(<NavItem label="Dashboard" href="/dashboard" active />);
    expect(screen.getByRole('link', { name: /Dashboard/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('renders icon and badge', () => {
    render(<NavItem label="Inbox" href="/inbox" icon={<FiUser />} badge="3" />);
    const link = screen.getByRole('link', { name: /Inbox/ });
    expect(link.querySelector('svg')).toBeInTheDocument();
    expect(link).toHaveTextContent('3');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<NavItem label="Inbox" href="/inbox" onClick={onClick} />);
    fireEvent.click(screen.getByRole('link', { name: /Inbox/ }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('Pagination', () => {
  it('renders page buttons with current highlighted', () => {
    render(
      <Pagination current={3} total={5} siblingCount={2} onChange={jest.fn()} />
    );
    expect(screen.getByLabelText('Page 3')).toHaveClass('btn-primary');
    expect(screen.getAllByRole('button', { name: /Page/ })).toHaveLength(5);
  });

  it('calls onChange when a page is selected', () => {
    const onChange = jest.fn();
    render(<Pagination current={3} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Page 5'));
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('calls onChange on next and previous', () => {
    const onChange = jest.fn();
    render(<Pagination current={3} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(4);
    fireEvent.click(screen.getByLabelText('Previous page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('disables navigation at boundaries', () => {
    const onChange = jest.fn();
    render(<Pagination current={1} total={3} onChange={onChange} />);
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
    fireEvent.click(screen.getByLabelText('Next page'));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('collapses to a single page when total is one', () => {
    render(<Pagination current={1} total={1} onChange={jest.fn()} />);
    expect(screen.getAllByRole('button', { name: /Page/ })).toHaveLength(1);
    expect(screen.getByLabelText('Next page')).toBeDisabled();
    expect(screen.getByLabelText('Previous page')).toBeDisabled();
  });

  it('inserts ellipsis for large ranges', () => {
    render(<Pagination current={50} total={100} onChange={jest.fn()} />);
    const disabled = screen.getAllByRole('button', { name: '…' });
    expect(disabled.length).toBeGreaterThan(0);
  });

  it('does not call onChange when clicking current page', () => {
    const onChange = jest.fn();
    render(<Pagination current={2} total={5} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Page 2'));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('SearchBar', () => {
  it('renders search input with value and placeholder', () => {
    render(
      <SearchBar value="term" onChange={jest.fn()} placeholder="Find..." />
    );
    const input = screen.getByRole('searchbox');
    expect(input).toHaveValue('term');
    expect(input).toHaveAttribute('placeholder', 'Find...');
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<SearchBar value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'hello' },
    });
    expect(onChange).toHaveBeenCalledWith('hello');
  });

  it('clears value via clear button', () => {
    const onChange = jest.fn();
    render(<SearchBar value="term" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear search' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('hides clear button when empty or disabled', () => {
    const { rerender } = render(<SearchBar value="" onChange={jest.fn()} />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument();
    rerender(<SearchBar value="x" onChange={jest.fn()} disabled />);
    expect(
      screen.queryByRole('button', { name: 'Clear search' })
    ).not.toBeInTheDocument();
  });

  it('applies size class and disables', () => {
    render(<SearchBar value="" onChange={jest.fn()} size="lg" disabled />);
    const input = screen.getByRole('searchbox');
    expect(input).toHaveClass('input-lg');
    expect(input).toBeDisabled();
  });
});

describe('Stat', () => {
  it('renders label, value, and description', () => {
    render(<Stat label="Revenue" value="$1,234" description="vs last month" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$1,234')).toBeInTheDocument();
    expect(screen.getByText('vs last month')).toBeInTheDocument();
  });

  it('renders icon with variant color', () => {
    const { container } = render(
      <Stat label="Revenue" value="$1" icon={<FiUser />} variant="success" />
    );
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.parentElement).toHaveClass('text-success');
  });
});

describe('Tabs', () => {
  const tabs = [
    { label: 'Tab A', value: 'a' },
    { label: 'Tab B', value: 'b' },
  ];

  it('renders tabs and highlights active value', () => {
    render(<Tabs tabs={tabs} value="a" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Tab A' })).toHaveClass(
      'text-primary'
    );
    expect(screen.getByRole('button', { name: 'Tab B' })).not.toHaveClass(
      'text-primary'
    );
  });

  it('calls onChange when tab is clicked', () => {
    const onChange = jest.fn();
    render(<Tabs tabs={tabs} value="a" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tab B' }));
    expect(onChange).toHaveBeenCalledWith('b');
  });
});

describe('Toast', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders message with default info variant', () => {
    render(<Toast message="Saved" />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Saved').parentElement).toHaveClass('alert-info');
  });

  it('applies variant class', () => {
    render(<Toast message="Oops" variant="error" />);
    expect(screen.getByText('Oops').parentElement).toHaveClass('alert-error');
  });

  it('auto-dismisses after duration and calls onClose', () => {
    const onClose = jest.fn();
    render(<Toast message="Saved" duration={500} onClose={onClose} />);
    expect(screen.getByText('Saved')).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('dismisses on close button click', () => {
    const onClose = jest.fn();
    render(<Toast message="Saved" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('Accordion', () => {
  const items = [
    { id: 'a', title: 'First', content: 'First body' },
    { id: 'b', title: 'Second', content: 'Second body' },
  ];

  it('collapses all items initially', () => {
    render(<Accordion items={items} />);
    expect(screen.queryByText('First body')).not.toBeInTheDocument();
    expect(screen.queryByText('Second body')).not.toBeInTheDocument();
  });

  it('opens an item on title click', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    expect(screen.getByText('First body')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('allows only one open item by default', () => {
    render(<Accordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.queryByText('First body')).not.toBeInTheDocument();
    expect(screen.getByText('Second body')).toBeInTheDocument();
  });

  it('allows multiple open items when multiple', () => {
    render(<Accordion items={items} multiple />);
    fireEvent.click(screen.getByRole('button', { name: 'First' }));
    fireEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByText('First body')).toBeInTheDocument();
    expect(screen.getByText('Second body')).toBeInTheDocument();
  });
});

describe('Steps', () => {
  const steps = [
    { label: 'Account', description: 'Create it' },
    { label: 'Payment', description: 'Pay it' },
    { label: 'Done' },
  ];

  it('marks completed and current steps', () => {
    const { container } = render(<Steps steps={steps} current={1} />);
    expect(container.querySelector('[aria-current="step"]')).toHaveTextContent(
      'Payment'
    );
    expect(container.querySelectorAll('.step-primary')).toHaveLength(2);
  });

  it('renders step labels and descriptions', () => {
    render(<Steps steps={steps} current={0} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Create it')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });
});

describe('Timeline', () => {
  const items = [
    { title: 'Created', time: '09:00', description: 'Ticket opened' },
    { title: 'Assigned', time: '10:30' },
  ];

  it('renders item titles and times', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Created')).toBeInTheDocument();
    expect(screen.getByText('09:00')).toBeInTheDocument();
    expect(screen.getByText('Assigned')).toBeInTheDocument();
    expect(screen.getByText('10:30')).toBeInTheDocument();
  });

  it('renders descriptions when provided', () => {
    render(<Timeline items={items} />);
    expect(screen.getByText('Ticket opened')).toBeInTheDocument();
  });
});

describe('ChatBubble', () => {
  it('renders assistant message on the start side', () => {
    const { container } = render(
      <ChatBubble message="Hello" sender="assistant" name="Bot" time="10:00" />
    );
    expect(container.querySelector('.chat-start')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('Bot')).toBeInTheDocument();
    expect(screen.getByText('10:00')).toBeInTheDocument();
  });

  it('renders user message on the end side with primary bubble', () => {
    const { container } = render(<ChatBubble message="Hi" sender="user" />);
    expect(container.querySelector('.chat-end')).toBeInTheDocument();
    expect(container.querySelector('.chat-bubble-primary')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    const { container } = render(
      <ChatBubble message="Hi" sender="assistant" avatar={<span>R</span>} />
    );
    expect(container.querySelector('.chat-image')).toBeInTheDocument();
  });
});

describe('TagInput', () => {
  it('renders tags with remove buttons', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react', 'ts']} onChange={onChange} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });

  it('adds a tag on Enter', () => {
    const onChange = jest.fn();
    render(<TagInput tags={[]} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.change(input, { target: { value: 'next' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['next']);
  });

  it('does not add duplicates or empty tags', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react']} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.change(input, { target: { value: '  ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('removes the last tag on Backspace with empty draft', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['a', 'b']} onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Add tag' });
    fireEvent.keyDown(input, { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith(['a']);
  });

  it('removes a tag via its remove button', () => {
    const onChange = jest.fn();
    render(<TagInput tags={['react']} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove react tag' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('disables input when disabled', () => {
    render(<TagInput tags={[]} onChange={jest.fn()} disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

describe('FormRow', () => {
  it('renders label, hint, and children', () => {
    render(
      <FormRow label="Name" hint="First and last" htmlFor="name">
        <input id="name" aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('First and last')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'name');
  });

  it('renders required marker', () => {
    render(
      <FormRow label="Name" required>
        <input aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('renders error and hides hint', () => {
    render(
      <FormRow label="Name" hint="Optional" error="Required field">
        <input aria-label="Name" />
      </FormRow>
    );
    expect(screen.getByText('Required field')).toBeInTheDocument();
    expect(screen.queryByText('Optional')).not.toBeInTheDocument();
  });
});

describe('TreeView', () => {
  const nodes = [
    {
      id: 'root',
      label: 'Root',
      children: [{ id: 'leaf', label: 'Leaf' }],
    },
  ];

  it('renders nodes and collapses children initially', () => {
    render(<TreeView nodes={nodes} />);
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.queryByText('Leaf')).not.toBeInTheDocument();
  });

  it('expands and collapses children on click', () => {
    render(<TreeView nodes={nodes} />);
    fireEvent.click(screen.getByText('Root'));
    expect(screen.getByText('Leaf')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Root'));
    expect(screen.queryByText('Leaf')).not.toBeInTheDocument();
  });
});

describe('ConfirmDialog', () => {
  it('returns null when closed', () => {
    const { container } = render(
      <ConfirmDialog open={false} title="Delete" onConfirm={jest.fn()} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, message, and action buttons', () => {
    render(
      <ConfirmDialog
        open
        title="Delete account"
        message="This cannot be undone."
        onConfirm={jest.fn()}
      />
    );
    expect(screen.getByText('Delete account')).toBeInTheDocument();
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('calls onConfirm and onCancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(
      <ConfirmDialog
        open
        title="Delete"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('uses danger and loading states', () => {
    const { rerender } = render(
      <ConfirmDialog open title="Delete" danger onConfirm={jest.fn()} />
    );
    expect(screen.getByText('Confirm')).toHaveClass('btn-error');
    rerender(
      <ConfirmDialog open title="Delete" loading onConfirm={jest.fn()} />
    );
    expect(screen.getByText('Confirm')).toBeDisabled();
  });
});

describe('Menu', () => {
  const items = [
    { label: 'Profile', icon: <FiUser />, onClick: jest.fn() },
    { label: 'Settings', active: true },
    { label: 'Log out', danger: true, onClick: jest.fn() },
  ];

  it('renders title and items', () => {
    render(<Menu items={items} title="Account" />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Settings' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('marks danger items and calls onClick', () => {
    render(<Menu items={items} />);
    const logout = screen.getByRole('button', { name: 'Log out' });
    expect(logout).toHaveClass('text-error');
    fireEvent.click(logout);
    expect(items[2].onClick).toHaveBeenCalledTimes(1);
  });

  it('renders item icons', () => {
    render(<Menu items={items} />);
    expect(
      screen.getByRole('button', { name: 'Profile' }).querySelector('svg')
    ).toBeInTheDocument();
  });
});

describe('ButtonGroup', () => {
  const options = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];

  it('renders options with active state', () => {
    render(<ButtonGroup options={options} value="week" onChange={jest.fn()} />);
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );
    expect(screen.getByRole('button', { name: 'Week' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    expect(screen.getByRole('button', { name: 'Week' })).toHaveClass(
      'btn-primary'
    );
  });

  it('calls onChange with selected value', () => {
    const onChange = jest.fn();
    render(<ButtonGroup options={options} value="day" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Month' }));
    expect(onChange).toHaveBeenCalledWith('month');
  });

  it('applies vertical orientation and disables', () => {
    const { container } = render(
      <ButtonGroup
        options={options}
        value="day"
        onChange={jest.fn()}
        orientation="vertical"
        disabled
      />
    );
    expect(container.querySelector('.join-vertical')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Day' })).toBeDisabled();
  });
});

describe('Carousel', () => {
  const slides = [<div key="1">Slide one</div>, <div key="2">Slide two</div>];
  const scrollBy = jest.fn();

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'scrollBy', {
      configurable: true,
      value: scrollBy,
    });
  });

  it('renders slides and controls', () => {
    render(<Carousel slides={slides} ariaLabel="Highlights" />);
    expect(screen.getByLabelText('Highlights')).toBeInTheDocument();
    expect(screen.getByText('Slide one')).toBeInTheDocument();
    expect(screen.getByText('Slide two')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Previous slide' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Next slide' })
    ).toBeInTheDocument();
  });

  it('scrolls the track on control clicks', () => {
    render(<Carousel slides={slides} />);
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));
    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    expect(scrollBy).toHaveBeenCalledTimes(2);
  });
});

describe('KeyValue', () => {
  it('renders title and key/value pairs', () => {
    render(
      <KeyValue
        title="Metadata"
        items={[
          { key: 'Version', value: '1.0.0' },
          { key: 'License', value: 'MIT' },
        ]}
      />
    );
    expect(screen.getByText('Metadata')).toBeInTheDocument();
    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('License')).toBeInTheDocument();
    expect(screen.getByText('MIT')).toBeInTheDocument();
  });

  it('renders ReactNode values', () => {
    render(
      <KeyValue
        items={[
          {
            key: 'Status',
            value: <span className="text-success">Active</span>,
          },
        ]}
      />
    );
    expect(screen.getByText('Active')).toHaveClass('text-success');
  });
});

describe('List', () => {
  const items = [
    {
      id: '1',
      title: 'Fix login bug',
      description: 'High priority',
      action: <button>Open</button>,
    },
    { id: '2', title: 'Write docs' },
  ];

  it('renders title, items, and descriptions', () => {
    render(<List items={items} title="Tasks" />);
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Fix login bug')).toBeInTheDocument();
    expect(screen.getByText('High priority')).toBeInTheDocument();
    expect(screen.getByText('Write docs')).toBeInTheDocument();
  });

  it('renders leading and action nodes', () => {
    render(<List items={items} />);
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });
});

describe('DangerZone', () => {
  const items = [
    {
      id: 'delete',
      label: 'Delete account',
      description: 'Permanently remove everything.',
      action: <button>Delete</button>,
    },
  ];

  it('renders title, labels, and descriptions', () => {
    render(<DangerZone items={items} />);
    expect(screen.getByText('Danger zone')).toBeInTheDocument();
    expect(screen.getByText('Delete account')).toBeInTheDocument();
    expect(
      screen.getByText('Permanently remove everything.')
    ).toBeInTheDocument();
  });

  it('renders custom title and actions', () => {
    render(<DangerZone items={items} title="Destructive" />);
    expect(screen.getByText('Destructive')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });
});

describe('Sheet', () => {
  it('returns null when closed', () => {
    const { container } = render(<Sheet open={false} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title and children with side panel', () => {
    render(
      <Sheet open onClose={jest.fn()} title="Filters" side="left">
        <p>Content</p>
      </Sheet>
    );
    const dialog = screen.getByRole('dialog', { name: 'Filters' });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveClass('left-0');
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('calls onClose via close button and backdrop', () => {
    const onClose = jest.fn();
    render(
      <Sheet open onClose={onClose} title="Settings">
        <p>Body</p>
      </Sheet>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Close sheet' }));
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close sheet backdrop' })
    );
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Sheet open onClose={onClose} title="Settings" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a footer', () => {
    render(
      <Sheet
        open
        onClose={jest.fn()}
        title="Settings"
        footer={<button>Apply</button>}
      />
    );
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});

describe('Popover', () => {
  it('opens and closes on trigger click', () => {
    render(
      <Popover trigger={<Button size="sm">Actions</Button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('dialog')).toHaveTextContent('Popover content');
    fireEvent.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('adds aria-expanded to the trigger', () => {
    render(
      <Popover trigger={<button type="button">Menu</button>}>
        <p>Body</p>
      </Popover>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(screen.getByRole('button', { name: 'Menu' })).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });
});

describe('Combobox', () => {
  const options = [
    { label: 'Apples', value: 'apples' },
    { label: 'Bananas', value: 'bananas' },
    { label: 'Cherries', value: 'cherries' },
  ];

  it('shows the selected label', () => {
    render(<Combobox options={options} value="apples" onChange={jest.fn()} />);
    expect(screen.getByText('Apples')).toBeInTheDocument();
  });

  it('opens, filters, and selects an option', () => {
    const onChange = jest.fn();
    render(<Combobox options={options} value="" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search options' }), {
      target: { value: 'ban' },
    });
    expect(screen.getByText('Bananas')).toBeInTheDocument();
    expect(screen.queryByText('Apples')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Bananas'));
    expect(onChange).toHaveBeenCalledWith('bananas');
  });

  it('shows empty state when nothing matches', () => {
    render(
      <Combobox
        options={options}
        value=""
        onChange={jest.fn()}
        emptyText="Nothing found."
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search options' }), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('Nothing found.')).toBeInTheDocument();
  });
});

describe('ColorPicker', () => {
  it('renders swatches and the hex input', () => {
    render(
      <ColorPicker value="#3b82f6" onChange={jest.fn()} label="Primary" />
    );
    expect(
      screen.getByRole('button', { name: 'Pick #3b82f6' })
    ).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByRole('textbox', { name: 'Primary hex value' })
    ).toHaveValue('#3b82f6');
  });

  it('calls onChange when a swatch is picked', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Pick #10b981' }));
    expect(onChange).toHaveBeenCalledWith('#10b981');
  });

  it('commits a valid hex from the input on Enter', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Color hex value' });
    fireEvent.change(input, { target: { value: 'FF0000' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith('#ff0000');
  });

  it('reverts invalid hex on blur', () => {
    const onChange = jest.fn();
    render(<ColorPicker value="#000000" onChange={onChange} />);
    const input = screen.getByRole('textbox', { name: 'Color hex value' });
    fireEvent.change(input, { target: { value: 'not-a-color' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('#000000');
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('InputGroup', () => {
  it('renders label, leading, input, and trailing', () => {
    render(
      <InputGroup
        label="Amount"
        value="100"
        onChange={jest.fn()}
        leading={<span>$</span>}
        trailing={<span>USD</span>}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('100');
    expect(screen.getByText('$')).toBeInTheDocument();
    expect(screen.getByText('USD')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('calls onChange on input', () => {
    const onChange = jest.fn();
    render(<InputGroup value="" onChange={onChange} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '42' } });
    expect(onChange).toHaveBeenCalledWith('42');
  });

  it('shows error or hint', () => {
    const { rerender } = render(
      <InputGroup value="" onChange={jest.fn()} hint="No fees" />
    );
    expect(screen.getByText('No fees')).toBeInTheDocument();
    rerender(<InputGroup value="" onChange={jest.fn()} error="Invalid" />);
    expect(screen.getByText('Invalid')).toBeInTheDocument();
    expect(screen.queryByText('No fees')).not.toBeInTheDocument();
  });
});

describe('RadioGroup', () => {
  const options = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark', description: 'Easier on the eyes' },
  ];

  it('renders radios and marks the selected one', () => {
    render(
      <RadioGroup
        name="theme"
        options={options}
        value="dark"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('radio', { name: 'Light' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Dark' })).toBeChecked();
    expect(screen.getByText('Easier on the eyes')).toBeInTheDocument();
  });

  it('calls onChange with the selected value', () => {
    const onChange = jest.fn();
    render(
      <RadioGroup
        name="theme"
        options={options}
        value="light"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('radio', { name: 'Dark' }));
    expect(onChange).toHaveBeenCalledWith('dark');
  });

  it('shows an error', () => {
    render(
      <RadioGroup
        name="theme"
        options={options}
        value=""
        onChange={jest.fn()}
        error="Required"
      />
    );
    expect(screen.getByText('Required')).toBeInTheDocument();
  });
});

describe('CheckboxGroup', () => {
  const options = [
    { label: 'Email', value: 'email' },
    { label: 'SMS', value: 'sms' },
    { label: 'Push', value: 'push' },
  ];

  it('checks the selected options', () => {
    render(
      <CheckboxGroup options={options} value={['email']} onChange={jest.fn()} />
    );
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeChecked();
    expect(screen.getByRole('checkbox', { name: 'SMS' })).not.toBeChecked();
  });

  it('toggles options in and out of the value', () => {
    const onChange = jest.fn();
    render(
      <CheckboxGroup options={options} value={['email']} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('checkbox', { name: 'SMS' }));
    expect(onChange).toHaveBeenCalledWith(['email', 'sms']);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Email' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('shows an error', () => {
    render(
      <CheckboxGroup
        options={options}
        value={[]}
        onChange={jest.fn()}
        error="Pick at least one"
      />
    );
    expect(screen.getByText('Pick at least one')).toBeInTheDocument();
  });
});

describe('Table', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'score', header: 'Score', align: 'right' as const },
  ];
  const rows = [
    { name: 'Ada', score: 98 },
    { name: 'Grace', score: 95 },
  ];

  it('renders headers, cells, and caption', () => {
    render(<Table columns={columns} rows={rows} caption="Leaderboard" />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('98')).toBeInTheDocument();
  });

  it('renders an em dash for missing values', () => {
    render(<Table columns={columns} rows={[{ name: 'Ada' }]} />);
    expect(screen.getByText('—')).toBeInTheDocument();
  });

  it('applies striped and compact classes', () => {
    const { container } = render(
      <Table columns={columns} rows={rows} striped compact />
    );
    expect(container.querySelector('table')).toHaveClass(
      'table-zebra',
      'table-compact'
    );
  });
});

describe('Banner', () => {
  it('renders title, description, action, and children', () => {
    render(
      <Banner
        variant="success"
        title="Deployed"
        description="v2 is live"
        action={<button>View</button>}>
        <span>Changelog</span>
      </Banner>
    );
    expect(screen.getByText('Deployed')).toBeInTheDocument();
    expect(screen.getByText('v2 is live')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
    expect(screen.getByText('Changelog')).toBeInTheDocument();
  });

  it('applies the variant accent class', () => {
    render(<Banner variant="error">Failed</Banner>);
    expect(screen.getByRole('status')).toHaveClass('border-l-error');
  });

  it('calls onClose when dismissed', () => {
    const onClose = jest.fn();
    render(
      <Banner dismissible onClose={onClose}>
        Hello
      </Banner>
    );
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss banner' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('BottomNavigation', () => {
  const items = [
    { label: 'Home', value: 'home' },
    { label: 'Mail', value: 'mail' },
  ];

  it('renders items and marks the active one', () => {
    render(
      <BottomNavigation items={items} value="home" onChange={jest.fn()} />
    );
    expect(screen.getByRole('button', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('button', { name: 'Home' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: 'Mail' })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('calls onChange with the selected value', () => {
    const onChange = jest.fn();
    render(<BottomNavigation items={items} value="home" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Mail' }));
    expect(onChange).toHaveBeenCalledWith('mail');
  });
});

describe('Chip', () => {
  it('renders the label with color and outline classes', () => {
    const { container } = render(
      <Chip label="React" color="primary" variant="outline" />
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(container.querySelector('.badge')).toHaveClass(
      'badge-primary',
      'badge-outline'
    );
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Chip label="Tag" onClick={onClick} />);
    fireEvent.click(screen.getByRole('button', { name: 'Tag' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onDelete without triggering onClick', () => {
    const onClick = jest.fn();
    const onDelete = jest.fn();
    render(<Chip label="Tag" onClick={onClick} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole('button', { name: 'Remove Tag' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('renders as a span when not interactive', () => {
    const { container } = render(<Chip label="Static" />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(container.querySelector('span.badge')).toHaveTextContent('Static');
  });
});

describe('ContextMenu', () => {
  const items = [{ label: 'Copy', onClick: jest.fn() }];

  it('opens the menu on right click', () => {
    render(<ContextMenu trigger={<span>Right-click me</span>} items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.contextMenu(screen.getByText('Right-click me'));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Copy' })).toBeInTheDocument();
  });

  it('invokes the item action and closes the menu', () => {
    const onCopy = jest.fn();
    render(
      <ContextMenu
        trigger={<span>Trigger</span>}
        items={[{ label: 'Copy', onClick: onCopy }]}
      />
    );
    fireEvent.contextMenu(screen.getByText('Trigger'));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Copy' }));
    expect(onCopy).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes the menu on Escape', () => {
    render(<ContextMenu trigger={<span>Trigger</span>} items={items} />);
    fireEvent.contextMenu(screen.getByText('Trigger'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('Drawer', () => {
  it('opens and shows title and children', () => {
    render(
      <Drawer open title="Filters" onClose={jest.fn()}>
        Content
      </Drawer>
    );
    expect(screen.getByText('Filters')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('renders closed state with an unchecked toggle', () => {
    render(<Drawer open={false} title="Filters" onClose={jest.fn()} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onClose from the close button', () => {
    const onClose = jest.fn();
    render(<Drawer open title="Filters" onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose from the overlay and supports the right side', () => {
    const onClose = jest.fn();
    const { container } = render(
      <Drawer open side="right" onClose={onClose} />
    );
    expect(container.querySelector('.drawer-end')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close drawer overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Drawer open onClose={onClose} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders a footer', () => {
    render(<Drawer open onClose={jest.fn()} footer={<button>Apply</button>} />);
    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});

describe('FloatingActionButton', () => {
  it('renders a labeled circular button', () => {
    render(<FloatingActionButton icon={<span>+</span>} label="Add" />);
    expect(screen.getByRole('button', { name: 'Add' })).toHaveClass(
      'btn-circle'
    );
  });

  it('calls onClick and applies position, size, and variant classes', () => {
    const onClick = jest.fn();
    render(
      <FloatingActionButton
        icon={<span>+</span>}
        label="Add"
        onClick={onClick}
        position="bottom-left"
        size="lg"
        variant="accent"
      />
    );
    const button = screen.getByRole('button', { name: 'Add' });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(button).toHaveClass(
      'fixed',
      'bottom-6',
      'left-6',
      'btn-lg',
      'btn-accent'
    );
  });

  it('renders a disabled button', () => {
    render(<FloatingActionButton icon={<span>+</span>} label="Add" disabled />);
    expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
  });
});

describe('HoverCard', () => {
  it('renders the trigger and content', () => {
    render(
      <HoverCard
        trigger={<button>Hover</button>}
        content={<span>Details</span>}
      />
    );
    expect(screen.getByRole('button', { name: 'Hover' })).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
  });

  it('applies the side positioning class', () => {
    const { container } = render(
      <HoverCard trigger={<span>T</span>} content={<span>D</span>} side="top" />
    );
    expect(container.querySelector('[role="tooltip"]')).toHaveClass(
      'bottom-full',
      'mb-2'
    );
  });
});

describe('ScrollArea', () => {
  it('renders children with a max height', () => {
    const { container } = render(
      <ScrollArea maxHeight={300}>
        <p>Line</p>
      </ScrollArea>
    );
    expect(screen.getByText('Line')).toBeInTheDocument();
    expect(container.querySelector('.overflow-y-auto')).toHaveStyle(
      'max-height: 300px'
    );
  });
});

describe('SpeedDial', () => {
  const actions = [{ label: 'Compose', onClick: jest.fn() }];

  it('toggles the action list', () => {
    render(<SpeedDial triggerIcon={<span>+</span>} actions={actions} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Open quick actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(
      screen.getByRole('menuitem', { name: 'Compose' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Close quick actions' })
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('runs an action and closes the menu', () => {
    const onCompose = jest.fn();
    render(
      <SpeedDial
        triggerIcon={<span>+</span>}
        actions={[{ label: 'Compose', onClick: onCompose }]}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Open quick actions' }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Compose' }));
    expect(onCompose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});

describe('ToggleGroup', () => {
  const options = [
    { label: 'Bold', value: 'bold' },
    { label: 'Italic', value: 'italic' },
  ];

  it('selects a single option', () => {
    const onChange = jest.fn();
    render(<ToggleGroup options={options} value="bold" onChange={onChange} />);
    expect(screen.getByRole('button', { name: 'Bold' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onChange).toHaveBeenCalledWith('italic');
  });

  it('toggles options in multiple mode', () => {
    const onChange = jest.fn();
    render(
      <ToggleGroup
        options={options}
        value={['bold']}
        onChange={onChange}
        multiple
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Italic' }));
    expect(onChange).toHaveBeenCalledWith(['bold', 'italic']);
    fireEvent.click(screen.getByRole('button', { name: 'Bold' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('disables the buttons', () => {
    render(
      <ToggleGroup
        options={options}
        value="bold"
        onChange={jest.fn()}
        disabled
      />
    );
    expect(screen.getByRole('button', { name: 'Bold' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Italic' })).toBeDisabled();
  });
});

describe('DateRange', () => {
  it('renders from and to date inputs', () => {
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Date range start')).toHaveValue('2026-08-01');
    expect(screen.getByLabelText('Date range end')).toHaveValue('2026-08-31');
  });

  it('calls handlers on change', () => {
    const onStartChange = jest.fn();
    const onEndChange = jest.fn();
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={onStartChange}
        onEndChange={onEndChange}
      />
    );
    fireEvent.change(screen.getByLabelText('Date range start'), {
      target: { value: '2026-08-05' },
    });
    fireEvent.change(screen.getByLabelText('Date range end'), {
      target: { value: '2026-08-20' },
    });
    expect(onStartChange).toHaveBeenCalledWith('2026-08-05');
    expect(onEndChange).toHaveBeenCalledWith('2026-08-20');
  });

  it('applies min and max bounds to each input', () => {
    render(
      <DateRange
        start="2026-08-01"
        end="2026-08-31"
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
        min="2026-01-01"
        max="2026-12-31"
      />
    );
    expect(screen.getByLabelText('Date range start')).toHaveAttribute(
      'min',
      '2026-01-01'
    );
    expect(screen.getByLabelText('Date range start')).toHaveAttribute(
      'max',
      '2026-08-31'
    );
    expect(screen.getByLabelText('Date range end')).toHaveAttribute(
      'min',
      '2026-08-01'
    );
    expect(screen.getByLabelText('Date range end')).toHaveAttribute(
      'max',
      '2026-12-31'
    );
  });

  it('renders a custom label', () => {
    render(
      <DateRange
        label="Booking window"
        start=""
        end=""
        onStartChange={jest.fn()}
        onEndChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Booking window start')).toBeInTheDocument();
  });
});

describe('DatePicker', () => {
  it('shows the placeholder when no value is selected', () => {
    render(<DatePicker onChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: 'Select date' })
    ).toBeInTheDocument();
  });

  it('shows the formatted value when selected', () => {
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={jest.fn()} />);
    expect(
      screen.getByRole('button', { name: /Aug 15, 2026/ })
    ).toBeInTheDocument();
  });

  it('opens the calendar and selects a date', () => {
    const onChange = jest.fn();
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Mon Aug 17 2026' }));
    expect(onChange).toHaveBeenCalled();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('navigates months', () => {
    render(<DatePicker value={new Date(2026, 7, 15)} onChange={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }));
    expect(screen.getByText('September 2026')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }));
    expect(screen.getByText('August 2026')).toBeInTheDocument();
  });

  it('disables dates outside the min and max bounds', () => {
    const onChange = jest.fn();
    render(
      <DatePicker
        value={new Date(2026, 7, 15)}
        onChange={onChange}
        minDate={new Date(2026, 7, 20)}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /Aug 15, 2026/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Mon Aug 17 2026' }));
    expect(onChange).not.toHaveBeenCalled();
  });
});

describe('Dialog', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<Dialog open={false} onClose={jest.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders title, description, children, and footer when open', () => {
    render(
      <Dialog
        open
        onClose={jest.fn()}
        title="Confirm"
        description="Are you sure?"
        footer={<button>OK</button>}>
        <p>Body content</p>
      </Dialog>
    );
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
  });

  it('closes via the close button', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via the backdrop by default', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Close dialog backdrop' })
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('keeps the dialog open on backdrop click when disabled', () => {
    const onClose = jest.fn();
    render(
      <Dialog open onClose={onClose} title="Confirm" closeOnBackdrop={false} />
    );
    fireEvent.click(
      screen.getByRole('button', { name: 'Close dialog backdrop' })
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<Dialog open onClose={onClose} title="Confirm" />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('FileUpload', () => {
  it('renders the drop zone with a browse button', () => {
    render(<FileUpload />);
    expect(screen.getByText('Upload files')).toBeInTheDocument();
    expect(screen.getByText('Browse')).toBeInTheDocument();
  });

  it('adds files from the file input', () => {
    const onChange = jest.fn();
    render(<FileUpload onFilesChange={onChange} />);
    const file = new File(['report'], 'report.pdf', {
      type: 'application/pdf',
    });
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [file] },
    });
    expect(screen.getByText('report.pdf')).toBeInTheDocument();
    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({ name: 'report.pdf' }),
    ]);
  });

  it('adds files on drop and highlights while dragging', () => {
    render(<FileUpload />);
    const zone = screen.getByText('Upload files').parentElement as HTMLElement;
    fireEvent.dragOver(zone);
    expect(zone.className).toContain('border-primary');
    fireEvent.dragLeave(zone);
    expect(zone.className).not.toContain('border-primary');
    const dataTransfer = {
      files: [new File(['content'], 'notes.txt', { type: 'text/plain' })],
    } as unknown as DataTransfer;
    fireEvent.drop(zone, { dataTransfer });
    expect(screen.getByText('notes.txt')).toBeInTheDocument();
  });

  it('replaces files in single mode and appends in multiple mode', () => {
    const onChange = jest.fn();
    const { rerender } = render(<FileUpload onFilesChange={onChange} />);
    const input = screen.getByLabelText('Upload files');
    fireEvent.change(input, {
      target: { files: [new File(['a'], 'a.txt')] },
    });
    fireEvent.change(input, {
      target: { files: [new File(['b'], 'b.txt')] },
    });
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(screen.getByText('b.txt')).toBeInTheDocument();

    rerender(<FileUpload onFilesChange={onChange} multiple />);
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [new File(['a'], 'a.txt')] },
    });
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [new File(['c'], 'c.txt')] },
    });
    expect(screen.getByText('a.txt')).toBeInTheDocument();
    expect(screen.getByText('c.txt')).toBeInTheDocument();
  });

  it('filters files over the max size', () => {
    render(<FileUpload maxSize={10} />);
    const file = new File(['this is a much larger file'], 'big.txt');
    fireEvent.change(screen.getByLabelText('Upload files'), {
      target: { files: [file] },
    });
    expect(screen.queryByText('big.txt')).not.toBeInTheDocument();
  });

  it('removes a file from the list', () => {
    const onChange = jest.fn();
    render(<FileUpload onFilesChange={onChange} multiple />);
    const input = screen.getByLabelText('Upload files');
    fireEvent.change(input, {
      target: { files: [new File(['a'], 'a.txt'), new File(['b'], 'b.txt')] },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Remove a.txt' }));
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(screen.getByText('b.txt')).toBeInTheDocument();
    expect(onChange).toHaveBeenLastCalledWith([
      expect.objectContaining({ name: 'b.txt' }),
    ]);
  });
});

describe('ImageGallery', () => {
  const images = [
    { src: '/one.png', alt: 'First photo' },
    { src: '/two.png', alt: 'Second photo' },
    { src: '/three.png', alt: 'Third photo' },
  ];

  it('shows the first image by default', () => {
    render(<ImageGallery images={images} />);
    expect(screen.getByRole('img', { name: 'First photo' })).toHaveAttribute(
      'src',
      '/one.png'
    );
  });

  it('switches the active image when a thumbnail is clicked', () => {
    render(<ImageGallery images={images} />);
    fireEvent.click(screen.getByRole('button', { name: 'Show Second photo' }));
    expect(screen.getByRole('img', { name: 'Second photo' })).toHaveAttribute(
      'src',
      '/two.png'
    );
  });

  it('returns null when there are no images', () => {
    const { container } = render(<ImageGallery images={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});

describe('InfoList', () => {
  const items = [
    { key: 'name', label: 'Name', value: 'Jane Doe' },
    { key: 'role', label: 'Role', value: 'Engineer' },
  ];

  it('renders title, labels, and values', () => {
    render(<InfoList title="Profile" items={items} />);
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders icons', () => {
    render(<InfoList items={[{ ...items[0], icon: '⭐' }]} />);
    expect(screen.getByText('⭐')).toBeInTheDocument();
  });

  it('applies a two-column layout', () => {
    const { container } = render(<InfoList items={items} columns={2} />);
    expect(container.querySelector('dl')).toHaveClass('sm:grid-cols-2');
  });
});

describe('InlineAlert', () => {
  it.each(['info', 'success', 'warning', 'error'] as const)(
    'applies the %s accent',
    (variant) => {
      render(<InlineAlert variant={variant}>Heads up</InlineAlert>);
      expect(screen.getByRole('status')).toHaveClass(`text-${variant}`);
    }
  );

  it('renders the message', () => {
    render(<InlineAlert>Something changed</InlineAlert>);
    expect(screen.getByText('Something changed')).toBeInTheDocument();
  });

  it('renders a dismiss button and calls onClose', () => {
    const onClose = jest.fn();
    render(<InlineAlert onClose={onClose}>Heads up</InlineAlert>);
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not render a dismiss button by default', () => {
    render(<InlineAlert>Heads up</InlineAlert>);
    expect(
      screen.queryByRole('button', { name: 'Dismiss alert' })
    ).not.toBeInTheDocument();
  });
});

describe('InputStepper', () => {
  const options = ['Day', 'Week', 'Month'];

  it('shows the current option and its position', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Week"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText('Week')).toBeInTheDocument();
    expect(screen.getByText('2 of 3')).toBeInTheDocument();
  });

  it('steps forward and backward', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <InputStepper
        label="Period"
        options={options}
        value="Day"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Next Period' }));
    expect(onChange).toHaveBeenCalledWith('Week');
    rerender(
      <InputStepper
        label="Period"
        options={options}
        value="Week"
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Previous Period' }));
    expect(onChange).toHaveBeenLastCalledWith('Day');
  });

  it('disables the previous button at the first step', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Day"
        onChange={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Previous Period' })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next Period' })).toBeEnabled();
  });

  it('disables the next button at the last step', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Month"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByRole('button', { name: 'Next Period' })).toBeDisabled();
  });

  it('falls back to the first option when the value is unknown', () => {
    render(
      <InputStepper
        label="Period"
        options={options}
        value="Year"
        onChange={jest.fn()}
      />
    );
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('1 of 3')).toBeInTheDocument();
  });
});

describe('MenuGroup', () => {
  const sections = [
    {
      id: 'general',
      title: 'General',
      items: [
        { id: 'profile', label: 'Profile', active: true },
        { id: 'billing', label: 'Billing' },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      items: [{ id: 'logout', label: 'Log out' }],
    },
  ];

  it('renders section titles and items', () => {
    render(<MenuGroup sections={sections} />);
    expect(screen.getByText('General')).toBeInTheDocument();
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log out')).toBeInTheDocument();
  });

  it('marks the active item', () => {
    render(<MenuGroup sections={sections} />);
    expect(screen.getByText('Profile')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByText('Billing')).not.toHaveAttribute('aria-current');
  });

  it('calls onClick when an item is pressed', () => {
    const onClick = jest.fn();
    render(
      <MenuGroup
        sections={[
          {
            id: 'general',
            title: 'General',
            items: [{ id: 'billing', label: 'Billing', onClick }],
          },
        ]}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Billing' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('NumberInput', () => {
  it('renders the label and value', () => {
    render(<NumberInput label="Quantity" value={4} onChange={jest.fn()} />);
    expect(screen.getByLabelText('Quantity')).toHaveValue(4);
  });

  it('calls onChange with a clamped minimum', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={10} min={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '3' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('calls onChange with a clamped maximum', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={1} max={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '9' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('uses the minimum when the field is cleared', () => {
    const onChange = jest.fn();
    render(
      <NumberInput label="Quantity" value={10} min={5} onChange={onChange} />
    );
    fireEvent.change(screen.getByLabelText('Quantity'), {
      target: { value: '' },
    });
    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('shows the hint when there is no message', () => {
    render(
      <NumberInput
        label="Quantity"
        value={4}
        onChange={jest.fn()}
        hint="Whole numbers"
      />
    );
    expect(screen.getByText('Whole numbers')).toBeInTheDocument();
  });

  it('shows an external error', () => {
    render(
      <NumberInput
        label="Quantity"
        value={4}
        onChange={jest.fn()}
        error="Too low"
      />
    );
    expect(screen.getByText('Too low')).toBeInTheDocument();
    expect(screen.getByLabelText('Quantity')).toHaveAttribute(
      'aria-invalid',
      'true'
    );
  });

  it('shows an out-of-range message when no error is provided', () => {
    render(
      <NumberInput label="Quantity" value={15} max={10} onChange={jest.fn()} />
    );
    expect(screen.getByText('Out of range (any to 10)')).toBeInTheDocument();
  });

  it('disables the input', () => {
    render(
      <NumberInput label="Quantity" value={4} onChange={jest.fn()} disabled />
    );
    expect(screen.getByLabelText('Quantity')).toBeDisabled();
  });
});

describe('Menubar', () => {
  const items = [
    { label: 'File', children: <div>File menu</div> },
    { label: 'Edit', children: <div>Edit menu</div> },
    { label: 'Help' },
  ];

  it('renders each top-level label', () => {
    render(<Menubar items={items} />);
    expect(screen.getByRole('button', { name: 'File' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Help' })).toBeInTheDocument();
  });

  it('opens the dropdown for an item with children', () => {
    render(<Menubar items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'File' }));
    expect(screen.getByText('File menu')).toBeInTheDocument();
  });

  it('toggles the dropdown closed on a second click', () => {
    render(<Menubar items={items} />);
    const trigger = screen.getByRole('button', { name: 'File' });
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByText('File menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown when clicking outside', () => {
    render(
      <div>
        <Menubar items={items} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: 'File' }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByText('File menu')).not.toBeInTheDocument();
  });

  it('closes the dropdown on Escape', () => {
    render(<Menubar items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Edit' }));
    fireEvent.keyDown(screen.getByRole('button', { name: 'Edit' }), {
      key: 'Escape',
    });
    expect(screen.queryByText('Edit menu')).not.toBeInTheDocument();
  });
});

describe('Backdrop', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<Backdrop open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders an overlay when open', () => {
    render(<Backdrop open />);
    const overlay = document.querySelector('.fixed');
    expect(overlay).toBeInTheDocument();
  });

  it('calls onClose when the overlay itself is clicked', () => {
    const onClose = jest.fn();
    render(
      <Backdrop open onClose={onClose}>
        <div>Content</div>
      </Backdrop>
    );
    const overlay = document.querySelector('.fixed') as HTMLElement;
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when content is clicked', () => {
    const onClose = jest.fn();
    render(
      <Backdrop open onClose={onClose}>
        <div>Content</div>
      </Backdrop>
    );
    fireEvent.click(screen.getByText('Content'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('renders an opaque overlay', () => {
    render(<Backdrop open opaque />);
    expect(document.querySelector('.bg-base-100')).toBeInTheDocument();
  });

  it('marks a childless overlay as aria-hidden', () => {
    const { container } = render(<Backdrop open />);
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
  });
});

describe('LoadingOverlay', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<LoadingOverlay open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders a status with the label when open', () => {
    render(<LoadingOverlay open label="Saving" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Saving')).toBeInTheDocument();
  });

  it('applies the requested variant', () => {
    const { container } = render(<LoadingOverlay open variant="dots" />);
    expect(container.querySelector('.loading-dots')).toBeInTheDocument();
  });

  it('calls onClose when the overlay is clicked', () => {
    const onClose = jest.fn();
    render(<LoadingOverlay open label="Saving" onClose={onClose} />);
    fireEvent.click(screen.getByRole('status'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('applies the transparent style', () => {
    render(<LoadingOverlay open transparent />);
    expect(screen.getByRole('status')).toHaveClass('bg-base-content/20');
  });
});

describe('TransferList', () => {
  const left = [
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
  ];
  const right = [{ id: 'c', label: 'Gamma' }];

  it('renders both columns with their titles', () => {
    render(<TransferList left={left} right={right} onChange={jest.fn()} />);
    expect(screen.getByText('Available')).toBeInTheDocument();
    expect(screen.getByText('Selected')).toBeInTheDocument();
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Gamma')).toBeInTheDocument();
  });

  it('moves a selected item to the right column', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={[]} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Alpha'));
    fireEvent.click(screen.getByText('→'));
    expect(onChange).toHaveBeenCalledWith(
      [{ id: 'b', label: 'Beta' }],
      [{ id: 'a', label: 'Alpha' }]
    );
  });

  it('moves all items to the right column', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={[]} onChange={onChange} />);
    fireEvent.click(screen.getByText('»'));
    expect(onChange).toHaveBeenCalledWith([], left);
  });

  it('moves a selected item to the left column', () => {
    const onChange = jest.fn();
    render(<TransferList left={[]} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Gamma'));
    fireEvent.click(screen.getByText('←'));
    expect(onChange).toHaveBeenCalledWith([{ id: 'c', label: 'Gamma' }], []);
  });

  it('moves all items to the left column', () => {
    const onChange = jest.fn();
    render(<TransferList left={[]} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByText('«'));
    expect(onChange).toHaveBeenCalledWith([{ id: 'c', label: 'Gamma' }], []);
  });

  it('disables move buttons when nothing is selected', () => {
    render(<TransferList left={left} right={right} onChange={jest.fn()} />);
    expect(screen.getByText('→')).toBeDisabled();
    expect(screen.getByText('←')).toBeDisabled();
  });

  it('does not call onChange when moving with no selection', () => {
    const onChange = jest.fn();
    render(<TransferList left={left} right={right} onChange={onChange} />);
    fireEvent.click(screen.getByText('→'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows an empty state for empty columns', () => {
    render(<TransferList left={[]} right={[]} onChange={jest.fn()} />);
    expect(screen.getAllByText('No items')).toHaveLength(2);
  });
});

describe('MultiSelect', () => {
  const options = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
  ];

  it('shows the placeholder when nothing is selected', () => {
    render(<MultiSelect options={options} value={[]} onChange={jest.fn()} />);
    expect(screen.getByText('Select…')).toBeInTheDocument();
  });

  it('shows selected values as chips', () => {
    render(
      <MultiSelect options={options} value={['ts']} onChange={jest.fn()} />
    );
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('toggles an option in the dropdown', () => {
    const onChange = jest.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Select/ }));
    fireEvent.click(screen.getByLabelText('JavaScript'));
    expect(onChange).toHaveBeenCalledWith(['js']);
  });

  it('removes a selected option', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect options={options} value={['js', 'ts']} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: /TypeScript/ }));
    fireEvent.click(screen.getByLabelText('TypeScript'));
    expect(onChange).toHaveBeenCalledWith(['js']);
  });

  it('closes the dropdown when clicking outside', () => {
    render(
      <div>
        <MultiSelect options={options} value={[]} onChange={jest.fn()} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /Select/ }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByLabelText('JavaScript')).not.toBeInTheDocument();
  });
});

describe('TimePicker', () => {
  it('displays the current value', () => {
    render(<TimePicker value="09:30" onChange={jest.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('09:30');
  });

  it('formats a 12h value', () => {
    render(<TimePicker value="14:30" onChange={jest.fn()} format="12h" />);
    expect(screen.getByRole('button')).toHaveTextContent('02:30 PM');
  });

  it('formats a 12h midnight value', () => {
    render(<TimePicker value="00:30" onChange={jest.fn()} format="12h" />);
    expect(screen.getByRole('button')).toHaveTextContent('12:30 AM');
  });

  it('selects a new time from the list', () => {
    const onChange = jest.fn();
    render(<TimePicker value="09:00" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: '09:00' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
    fireEvent.click(screen.getByRole('option', { name: '09:30' }));
    expect(onChange).toHaveBeenCalledWith('09:30');
  });

  it('lists times at the requested step', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={15} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('option', { name: '09:15' })).toBeInTheDocument();
  });

  it('clamps the step to the supported range', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={90} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('option')).toHaveLength(24);
  });

  it('clamps a step below the minimum to 1', () => {
    render(<TimePicker value="09:00" onChange={jest.fn()} stepMinutes={0} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getAllByRole('option')).toHaveLength(1440);
  });
});

describe('Resizable', () => {
  it('renders both panes', () => {
    render(<Resizable first={<div>First</div>} second={<div>Second</div>} />);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders a horizontal separator by default', () => {
    render(<Resizable first={<div>First</div>} second={<div>Second</div>} />);
    const separator = screen.getByRole('separator');
    expect(separator).toHaveAttribute('aria-orientation', 'horizontal');
  });

  it('renders a vertical separator for vertical direction', () => {
    render(
      <Resizable
        direction="vertical"
        first={<div>First</div>}
        second={<div>Second</div>}
      />
    );
    expect(screen.getByRole('separator')).toHaveAttribute(
      'aria-orientation',
      'vertical'
    );
  });

  it('clamps the initial ratio to the allowed range', () => {
    const { container } = render(
      <Resizable
        initialRatio={0.1}
        minRatio={0.2}
        first={<div>First</div>}
        second={<div>Second</div>}
      />
    );
    const firstPane = container.querySelector('.min-w-0') as HTMLElement;
    expect(firstPane.style.width).toBe('20%');
  });

  it('resizes the first pane while dragging the separator', () => {
    const { container } = render(
      <Resizable first={<div>First</div>} second={<div>Second</div>} />
    );
    const root = container.querySelector('.relative') as HTMLElement;
    const separator = screen.getByRole('separator');
    jest.spyOn(root, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      left: 0,
      top: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect);

    fireEvent.pointerDown(separator);
    fireEvent.pointerMove(separator, { clientX: 100 });
    const firstPane = container.querySelector('.min-w-0') as HTMLElement;
    expect(firstPane.style.width).toBe('50%');
  });
});

describe('FilterGroup', () => {
  const options = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ];

  it('renders a checkbox per option', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Active')).toBeInTheDocument();
    expect(screen.getByLabelText('Archived')).toBeInTheDocument();
  });

  it('checks the selected options', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Active')).toBeChecked();
  });

  it('toggles an option', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Active'));
    expect(onChange).toHaveBeenCalledWith(['active']);
  });

  it('toggles an option off', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Active'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('resets the selection', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('hides the reset button when nothing is selected', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={jest.fn()}
      />
    );
    expect(
      screen.queryByRole('button', { name: 'Reset' })
    ).not.toBeInTheDocument();
  });
});
