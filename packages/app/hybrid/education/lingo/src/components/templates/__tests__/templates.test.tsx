import { fireEvent, render, screen } from '@testing-library/react';
import { AboutTemplate } from '../AboutTemplate';
import { DownloadsTemplate } from '../DownloadsTemplate';
import { ErrorTemplate } from '../ErrorTemplate';
import { HomeTemplate } from '../HomeTemplate';
import { ToolTemplate } from '../ToolTemplate';
import { VersionTemplate } from '../VersionTemplate';
import { PiCards } from 'react-icons/pi';

const ITEMS = [
  {
    label: 'Flashcards',
    description: 'Vocabulary decks',
    icon: PiCards,
    href: '/flashcards/',
  },
];

describe('HomeTemplate', () => {
  it('renders app name, description and cards', () => {
    render(<HomeTemplate appName="Lingo" description="desc" items={ITEMS} />);
    expect(screen.getByRole('heading', { name: 'Lingo' })).toBeInTheDocument();
    expect(screen.getByTestId('tool-card-flashcards')).toBeInTheDocument();
  });

  it('renders xp and streak stats', () => {
    render(
      <HomeTemplate
        appName="Lingo"
        description="desc"
        items={ITEMS}
        stats={{ xp: 120, streak: 3 }}
      />
    );
    expect(screen.getByTestId('stat-xp')).toHaveTextContent('120 XP');
    expect(screen.getByTestId('stat-streak')).toHaveTextContent('3 days');
  });

  it('renders singular streak label', () => {
    render(
      <HomeTemplate
        appName="Lingo"
        description="desc"
        items={ITEMS}
        stats={{ xp: 0, streak: 1 }}
      />
    );
    expect(screen.getByTestId('stat-streak')).toHaveTextContent('1 day');
  });

  it('toggles theme from the home header', () => {
    localStorage.clear();
    render(<HomeTemplate appName="Lingo" description="desc" items={ITEMS} />);
    fireEvent.click(screen.getByTestId('theme-toggle'));
    expect(localStorage.getItem('lingo:theme')).toBe('lingo-dark');
  });
});

describe('ToolTemplate', () => {
  it('renders title with back link and children', () => {
    render(
      <ToolTemplate title="Flashcards">
        <p>tool body</p>
      </ToolTemplate>
    );
    expect(
      screen.getByRole('heading', { name: 'Flashcards' })
    ).toBeInTheDocument();
    expect(screen.getByText('tool body')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/');
  });

  it('exposes a theme toggle', () => {
    localStorage.clear();
    render(
      <ToolTemplate title="T">
        <p>body</p>
      </ToolTemplate>
    );
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });
});

describe('DownloadsTemplate', () => {
  it('lists download links', () => {
    const release =
      'https://github.com/hieudoanm/hieudoanm.github.io/releases/download/app-hybrid-education-lingo-latest';
    render(
      <DownloadsTemplate
        appName="Lingo"
        version="v0.0.1"
        items={[
          {
            platform: 'macOS',
            requirements: 'Apple Silicon · macOS 13.+',
            label: '.dmg',
            href: `${release}/lingo_aarch64.dmg`,
          },
        ]}
      />
    );
    const link = screen.getByRole('link', { name: 'Download .dmg' });
    expect(link).toHaveAttribute('href', `${release}/lingo_aarch64.dmg`);
  });
});

describe('AboutTemplate', () => {
  it('renders info rows', () => {
    render(
      <AboutTemplate
        appName="Lingo"
        name="Lingo"
        description="Learn languages"
        version="v0.0.1"
        items={[{ label: 'Framework', value: 'Next.js 16' }]}
      />
    );
    expect(screen.getByText('Framework')).toBeInTheDocument();
    expect(screen.getByText('Next.js 16')).toBeInTheDocument();
  });
});

describe('ErrorTemplate', () => {
  it('renders code, description and action', () => {
    render(
      <ErrorTemplate
        code="404"
        description="missing"
        action={<button>home</button>}
      />
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('missing')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});

describe('VersionTemplate', () => {
  it('renders date segments for a timestamp version', async () => {
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
    render(<VersionTemplate appName="Lingo" version="2026.08.09.10.20.30" />);
    expect(screen.getByText('Year')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Copy version/i }));
    await screen.findByText('Copied');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      '2026.08.09.10.20.30'
    );
  });

  it('falls back to raw version text for non-timestamp versions', () => {
    render(<VersionTemplate appName="Lingo" version="v0.0.1" />);
    expect(screen.getByText('v0.0.1')).toBeInTheDocument();
  });
});
