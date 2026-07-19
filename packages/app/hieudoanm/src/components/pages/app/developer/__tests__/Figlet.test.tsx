import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Figlet } from '../FigletModal';

jest.mock('../FigletModal/utils/render', () => ({
  renderFiglet: jest.fn((text, font) => `[${font}] ${text}`),
  FONT_NAMES: ['Standard', 'Block', 'Small', 'Banner'],
}));

describe('Figlet', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    Object.assign(navigator, {
      clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render', () => {
    const { container } = render(<Figlet onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should update text input and display output', () => {
    render(<Figlet onClose={jest.fn()} />);
    const input = screen.getByPlaceholderText('Type something…');
    fireEvent.change(input, { target: { value: 'TEST' } });
    expect((input as HTMLInputElement).value).toBe('TEST');
  });

  it('should change font via select', () => {
    render(<Figlet onClose={jest.fn()} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'Block' } });
    expect((select as HTMLSelectElement).value).toBe('Block');
  });

  it('should change font via tab click', () => {
    render(<Figlet onClose={jest.fn()} />);
    const blockTab = screen.getByRole('button', { name: 'Block' });
    fireEvent.click(blockTab);
    expect(screen.getByText(/\[Block\]/)).toBeInTheDocument();
  });

  it('should copy output to clipboard', async () => {
    render(<Figlet onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('📋 Copy ASCII'));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('should show copied state after copy', async () => {
    render(<Figlet onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('📋 Copy ASCII'));
    await waitFor(() => {
      expect(screen.getByText('✓ Copied')).toBeInTheDocument();
    });
  });

  it('should clear text on clear button click', () => {
    render(<Figlet onClose={jest.fn()} />);
    const input = screen.getByPlaceholderText(
      'Type something…'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'TEST' } });
    expect(input.value).toBe('TEST');
    fireEvent.click(screen.getByText('Clear'));
    expect(input.value).toBe('');
  });

  it('should close on Escape key', () => {
    const onClose = jest.fn();
    render(<Figlet onClose={onClose} />);
    fireEvent.keyDown(screen.getByPlaceholderText('Type something…'), {
      key: 'Escape',
    });
  });

  it('should show character count', () => {
    render(<Figlet onClose={jest.fn()} />);
    expect(screen.getByText(/\/20 chars/)).toBeInTheDocument();
  });
});
