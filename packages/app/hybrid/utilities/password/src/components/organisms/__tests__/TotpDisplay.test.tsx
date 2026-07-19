import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TotpDisplay } from '@/components/organisms/TotpDisplay';

jest.mock('qrcode', () => ({
  __esModule: true,
  default: {
    toDataURL: jest.fn().mockResolvedValue('data:image/png;base64,QR'),
  },
}));

let mockCode = 0;
jest.mock('@/lib/totp', () => {
  const actual = jest.requireActual('@/lib/totp');
  return {
    ...actual,
    generateTotp: jest.fn(() =>
      Promise.resolve(String(100000 + mockCode++).padStart(6, '0'))
    ),
  };
});

describe('TotpDisplay', () => {
  const originalClipboard = navigator.clipboard;

  beforeEach(() => {
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

  it('renders a six-digit code and a countdown', async () => {
    render(<TotpDisplay secret="JBSWY3DPEHPK3PXP" account="user" />);
    await waitFor(() => {
      const code = screen.getByTestId('totp-code').textContent ?? '';
      expect(code).toMatch(/^\d{6}$/);
    });
    expect(screen.getByText(/Code expires in \d+s/)).toBeInTheDocument();
  });

  it('copies the current code to the clipboard', async () => {
    render(<TotpDisplay secret="JBSWY3DPEHPK3PXP" account="user" />);
    await waitFor(() => {
      const code = screen.getByTestId('totp-code').textContent ?? '';
      expect(code).toMatch(/^\d{6}$/);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Copy code' }));
    await waitFor(() =>
      expect(
        screen.getByRole('button', { name: 'Copy code' })
      ).toHaveTextContent(/Copied/)
    );
    const code = screen.getByTestId('totp-code').textContent;
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(code);
  });

  it('toggles the QR code', async () => {
    render(
      <TotpDisplay secret="JBSWY3DPEHPK3PXP" account="user@example.com" />
    );
    await waitFor(() => {
      const code = screen.getByTestId('totp-code').textContent ?? '';
      expect(code).toMatch(/^\d{6}$/);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Show QR code' }));
    await waitFor(() =>
      expect(screen.getByTestId('totp-qr')).toHaveAttribute(
        'src',
        'data:image/png;base64,QR'
      )
    );
    fireEvent.click(screen.getByRole('button', { name: 'Show QR code' }));
    expect(screen.queryByTestId('totp-qr')).not.toBeInTheDocument();
  });

  it('regenerates the code on refresh', async () => {
    render(<TotpDisplay secret="JBSWY3DPEHPK3PXP" account="user" />);
    await waitFor(() => {
      const code = screen.getByTestId('totp-code').textContent ?? '';
      expect(code).toMatch(/^\d{6}$/);
    });
    const before = screen.getByTestId('totp-code').textContent;
    fireEvent.click(screen.getByRole('button', { name: 'Refresh code' }));
    await waitFor(() =>
      expect(screen.getByTestId('totp-code').textContent).not.toBe(before)
    );
  });
});
