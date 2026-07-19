import { render, screen } from '@testing-library/react';
import { FiHome, FiUser } from 'react-icons/fi';
import { FeatureGrid } from '../FeatureGrid';

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

describe('FeatureGrid', () => {
  const features = [
    { icon: <FiHome />, title: 'Fast', description: 'Runs quickly' },
    { icon: <FiUser />, title: 'Simple', description: 'Easy to use' },
  ];

  it('renders feature cards', () => {
    render(<FeatureGrid features={features} />);
    expect(screen.getByRole('heading', { name: 'Fast' })).toBeInTheDocument();
    expect(screen.getByText('Runs quickly')).toBeInTheDocument();
    expect(screen.getByText('Simple')).toBeInTheDocument();
  });

  it('applies column grid class', () => {
    const { container } = render(
      <FeatureGrid features={features} columns={2} />
    );
    expect(container.querySelector('.sm\\:grid-cols-2')).toBeInTheDocument();
  });
});
