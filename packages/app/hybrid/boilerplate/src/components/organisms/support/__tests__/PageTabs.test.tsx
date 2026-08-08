import { fireEvent, render, screen } from '@testing-library/react';
import { PageTabs } from '../PageTabs';

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

describe('PageTabs', () => {
  const tabs = [
    { id: 'overview', label: 'Overview', content: <p>Overview panel</p> },
    { id: 'activity', label: 'Activity', content: <p>Activity panel</p> },
  ];

  it('shows the first tab panel by default', () => {
    render(<PageTabs tabs={tabs} />);
    expect(screen.getByText('Overview panel')).toBeInTheDocument();
    expect(screen.queryByText('Activity panel')).not.toBeInTheDocument();
  });

  it('switches the panel when a tab is clicked', () => {
    render(<PageTabs tabs={tabs} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Activity' }));
    expect(screen.getByText('Activity panel')).toBeInTheDocument();
    expect(screen.queryByText('Overview panel')).not.toBeInTheDocument();
  });

  it('respects the controlled value and notifies changes', () => {
    const onChange = jest.fn();
    const { rerender } = render(
      <PageTabs tabs={tabs} value="activity" onChange={onChange} />
    );
    expect(screen.getByText('Activity panel')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: 'Overview' }));
    expect(onChange).toHaveBeenCalledWith('overview');
    rerender(<PageTabs tabs={tabs} value="overview" onChange={onChange} />);
    expect(screen.getByText('Overview panel')).toBeInTheDocument();
  });

  it('renders an empty panel for an unknown default value', () => {
    const { container } = render(
      <PageTabs tabs={tabs} defaultValue="missing" />
    );
    expect(container.querySelector('[role="tabpanel"]')).toBeEmptyDOMElement();
  });
});
