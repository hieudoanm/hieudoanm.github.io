import { render, screen, fireEvent, act } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';
import { ErrorTemplate } from '../ErrorTemplate';
import { PageTransition } from '../PageTransition';
import { VersionTemplate } from '../VersionTemplate';

describe('AboutTemplate', () => {
  it('renders name, description and items', () => {
    render(
      <AboutTemplate
        name="API Client"
        description="Minimal API client"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getByText('API Client')).toBeInTheDocument();
    expect(screen.getByText('Minimal API client')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});

describe('ErrorTemplate', () => {
  it('renders code and description', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Not found"
        action={<button>Go home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Not found')).toBeInTheDocument();
    expect(screen.getByText('Go home')).toBeInTheDocument();
  });
});

describe('PageTransition', () => {
  it('renders children', () => {
    render(<PageTransition>content</PageTransition>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  it('renders segmented version', () => {
    render(<VersionTemplate version="2026.07.31.12.30.00" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('07')).toBeInTheDocument();
    expect(screen.getByText('31')).toBeInTheDocument();
  });

  it('renders plain version when not segmented', () => {
    render(<VersionTemplate version="unknown" />);
    expect(screen.getAllByText('unknown').length).toBeGreaterThan(0);
  });

  it('copies version to clipboard and resets the label', async () => {
    jest.useFakeTimers();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: { writeText },
    });
    render(<VersionTemplate version="2026.07.31" />);
    fireEvent.click(screen.getByText('Copy version'));
    await act(async () => {});
    expect(writeText).toHaveBeenCalledWith('2026.07.31');
    expect(screen.getByText('Copied')).toBeInTheDocument();
    act(() => jest.advanceTimersByTime(1500));
    expect(screen.getByText('Copy version')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
