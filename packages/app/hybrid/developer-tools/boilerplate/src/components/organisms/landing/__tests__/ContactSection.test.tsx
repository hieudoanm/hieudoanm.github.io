import { fireEvent, render, screen } from '@testing-library/react';
import { ContactSection } from '../ContactSection';

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
