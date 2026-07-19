import { render, screen } from '@testing-library/react';
import { DataList } from '../DataList';

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

describe('DataList', () => {
  const sections = [
    {
      id: 'server',
      title: 'Server',
      items: [
        { key: 'region', label: 'Region', value: 'ap-southeast-1' },
        { key: 'version', label: 'Version', value: 'v1.2.3' },
      ],
    },
    {
      id: 'limits',
      title: 'Limits',
      items: [{ key: 'storage', label: 'Storage', value: '10 GB' }],
    },
  ];

  it('renders section titles, labels, and values', () => {
    render(<DataList sections={sections} />);
    expect(screen.getByText('Server')).toBeInTheDocument();
    expect(screen.getByText('Region')).toBeInTheDocument();
    expect(screen.getByText('ap-southeast-1')).toBeInTheDocument();
    expect(screen.getByText('Limits')).toBeInTheDocument();
    expect(screen.getByText('10 GB')).toBeInTheDocument();
  });

  it('renders nothing when there are no sections', () => {
    const { container } = render(<DataList sections={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
