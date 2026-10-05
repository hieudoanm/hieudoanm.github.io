'use client';

import { Card } from '@/components/atoms/Card';
import { EmptyState, ErrorNote, Loading } from '@/components/atoms/EmptyState';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import { RigourBadge } from '@/components/molecules/StatusBadge';
import { readRigour } from '@/lib/ipc/api';
import { useResource } from '@/lib/ui/use-resource';

/**
 * Rigour: split integrity and lock-box discipline, read from the project's
 * split and lock-box files. These are checks, not guarantees.
 */
export const RigourTemplate = () => {
  const report = useResource(readRigour, []);

  if (report.loading)
    return (
      <Screen>
        <Loading />
      </Screen>
    );
  if (report.error)
    return (
      <Screen>
        <ErrorNote message={report.error} />
      </Screen>
    );
  const data = report.data;
  if (!data)
    return (
      <Screen>
        <ErrorNote message="No rigour report available." />
      </Screen>
    );

  return (
    <Screen>
      <PageHeader
        title="Rigour"
        description="What the project's split and lock-box files say about this work. A missing file is reported as unknown, never as a pass."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Checks">
          <ul className="divide-base-200 divide-y">
            {data.checks.map((check) => (
              <li
                key={check.id}
                className="flex items-start justify-between gap-4 py-2">
                <div>
                  <p className="text-sm font-medium">{check.title}</p>
                  <p className="text-base-content/70 text-xs">{check.detail}</p>
                  {check.evidence && (
                    <p className="text-base-content/50 font-mono text-xs break-all">
                      {check.evidence}
                    </p>
                  )}
                </div>
                <RigourBadge status={check.status} />
              </li>
            ))}
          </ul>
        </Card>
        <div className="space-y-4">
          <Card title="Lock box">
            {data.lockBox ? (
              <div className="space-y-2 text-sm">
                <p>
                  {data.lockBox.accessCount} access record(s)
                  {data.lockBoxBudget ? ` · budget ${data.lockBoxBudget}` : ''}
                </p>
                {data.lockBox.accesses.length > 0 && (
                  <table className="table-sm table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Run</th>
                        <th>Purpose</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.lockBox.accesses.map((access) => (
                        <tr key={access.accessNumber ?? access.runId}>
                          <td>{access.accessNumber ?? '—'}</td>
                          <td className="font-mono text-xs">
                            {access.runId ?? '—'}
                          </td>
                          <td>{access.purpose ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ) : (
              <p className="text-base-content/70 text-sm">
                No lock-box access log found.
              </p>
            )}
          </Card>
          <Card title="Protocol">
            {data.protocolAvailable ? (
              <p className="font-mono text-xs break-all">{data.protocolPath}</p>
            ) : (
              <EmptyState
                title="No analysis protocol in the project"
                description="The workbench reads a protocol file when the project has one; it does not write one."
              />
            )}
          </Card>
        </div>
      </div>
    </Screen>
  );
};
