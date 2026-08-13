import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EmergencyAccessCard } from '@/components/organisms/EmergencyAccessCard';
import { TransferCard } from '@/components/organisms/TransferCard';
import type { Settings, VaultItem } from '@/types';

const minute = 60000;
const now = Date.now();

const mockUseData = jest.fn();
jest.mock('@/providers/DataProvider', () => ({
  useData: () => mockUseData(),
}));

jest.mock('@/lib/transfer', () => ({
  ...jest.requireActual('@/lib/transfer'),
  downloadFile: jest.fn(),
}));
import { downloadFile } from '@/lib/transfer';
const mockDownloadFile = downloadFile as jest.Mock;

const makeSettings = (overrides: Partial<Settings> = {}): Settings => ({
  theme: 'nothing',
  autoLockTimeout: 5,
  clipboardClear: 30,
  biometricEnabled: false,
  lockOnClose: false,
  ...overrides,
});

const item = (overrides: Partial<VaultItem> = {}): VaultItem => ({
  id: 'v-1',
  type: 'login',
  title: 'GitHub',
  username: 'u@e.com',
  password: 'p@ss',
  favorite: false,
  tags: [],
  createdAt: 1,
  updatedAt: 2,
  ...overrides,
});

describe('EmergencyAccessCard', () => {
  const requestEmergencyAccess = jest.fn();
  const cancelEmergencyRequest = jest.fn();

  beforeEach(() => {
    requestEmergencyAccess.mockClear();
    cancelEmergencyRequest.mockClear();
    mockUseData.mockReturnValue({
      settings: makeSettings(),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
  });

  it('sets up an emergency contact', () => {
    render(<EmergencyAccessCard />);
    fireEvent.change(screen.getByLabelText('Emergency contact email'), {
      target: { value: 'guardian@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Emergency access delay'), {
      target: { value: '60' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Save emergency contact' })
    );
    expect(requestEmergencyAccess).toHaveBeenCalledWith(
      'guardian@example.com',
      60
    );
  });

  it('disables save until an email is provided', () => {
    render(<EmergencyAccessCard />);
    expect(
      screen.getByRole('button', { name: 'Save emergency contact' })
    ).toBeDisabled();
  });

  it('requests access for an existing contact', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    fireEvent.click(
      screen.getByRole('button', { name: 'Request emergency access' })
    );
    expect(requestEmergencyAccess).toHaveBeenCalledWith('g@e.com', 30);
  });

  it('shows a countdown for a pending request', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
        emergencyRequest: { requestedAt: now, delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    expect(screen.getByText(/Requested — available in/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Cancel request' }));
    expect(cancelEmergencyRequest).toHaveBeenCalled();
  });

  it('shows granted state when the delay has elapsed', () => {
    mockUseData.mockReturnValue({
      settings: makeSettings({
        emergencyContact: { email: 'g@e.com', delayMinutes: 30 },
        emergencyRequest: { requestedAt: now - 30 * minute, delayMinutes: 30 },
      }),
      requestEmergencyAccess,
      cancelEmergencyRequest,
    });
    render(<EmergencyAccessCard />);
    expect(screen.getByText('Access granted')).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole('button', { name: 'End emergency access' })
    );
    expect(cancelEmergencyRequest).toHaveBeenCalled();
  });
});

describe('TransferCard', () => {
  const onImport = jest.fn();
  const notify = jest.fn();

  beforeEach(() => {
    onImport.mockClear();
    notify.mockClear();
    mockDownloadFile.mockClear();
  });

  const renderCard = () =>
    render(
      <TransferCard items={[item()]} onImport={onImport} notify={notify} />
    );

  it('imports a CSV file', async () => {
    renderCard();
    const file = new File(['type,title\nlogin,Imported'], 'vault.csv', {
      type: 'text/csv',
    });
    fireEvent.change(screen.getByLabelText('Import CSV'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ title: 'Imported', type: 'login' }),
        ])
      )
    );
    expect(notify).toHaveBeenCalledWith('Imported 1 item(s)', 'success');
  });

  it('imports a JSON file', async () => {
    renderCard();
    const file = new File(
      [JSON.stringify([{ title: 'From Json', type: 'note' }])],
      'vault.json',
      { type: 'application/json' }
    );
    fireEvent.change(screen.getByLabelText('Import JSON'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(onImport).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({ title: 'From Json', type: 'note' }),
        ])
      )
    );
    expect(notify).toHaveBeenCalledWith('Imported 1 item(s)', 'success');
  });

  it('notifies an error for an empty CSV', async () => {
    renderCard();
    const file = new File(['type,title\n'], 'empty.csv', {
      type: 'text/csv',
    });
    fireEvent.change(screen.getByLabelText('Import CSV'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith('No items found in CSV', 'error')
    );
  });

  it('notifies an error for an empty JSON', async () => {
    renderCard();
    const file = new File([JSON.stringify([])], 'empty.json', {
      type: 'application/json',
    });
    fireEvent.change(screen.getByLabelText('Import JSON'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith('No items found in JSON', 'error')
    );
  });

  it('ignores a change event without a selected file', async () => {
    renderCard();
    fireEvent.change(screen.getByLabelText('Import CSV'), {
      target: { files: [] },
    });
    fireEvent.change(screen.getByLabelText('Import JSON'), {
      target: { files: [] },
    });
    expect(onImport).not.toHaveBeenCalled();
  });

  it('notifies an error for malformed JSON', async () => {
    renderCard();
    const file = new File(['{broken'], 'bad.json', {
      type: 'application/json',
    });
    fireEvent.change(screen.getByLabelText('Import JSON'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith(expect.any(String), 'error')
    );
    expect(onImport).not.toHaveBeenCalled();
  });

  it('falls back to a generic message when CSV import fails with a non-Error', async () => {
    onImport.mockRejectedValueOnce('boom');
    renderCard();
    const file = new File(['type,title\nlogin,Ok'], 'ok.csv', {
      type: 'text/csv',
    });
    fireEvent.change(screen.getByLabelText('Import CSV'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith('CSV import failed', 'error')
    );
  });

  it('falls back to a generic message when JSON import fails with a non-Error', async () => {
    onImport.mockRejectedValueOnce('boom');
    renderCard();
    const file = new File(
      [JSON.stringify([{ title: 'Ok', type: 'note' }])],
      'ok.json',
      { type: 'application/json' }
    );
    fireEvent.change(screen.getByLabelText('Import JSON'), {
      target: { files: [file] },
    });
    await waitFor(() =>
      expect(notify).toHaveBeenCalledWith('JSON import failed', 'error')
    );
  });

  it('exports a plain CSV', () => {
    renderCard();
    fireEvent.click(screen.getByRole('button', { name: 'Export CSV' }));
    expect(mockDownloadFile).toHaveBeenCalledWith(
      'vault-export.csv',
      expect.stringContaining('GitHub'),
      'text/csv'
    );
    expect(notify).toHaveBeenCalledWith('Plain CSV exported', 'success');
  });

  it('requires a passphrase for encrypted export', () => {
    renderCard();
    fireEvent.click(
      screen.getByRole('button', { name: 'Export encrypted JSON' })
    );
    expect(mockDownloadFile).not.toHaveBeenCalled();
    expect(notify).toHaveBeenCalledWith(
      'Enter a passphrase to encrypt the export',
      'error'
    );
  });

  it('exports an encrypted JSON with a passphrase', () => {
    renderCard();
    fireEvent.change(screen.getByPlaceholderText('Export passphrase'), {
      target: { value: 'secret' },
    });
    fireEvent.click(
      screen.getByRole('button', { name: 'Export encrypted JSON' })
    );
    expect(mockDownloadFile).toHaveBeenCalledWith(
      'vault-export.json.enc',
      expect.any(String),
      'application/octet-stream'
    );
    expect(notify).toHaveBeenCalledWith('Encrypted vault exported', 'success');
  });
});
