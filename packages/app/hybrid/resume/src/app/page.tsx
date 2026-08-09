'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { LuInfo, LuRedo, LuRotateCcw, LuTag, LuUndo } from 'react-icons/lu';
import { ThemeToggle } from '../components/app/ThemeToggle';
import { DataPanel } from '../components/resume/data/DataPanel';
import { EditorPanel } from '../components/resume/editor/EditorPanel';
import { ProfileSwitcher } from '../components/resume/preview/ProfileSwitcher';
import { PreviewPanel } from '../components/resume/preview/PreviewPanel';
import { TemplatePicker } from '../components/resume/preview/TemplatePicker';
import { RESUME_TEMPLATES } from '../components/resume/templates';
import { getPaperSize, DEFAULT_PAPER_ID } from '../data/paper';
import { seedResumeData } from '../data/seed';
import { useHistory } from '../hooks/useHistory';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useResumeProfiles } from '../hooks/useResumeProfiles';
import { DEFAULT_RESUME_OPTIONS } from '../types/resume';
import type { ResumeData, ResumeOptions } from '../types/resume';
import { downloadResumeFile } from '../utils/export';

type SidebarTab = 'editor' | 'templates' | 'data';

const HomePage = () => {
  const [tab, setTab] = useState<SidebarTab>('editor');
  const {
    profiles,
    activeId,
    activeProfile,
    selectProfile,
    createProfile,
    renameProfile,
    deleteProfile,
    updateProfileData,
  } = useResumeProfiles();
  const {
    present: data,
    set: setData,
    undo,
    redo,
    canUndo,
    canRedo,
    reset: resetHistory,
  } = useHistory<ResumeData>(activeProfile.data, 'resume.data');
  const [templateId, setTemplateId] = useLocalStorage(
    'resume.template',
    'classic'
  );
  const [paperId, setPaperId] = useLocalStorage(
    'resume.paper',
    DEFAULT_PAPER_ID
  );
  const [options, setOptions] = useLocalStorage<ResumeOptions>(
    'resume.options',
    DEFAULT_RESUME_OPTIONS
  );

  const mountedRef = useRef(false);
  const syncingRef = useRef(false);
  const lastProfileIdRef = useRef(activeProfile.id);
  const paper = getPaperSize(paperId);

  const saveResume = useCallback(() => {
    downloadResumeFile(data, paper);
  }, [data, paper]);

  useKeyboardShortcuts({ onUndo: undo, onRedo: redo, onSave: saveResume });

  useEffect(() => {
    if (activeProfile.id === lastProfileIdRef.current) return;
    lastProfileIdRef.current = activeProfile.id;
    if (data === activeProfile.data) return;
    syncingRef.current = true;
    resetHistory(activeProfile.data);
  }, [activeProfile.id, data, resetHistory]);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (syncingRef.current) {
      syncingRef.current = false;
      return;
    }
    updateProfileData(activeProfile.id, data);
  }, [data, activeProfile.id, updateProfileData]);

  const resetData = () => {
    if (window.confirm('Reset the resume back to the sample data?')) {
      setData(seedResumeData);
    }
  };

  return (
    <div className="flex h-screen flex-col">
      <header className="navbar bg-base-100 border-base-300 border-b px-4">
        <div className="flex-1">
          <Link
            href="/"
            className="btn btn-ghost btn-sm text-sm font-black tracking-tight">
            Free Resume Builder
          </Link>
        </div>
        <div className="flex-none gap-1">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="Undo"
            disabled={!canUndo}
            onClick={undo}>
            <LuUndo />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            aria-label="Redo"
            disabled={!canRedo}
            onClick={redo}>
            <LuRedo />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={resetData}>
            <LuRotateCcw />
            Reset
          </button>
          <ThemeToggle />
          <Link href="/version/" className="btn btn-ghost btn-sm">
            <LuTag />
            Version
          </Link>
          <Link href="/about/" className="btn btn-ghost btn-sm">
            <LuInfo />
            About
          </Link>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="bg-base-100 border-base-300 flex min-h-0 flex-col lg:w-[400px] lg:border-r">
          <ProfileSwitcher
            profiles={profiles}
            activeId={activeId}
            onSelect={selectProfile}
            onCreate={createProfile}
            onRename={renameProfile}
            onDelete={deleteProfile}
          />
          <div
            role="tablist"
            aria-label="Builder sections"
            className="border-base-300 flex gap-1 border-b px-2 pt-2">
            <button
              role="tab"
              type="button"
              aria-selected={tab === 'editor'}
              className={[
                'btn btn-ghost btn-sm rounded-b-none',
                tab === 'editor'
                  ? 'text-primary border-primary border-b-2'
                  : '',
              ].join(' ')}
              onClick={() => setTab('editor')}>
              Editor
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={tab === 'templates'}
              className={[
                'btn btn-ghost btn-sm rounded-b-none',
                tab === 'templates'
                  ? 'text-primary border-primary border-b-2'
                  : '',
              ].join(' ')}
              onClick={() => setTab('templates')}>
              Templates ({RESUME_TEMPLATES.length})
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={tab === 'data'}
              className={[
                'btn btn-ghost btn-sm rounded-b-none',
                tab === 'data' ? 'text-primary border-primary border-b-2' : '',
              ].join(' ')}
              onClick={() => setTab('data')}>
              Data
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {tab === 'editor' ? (
              <EditorPanel data={data} onChange={setData} />
            ) : tab === 'templates' ? (
              <div className="p-3">
                <TemplatePicker
                  selectedId={templateId}
                  onSelect={setTemplateId}
                />
              </div>
            ) : (
              <DataPanel data={data} onImport={setData} />
            )}
          </div>
        </aside>
        <main className="flex min-h-0 min-w-0 flex-1">
          <PreviewPanel
            data={data}
            templateId={templateId}
            paperId={paperId}
            options={options}
            onPaperChange={setPaperId}
            onOptionsChange={setOptions}
          />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
