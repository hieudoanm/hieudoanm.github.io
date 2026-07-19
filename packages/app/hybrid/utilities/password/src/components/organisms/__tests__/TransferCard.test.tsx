import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TransferCard } from '@/components/organisms/TransferCard';
import type { VaultItem } from '@/types';

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
