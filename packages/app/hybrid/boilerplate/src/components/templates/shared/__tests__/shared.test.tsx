import { fireEvent, render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';
import { ComingSoonTemplate } from '../ComingSoonTemplate';
import { CookieConsentTemplate } from '../CookieConsentTemplate';
import { ErrorTemplate } from '../ErrorTemplate';
import { GlobalErrorTemplate } from '../GlobalErrorTemplate';
import { MaintenanceTemplate } from '../MaintenanceTemplate';
import { NotFoundTemplate } from '../NotFoundTemplate';
import { OnboardingTemplate } from '../OnboardingTemplate';
import { PageShell } from '../PageShell';
import { SearchTemplate } from '../SearchTemplate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}));

describe('PageShell', () => {
  it('renders title, subtitle, and children', () => {
    render(
      <PageShell title="Dashboard" subtitle="Overview">
        Content
      </PageShell>
    );
    expect(
      screen.getByRole('heading', { name: 'Dashboard' })
    ).toBeInTheDocument();
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders back link and header action', () => {
    render(
      <PageShell
        title="Dashboard"
        backHref="/"
        headerAction={<button>Go</button>}>
        Content
      </PageShell>
    );
    expect(screen.getByText('Go')).toBeInTheDocument();
    expect(document.querySelector('a[href="/"]')).toBeInTheDocument();
  });

  it('renders nav items and applies custom className', () => {
    render(
      <PageShell
        title="Dashboard"
        className="custom"
        navItems={[{ label: 'Home', href: '/' }]}>
        Content
      </PageShell>
    );
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(document.querySelector('.custom')).toBeInTheDocument();
  });

  it('does not render nav without items', () => {
    render(<PageShell title="Dashboard">Content</PageShell>);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});

describe('AboutTemplate', () => {
  it('renders name, description, items, and version', () => {
    render(
      <AboutTemplate
        name="My App"
        description="A description"
        version="1.0.0"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Router', value: 'App Router' },
        ]}
      />
    );
    expect(screen.getByRole('heading', { name: 'My App' })).toBeInTheDocument();
    expect(screen.getByText('A description')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

describe('ComingSoonTemplate', () => {
  it('renders headline and waitlist form', () => {
    render(<ComingSoonTemplate />);
    expect(screen.getByText('Something great is coming')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('does not subscribe without email', () => {
    render(<ComingSoonTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(screen.queryByText("You're on the list!")).not.toBeInTheDocument();
  });

  it('subscribes when email is entered', () => {
    render(<ComingSoonTemplate />);
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
      target: { value: 'user@test.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(screen.getByText("You're on the list!")).toBeInTheDocument();
  });

  it('links to sign-up for early access', () => {
    render(<ComingSoonTemplate />);
    expect(
      screen.getByRole('link', { name: 'Get early access' })
    ).toHaveAttribute('href', '/sign-up');
  });
});

describe('CookieConsentTemplate', () => {
  it('renders consent banner', () => {
    render(<CookieConsentTemplate />);
    expect(screen.getByText('This site uses cookies')).toBeInTheDocument();
  });

  it('dismisses on accept', () => {
    render(<CookieConsentTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));
    expect(
      screen.queryByText('This site uses cookies')
    ).not.toBeInTheDocument();
  });

  it('dismisses on close button', () => {
    const { container } = render(<CookieConsentTemplate />);
    const closeButton = container.querySelector('button.btn-ghost')!;
    fireEvent.click(closeButton);
    expect(
      screen.queryByText('This site uses cookies')
    ).not.toBeInTheDocument();
  });

  it('links to privacy policy', () => {
    render(<CookieConsentTemplate />);
    expect(
      screen.getByRole('link', { name: 'Privacy Policy' })
    ).toHaveAttribute('href', '/privacy');
  });
});

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(<ErrorTemplate code="500" description="Something went wrong" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('renders action node', () => {
    render(<ErrorTemplate code="404" action={<button>Go home</button>} />);
    expect(screen.getByRole('button', { name: 'Go home' })).toBeInTheDocument();
  });

  it('omits optional sections when absent', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('GlobalErrorTemplate', () => {
  it('renders reset button and calls reset', () => {
    const reset = jest.fn();
    render(<GlobalErrorTemplate error={new Error('boom')} reset={reset} />);
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
    expect(reset).toHaveBeenCalledTimes(1);
  });
});

describe('MaintenanceTemplate', () => {
  it('renders heading and notify form', () => {
    render(<MaintenanceTemplate />);
    expect(screen.getByText("We'll be back shortly")).toBeInTheDocument();
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument();
  });

  it('shows confirmation after notify', () => {
    render(<MaintenanceTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Notify me/ }));
    expect(
      screen.getByText("We'll email you when we're back.")
    ).toBeInTheDocument();
  });

  it('links to contact support', () => {
    render(<MaintenanceTemplate />);
    expect(
      screen.getByRole('link', { name: /Contact support/ })
    ).toHaveAttribute('href', '/');
  });
});

describe('NotFoundTemplate', () => {
  it('renders default code and message', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page not found')).toBeInTheDocument();
  });

  it('renders custom code and message', () => {
    render(<NotFoundTemplate code={418} message="I am a teapot" />);
    expect(screen.getByText('418')).toBeInTheDocument();
    expect(screen.getByText('I am a teapot')).toBeInTheDocument();
  });

  it('navigates back on go back', () => {
    const back = jest.spyOn(window.history, 'back');
    render(<NotFoundTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Go back/ }));
    expect(back).toHaveBeenCalledTimes(1);
  });

  it('links home', () => {
    render(<NotFoundTemplate />);
    expect(screen.getByRole('link', { name: /Go home/ })).toHaveAttribute(
      'href',
      '/'
    );
  });
});

describe('OnboardingTemplate', () => {
  it('shows first step by default', () => {
    render(<OnboardingTemplate />);
    expect(screen.getByText('Create your profile')).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('hides back button on first step', () => {
    render(<OnboardingTemplate />);
    expect(screen.getByRole('button', { name: /Back/ })).toHaveClass(
      'invisible'
    );
  });

  it('advances to preferences step', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Set your preferences')).toBeInTheDocument();
    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  it('updates profile fields and returns to previous step', () => {
    render(<OnboardingTemplate />);
    fireEvent.change(screen.getByPlaceholderText('Jane Doe'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'developer' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Back/ }));
    expect(screen.getByPlaceholderText('Jane Doe')).toHaveValue('John Doe');
    expect(screen.getByRole('combobox')).toHaveValue('developer');
  });

  it('toggles preference checkboxes', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    const toggles = screen.getAllByRole('checkbox');
    fireEvent.click(toggles[0]);
    fireEvent.click(toggles[1]);
    expect(toggles[0]).not.toBeChecked();
    expect(toggles[1]).toBeChecked();
  });

  it('reaches explore step and finishes onboarding', () => {
    render(<OnboardingTemplate />);
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    fireEvent.click(screen.getByRole('button', { name: /Next/ }));
    expect(screen.getByText('Explore the app')).toBeInTheDocument();
    expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Finish' }));
    expect(screen.getByText('All set!')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Go to dashboard' })
    ).toBeInTheDocument();
  });
});

describe('SearchTemplate', () => {
  it('shows recent searches when query is empty', () => {
    render(<SearchTemplate />);
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
    expect(screen.getAllByText('Settings').length).toBeGreaterThan(0);
  });

  it('shows matching results for query', () => {
    render(<SearchTemplate />);
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'Profile' },
      }
    );
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    expect(screen.queryByText('Pricing Plans')).not.toBeInTheDocument();
  });

  it('shows no results state for unmatched query', () => {
    render(<SearchTemplate />);
    fireEvent.change(
      screen.getByPlaceholderText('Search pages, settings, and more...'),
      {
        target: { value: 'zzz' },
      }
    );
    expect(screen.getByText(/No results for/)).toBeInTheDocument();
  });

  it('clears query with clear button', () => {
    render(<SearchTemplate />);
    const input = screen.getByPlaceholderText(
      'Search pages, settings, and more...'
    );
    fireEvent.change(input, { target: { value: 'Store' } });
    fireEvent.click(screen.getByRole('button'));
    expect(input).toHaveValue('');
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
  });
});
