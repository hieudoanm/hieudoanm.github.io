import { act, fireEvent, render, screen } from '@testing-library/react';
import { FiTrash } from 'react-icons/fi';
import { Card } from '../Card';
import { Dropdown } from '../Dropdown';
import { EmptyState } from '../EmptyState';
import { Modal } from '../Modal';
import { Tabs } from '../Tabs';
import { Toast } from '../Toast';

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
