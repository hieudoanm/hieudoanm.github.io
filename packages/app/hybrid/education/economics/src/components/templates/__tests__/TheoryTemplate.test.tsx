import { render, screen } from '@testing-library/react';
import { TheoryTemplate } from '@/components/templates/TheoryTemplate';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('TheoryTemplate', () => {
  it('renders title, subtitle and all section headings and bodies', () => {
    render(
      <TheoryTemplate
        title="Test Theory"
        subtitle="A subtitle"
        sections={[
          { title: 'First', body: <p>first body</p> },
          { title: 'Second', body: <p>second body</p> },
        ]}
      />
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Test Theory'
    );
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'First' })
    ).toBeInTheDocument();
    expect(screen.getByText('first body')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Second' })
    ).toBeInTheDocument();
    expect(screen.getByText('second body')).toBeInTheDocument();
  });

  it('renders links when provided', () => {
    render(
      <TheoryTemplate
        title="Linked"
        subtitle="sub"
        sections={[{ title: 'Only', body: <p>body</p> }]}
        links={[
          { href: '/a', label: 'Alpha', description: 'goes to a' },
          { href: '/b', label: 'Beta', description: 'goes to b' },
        ]}
      />
    );
    expect(screen.getByRole('link', { name: /Alpha/ })).toHaveAttribute(
      'href',
      '/a'
    );
    expect(screen.getByText('goes to a')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Beta/ })).toHaveAttribute(
      'href',
      '/b'
    );
  });

  it('does not render a links grid when links is empty', () => {
    render(
      <TheoryTemplate
        title="No links"
        subtitle="sub"
        sections={[{ title: 'Only', body: <p>body</p> }]}
      />
    );
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
