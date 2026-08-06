import { render, screen, fireEvent, act } from '@testing-library/react';
import { ErrorTemplate } from '@/components/templates/ErrorTemplate';
import { AboutTemplate } from '@/components/templates/AboutTemplate';
import { VersionTemplate } from '@/components/templates/VersionTemplate';

describe('ErrorTemplate', () => {
  it('renders code, description, and action', () => {
    render(
      <ErrorTemplate
        code="404"
        description="Missing"
        action={<button>Home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Missing')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument();
  });

  it('omits description and action when not provided', () => {
    render(<ErrorTemplate code="500" />);
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
  });
});

describe('AboutTemplate', () => {
  it('renders name, description, version, and info rows', () => {
    render(
      <AboutTemplate
        name="PDF"
        description="A viewer"
        version="v1.0.0"
        items={[
          { label: 'Framework', value: 'Next.js' },
          { label: 'Language', value: 'TypeScript' },
        ]}
      />
    );
    expect(screen.getByText('PDF')).toBeInTheDocument();
    expect(screen.getByText('A viewer')).toBeInTheDocument();
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('v1.0.0')).toBeInTheDocument();
    expect(screen.getByText('Stable')).toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  const writeText = jest.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    writeText.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
  });

  it('renders each version segment with its label', () => {
    render(<VersionTemplate version="2026.08.06.10.20.30" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('Hour')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('Min')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Sec')).toBeInTheDocument();
  });

  it('copies the version and shows a copied state', async () => {
    render(<VersionTemplate version="2026.08.06" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy version' }));
    expect(writeText).toHaveBeenCalledWith('2026.08.06');
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });

  it('renders the raw version when it has no segments', () => {
    render(<VersionTemplate version="n/a" />);
    expect(screen.getAllByText('n/a')).toHaveLength(2);
    expect(screen.queryByText('Year')).not.toBeInTheDocument();
  });

  it('hides hour and below segments when absent', () => {
    render(<VersionTemplate version="2026.08.06" />);
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('Day')).toBeInTheDocument();
    expect(screen.queryByText('Hour')).not.toBeInTheDocument();
    expect(screen.queryByText('Min')).not.toBeInTheDocument();
  });
});
