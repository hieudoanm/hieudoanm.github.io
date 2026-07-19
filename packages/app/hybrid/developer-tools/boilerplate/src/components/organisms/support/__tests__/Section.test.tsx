import { render, screen } from '@testing-library/react';
import { Section } from '../Section';

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

describe('Section', () => {
  it('renders title and description', () => {
    render(<Section title="Features" description="Everything you need" />);
    expect(
      screen.getByRole('heading', { name: 'Features' })
    ).toBeInTheDocument();
    expect(screen.getByText('Everything you need')).toBeInTheDocument();
  });

  it('renders eyebrow, action, and children', () => {
    render(
      <Section
        eyebrow="New"
        title="Features"
        action={<button type="button">Action</button>}>
        <p>Body</p>
      </Section>
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('aligns content to the center', () => {
    const { container } = render(<Section title="Features" align="center" />);
    const header = container.querySelector('section > div') as HTMLElement;
    expect(header).toHaveClass('items-center', 'text-center');
  });
});
