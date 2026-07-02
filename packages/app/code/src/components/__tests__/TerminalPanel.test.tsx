import { render, screen } from '@testing-library/react';
import { TerminalPanel } from '../TerminalPanel';

beforeEach(() => {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as any;
});

jest.mock('@xterm/xterm', () => ({
  Terminal: jest.fn(() => ({
    loadAddon: jest.fn(),
    open: jest.fn(),
    write: jest.fn(),
    writeln: jest.fn(),
    onData: jest.fn(),
    dispose: jest.fn(),
  })),
}));

jest.mock('@xterm/addon-fit', () => ({
  FitAddon: jest.fn(() => ({
    fit: jest.fn(),
  })),
}));

describe('TerminalPanel', () => {
  it('renders TERMINAL header', () => {
    render(<TerminalPanel />);
    expect(screen.getByText('TERMINAL')).toBeInTheDocument();
  });

  it('renders terminal container', () => {
    const { container } = render(<TerminalPanel />);
    expect(container.querySelector('.flex-1')).toBeInTheDocument();
  });
});
