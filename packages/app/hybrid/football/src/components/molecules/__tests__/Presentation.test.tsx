import { fireEvent, render, screen } from '@testing-library/react';
import { Presentation } from '@/components/molecules/Presentation';
import { makeSquad } from '@/test/fixtures';

jest.mock('@/lib/canvas', () => ({
  downloadLineupPng: jest.fn().mockResolvedValue(undefined),
}));

jest.mock('@/lib/share', () => ({
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

  it('copies the share link to the clipboard', async () => {
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy lineup link'));
    expect(buildShareUrl).toHaveBeenCalled();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'https://example.com/?squad=abc'
    );
    expect(
      await screen.findByText('Link copied to clipboard.')
    ).toBeInTheDocument();
  });

  it('reports when the clipboard is unavailable', async () => {
    Object.defineProperty(window.navigator, 'clipboard', {
      value: {
        writeText: jest.fn().mockRejectedValue(new Error('denied')),
      },
      configurable: true,
    });
    render(<Presentation {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Copy lineup link'));
    expect(
      await screen.findByText('Could not copy the link.')
    ).toBeInTheDocument();
  });

  it('disables copy link when there are no players', () => {
    render(<Presentation {...makeProps({ squad: makeSquad() })} />);
    expect(screen.getByLabelText('Copy lineup link')).toBeDisabled();
  });
});
