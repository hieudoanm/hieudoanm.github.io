import { fireEvent, render, screen } from '@testing-library/react';
import { FiHome, FiUser } from 'react-icons/fi';
import { BlogSection } from '../BlogSection';
import { ChatWindow } from '../ChatWindow';
import { ContactSection } from '../ContactSection';
import { CTASection } from '../CTASection';
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
import { TeamSection } from '../TeamSection';
import { TestimonialSection } from '../TestimonialSection';
import { Toolbar } from '../Toolbar';
import { ActivityFeed } from '../ActivityFeed';
import { AnnouncementBar } from '../AnnouncementBar';
import { AuthForm } from '../AuthForm';
import { CommandMenu } from '../CommandMenu';
import { CookieBanner } from '../CookieBanner';
import { LogosSection } from '../LogosSection';
import { Marquee } from '../Marquee';
import { ProfileCard } from '../ProfileCard';

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

describe('CTASection', () => {
  it('renders title, description, and badge', () => {
    render(
      <CTASection title="Ship faster" description="Start today." badge="New" />
    );
    expect(screen.getByText('Ship faster')).toBeInTheDocument();
    expect(screen.getByText('Start today.')).toBeInTheDocument();
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders primary and secondary CTAs as links', () => {
    render(
      <CTASection
        title="Ship faster"
        primaryCta={{ label: 'Get started', href: '/signup' }}
        secondaryCta={{ label: 'Read docs', href: '/docs' }}
      />
    );
    expect(screen.getByText('Get started')).toHaveAttribute('href', '/signup');
    expect(screen.getByText('Read docs')).toHaveAttribute('href', '/docs');
    expect(screen.getByText('Get started')).toHaveClass('btn-primary');
    expect(screen.getByText('Read docs')).toHaveClass('btn-outline');
  });

  it('renders no CTA block when both are missing', () => {
    render(<CTASection title="Ship faster" />);
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});

describe('TestimonialSection', () => {
  const items = [
    { quote: 'Amazing product.', author: 'Ada Lovelace', role: 'Engineer' },
    { quote: 'Love it.', author: 'Grace Hopper' },
  ];

  it('renders title, quotes, authors, and roles', () => {
    render(<TestimonialSection items={items} title="What they say" />);
    expect(screen.getByText('What they say')).toBeInTheDocument();
    expect(screen.getByText('“Amazing product.”')).toBeInTheDocument();
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Grace Hopper')).toBeInTheDocument();
  });

  it('falls back to initials from author name', () => {
    render(
      <TestimonialSection items={[{ quote: 'x', author: 'Ada Lovelace' }]} />
    );
    expect(screen.getByText('AD')).toBeInTheDocument();
  });

  it('applies 2-column layout when columns is 2', () => {
    const { container } = render(
      <TestimonialSection items={items} columns={2} />
    );
    expect(container.querySelector('.md\\:grid-cols-2')).toBeInTheDocument();
  });
});

describe('TeamSection', () => {
  const members = [
    { name: 'Alan Turing', role: 'Founder', bio: 'Math genius.' },
    { name: 'Katherine Johnson' },
  ];

  it('renders title and members', () => {
    render(<TeamSection members={members} title="Leadership" />);
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Alan Turing')).toBeInTheDocument();
    expect(screen.getByText('Founder')).toBeInTheDocument();
    expect(screen.getByText('Math genius.')).toBeInTheDocument();
  });

  it('renders member initials', () => {
    render(<TeamSection members={members} />);
    expect(screen.getByText('AL')).toBeInTheDocument();
    expect(screen.getByText('KA')).toBeInTheDocument();
  });
});

describe('BlogSection', () => {
  const posts = [
    {
      id: '1',
      title: 'Announcing v2',
      excerpt: 'Big release.',
      date: 'Jan 2026',
      tag: 'Release',
    },
    { id: '2', title: 'How we test' },
  ];

  it('renders posts with tag, excerpt, and date', () => {
    render(<BlogSection posts={posts} />);
    expect(screen.getByText('Latest posts')).toBeInTheDocument();
    expect(screen.getByText('Announcing v2')).toBeInTheDocument();
    expect(screen.getByText('Big release.')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026')).toBeInTheDocument();
    expect(screen.getByText('Release')).toBeInTheDocument();
  });

  it('renders posts without optional fields', () => {
    render(<BlogSection posts={posts} title="Updates" />);
    expect(screen.getByText('Updates')).toBeInTheDocument();
    expect(screen.getByText('How we test')).toBeInTheDocument();
    expect(screen.getByText('Jan 2026').tagName).toBe('TIME');
  });
});

describe('ContactSection', () => {
  it('renders title, description, and form fields', () => {
    render(
      <ContactSection title="Get in touch" description="We reply fast." />
    );
    expect(screen.getByText('Get in touch')).toBeInTheDocument();
    expect(screen.getByText('We reply fast.')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
  });

  it('submits valid data and calls onSubmit', () => {
    const onSubmit = jest.fn();
    render(<ContactSection onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@example.com',
      message: 'Hello',
    });
    expect(screen.getByRole('status')).toHaveTextContent('Message sent');
  });

  it('shows error for empty fields', () => {
    const onSubmit = jest.fn();
    render(<ContactSection onSubmit={onSubmit} />);
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Please fill in all fields with a valid email.')
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects invalid email', () => {
    render(<ContactSection />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'nope' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Message' }), {
      target: { value: 'Hi' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }));
    expect(
      screen.getByText('Please fill in all fields with a valid email.')
    ).toBeInTheDocument();
  });
});

describe('AnnouncementBar', () => {
  it('renders text and an optional link', () => {
    render(
      <AnnouncementBar
        text="Early bird sale"
        link={{ label: 'Shop now', href: '/shop' }}
      />
    );
    expect(screen.getByText('Early bird sale')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: 'Shop now' });
    expect(link).toHaveAttribute('href', '/shop');
  });

  it('renders without a dismiss button by default', () => {
    render(<AnnouncementBar text="Hello" />);
    expect(
      screen.queryByRole('button', { name: 'Dismiss announcement' })
    ).not.toBeInTheDocument();
  });

  it('dismisses and calls onDismiss', () => {
    const onDismiss = jest.fn();
    render(<AnnouncementBar text="Hello" dismissible onDismiss={onDismiss} />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Dismiss announcement' })
    );
    expect(onDismiss).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Hello')).not.toBeInTheDocument();
  });

  it('applies the neutral variant class', () => {
    const { container } = render(
      <AnnouncementBar text="Hello" variant="neutral" />
    );
    expect(container.firstChild).toHaveClass('bg-neutral');
  });
});

describe('CookieBanner', () => {
  it('renders message, policy link, and buttons', () => {
    render(<CookieBanner onAccept={jest.fn()} onDecline={jest.fn()} />);
    expect(screen.getByText(/We use cookies/)).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Privacy policy' })
    ).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
  });

  it('calls onAccept and hides the banner', () => {
    const onAccept = jest.fn();
    render(<CookieBanner onAccept={onAccept} onDecline={jest.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByRole('button', { name: 'Accept' })
    ).not.toBeInTheDocument();
  });

  it('calls onDecline on decline', () => {
    const onDecline = jest.fn();
    render(<CookieBanner onAccept={jest.fn()} onDecline={onDecline} />);
    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));
    expect(onDecline).toHaveBeenCalledTimes(1);
  });
});

describe('CommandMenu', () => {
  const items = [
    {
      id: 'nav',
      label: 'Go to settings',
      description: 'Open preferences',
      group: 'Navigation',
    },
    { id: 'theme', label: 'Toggle theme', keywords: ['dark', 'light'] },
  ];

  it('returns null when closed', () => {
    const { container } = render(
      <CommandMenu open={false} onClose={jest.fn()} items={items} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders items and search input when open', () => {
    render(<CommandMenu open onClose={jest.fn()} items={items} />);
    expect(
      screen.getByRole('dialog', { name: 'Command menu' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Search commands' })
    ).toBeInTheDocument();
    expect(screen.getByText('Go to settings')).toBeInTheDocument();
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('filters by label and keywords', () => {
    render(<CommandMenu open onClose={jest.fn()} items={items} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Search commands' }), {
      target: { value: 'dark' },
    });
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
    expect(screen.queryByText('Go to settings')).not.toBeInTheDocument();
  });

  it('selects an item on click', () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    render(
      <CommandMenu
        open
        onClose={onClose}
        items={[{ id: 'nav', label: 'Go to settings', onSelect }]}
      />
    );
    fireEvent.click(screen.getByText('Go to settings'));
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('navigates with arrow keys and selects with Enter', () => {
    const first = jest.fn();
    const second = jest.fn();
    render(
      <CommandMenu
        open
        onClose={jest.fn()}
        items={[
          { id: 'a', label: 'Alpha', onSelect: first },
          { id: 'b', label: 'Beta', onSelect: second },
        ]}
      />
    );
    fireEvent.keyDown(document, { key: 'ArrowDown' });
    fireEvent.keyDown(document, { key: 'Enter' });
    expect(second).toHaveBeenCalledTimes(1);
  });

  it('closes on Escape', () => {
    const onClose = jest.fn();
    render(<CommandMenu open onClose={onClose} items={items} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes via backdrop', () => {
    const onClose = jest.fn();
    render(<CommandMenu open onClose={onClose} items={items} />);
    fireEvent.click(screen.getByRole('button', { name: 'Close command menu' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe('AuthForm', () => {
  it('renders sign in fields and subtitle', () => {
    render(<AuthForm onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Sign in' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('submits login payload', () => {
    const onSubmit = jest.fn();
    render(<AuthForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'ada@example.com',
      password: 'secret1',
    });
  });

  it('renders name field in signup mode', () => {
    render(<AuthForm mode="signup" onSubmit={jest.fn()} />);
    expect(
      screen.getByRole('heading', { name: 'Create account' })
    ).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
  });

  it('requires a name in signup mode', () => {
    const onSubmit = jest.fn();
    render(<AuthForm mode="signup" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(screen.getByText('Please fill in all fields.')).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('rejects invalid email and short password', () => {
    const onSubmit = jest.fn();
    render(<AuthForm mode="signup" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'nope' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(
      screen.getByText(
        'Enter a valid email and a password of at least 6 characters.'
      )
    ).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('submits signup payload with trimmed name', () => {
    const onSubmit = jest.fn();
    render(<AuthForm mode="signup" onSubmit={onSubmit} />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'Ada' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'ada@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'secret1' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));
    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Ada',
      email: 'ada@example.com',
      password: 'secret1',
    });
  });

  it('shows an external error', () => {
    render(<AuthForm onSubmit={jest.fn()} error="Invalid credentials" />);
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
  });
});

describe('Marquee', () => {
  it('duplicates the items twice', () => {
    const { container } = render(
      <Marquee
        items={[<span key="1">React</span>, <span key="2">Vue</span>]}
        title="Stack"
      />
    );
    expect(screen.getByRole('heading', { name: 'Stack' })).toBeInTheDocument();
    expect(container.querySelectorAll('.animate-marquee > div')).toHaveLength(
      4
    );
  });
});

describe('LogosSection', () => {
  it('renders names with the default title', () => {
    render(<LogosSection items={[{ name: 'Acme' }, { name: 'Globex' }]} />);
    expect(screen.getByText('Trusted by teams')).toBeInTheDocument();
    expect(screen.getByText('Acme')).toBeInTheDocument();
    expect(screen.getByText('Globex')).toBeInTheDocument();
  });

  it('applies the column grid class', () => {
    const { container } = render(
      <LogosSection items={[{ name: 'Acme' }]} columns={3} />
    );
    expect(container.querySelector('.grid')).toHaveClass('grid-cols-3');
  });
});

describe('ProfileCard', () => {
  it('renders name, role, bio, badges, and stats', () => {
    render(
      <ProfileCard
        name="Ada Lovelace"
        role="Engineer"
        bio="Writes the future."
        badges={['Fellow', 'Founder']}
        stats={[
          { label: 'Posts', value: '12' },
          { label: 'Following', value: '34' },
          { label: 'Followers', value: '56' },
        ]}
      />
    );
    expect(screen.getByText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
    expect(screen.getByText('Writes the future.')).toBeInTheDocument();
    expect(screen.getByText('Fellow')).toBeInTheDocument();
    expect(screen.getByText('Posts')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(<ProfileCard name="Ada" actions={<button>Follow</button>} />);
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
  });
});

describe('ActivityFeed', () => {
  it('renders title, items, and times', () => {
    render(
      <ActivityFeed
        title="Recent activity"
        items={[
          {
            id: '1',
            title: 'Deployed v2',
            description: 'Production build',
            time: '2h ago',
            status: 'success',
          },
        ]}
      />
    );
    expect(screen.getByText('Recent activity')).toBeInTheDocument();
    expect(screen.getByText('Deployed v2')).toBeInTheDocument();
    expect(screen.getByText('Production build')).toBeInTheDocument();
    expect(screen.getByText('2h ago')).toBeInTheDocument();
  });

  it('renders an icon node instead of a status dot', () => {
    const { container } = render(
      <ActivityFeed
        items={[{ id: '1', title: 'Pushed', icon: <span data-testid="ico" /> }]}
      />
    );
    expect(container.querySelector('.bg-success')).not.toBeInTheDocument();
    expect(screen.getByText('Pushed')).toBeInTheDocument();
  });
});
