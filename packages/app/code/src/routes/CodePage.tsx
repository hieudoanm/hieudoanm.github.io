import { useCallback, useRef, useState, type FC } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { CodeEditor, type CodeEditorHandle } from '../components/CodeEditor';
import { ActivityBar } from '../components/ActivityBar';
import { WelcomeScreen } from '../components/WelcomeScreen';
import { ConfirmModal } from '../components/ConfirmModal';
import { ContextMenu } from '../components/ContextMenu';
import { ErrorModal } from '../components/ErrorModal';
import { FileTree } from '../components/FileTree';
import { GlobalSearchPanel } from '../components/GlobalSearchPanel';
import { GoToLinePrompt } from '../components/GoToLinePrompt';
import { InputPrompt } from '../components/InputPrompt';
import { QuickOpen } from '../components/QuickOpen';
import { ShortcutsModal } from '../components/ShortcutsModal';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { useCodePage } from '../hooks/useCodePage';

export const CodePage: FC = () => {
  const {
    root,
    rootPath,
    activePath,
    sidebarState,
    sidebarWidth,
    cursorPos,
    selectionCount,
    setSelectionCount,
    pendingDelete,
    showFilePrompt,
    theme,
    showQuickOpen,
    fontSize,
    showShortcuts,
    setShowShortcuts,
    globalSearchQuery,
    globalSearchResults,
    contextMenu,
    showRenamePrompt,
    renameTarget,
    showDuplicatePrompt,
    duplicateTarget,
    showGoToLine,
    wordWrap,
    showDirPrompt,
    globalSearching,
    error,
    hideError,
    loadDirChildren,
    openFolder,
    openFileFromTree,
    openFileDialog,
    closeTab,
    closeAllTabs,
    handleCreateFile,
    addFile,
    deleteFile,
    saveFile,
    saveFileAs,
    handleChange,
    handleSidebarDragStart,
    setSidebarState,
    setPendingDelete,
    setShowFilePrompt,
    setActivePath,
    setCursorPos,
    activeTab,
    dirty,
    dirtyTabs,
    toggleTheme,
    toggleWordWrap,
    handleRename,
    handleGoToLine,
    handleDuplicate,
    handleCreateDir,
    openContextMenu,
    closeContextMenu,
    startRename,
    startDuplicate,
    searchFiles,
    collectAllFiles,
    refreshTree,
    setShowQuickOpen,
    setGlobalSearchQuery,
    setShowGoToLine,
    setShowDirPrompt,
    setContextMenu,
    setRenameTarget,
    setShowRenamePrompt,
    setDuplicateTarget,
    setShowDuplicatePrompt,
  } = useCodePage();

  const editorRef = useRef<CodeEditorHandle>(null);
  const [createInDir, setCreateInDir] = useState<string | null>(null);

  const handleAddFileInDir = useCallback((dir: string) => {
    setCreateInDir(dir);
    setShowFilePrompt(true);
  }, []);

  const handleAddDirInDir = useCallback((dir: string) => {
    setCreateInDir(dir);
    setShowDirPrompt(true);
  }, []);

  const handleGoToLineSubmit = useCallback(
    (line: number) => {
      editorRef.current?.goToLine(line);
      handleGoToLine(line);
    },
    [handleGoToLine]
  );

  const handleOpenExplorer = useCallback(() => {
    setSidebarState((prev) => (prev !== 'explorer' ? 'explorer' : 'closed'));
  }, []);

  const handleOpenSearch = useCallback(() => {
    setSidebarState((prev) => (prev !== 'search' ? 'search' : 'closed'));
  }, []);

  return (
    <div className="bg-base-300 text-base-content flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <ActivityBar
          sidebarState={sidebarState}
          theme={theme}
          onOpenExplorer={handleOpenExplorer}
          onOpenSearch={handleOpenSearch}
          onToggleTheme={toggleTheme}
        />
        {sidebarState !== 'closed' && (
          <aside
            className="border-base-200 bg-base-200 relative flex shrink-0 border-r"
            style={{ width: sidebarWidth }}>
            {sidebarState === 'search' ? (
              <GlobalSearchPanel
                query={globalSearchQuery}
                results={globalSearchResults}
                searching={globalSearching}
                onQueryChange={setGlobalSearchQuery}
                onSearch={searchFiles}
                onSelectFile={(path) => {
                  openFileFromTree(path);
                  setSidebarState('explorer');
                }}
                onClose={() => setSidebarState('explorer')}
              />
            ) : (
              <FileTree
                root={root}
                activePath={activePath}
                onOpenFile={openFileFromTree}
                onOpenFolder={openFolder}
                onOpenFileDialog={openFileDialog}
                onCloseSidebar={() => setSidebarState('closed')}
                onAddFile={addFile}
                onAddDir={() => setShowDirPrompt(true)}
                onDeleteFile={(path) => setPendingDelete(path)}
                onToggleDir={loadDirChildren}
                onContextMenu={openContextMenu}
                onRefresh={() => rootPath && refreshTree(rootPath)}
              />
            )}
            <div
              className="hover:bg-primary absolute top-0 right-0 h-full w-1 cursor-col-resize"
              onMouseDown={handleSidebarDragStart}
            />
          </aside>
        )}
        <main className="flex flex-1 flex-col overflow-hidden">
          <TabBar
            tabs={dirtyTabs}
            activePath={activePath}
            onSelect={(path) => {
              setActivePath(path);
            }}
            onClose={closeTab}
            onCloseAll={closeAllTabs}
          />
          {activeTab ? (
            <>
              <Breadcrumb rootPath={rootPath} filePath={activeTab.path} />
              <div className="flex flex-1 overflow-hidden">
                <CodeEditor
                  ref={editorRef}
                  key={activeTab.path}
                  filename={activeTab.path}
                  content={activeTab.content}
                  wordWrap={wordWrap}
                  fontSize={fontSize}
                  onChange={handleChange}
                  onSave={saveFile}
                  onSaveAs={saveFileAs}
                  onCursorChange={(line, col) => setCursorPos({ line, col })}
                  onSelectionChange={(count) => setSelectionCount(count)}
                  onGoToLine={() => setShowGoToLine(true)}
                />
              </div>
            </>
          ) : (
            <WelcomeScreen
              onOpenFolder={openFolder}
              onOpenFileDialog={openFileDialog}
            />
          )}
          {activeTab && (
            <StatusBar
              path={activeTab.path}
              line={cursorPos.line}
              col={cursorPos.col}
              selectionCount={selectionCount}
              dirty={dirty}
              wordWrap={wordWrap}
              sidebarOpen={sidebarState !== 'closed'}
              onToggleSidebar={() =>
                setSidebarState((prev) =>
                  prev !== 'closed' ? 'closed' : 'explorer'
                )
              }
              onToggleWordWrap={toggleWordWrap}
            />
          )}
        </main>
      </div>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          path={contextMenu.path}
          name={contextMenu.name}
          isDir={contextMenu.isDir}
          rootPath={rootPath}
          onClose={closeContextMenu}
          onRename={startRename}
          onDelete={(path) => {
            setPendingDelete(path);
            closeContextMenu();
          }}
          onDuplicate={startDuplicate}
          onAddFile={handleAddFileInDir}
          onAddDir={handleAddDirInDir}
        />
      )}

      <ErrorModal error={error} onClose={hideError} />
      <ConfirmModal
        open={!!pendingDelete}
        title="Delete File"
        message={
          pendingDelete
            ? `Are you sure you want to delete "${pendingDelete.split('/').pop()}"?`
            : ''
        }
        onConfirm={() => {
          if (pendingDelete) deleteFile(pendingDelete);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
      <InputPrompt
        open={showFilePrompt}
        title="New file"
        placeholder="filename.txt"
        onSubmit={(name) => {
          if (createInDir && rootPath) {
            const relDir = createInDir.startsWith(rootPath)
              ? createInDir.slice(rootPath.length).replace(/^\//, '')
              : '';
            handleCreateFile(relDir ? `${relDir}/${name}` : name);
          } else {
            handleCreateFile(name);
          }
          setCreateInDir(null);
          setShowFilePrompt(false);
        }}
        onCancel={() => {
          setCreateInDir(null);
          setShowFilePrompt(false);
        }}
      />
      <InputPrompt
        open={showDirPrompt}
        title="New folder"
        placeholder="folder-name"
        onSubmit={(name) => {
          if (createInDir && rootPath) {
            const relDir = createInDir.startsWith(rootPath)
              ? createInDir.slice(rootPath.length).replace(/^\//, '')
              : '';
            handleCreateDir(relDir ? `${relDir}/${name}` : name);
          } else {
            handleCreateDir(name);
          }
          setCreateInDir(null);
          setShowDirPrompt(false);
        }}
        onCancel={() => {
          setCreateInDir(null);
          setShowDirPrompt(false);
        }}
      />
      <InputPrompt
        open={showRenamePrompt}
        title="Rename"
        placeholder="new-name"
        defaultValue={renameTarget ? renameTarget.split('/').pop() : ''}
        onSubmit={(name) => handleRename(name)}
        onCancel={() => {
          setRenameTarget(null);
          setShowRenamePrompt(false);
        }}
      />
      <InputPrompt
        open={showDuplicatePrompt}
        title="Duplicate file"
        placeholder="new-filename"
        defaultValue={
          duplicateTarget ? `copy-of-${duplicateTarget.split('/').pop()}` : ''
        }
        onSubmit={(name) => handleDuplicate(name)}
        onCancel={() => {
          setDuplicateTarget(null);
          setShowDuplicatePrompt(false);
        }}
      />
      <QuickOpen
        open={showQuickOpen}
        onClose={() => setShowQuickOpen(false)}
        onSelect={(path) => {
          openFileFromTree(path);
          setShowQuickOpen(false);
        }}
        collectFiles={collectAllFiles}
      />
      <GoToLinePrompt
        open={showGoToLine}
        onSubmit={handleGoToLineSubmit}
        onCancel={() => setShowGoToLine(false)}
      />
      <ShortcutsModal
        open={showShortcuts}
        onClose={() => setShowShortcuts(false)}
      />
    </div>
  );
};
