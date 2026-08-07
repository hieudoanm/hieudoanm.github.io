import { fireEvent, render, screen } from '@testing-library/react';
import { FiHome, FiUser } from 'react-icons/fi';
import { ChatWindow } from '../ChatWindow';
import { DataTable } from '../DataTable';
import { FAQSection } from '../FAQSection';
import { FeatureGrid } from '../FeatureGrid';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Hero } from '../Hero';
import { Navbar } from '../Navbar';
import { NewsletterSection } from '../NewsletterSection';
import { PricingSection } from '../PricingSection';
import { Sidebar } from '../Sidebar';
import { StatsGrid } from '../StatsGrid';
import { Toolbar } from '../Toolbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

describe('DataTable', () => {
  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (row: Record<string, unknown>) => String(row.status),
    },
  ];

  it('renders headers and cell values', () => {
    render(
      <DataTable columns={columns} rows={[{ name: 'Ada', status: 'Active' }]} />
    );
    expect(
      screen.getByRole('columnheader', { name: 'Name' })
    ).toBeInTheDocument();
    expect(screen.getByText('Ada')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows empty state text when no rows', () => {
    render(<DataTable columns={columns} rows={[]} emptyText="Nothing here" />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
    expect(screen.queryByText('Ada')).not.toBeInTheDocument();
  });

  it('uses default empty text when not provided', () => {
    render(<DataTable columns={columns} rows={[]} />);
    expect(screen.getByText('No records found.')).toBeInTheDocument();
  });

  it('renders missing values as empty string', () => {
    render(<DataTable columns={columns} rows={[{ name: 'Ada' }]} />);
    expect(screen.getByText('Ada')).toBeInTheDocument();
  });
});

describe('FeatureGrid', () => {
  const features = [
    { icon: <FiHome />, title: 'Fast', description: 'Runs quickly' },
    { icon: <FiUser />, title: 'Simple', description: 'Easy to use' },
  ];

  it('renders feature cards', () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
    expect(screen.getByText('Runs quickly')).toBeInTheDocument();
    expect(screen.getByText('Simple')).toBeInTheDocument();
  });

  it('applies column grid class', () => {
    const { container } = render(
      <FeatureGrid features={features} columns={2} />
    );
    expect(container.querySelector('.sm\\:grid-cols-2')).toBeInTheDocument();
  });
});

describe('Footer', () => {
  const columns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
  ];

  it('renders brand, description, and column links', () => {
    render(<Footer brand="Acme" description="Great app" columns={columns} />);
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Great app')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Features' })).toHaveAttribute(
      'href',
      '/features'
    );
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute(
      'href',
      '/pricing'
    );
  });

  it('renders copyright when provided', () => {
    render(<Footer brand="Acme" columns={columns} copyright="© 2026" />);
    expect(screen.getByText('© 2026')).toBeInTheDocument();
  });

  it('omits copyright when not provided', () => {
    render(<Footer brand="Acme" columns={columns} />);
    expect(screen.queryByText('© 2026')).not.toBeInTheDocument();
  });
});

describe('Header', () => {
  it('renders title and subtitle', () => {
    render(<Header title="Dashboard" subtitle="Overview" />);
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
  });

  it('renders back link when backHref is provided', () => {
    render(<Header title="Dashboard" backHref="/" />);
    expect(screen.getByRole('link', { name: '' })).toHaveAttribute('href', '/');
  });

  it('renders badges and action', () => {
    render(
      <Header
        title="Dashboard"
        badges={<span>Beta</span>}
        action={<button>New</button>}
      />
    );
    expect(screen.getByText('Beta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'New' })).toBeInTheDocument();
  });
});

describe('Navbar', () => {
  const items = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Profile', href: '/profile', icon: <FiUser /> },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/profile');
  });

  it('renders items with icons and labels', () => {
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Profile/ })).toBeInTheDocument();
    expect(document.querySelectorAll('svg').length).toBeGreaterThan(0);
  });

  it('marks active item based on pathname', () => {
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Profile/ })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: /Home/ })).not.toHaveClass(
      'btn-primary'
    );
  });

  it('marks home active only on root path', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Navbar items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toHaveClass(
      'btn-primary'
    );
  });

  it('uses top position class', () => {
    render(<Navbar items={items} position="top" />);
    expect(document.querySelector('nav')).toHaveClass('top-0');
  });
});

describe('PricingSection', () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/mo',
      features: ['1 project'],
      ctaLabel: 'Get started',
      ctaHref: '/signup',
    },
    {
      name: 'Pro',
      price: '$9',
      period: '/mo',
      description: 'Best for teams',
      features: ['Unlimited projects', 'Support'],
      highlighted: true,
      ctaLabel: 'Upgrade',
      ctaHref: '/billing',
    },
  ];

  it('renders plan names, prices, and features', () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByRole('heading', { name: 'Free' })).toBeInTheDocument();
    expect(screen.getByText('$9')).toBeInTheDocument();
    expect(screen.getByText('Unlimited projects')).toBeInTheDocument();
    expect(screen.getByText('Best for teams')).toBeInTheDocument();
  });

  it('renders CTA links', () => {
    render(<PricingSection plans={plans} />);
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveAttribute(
      'href',
      '/signup'
    );
    expect(screen.getByRole('link', { name: 'Upgrade' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveClass(
      'btn-outline'
    );
  });
});

describe('Sidebar', () => {
  const items = [
    { label: 'Home', href: '/', icon: <FiHome /> },
    { label: 'Settings', href: '/settings', badge: 'New' },
  ];

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/settings');
  });

  it('renders title and nav items', () => {
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('heading', { name: 'Menu' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Settings/ })).toBeInTheDocument();
  });

  it('marks active item from pathname', () => {
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('link', { name: /Settings/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
    expect(screen.getByRole('link', { name: /Home/ })).not.toHaveAttribute(
      'aria-current'
    );
  });

  it('marks home active only on root', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    render(<Sidebar title="Menu" items={items} />);
    expect(screen.getByRole('link', { name: /Home/ })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('renders badge and footer', () => {
    render(
      <Sidebar
        title="Menu"
        items={items}
        footer={<span>Signed in as Admin</span>}
      />
    );
    expect(screen.getByRole('link', { name: /Settings/ })).toHaveTextContent(
      'New'
    );
    expect(screen.getByText('Signed in as Admin')).toBeInTheDocument();
  });
});

describe('Toolbar', () => {
  it('renders title, subtitle, and actions', () => {
    render(
      <Toolbar
        title="Reports"
        subtitle="Monthly summary"
        actions={[
          <button key="1">Export</button>,
          <button key="2">Filter</button>,
        ]}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Reports' })
    ).toBeInTheDocument();
    expect(screen.getByText('Monthly summary')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Filter' })).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <Toolbar>
        <input aria-label="Query" />
      </Toolbar>
    );
    expect(screen.getByLabelText('Query')).toBeInTheDocument();
  });
});

describe('StatsGrid', () => {
  const stats = [
    { label: 'Users', value: '128', description: 'total' },
    { label: 'Sessions', value: '1,024' },
  ];

  it('renders stats labels and values', () => {
    render(<StatsGrid stats={stats} />);
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('128')).toBeInTheDocument();
    expect(screen.getByText('total')).toBeInTheDocument();
    expect(screen.getByText('1,024')).toBeInTheDocument();
  });

  it('applies column grid class', () => {
    const { container } = render(<StatsGrid stats={stats} columns={2} />);
    expect(container.querySelector('.sm\\:grid-cols-2')).toBeInTheDocument();
  });
});

describe('ChatWindow', () => {
  const messages = [
    { id: '1', sender: 'assistant' as const, text: 'Hello there' },
    { id: '2', sender: 'user' as const, text: 'Hi again' },
  ];

  it('renders title and messages', () => {
    render(
      <ChatWindow messages={messages} onSend={jest.fn()} title="Support" />
    );
    expect(
      screen.getByRole('heading', { name: 'Support' })
    ).toBeInTheDocument();
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(screen.getByText('Hi again')).toBeInTheDocument();
  });

  it('sends message via Enter key', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: 'Need help' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).toHaveBeenCalledWith('Need help');
    expect(input).toHaveValue('');
  });

  it('sends message via send button', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: 'Help' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSend).toHaveBeenCalledWith('Help');
  });

  it('does not send empty or whitespace messages', () => {
    const onSend = jest.fn();
    render(<ChatWindow messages={messages} onSend={onSend} />);
    const input = screen.getByRole('textbox', { name: 'Message' });
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSend).not.toHaveBeenCalled();
  });

  it('disables input and button when disabled', () => {
    render(<ChatWindow messages={messages} onSend={jest.fn()} disabled />);
    expect(screen.getByRole('textbox', { name: 'Message' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Send message' })).toBeDisabled();
  });
});

describe('FAQSection', () => {
  const items = [
    { question: 'What is this?', answer: 'A component library.' },
    { question: 'Who made it?', answer: 'The team.' },
  ];

  it('renders title and questions', () => {
    render(<FAQSection items={items} title="Questions" />);
    expect(
      screen.getByRole('heading', { name: 'Questions' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'What is this?' })
    ).toBeInTheDocument();
  });

  it('reveals answers when clicked', () => {
    render(<FAQSection items={items} />);
    expect(screen.queryByText('A component library.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'What is this?' }));
    expect(screen.getByText('A component library.')).toBeInTheDocument();
  });
});

describe('Hero', () => {
  it('renders title, tagline, description, and badge', () => {
    render(
      <Hero
        title="Build faster"
        tagline="Productivity"
        description="Ship UI quickly."
        badge="New"
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Build faster' })
    ).toBeInTheDocument();
    expect(screen.getByText('Productivity')).toBeInTheDocument();
    expect(screen.getByText('Ship UI quickly.')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders CTAs as links', () => {
    render(
      <Hero
        title="Build"
        primaryCta={{ label: 'Get started', href: '/signup' }}
        secondaryCta={{ label: 'Learn more', href: '/about' }}
      />
    );
    expect(screen.getByRole('link', { name: 'Get started' })).toHaveClass(
      'btn-primary'
    );
    expect(screen.getByRole('link', { name: 'Learn more' })).toHaveClass(
      'btn-outline'
    );
  });

  it('omits optional sections when not provided', () => {
    render(<Hero title="Build" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.queryByText('New')).not.toBeInTheDocument();
  });
});

describe('NewsletterSection', () => {
  it('renders title, description, and button', () => {
    render(<NewsletterSection />);
    expect(
      screen.getByRole('heading', { name: 'Stay in the loop' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
  });

  it('subscribes with a valid email and calls onSubmit', () => {
    const onSubmit = jest.fn();
    render(<NewsletterSection onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    fireEvent.change(input, { target: { value: 'me@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(onSubmit).toHaveBeenCalledWith('me@example.com');
    expect(screen.getByRole('status')).toHaveTextContent('Subscribed');
  });

  it('shows error for invalid email', () => {
    const onSubmit = jest.fn();
    render(<NewsletterSection onSubmit={onSubmit} />);
    const input = screen.getByRole('textbox', { name: 'Email address' });
    fireEvent.change(input, { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(
      screen.getByText('Enter a valid email address.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
