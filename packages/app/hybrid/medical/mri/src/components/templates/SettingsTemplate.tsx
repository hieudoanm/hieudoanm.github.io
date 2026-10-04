'use client';

import { useState } from 'react';

import { Card } from '@/components/atoms/Card';
import { ErrorNote } from '@/components/atoms/EmptyState';
import { KeyValue } from '@/components/atoms/KeyValue';
import { PageHeader } from '@/components/organisms/PageHeader';
import { Screen } from '@/components/organisms/Screen';
import {
  checkSetup,
  getSettings,
  pickProjectFolder,
  updateSettings,
} from '@/lib/ipc/api';
import type { DoctorReport, Settings } from '@/lib/contract/types';
import { useResource } from '@/lib/ui/use-resource';

/**
 * Settings: which folder this workbench reads, and where every path points.
 * The folder is chosen through the OS dialog; the app never guesses it.
 */
export const SettingsTemplate = () => {
  const settings = useResource(getSettings, []);
  const [draft, setDraft] = useState<Settings | null>(null);
  const [doctor, setDoctor] = useState<DoctorReport | null>(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
  const current = draft ?? settings.data;

  const choose = async () => {
    try {
      const folder = await pickProjectFolder();
      if (folder && current) {
        setDraft({ ...current, projectRoot: folder });
        setMessage('Project folder selected. Save to apply it.');
      }
    } catch (error) {
      setFailure(error instanceof Error ? error.message : String(error));
    }
  };

  const save = async () => {
    if (!current) return;
    setBusy(true);
    try {
      await updateSettings(current);
      setFailure(null);
      setDraft(null);
      setMessage('Settings saved.');
      await settings.refresh();
    } catch (error) {
      setFailure(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  const runChecks = async () => {
    setBusy(true);
    try {
      setDoctor(await checkSetup());
    } catch (error) {
      setFailure(error instanceof Error ? error.message : String(error));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen>
      <PageHeader
        title="Settings"
        description="Paths are relative to the project folder. Nothing is uploaded; every read stays on this machine."
        actions={
          <>
            <button type="button" className="btn btn-sm" onClick={choose}>
              Choose project folder
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={save}
              disabled={busy}>
              Save
            </button>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={runChecks}
              disabled={busy}>
              Run environment checks
            </button>
          </>
        }>
        {message && <p className="text-base-content/70 text-xs">{message}</p>}
      </PageHeader>
      {settings.error && <ErrorNote message={settings.error} />}
      {failure && <ErrorNote message={failure} />}
      {settings.loading && !current && (
        <p className="text-sm">Loading settings…</p>
      )}
      {current && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card title="Project">
            <label className="form-control mb-3">
              <span className="label-text text-xs">Project folder</span>
              <input
                className="input input-sm input-bordered font-mono"
                value={current.projectRoot ?? ''}
                placeholder="Not selected"
                onChange={(event) =>
                  setDraft({ ...current, projectRoot: event.target.value })
                }
              />
            </label>
            <KeyValue
              items={[
                { label: 'Runs', value: current.runsDir },
                { label: 'Configs', value: current.configDir },
                { label: 'Cohort', value: current.cohortPath },
                { label: 'Splits', value: current.splitsPath },
                { label: 'Lock-box log', value: current.lockBoxLogPath },
                { label: 'Protocol', value: current.protocolPath },
                { label: 'Imaging', value: current.imagingDir },
                { label: 'Derived', value: current.derivedDir },
              ]}
            />
          </Card>
          <Card title="Environment">
            <div className="space-y-3">
              <label className="form-control">
                <span className="label-text text-xs">Python environment</span>
                <input
                  className="input input-sm input-bordered font-mono"
                  value={current.pythonEnv}
                  onChange={(event) =>
                    setDraft({ ...current, pythonEnv: event.target.value })
                  }
                />
              </label>
              <label className="form-control">
                <span className="label-text text-xs">Lock-box budget</span>
                <input
                  type="number"
                  className="input input-sm input-bordered"
                  value={current.lockBoxBudget ?? 1}
                  onChange={(event) =>
                    setDraft({
                      ...current,
                      lockBoxBudget: Number(event.target.value) || 1,
                    })
                  }
                />
              </label>
              <label className="form-control">
                <span className="label-text text-xs">
                  Remote URL (optional, unused offline)
                </span>
                <input
                  className="input input-sm input-bordered font-mono"
                  value={current.remoteUrl ?? ''}
                  onChange={(event) =>
                    setDraft({
                      ...current,
                      remoteUrl: event.target.value || null,
                    })
                  }
                />
              </label>
            </div>
          </Card>
        </div>
      )}
      {doctor && (
        <div className="mt-4">
          <Card
            title="Environment report"
            description={`${doctor.command} · exit ${doctor.exitCode ?? '—'}`}>
            <KeyValue
              items={[
                { label: 'Ready', value: doctor.ok ? 'yes' : 'no' },
                { label: 'Python', value: doctor.pythonVersion ?? '—' },
                { label: 'Platform', value: doctor.platform ?? '—' },
                {
                  label: 'Devices',
                  value: doctor.availableDevices.join(', ') || '—',
                },
                {
                  label: 'Recommended',
                  value: doctor.recommendedDevice ?? '—',
                },
                {
                  label: 'Data path',
                  value: `${doctor.dataPath ?? '—'} ${doctor.dataPathExists ? '(found)' : '(missing)'}`,
                },
                {
                  label: 'Required',
                  value:
                    doctor.requiredDependencies
                      .map(
                        (entry) =>
                          `${entry.name} ${entry.installed ? '✓' : '✕'}`
                      )
                      .join(', ') || '—',
                },
                {
                  label: 'Optional',
                  value:
                    doctor.optionalDependencies
                      .map(
                        (entry) =>
                          `${entry.name} ${entry.installed ? '✓' : '✕'}`
                      )
                      .join(', ') || '—',
                },
              ]}
            />
          </Card>
        </div>
      )}
    </Screen>
  );
};
