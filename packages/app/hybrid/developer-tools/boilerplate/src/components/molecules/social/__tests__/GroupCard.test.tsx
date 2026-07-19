import { render, screen } from '@testing-library/react';
import { GroupCard } from '../GroupCard';

describe('GroupCard', () => {
  it('renders name and member count', () => {
    render(<GroupCard name="React Devs" members={1200} />);
    expect(screen.getByText('React Devs')).toBeInTheDocument();
    expect(screen.getByText('1200 members')).toBeInTheDocument();
  });

  it('renders description when provided', () => {
    render(
      <GroupCard name="React Devs" members={1} description="Share tips" />
    );
    expect(screen.getByText('Share tips')).toBeInTheDocument();
  });

  it('renders category when provided', () => {
    render(<GroupCard name="React Devs" members={1} category="Tech" />);
    expect(screen.getByText('Tech')).toBeInTheDocument();
  });
});
