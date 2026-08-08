import { fireEvent, render, screen } from '@testing-library/react';
import { FAQSection } from '../FAQSection';

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

describe('FAQSection', () => {
  const items = [
    { question: 'What is this?', answer: 'A component library.' },
    { question: 'Who made it?', answer: 'The team.' },
  ];

  it('renders title and questions', () => {
    render(<FAQSection items={items} title="Questions" />);
    expect(
      screen.getByRole('heading', { name: 'Questions' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'What is this?' })
    ).toBeInTheDocument();
  });

  it('reveals answers when clicked', () => {
    render(<FAQSection items={items} />);
    expect(screen.queryByText('A component library.')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'What is this?' }));
    expect(screen.getByText('A component library.')).toBeInTheDocument();
  });
});
