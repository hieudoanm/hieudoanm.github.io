import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('Header', () => {
  it('renders menu button', () => {
    const onMenuToggle = jest.fn();
    render(<Header onMenuToggle={onMenuToggle} />);
    expect(screen.getByLabelText('Toggle menu')).toBeTruthy();
  });

  it('calls onMenuToggle when menu button clicked', () => {
    const onMenuToggle = jest.fn();
    render(<Header onMenuToggle={onMenuToggle} />);
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(onMenuToggle).toHaveBeenCalled();
  });

  it('renders profile link', () => {
    render(<Header />);
    const profileLinks = screen.getAllByRole('link');
    expect(profileLinks.length).toBeGreaterThan(0);
  });
});
