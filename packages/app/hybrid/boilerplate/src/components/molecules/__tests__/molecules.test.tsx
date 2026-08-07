import { act, fireEvent, render, screen } from '@testing-library/react';
import { FiTrash, FiUser } from 'react-icons/fi';
import { Alert } from '../Alert';
import { AvatarGroup } from '../AvatarGroup';
import { Breadcrumbs } from '../Breadcrumbs';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { EmptyState } from '../EmptyState';
import { Fieldset } from '../Fieldset';
import { Modal } from '../Modal';
import { NavItem } from '../NavItem';
import { Pagination } from '../Pagination';
import { SearchBar } from '../SearchBar';
import { Stat } from '../Stat';
import { Tabs } from '../Tabs';
import { Toast } from '../Toast';

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
