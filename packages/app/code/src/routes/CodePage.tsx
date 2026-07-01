import { useCallback, useRef, type FC } from 'react';
import { LuFile, LuFolderOpen, LuSearch, LuPalette } from 'react-icons/lu';
import { CodeEditor, type CodeEditorHandle } from '../components/CodeEditor';
import { ConfirmModal } from '../components/ConfirmModal';
import { ContextMenu } from '../components/ContextMenu';
import { ErrorModal } from '../components/ErrorModal';
import { FileTree } from '../components/FileTree';
import { GlobalSearchPanel } from '../components/GlobalSearchPanel';
import { GoToLinePrompt } from '../components/GoToLinePrompt';
import { InputPrompt } from '../components/InputPrompt';
import { QuickOpen } from '../components/QuickOpen';
import { StatusBar } from '../components/StatusBar';
import { TabBar } from '../components/TabBar';
import { useCodePage } from '../hooks/useCodePage';

export const CodePage: FC = () => {
  const {
    root,
    activePath,
    sidebarOpen,
    sidebarWidth,
    cursorPos,
    pendingDelete,
    showFilePrompt,
    theme,
    showQuickOpen,
    showGlobalSearch,
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
    handleCreateFile,
    addFile,
    deleteFile,
    saveFile,
    handleChange,
    handleSidebarDragStart,
    setSidebarOpen,
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
    setShowQuickOpen,
    setShowGlobalSearch,
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

  const handleGoToLineSubmit = useCallback(
    (line: number) => {
      editorRef.current?.goToLine(line);
      handleGoToLine(line);
    },
    [handleGoToLine]
  );

  return (
    <div className="bg-base-300 text-base-content flex h-screen flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="bg-base-200 border-base-100 flex w-12 flex-col items-center gap-2 border-r py-2">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className={`btn btn-ghost btn-square btn-sm ${sidebarOpen ? 'text-primary' : 'text-base-content/60'}`}
            title={sidebarOpen ? 'Close Explorer' : 'Open Explorer'}>
            <LuFolderOpen className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              setShowGlobalSearch(true);
              setSidebarOpen(true);
            }}
            className={`btn btn-ghost btn-square btn-sm ${showGlobalSearch ? 'text-primary' : 'text-base-content/60'}`}
            title="Search (Cmd+Shift+F)">
            <LuSearch className="h-5 w-5" />
          </button>
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-square btn-sm text-base-content/60"
            title={`Switch to ${theme === 'dim' ? 'light' : 'dim'} theme`}>
            <LuPalette className="h-5 w-5" />
          </button>
          <div className="flex-1" />
        </div>
        {sidebarOpen && (
          <aside
            className="border-base-200 bg-base-200 relative flex shrink-0 border-r"
            style={{ width: sidebarWidth }}>
            {showGlobalSearch ? (
              <GlobalSearchPanel
                query={globalSearchQuery}
                results={globalSearchResults}
                searching={globalSearching}
                onQueryChange={setGlobalSearchQuery}
                onSearch={searchFiles}
                onSelectFile={(path) => {
                  openFileFromTree(path);
                  setShowGlobalSearch(false);
                }}
                onClose={() => setShowGlobalSearch(false)}
              />
            ) : (
              <FileTree
                root={root}
                onOpenFile={openFileFromTree}
                onOpenFolder={openFolder}
                onOpenFileDialog={openFileDialog}
                onCloseSidebar={() => setSidebarOpen(false)}
                onAddFile={addFile}
                onAddDir={() => setShowDirPrompt(true)}
                onDeleteFile={(path) => setPendingDelete(path)}
                onToggleDir={loadDirChildren}
                onContextMenu={openContextMenu}
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
          />
          {activeTab ? (
            <div className="flex flex-1 overflow-hidden">
              <CodeEditor
                ref={editorRef}
                key={activeTab.path}
                filename={activeTab.path}
                content={activeTab.content}
                wordWrap={wordWrap}
                onChange={handleChange}
                onSave={saveFile}
                onCursorChange={(line, col) => setCursorPos({ line, col })}
                onGoToLine={() => setShowGoToLine(true)}
              />
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <p className="mb-2 text-lg font-semibold">Code</p>
                <p className="text-base-content/40 text-sm">
                  Open a folder or file to start editing
                </p>
                <div className="mt-4 flex justify-center gap-2">
                  <button
                    onClick={openFolder}
                    className="btn btn-primary flex items-center gap-1">
                    <LuFolderOpen className="h-4 w-4" />
                    Open Folder
                  </button>
                  <button
                    onClick={openFileDialog}
                    className="btn btn-outline btn-primary flex items-center gap-1">
                    <LuFile className="h-4 w-4" />
                    Open File
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeTab && (
            <StatusBar
              path={activeTab.path}
              line={cursorPos.line}
              col={cursorPos.col}
              dirty={dirty}
              wordWrap={wordWrap}
              sidebarOpen={sidebarOpen}
              onToggleSidebar={() => setSidebarOpen((v) => !v)}
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
          onClose={closeContextMenu}
          onRename={startRename}
          onDelete={(path) => {
            setPendingDelete(path);
            closeContextMenu();
          }}
          onDuplicate={startDuplicate}
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
          handleCreateFile(name);
          setShowFilePrompt(false);
        }}
        onCancel={() => setShowFilePrompt(false)}
      />
      <InputPrompt
        open={showDirPrompt}
        title="New folder"
        placeholder="folder-name"
        onSubmit={(name) => {
          handleCreateDir(name);
          setShowDirPrompt(false);
        }}
        onCancel={() => setShowDirPrompt(false)}
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
    </div>
  );
};
