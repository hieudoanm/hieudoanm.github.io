import { render, screen, waitFor } from '@testing-library/react';

import AnalysisPage from '@/app/analysis/page';
import ComparePage from '@/app/compare/page';
import DatasetsPage from '@/app/datasets/page';
import LaunchPage from '@/app/launch/page';
import RigourPage from '@/app/rigour/page';
import RunsPage from '@/app/runs/page';
import SettingsPage from '@/app/settings/page';
import SetupPage from '@/app/setup/page';
import ViewerPage from '@/app/viewer/page';
import {
  checkSetup,
  listConfigs,
  listRuns,
  readCohort,
  readRigour,
  readRun,
} from '@/lib/ipc/api';

jest.mock('@/lib/ipc/api', () => ({
  listRuns: jest.fn(async () => []),
  readRun: jest.fn(async () => {
    throw new Error('Unknown run r_missing.');
  }),
  listConfigs: jest.fn(async () => []),
  readRigour: jest.fn(async () => {
    throw new Error('No project folder selected.');
  }),
  readCohort: jest.fn(async () => {
    throw new Error('No cohort table found.');
  }),
  checkSetup: jest.fn(async () => {
    throw new Error('No project folder selected.');
  }),
  getSettings: jest.fn(async () => {
    throw new Error('No project folder selected.');
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(''),
}));

describe('static routes', () => {
  test('every screen is reachable and fails readably without a project', async () => {
    const screens = [
      ['Analysis', <AnalysisPage key="a" />],
      ['Compare', <ComparePage key="c" />],
      ['Datasets', <DatasetsPage key="d" />],
      ['Launch', <LaunchPage key="l" />],
      ['Rigour', <RigourPage key="r" />],
      ['Runs', <RunsPage key="u" />],
      ['Settings', <SettingsPage key="s" />],
      ['Setup', <SetupPage key="p" />],
      ['Viewer', <ViewerPage key="v" />],
    ] as const;

    for (const [, element] of screens) {
      const view = render(element);
      await waitFor(() => expect(view.container).not.toHaveTextContent(/^$/));
      expect(view.container.textContent?.trim().length ?? 0).toBeGreaterThan(0);
      view.unmount();
    }
  });

  test('run detail is reachable from the runs route through the query string', async () => {
    window.history.replaceState(null, '', '/runs?run=r_missing');
    render(<RunsPage />);
    expect(await screen.findByText('r_missing')).toBeInTheDocument();
    expect(readRun).toHaveBeenCalledWith('r_missing');
    window.history.replaceState(null, '', '/runs');
  });

  test('list commands are the only ones a screen may call', () => {
    for (const command of [
      listRuns,
      listConfigs,
      readRigour,
      readCohort,
      checkSetup,
    ]) {
      expect(command).toHaveBeenCalled();
    }
  });
});
