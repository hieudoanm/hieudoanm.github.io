import { render, screen, fireEvent, act } from '@testing-library/react';
import { VersionTemplate } from '../VersionTemplate';

beforeEach(() => {
  jest.useFakeTimers();
  Object.assign(navigator, {
    clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
  });
});

afterEach(() => {
  jest.useRealTimers();
});

describe('VersionTemplate', () => {
  it('renders version label', () => {
    render(<VersionTemplate version="2026.08.17.12.00.00" />);
    expect(screen.getByText('Nikoli Version')).toBeInTheDocument();
  });

  it('renders version segments', () => {
    render(<VersionTemplate version="2026.08.17.12.00.00" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('17')).toBeInTheDocument();
  });

  it('renders Copy version button', () => {
    render(<VersionTemplate version="2026.08.17" />);
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('copies version to clipboard on click', async () => {
    render(<VersionTemplate version="2026.08.17" />);
    fireEvent.click(screen.getByText('Copy version'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('2026.08.17');
  });

  it('shows Copied after copy', async () => {
    render(<VersionTemplate version="2026.08.17" />);
    fireEvent.click(screen.getByText('Copy version'));
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });

  it('renders format hint', () => {
    render(<VersionTemplate version="2026.08.17" />);
    expect(screen.getByText('Format: YYYY.MM.DD.hh.mm.ss')).toBeInTheDocument();
  });

  it('renders Stable badge', () => {
    render(<VersionTemplate version="2026.08.17" />);
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });

  it('renders plain version when no segments', () => {
    render(<VersionTemplate version="abc" />);
    expect(screen.getByText('abc', { selector: 'p' })).toBeInTheDocument();
  });
});
