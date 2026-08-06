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
    (screen.getByDisplayValue(/(.{8,64})/) as HTMLInputElement).value;

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
});
