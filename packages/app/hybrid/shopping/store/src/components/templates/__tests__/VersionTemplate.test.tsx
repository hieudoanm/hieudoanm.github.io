import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VersionTemplate } from '../VersionTemplate';

jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return { __esModule: true, default: MockLink };
});

describe('VersionTemplate', () => {
  it('renders version heading', () => {
    render(<VersionTemplate version="2024.01.15.10.30.00" />);
    expect(screen.getByText('Version')).toBeTruthy();
  });

  it('renders version segments', () => {
    render(<VersionTemplate version="2024.01.15.10.30.00" />);
    expect(screen.getByText('2024')).toBeTruthy();
    expect(screen.getByText('01')).toBeTruthy();
    expect(screen.getByText('15')).toBeTruthy();
  });

  it('renders Copy version button', () => {
    render(<VersionTemplate version="2024.01.15" />);
    expect(screen.getByText('Copy version')).toBeTruthy();
  });

  it('renders format hint', () => {
    render(<VersionTemplate version="2024.01.15" />);
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeTruthy();
  });

  it('renders Stable badge', () => {
    render(<VersionTemplate version="2024.01.15" />);
    expect(screen.getByText('Stable')).toBeTruthy();
  });

  it('renders Current deployment label', () => {
    render(<VersionTemplate version="2024.01.15" />);
    expect(screen.getByText('Current deployment')).toBeTruthy();
  });

  it('renders raw version when no segments', () => {
    render(<VersionTemplate version="unknown" />);
    expect(screen.getAllByText('unknown').length).toBeGreaterThan(0);
  });

  it('copies version to clipboard', async () => {
    const user = userEvent.setup();
    // jsdom doesn't support clipboard API — mock the async function directly
    const mockClipboard = { writeText: jest.fn().mockResolvedValue(undefined) };
    // Override navigator.clipboard via the global prototype
    jest
      .spyOn(global.navigator, 'clipboard', 'get')
      .mockReturnValue(mockClipboard as unknown as Clipboard);
    render(<VersionTemplate version="2024.01.15" />);
    await user.click(screen.getByText('Copy version'));
    expect(mockClipboard.writeText).toHaveBeenCalledWith('2024.01.15');
  });
});
