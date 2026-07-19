import { render, screen } from '@testing-library/react';
import { ProcessSection } from '../ProcessSection';

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

describe('ProcessSection', () => {
  const steps = [
    { id: '1', title: 'Plan', description: 'Define scope' },
    { id: '2', title: 'Build', description: 'Implement' },
    { id: '3', title: 'Ship' },
  ];

  it('renders the title and step names', () => {
    render(<ProcessSection title="Flow" steps={steps} />);
    expect(screen.getByRole('heading', { name: 'Flow' })).toBeInTheDocument();
    expect(screen.getByText('Plan')).toBeInTheDocument();
    expect(screen.getByText('Ship')).toBeInTheDocument();
  });

  it('renders step descriptions with step numbers', () => {
    render(<ProcessSection steps={steps} />);
    expect(screen.getByText('Step 1 — Define scope')).toBeInTheDocument();
    expect(screen.getByText('Step 2 — Implement')).toBeInTheDocument();
  });

  it('marks completed steps with a primary class', () => {
    render(<ProcessSection steps={steps} current="2" />);
    const planStep = screen.getByText('Plan').closest('li');
    const buildStep = screen.getByText('Build').closest('li');
    expect(planStep).toHaveClass('step-primary');
    expect(buildStep).toHaveClass('step-primary');
  });
});
