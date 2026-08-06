import { fireEvent, render, screen } from '@testing-library/react';
import { BlogArchiveTemplate } from '../BlogArchiveTemplate';
import { BlogAuthorTemplate } from '../BlogAuthorTemplate';
import { BlogNewsletterTemplate } from '../BlogNewsletterTemplate';
import ArchivePage from '@/app/(main)/blog/archive/page';
import AuthorPage from '@/app/(main)/blog/author/page';
import NewsletterPage from '@/app/(main)/blog/newsletter/page';

describe('BlogArchiveTemplate', () => {
  it('renders featured post, grid, and month archive', () => {
    render(<BlogArchiveTemplate />);
    expect(
      screen.getByRole('heading', { name: 'Blog Archive' })
    ).toBeInTheDocument();
    expect(screen.getByText('8 posts found')).toBeInTheDocument();
    expect(screen.getByText('Building a Design System')).toBeInTheDocument();
    expect(screen.getByText('GraphQL vs REST in 2023')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'January 2024 (3)' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'June 2023 (1)' })
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('all');
  });

  it('filters posts by year', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2024' },
    });
    expect(screen.getByText('5 posts found')).toBeInTheDocument();
    expect(
      screen.queryByText('GraphQL vs REST in 2023')
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'January 2024 (3)' })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'November 2023 (2)' })
    ).not.toBeInTheDocument();
  });

  it('filters posts by month and toggles back off', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'March 2024 (2)' }));
    expect(screen.getByText('2 posts found')).toBeInTheDocument();
    expect(
      screen.getByText('A Deep Dive into Server Components')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Building a Design System')
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'March 2024 (2)' }));
    expect(screen.getByText('8 posts found')).toBeInTheDocument();
  });

  it('shows only the featured card when a month has one post', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'June 2023 (1)' }));
    expect(screen.getByText('1 post found')).toBeInTheDocument();
    expect(screen.getByText('GraphQL vs REST in 2023')).toBeInTheDocument();
    expect(
      screen.queryByText('Writing CLI Tools in Rust')
    ).not.toBeInTheDocument();
  });

  it('shows empty state when no posts match the filters', () => {
    render(<BlogArchiveTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'January 2024 (3)' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: '2023' },
    });
    expect(screen.getByText('No posts found')).toBeInTheDocument();
    expect(screen.getByText('0 posts found')).toBeInTheDocument();
  });
});

describe('BlogAuthorTemplate', () => {
  it('renders profile, social links, and posts list', () => {
    render(<BlogAuthorTemplate />);
    expect(screen.getByText('JD')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Staff Engineer')).toBeInTheDocument();
    expect(
      screen.getByText(/Jane writes about design systems/)
    ).toBeInTheDocument();
    expect(screen.getByText('Posts by Jane Doe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Twitter' })).toHaveAttribute(
      'href',
      'https://twitter.com/janedoe'
    );
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/janedoe'
    );
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      'https://linkedin.com/in/janedoe'
    );
    expect(screen.getAllByRole('link', { name: /Read post/ })).toHaveLength(3);
    expect(
      screen.getByRole('link', { name: /Building a Design System/ })
    ).toHaveAttribute('href', '/blog/building-a-design-system');
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
  });

  it('toggles follow state and updates the badge', () => {
    render(<BlogAuthorTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Follow' }));
    expect(
      screen.getByRole('button', { name: 'Following' })
    ).toBeInTheDocument();
    expect(screen.getAllByText('Following')).toHaveLength(2);
    expect(screen.queryByText('Author')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Following' }));
    expect(screen.getByRole('button', { name: 'Follow' })).toBeInTheDocument();
    expect(screen.getByText('Author')).toBeInTheDocument();
  });
});

describe('BlogNewsletterTemplate', () => {
  it('renders the subscribe form', () => {
    render(<BlogNewsletterTemplate />);
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows an error for an empty email', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows an error for an invalid email', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'not-an-email' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid email');
  });

  it('shows the success panel after subscribing', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    expect(screen.getByText("You're subscribed!")).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Manage preferences')).toBeInTheDocument();
    expect(
      screen.getByText('Newsletter frequency: Weekly')
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('Weekly');
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });

  it('updates the frequency preference', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'Daily' },
    });
    expect(screen.getByText('Newsletter frequency: Daily')).toBeInTheDocument();
  });

  it('returns to the form after unsubscribing', () => {
    render(<BlogNewsletterTemplate />);
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Subscribe' }));
    fireEvent.click(screen.getByRole('button', { name: 'Unsubscribe' }));
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveValue('');
  });
});

describe('Blog pages', () => {
  it('renders the archive page', () => {
    render(<ArchivePage />);
    expect(
      screen.getByRole('heading', { name: 'Blog Archive' })
    ).toBeInTheDocument();
    expect(screen.getByText('Building a Design System')).toBeInTheDocument();
  });

  it('renders the author page', () => {
    render(<AuthorPage />);
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Posts by Jane Doe')).toBeInTheDocument();
  });

  it('renders the newsletter page', () => {
    render(<NewsletterPage />);
    expect(screen.getByText('Subscribe to the newsletter')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Subscribe' })
    ).toBeInTheDocument();
  });
});
