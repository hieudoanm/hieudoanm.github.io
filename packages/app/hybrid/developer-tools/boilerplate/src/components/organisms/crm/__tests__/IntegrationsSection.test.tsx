import { render, screen } from '@testing-library/react';
import { IntegrationsSection } from '../IntegrationsSection';

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

describe('IntegrationsSection', () => {
  it('renders title, description, and items', () => {
    render(
      <IntegrationsSection
        title="Integrations"
        description="Connect your stack"
        items={[{ name: 'GitHub', description: 'Repos' }, { name: 'Slack' }]}
      />
    );
    expect(screen.getByText('Integrations')).toBeInTheDocument();
    expect(screen.getByText('Connect your stack')).toBeInTheDocument();
    expect(screen.getByText('GitHub')).toBeInTheDocument();
    expect(screen.getByText('Repos')).toBeInTheDocument();
    expect(screen.getByText('Slack')).toBeInTheDocument();
  });

  it('renders item icons', () => {
    render(
      <IntegrationsSection items={[{ name: 'GitHub', icon: <span>G</span> }]} />
    );
    expect(screen.getByText('G')).toBeInTheDocument();
  });

  it('applies the requested column count', () => {
    const { container } = render(
      <IntegrationsSection items={[{ name: 'A' }, { name: 'B' }]} columns={2} />
    );
    expect(container.querySelector('.grid')?.getAttribute('style')).toContain(
      'repeat(2, minmax(0, 1fr))'
    );
  });
});
