import { fireEvent, render, screen } from '@testing-library/react';
import { FaqAccordion } from '../FaqAccordion';

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

describe('FaqAccordion', () => {
  const items = [
    { id: 'a', question: 'How to install?', answer: 'Run pnpm install.' },
    { id: 'b', question: 'Is it free?', answer: 'Yes, MIT licensed.' },
  ];

  it('opens the first item by default', () => {
    render(<FaqAccordion items={items} />);
    expect(screen.getByText('Run pnpm install.')).toBeInTheDocument();
  });

  it('switches and closes items on click', () => {
    render(<FaqAccordion items={items} />);
    fireEvent.click(screen.getByRole('button', { name: /Is it free/ }));
    expect(screen.getByText('Yes, MIT licensed.')).toBeInTheDocument();
    expect(screen.queryByText('Run pnpm install.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Is it free/ }));
    expect(screen.queryByText('Yes, MIT licensed.')).not.toBeInTheDocument();
  });

  it('renders the title, description, and numbered questions', () => {
    render(
      <FaqAccordion items={items} title="FAQ" description="Common questions" />
    );
    expect(screen.getByText('FAQ')).toBeInTheDocument();
    expect(screen.getByText('Common questions')).toBeInTheDocument();
    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
  });

  it('opens nothing when there are no items', () => {
    render(<FaqAccordion items={[]} />);
    expect(screen.queryByText('01')).not.toBeInTheDocument();
  });
});
