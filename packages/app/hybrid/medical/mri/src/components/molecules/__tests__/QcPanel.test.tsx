import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QcPanel } from '@/components/molecules/QcPanel';
import type { MriApi } from '@/lib/api/client';
import type { QcReport } from '@/lib/api/types';

const report: QcReport = {
  seriesId: 'series://a',
  datasetId: 'dataset://a',
  checks: [
    { id: 'dimensions', status: 'pass', value: null, detail: '256x256 pixels' },
    { id: 'snr', status: 'warn', value: 3.2, detail: 'signal/noise ratio 3.2' },
    { id: 'coverage', status: 'fail', value: 0, detail: '0 slices' },
    {
      id: 'ghosting',
      status: 'skipped',
      value: null,
      detail: 'no centre signal',
    },
  ],
  software: 'mri 0.0.1',
  generatedAt: 1,
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    runQc: jest.fn().mockResolvedValue(report),
    ...overrides,
  }) as unknown as MriApi;

describe('QcPanel', () => {
  it('runs QC and renders machine-readable check statuses', async () => {
    render(<QcPanel api={createApi()} seriesId="series://a" />);
    fireEvent.click(screen.getByRole('button', { name: /run qc/i }));
    await waitFor(() => {
      expect(screen.getByTestId('qc-report')).toBeInTheDocument();
    });
    expect(screen.getByText('dimensions')).toBeInTheDocument();
    expect(screen.getByText('signal/noise ratio 3.2')).toBeInTheDocument();
  });

  it('shows a running state while QC executes', async () => {
    let resolveQc: (value: QcReport) => void = () => {};
    const pending = new Promise<QcReport>((resolve) => {
      resolveQc = resolve;
    });
    render(
      <QcPanel
        api={createApi({ runQc: jest.fn().mockReturnValue(pending) })}
        seriesId="series://a"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /run qc/i }));
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByRole('button')).toHaveTextContent('Running QC…');
    resolveQc(report);
    await waitFor(() => {
      expect(screen.getByTestId('qc-report')).toBeInTheDocument();
    });
  });

  it('reports failures from the backend', async () => {
    render(
      <QcPanel
        api={createApi({
          runQc: jest.fn().mockRejectedValue(new Error('qc boom')),
        })}
        seriesId="series://a"
      />
    );
    fireEvent.click(screen.getByRole('button', { name: /run qc/i }));
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('qc boom');
    });
  });
});
