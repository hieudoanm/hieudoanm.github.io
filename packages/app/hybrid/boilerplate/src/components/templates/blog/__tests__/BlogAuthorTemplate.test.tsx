import { fireEvent, render, screen } from '@testing-library/react';
import { BlogAuthorTemplate } from '../BlogAuthorTemplate';

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
