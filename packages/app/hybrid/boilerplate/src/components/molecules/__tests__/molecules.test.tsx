import { act, fireEvent, render, screen } from '@testing-library/react';
import { FiTrash, FiUser } from 'react-icons/fi';
import { Accordion } from '../Accordion';
import { Alert } from '../Alert';
import { AvatarGroup } from '../AvatarGroup';
import { Breadcrumbs } from '../Breadcrumbs';
import { ButtonGroup } from '../ButtonGroup';
import { Card } from '../Card';
import { Carousel } from '../Carousel';
import { ChatBubble } from '../ChatBubble';
import { CheckboxGroup } from '../CheckboxGroup';
import { ColorPicker } from '../ColorPicker';
import { Combobox } from '../Combobox';
import { ConfirmDialog } from '../ConfirmDialog';
import { DangerZone } from '../DangerZone';
import { Dropdown } from '../Dropdown';
import { EmptyState } from '../EmptyState';
import { Fieldset } from '../Fieldset';
import { FormRow } from '../FormRow';
import { InputGroup } from '../InputGroup';
import { KeyValue } from '../KeyValue';
import { List } from '../List';
import { Menu } from '../Menu';
import { Modal } from '../Modal';
import { NavItem } from '../NavItem';
import { Pagination } from '../Pagination';
import { Popover } from '../Popover';
import { RadioGroup } from '../RadioGroup';
import { SearchBar } from '../SearchBar';
import { Sheet } from '../Sheet';
import { Stat } from '../Stat';
import { Steps } from '../Steps';
import { Table } from '../Table';
import { Tabs } from '../Tabs';
import { TagInput } from '../TagInput';
import { Timeline } from '../Timeline';
import { Toast } from '../Toast';
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
