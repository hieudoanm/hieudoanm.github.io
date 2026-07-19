import { render, screen, waitFor } from '@testing-library/react';
import { AnalysisPanel } from '@/components/molecules/AnalysisPanel';
import type { MriApi } from '@/lib/api/client';
import type { StudyAnalysis } from '@/lib/api/types';

const analysis: StudyAnalysis = {
  studyUid: '1.2.3',
  seriesCount: 2,
  modalities: ['MR'],
  contrasts: ['T1', 'FLAIR'],
  orientations: ['Sagittal'],
  voxelSizes: [[1, 1, 1.2]],
  fieldStrengthT: 3,
  manufacturers: ['Siemens'],
  models: ['Prisma'],
  temporalSeries: 1,
};

const createApi = (
  overrides: Partial<Record<keyof MriApi, unknown>> = {}
): MriApi =>
  ({
    getStudyAnalysis: jest.fn().mockResolvedValue(analysis),
    ...overrides,
  }) as unknown as MriApi;

describe('AnalysisPanel', () => {
  it('renders aggregated study facts', async () => {
    render(
      <AnalysisPanel
        api={createApi()}
        datasetId="dataset://a"
        studyUid="1.2.3"
      />
    );
    await waitFor(() => {
      expect(screen.getByTestId('analysis-panel')).toBeInTheDocument();
    });
    expect(screen.getByText('T1, FLAIR')).toBeInTheDocument();
    expect(screen.getByText('3 T')).toBeInTheDocument();
    expect(screen.getByText('Siemens')).toBeInTheDocument();
    expect(screen.getByText('Sagittal')).toBeInTheDocument();
  });

  it('shows dashes for unknown facts', async () => {
    const empty = { ...analysis, contrasts: [], fieldStrengthT: null };
    render(
      <AnalysisPanel
        api={createApi({
          getStudyAnalysis: jest.fn().mockResolvedValue(empty),
        })}
        datasetId="dataset://a"
        studyUid="1.2.3"
      />
    );
    await waitFor(() => {
      expect(screen.getByTestId('analysis-panel')).toBeInTheDocument();
    });
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('reports load errors', async () => {
    render(
      <AnalysisPanel
        api={createApi({
          getStudyAnalysis: jest.fn().mockRejectedValue(new Error('boom')),
        })}
        datasetId="dataset://a"
        studyUid="1.2.3"
      />
    );
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('boom');
    });
  });
});
