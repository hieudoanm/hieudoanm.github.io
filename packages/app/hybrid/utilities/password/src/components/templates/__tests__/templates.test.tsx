import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('AboutTemplate', () => {
  it('renders name, description, version and info rows', () => {
    render(
      <AboutTemplate
        name="Password"
        description="Secure password manager"
        version="v0.0.1"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Language', value: 'TypeScript' },
        ]}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Password' })
    ).toBeInTheDocument();
    expect(screen.getByText('Secure password manager')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

describe('ErrorTemplate', () => {
  it('renders code, description and action', () => {
    render(
      <ErrorTemplate
        code="500"
        description="Something went wrong."
        action={<button>Try again</button>}
      />
    );
    expect(screen.getByRole('heading', { name: '500' })).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Try again' })
    ).toBeInTheDocument();
  });

  it('renders only the code when description and action are omitted', () => {
    render(<ErrorTemplate code="404" />);
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong.')).not.toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  const originalClipboard = navigator.clipboard;

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  it('renders segmented version parts', () => {
    render(<VersionTemplate version="2026.08.05" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('08')).toBeInTheDocument();
    expect(screen.getByText('05')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('Month')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.getByText('Copy version')).toBeInTheDocument();
  });

  it('renders full timestamp segments including time', () => {
    render(<VersionTemplate version="2026.08.05.12.30.45" />);
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('45')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('renders raw version when it has no segments', () => {
    render(<VersionTemplate version="dev-build" />);
    expect(screen.getAllByText('dev-build').length).toBe(2);
  });

  it('copies the version to clipboard and shows confirmation', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<VersionTemplate version="2026.08.05" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    await waitFor(() =>
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    );
    expect(writeText).toHaveBeenCalledWith('2026.08.05');
  });
});
