import { render, screen } from '@testing-library/react';
import { AuthorProfile } from '../AuthorProfile';

describe('AuthorProfile', () => {
  it('renders name, role, and initials', () => {
    render(
      <AuthorProfile
        name="Jane Doe"
        role="Senior Editor"
        initials="JD"
        stats={{ articles: 42, followers: 120, following: 10 }}
      />
    );
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
    expect(screen.getByText('Senior Editor')).toBeInTheDocument();
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders stats when provided', () => {
    render(
      <AuthorProfile
        name="Jane Doe"
        role="Editor"
        stats={{ articles: 42, followers: 120, following: 10 }}
      />
    );
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
  });

  it('defaults to first letter when no initials', () => {
    render(<AuthorProfile name="Bob" role="Writer" />);
    expect(screen.getByText('B')).toBeInTheDocument();
  });
});
