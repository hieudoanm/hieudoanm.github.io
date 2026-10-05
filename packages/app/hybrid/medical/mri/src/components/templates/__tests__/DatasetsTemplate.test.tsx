import { fireEvent, render, screen } from '@testing-library/react';

import { DatasetsTemplate } from '@/components/templates/DatasetsTemplate';
import { listParticipantAssets, readCohort } from '@/lib/ipc/api';
import type { CohortReport } from '@/lib/contract/types';

jest.mock('@/lib/ipc/api', () => ({
  readCohort: jest.fn(),
  listParticipantAssets: jest.fn(),
}));

const row = (participantId: string, outcome: number | null) => ({
  participantId,
  session: '1',
  outcome,
  outcomeLabel: null,
  values: {
    participant_id: participantId,
    wab_aq: outcome === null ? '' : String(outcome),
  },
});

const cohort: CohortReport = {
  sourcePath: 'data/participants.tsv',
  columns: ['participant_id', 'wab_aq'],
  rows: [row('sub-01', 30), row('sub-02', 90), row('sub-03', null)],
  rowCount: 3,
  uniqueParticipants: 3,
  duplicateParticipants: 0,
  usableParticipants: 2,
  excludedReasons: [{ reason: 'missing outcome', count: 1 }],
  outcomeColumn: 'wab_aq',
  outcomeDistribution: [],
  flags: [
    {
      participantId: 'sub-03',
      kind: 'missing_outcome',
      message: 'no WAB-AQ value',
    },
  ],
};

describe('Datasets screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.history.replaceState(null, '', '/datasets');
    jest.mocked(readCohort).mockResolvedValue(cohort);
    jest
      .mocked(listParticipantAssets)
      .mockResolvedValue([
        {
          participantId: 'sub-01',
          path: 'data/sub-01/pelvis_0.png',
          name: 'pelvis_0.png',
          role: 'image',
          sizeBytes: 2048,
        },
      ]);
  });

  test('reports how many participants are usable', async () => {
    render(<DatasetsTemplate />);
    expect(await screen.findByText('Usable')).toBeInTheDocument();
    expect(screen.getByText('data/participants.tsv')).toBeInTheDocument();
    expect(screen.getByText('1 missing outcome')).toBeInTheDocument();
    expect(screen.getAllByText('sub-01').length).toBeGreaterThan(0);
  });

  test('bands the outcome distribution', async () => {
    render(<DatasetsTemplate />);
    expect(await screen.findByText('Outcome distribution')).toBeInTheDocument();
    expect(screen.getByText('0–49')).toBeInTheDocument();
    expect(screen.getByText('85–100')).toBeInTheDocument();
    expect(
      screen.getByText(/Bands are a reading aid, not a validated cut-off/)
    ).toBeInTheDocument();
  });

  test('lists the participants missing an outcome', async () => {
    render(<DatasetsTemplate />);
    expect(
      await screen.findByText(/missing_outcome: no WAB-AQ value/)
    ).toBeInTheDocument();
    expect(screen.getByText('missing')).toBeInTheDocument();
  });

  test('keeps the selected participant in the URL so a link can be shared', async () => {
    render(<DatasetsTemplate />);
    expect(
      await screen.findByText('Choose a participant in the table.')
    ).toBeInTheDocument();
    fireEvent.click(screen.getAllByText('sub-01')[0]);
    expect(await screen.findByText('pelvis_0.png')).toBeInTheDocument();
    expect(listParticipantAssets).toHaveBeenCalledWith('sub-01');
    expect(screen.getByText('image')).toBeInTheDocument();
    expect(window.location.search).toContain('participant');
  });

  test('says when the selected participant has no files', async () => {
    jest.mocked(listParticipantAssets).mockResolvedValue([]);
    render(<DatasetsTemplate />);
    fireEvent.click(await screen.findByText('sub-01'));
    expect(
      await screen.findByText('No imaging files found for this participant.')
    ).toBeInTheDocument();
  });

  test('shows an empty cohort without pretending it is usable', async () => {
    jest
      .mocked(readCohort)
      .mockResolvedValue({
        ...cohort,
        rows: [],
        rowCount: 0,
        uniqueParticipants: 0,
        usableParticipants: 0,
        excludedReasons: [],
        flags: [],
      });
    render(<DatasetsTemplate />);
    expect(
      await screen.findByText('No exclusions were flagged.')
    ).toBeInTheDocument();
    expect(screen.getByText('none')).toBeInTheDocument();
  });

  test('shows the search error verbatim', async () => {
    jest
      .mocked(readCohort)
      .mockRejectedValue(
        new Error('data/participants.tsv not found in the project.')
      );
    render(<DatasetsTemplate />);
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'not found in the project'
    );
  });

  test('reads the cohort once per visit', async () => {
    render(<DatasetsTemplate />);
    await screen.findByText('Usable');
    expect(readCohort).toHaveBeenCalledTimes(1);
    expect(listParticipantAssets).not.toHaveBeenCalled();
  });
});
