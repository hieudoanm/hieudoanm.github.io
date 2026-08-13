import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GeneratorPage from '@/app/generator/page';
import { mockDb } from '@/test-utils/fakeDb';

jest.mock('@/lib/db', () => require('@/test-utils/fakeDb').mockDb);
jest.mock('@/data/seed', () => ({
  seedDatabase: jest.fn().mockResolvedValue(undefined),
  generateId: jest.fn(),
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('GeneratorPage', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
    mockDb.reset();
    mockPush.mockClear();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: jest.fn().mockResolvedValue(undefined) },
      configurable: true,
    });
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    });
  });

  const getPasswordValue = () =>
    (screen.getByLabelText('Generated value') as HTMLInputElement).value;

  it('renders the generator with a default password', async () => {
    render(<GeneratorPage />);
    expect(
      screen.getByRole('heading', { name: 'Password Generator' })
    ).toBeInTheDocument();
    await waitFor(() => {
      const value = getPasswordValue();
      expect(value).toHaveLength(16);
    });
  });

  it('regenerates a new password', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    const before = getPasswordValue();
    const iconButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(iconButtons[2]);
    await waitFor(() => expect(getPasswordValue()).not.toBe(before));
    expect(getPasswordValue()).toHaveLength(16);
  });

  it('changes length via slider', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.change(screen.getByRole('slider'), { target: { value: '20' } });
    expect(screen.getByText('Length: 20')).toBeInTheDocument();
    expect(getPasswordValue()).toHaveLength(20);
  });

  it('excludes symbols when the symbols toggle is off', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(screen.getByRole('checkbox', { name: 'symbols' }));
    fireEvent.click(screen.getAllByRole('button', { name: '' })[2]);
    await waitFor(() => {
      const value = getPasswordValue();
      expect(value).toMatch(/^[A-Za-z0-9]+$/);
    });
  });

  it('copies the password to clipboard', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    const iconButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(iconButtons[1]);
    await waitFor(() =>
      expect(screen.getByText('Password copied')).toBeInTheDocument()
    );
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      getPasswordValue()
    );
  });

  it('navigates back home', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    const iconButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(iconButtons[0]);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('generates a numeric PIN in PIN mode', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(screen.getByRole('button', { name: 'PIN' }));
    await waitFor(() =>
      expect(screen.getByText('PIN Length: 6')).toBeInTheDocument()
    );
    const value = getPasswordValue();
    expect(value).toMatch(/^\d{6}$/);
    fireEvent.click(screen.getAllByRole('button', { name: '' })[2]);
    await waitFor(() => expect(getPasswordValue()).toMatch(/^\d{6}$/));
  });

  it('changes PIN length via slider', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(screen.getByRole('button', { name: 'PIN' }));
    await waitFor(() =>
      expect(screen.getByText('PIN Length: 6')).toBeInTheDocument()
    );
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } });
    expect(screen.getByText('PIN Length: 8')).toBeInTheDocument();
    expect(getPasswordValue()).toMatch(/^\d{8}$/);
  });

  it('generates a memorable passphrase when enabled', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Memorable passphrase' })
    );
    await waitFor(() =>
      expect(screen.getByText('Words: 4')).toBeInTheDocument()
    );
    expect(getPasswordValue()).toMatch(/^[a-z]+(-[a-z]+){3}$/);
  });

  it('copies a PIN in PIN mode', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(screen.getByRole('button', { name: 'PIN' }));
    await waitFor(() =>
      expect(screen.getByText('PIN Length: 6')).toBeInTheDocument()
    );
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    await waitFor(() =>
      expect(screen.getByText('PIN copied')).toBeInTheDocument()
    );
  });

  it('copies a passphrase in memorable mode', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(
      screen.getByRole('checkbox', { name: 'Memorable passphrase' })
    );
    await waitFor(() =>
      expect(screen.getByText('Words: 4')).toBeInTheDocument()
    );
    const buttons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(buttons[1]);
    await waitFor(() =>
      expect(screen.getByText('Passphrase copied')).toBeInTheDocument()
    );
  });

  it('toggles character options', async () => {
    render(<GeneratorPage />);
    await waitFor(() => expect(getPasswordValue()).toHaveLength(16));
    fireEvent.click(screen.getByRole('checkbox', { name: 'numbers' }));
    const value = getPasswordValue();
    expect(value).not.toMatch(/\d/);
    fireEvent.click(screen.getByRole('checkbox', { name: 'symbols' }));
    expect(getPasswordValue()).not.toMatch(/[^A-Za-z]/);
    fireEvent.click(screen.getByRole('checkbox', { name: 'Uppercase' }));
    expect(getPasswordValue()).not.toMatch(/[A-Z]/);
  });
});
