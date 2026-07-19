import { fireEvent, render, screen } from '@testing-library/react';
import { NewsletterSection } from '../NewsletterSection';

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

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const { usePathname } = jest.requireMock('next/navigation');

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
