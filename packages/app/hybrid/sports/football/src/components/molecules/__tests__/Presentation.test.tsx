import { fireEvent, render, screen } from '@testing-library/react';
import { Presentation } from '@/components/molecules/Presentation';
import { makeSquad } from '@/test/fixtures';
import { addShareHistory, loadShareHistory } from '@/lib/share';

jest.mock('@/lib/canvas', () => ({
  downloadLineupPng: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/lib/share', () => ({
  ...jest.requireActual('@/lib/share'),
  buildShareUrl: jest.fn(() => 'https://example.com/?squad=abc'),
}));

import { downloadLineupPng } from '@/lib/canvas';
import { buildShareUrl } from '@/lib/share';

const makeRef = (): { current: HTMLDivElement | null } => ({
  current: document.createElement('div'),
});

const makeProps = (
  overrides: Partial<Parameters<typeof Presentation>[0]> = {}
) => ({
  squad: makeSquad({
    name: 'Team A',
    players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
  }),
  pitchRef: makeRef(),
  ...overrides,
});

describe('Presentation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    Object.defineProperty(window.navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
    Object.defineProperty(window, 'print', {
      value: jest.fn(),
      configurable: true,
    });
  });

  it('exports the lineup as a PNG', async () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Export lineup as PNG'));
    expect(downloadLineupPng).toHaveBeenCalledWith(expect.anything(), 'team-a');
  });

  it('disables PNG export when there are no players', () => {
    render(<Presentation {...makeProps({ squad: makeSquad() })} />);
    expect(screen.getByLabelText('Export lineup as PNG')).toBeDisabled();
  });

  it('prints the lineup', () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Print lineup'));
    expect(window.print).toHaveBeenCalled();
  });

  it('copies the full-squad link', async () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy link'));
    expect(buildShareUrl).toHaveBeenCalledWith(expect.anything(), 'squad');
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://example.com/?squad=abc'
    );
    expect(
      await screen.findByText('Link copied to clipboard.')
    ).toBeInTheDocument();
  });

  it('copies a lineup-only link', async () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy lineup link'));
    expect(buildShareUrl).toHaveBeenCalledWith(expect.anything(), 'lineup');
  });

  it('reports when the clipboard is unavailable', async () => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
      configurable: true,
    });
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy link'));
    expect(
      await screen.findByText('Could not copy the link.')
    ).toBeInTheDocument();
  });

  it('disables copy links when there are no players', () => {
    render(<Presentation {...makeProps({ squad: makeSquad() })} />);
    expect(screen.getByLabelText('Copy link')).toBeDisabled();
    expect(screen.getByLabelText('Copy lineup link')).toBeDisabled();
  });

  it('lists a recent link after copying', async () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy link'));
    const reopen = await screen.findByLabelText('Reopen Team A');
    expect(reopen).toHaveAttribute('href', 'https://example.com/?squad=abc');
    expect(screen.getByText('Full squad')).toBeInTheDocument();
  });

  it('reopens a link from the history', () => {
    addShareHistory({
      mode: 'lineup',
      name: 'Team B',
      url: 'https://example.com/?squad=xyz',
    });
    render(<Presentation {...makeProps()} />);
    const reopen = screen.getByLabelText('Reopen Team B');
    expect(reopen).toHaveAttribute('href', 'https://example.com/?squad=xyz');
    expect(screen.getByText('Lineup')).toBeInTheDocument();
  });

  it('clears the recent links history', () => {
    addShareHistory({
      mode: 'squad',
      name: 'Team A',
      url: 'https://example.com/?squad=abc',
    });
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Clear share history'));
    expect(screen.queryByLabelText('Reopen Team A')).not.toBeInTheDocument();
    expect(loadShareHistory()).toEqual([]);
  });
});
