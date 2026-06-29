import { Dropzone, ModalWrapper } from '@hieudoanm.github.io/components/atoms';
import { saveAs } from 'file-saver';
import 'github-markdown-css/github-markdown.css';
import { FC, ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

import { FileToolbar } from './components/FileToolbar';
import { FormatToolbar } from './components/FormatToolbar';
import { MarkdownPreviewer } from './components/MarkdownPreviewer';
import { StatsBar } from './components/StatsBar';
import { TocSidebar } from './components/TocSidebar';
import { ViewControls } from './components/ViewControls';
import { STORAGE_KEY } from './constants';
import { FONTS, DEFAULT_FONT_ID } from './fonts';
import { useCodeMirror } from './hooks/useCodeMirror';
import { useDraftRestore, useDraftSave } from './hooks/useDraftPersistence';
import { useMarkdownRender } from './hooks/useMarkdownRender';
import { useScrollSync } from './hooks/useScrollSync';
import { INITIAL_MARKDOWN } from './initialMarkdown';
import { computeStats } from './markdownFormatting';
import { MarkdownState, ViewMode } from './types';
import { exportPdf } from './utils/pdfExport';
import { recognizeTextFromImage } from './utils/ocrUtils';

const INITIAL_STATE: MarkdownState = {
  html: '',
  loading: false,
  markdown: INITIAL_MARKDOWN,
  ocrLoading: false,
  fontId: DEFAULT_FONT_ID,
  viewMode: 'split',
  showToc: false,
  restored: false,
  fileName: 'untitled.md',
  showLineNumbers: false,
};

export const MarkdownModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [state, setState] = useState<MarkdownState>(INITIAL_STATE);
  const [stringStyle, setStringStyle] = useState('');

  const set = useCallback((partial: Partial<MarkdownState>) => {
    setState((prev) => ({ ...prev, ...partial }));
  }, []);

  const {
    html,
    loading,
    markdown,
    ocrLoading,
    fontId,
    viewMode,
    showToc,
    restored,
    fileName,
    showLineNumbers,
  } = state;
  const selectedFont = FONTS.find((f) => f.id === fontId) ?? FONTS[0];
  const stats = useMemo(() => computeStats(markdown), [markdown]);

  const onDocChange = useCallback(
    (value: string) => set({ markdown: value }),
    [set]
  );
  const { editorRef, viewRef, exec } = useCodeMirror(
    markdown,
    ocrLoading,
    showLineNumbers,
    onDocChange
  );
  const previewScrollRef = useScrollSync(viewRef);

  const onDraftRestore = useCallback(
    (data: Partial<MarkdownState>) => set(data),
    [set]
  );
  useDraftRestore(onDraftRestore);
  useDraftSave(markdown, fontId, viewMode, fileName, showLineNumbers);

  const onHtml = useCallback(
    (htmlVal: string) => set({ html: htmlVal }),
    [set]
  );
  useMarkdownRender(markdown, onHtml);

  const tocItems = useMemo(() => {
    const items: { level: number; text: string; line: number }[] = [];
    markdown.split('\n').forEach((line, index) => {
      const match = line.match(/^(#{1,6})\s+(.+)/);
      if (match) {
        const text = match[2].replace(/\{#[^}]+\}/g, '').trim();
        if (text) items.push({ level: match[1].length, text, line: index });
      }
    });
    return items;
  }, [markdown]);

  const handleNew = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    set({ markdown: '', html: '', restored: false, fileName: 'untitled.md' });
  }, [set]);

  const ocrInputRef = useRef<HTMLInputElement | null>(null);

  const handleOpen = useCallback(() => {}, []);
  const handleOpenFile = useCallback(
    async (file: File) => {
      set({ markdown: await file.text(), fileName: file.name });
    },
    [set]
  );

  const handleSave = useCallback(() => {
    saveAs(
      new Blob([markdown], { type: 'text/markdown;charset=utf-8' }),
      fileName
    );
  }, [markdown, fileName]);

  const handleExportHTML = useCallback(() => {
    const fullHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${fileName}</title></head><body>${html}</body></html>`;
    saveAs(
      new Blob([fullHtml], { type: 'text/html;charset=utf-8' }),
      fileName.replace(/\.md$/, '') + '.html'
    );
  }, [html, fileName]);

  const handleCopyMarkdown = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(markdown);
    } catch {
      /* silently fail */
    }
  }, [markdown]);

  const handleCopyHTML = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(html);
    } catch {
      /* silently fail */
    }
  }, [html]);

  const scrollToHeading = useCallback(
    (line: number) => {
      const view = viewRef.current;
      if (!view) return;
      const pos = view.state.doc.line(line + 1).from;
      view.dispatch({ selection: { anchor: pos }, scrollIntoView: true });
      view.focus();
    },
    [viewRef]
  );

  const handleOCRFile = async (e: ChangeEvent<HTMLInputElement>) => {
    set({ ocrLoading: true });
    const file = e.target.files?.item(0);
    if (!file) {
      set({ ocrLoading: false });
      return;
    }
    const text = await recognizeTextFromImage(file);
    if (text) set({ markdown: text });
    set({ ocrLoading: false });
  };

  const handleDownload = useCallback(() => {
    set({ loading: true });
    exportPdf(html, (v: boolean) => set({ loading: v }));
  }, [html, set]);

  return (
    <ModalWrapper
      onClose={onClose}
      title="Markdown Editor"
      size="max-w-6xl"
      fullHeight>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <FileToolbar
          fileName={fileName}
          loading={loading}
          ocrLoading={ocrLoading}
          onNew={handleNew}
          onOpen={handleOpen}
          onSave={handleSave}
          onCopyMarkdown={handleCopyMarkdown}
          onCopyHTML={handleCopyHTML}
          onExportHTML={handleExportHTML}
          onDownloadPdf={handleDownload}
          onOcrFile={handleOCRFile}
          ocrInputRef={ocrInputRef}
        />
        <FormatToolbar
          exec={exec}
          stringStyle={stringStyle}
          onStyleChange={setStringStyle}
        />
        <ViewControls
          viewMode={viewMode}
          showToc={showToc}
          showLineNumbers={showLineNumbers}
          restored={restored}
          fontId={fontId}
          onViewModeChange={(mode: ViewMode) => set({ viewMode: mode })}
          onTocToggle={() => set({ showToc: !showToc })}
          onLineNumbersToggle={() => set({ showLineNumbers: !showLineNumbers })}
          onFontChange={(id: string) => set({ fontId: id })}
        />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {showToc && (
            <TocSidebar items={tocItems} onScrollTo={scrollToHeading} />
          )}
          <div
            className={`grid min-h-0 flex-1 overflow-hidden ${viewMode === 'split' ? 'divide-base-300 divide-x md:grid-cols-2' : 'grid-cols-1'}`}>
            <div
              className={`flex flex-col overflow-hidden ${viewMode === 'preview' ? 'hidden' : ''}`}>
              <div
                ref={editorRef}
                className={`${ocrLoading ? 'pointer-events-none opacity-50' : ''} h-full w-full flex-1 overflow-auto text-sm`}
              />
            </div>
            <div
              className={`flex flex-col overflow-hidden ${viewMode === 'editor' ? 'hidden' : ''}`}>
              <div
                ref={previewScrollRef}
                className="h-full w-full flex-1 overflow-auto p-4">
                <MarkdownPreviewer
                  html={html}
                  fontClassName={selectedFont.className}
                />
              </div>
            </div>
          </div>
        </div>
        <StatsBar stats={stats} />
      </div>
      <Dropzone
        accept=".md,.markdown,text/markdown"
        onFile={handleOpenFile}
        className="hidden"
      />
    </ModalWrapper>
  );
};
MarkdownModal.displayName = 'MarkdownModal';
