import type { FC } from 'react';
import { DESIGN_LABELS, DOMAINS } from './constants';
import type { DomainId, RoundReport, SimulatorOutcome } from './types';

const domainLabel = (id: DomainId): string => {
  const domain = DOMAINS.find((d) => d.id === id);
  return domain ? domain.label : id;
};

const roundRow = (report: RoundReport): string[] => [
  domainLabel(report.domainId),
  DESIGN_LABELS[report.design],
  `${report.participation}%`,
  `${report.target}%`,
  report.hitTarget ? '✓' : '✗',
];

const simRow = (outcome: SimulatorOutcome): string[] => [
  'Auto-enroll simulator',
  `Default ${outcome.defaultRate}%`,
  `${outcome.savers} savers`,
  `${outcome.target} savers`,
  outcome.hitTarget ? '✓' : '✗',
];

const ReportTable: FC<{
  reports: RoundReport[];
  simulator: SimulatorOutcome | null;
}> = ({ reports, simulator }) => {
  const rows = reports.map(roundRow);
  if (simulator) rows.push(simRow(simulator));
  return (
    <div className="card border-base-content/10 w-full overflow-x-auto border p-3">
      <table className="table-sm table w-full text-sm">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Design</th>
            <th>Participation</th>
            <th>Target</th>
            <th>Hit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, col) => (
                <td key={col}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const DonePanel: FC<{
  reports: RoundReport[];
  simulator: SimulatorOutcome | null;
  hits: number;
  onReset: () => void;
}> = ({ reports, simulator, hits, onReset }) => {
  const total = reports.length + (simulator ? 1 : 0);
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="text-4xl">📊</div>
      <div className="text-lg font-bold">Nudge Design Lab report</div>
      <p className="text-sm">
        Targets hit: <strong>{hits}</strong> / {total}
      </p>
      <ReportTable reports={reports} simulator={simulator} />
      <button
        type="button"
        onClick={onReset}
        data-testid="reset"
        className="btn btn-primary btn-sm">
        Play Again
      </button>
    </div>
  );
};
