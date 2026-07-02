import { LuCircle, LuX } from 'react-icons/lu';
import { getFileIcon } from '../utils/editor-languages';
import { FC } from 'react';

interface Tab {
  path: string;
  dirty: boolean;
}

interface TabBarProps {
  tabs: Tab[];
  activePath: string | null;
  onSelect: (path: string) => void;
  onClose: (path: string) => void;
}

export const TabBar: FC<TabBarProps> = ({
  tabs,
  activePath,
  onSelect,
  onClose,
}) => {
  if (tabs.length === 0) return null;

  return (
    <div className="bg-base-200 flex overflow-x-auto">
      {tabs.map((tab) => {
        const name = tab.path.split('/').pop() ?? tab.path;
        const isActive = tab.path === activePath;

        return (
          <div
            key={tab.path}
            onClick={() => onSelect(tab.path)}
            className={`flex cursor-pointer items-center gap-1 px-3 py-1.5 text-sm select-none ${
              isActive
                ? 'border-primary bg-base-100 text-base-content border-b-2'
                : 'text-base-content/60 hover:bg-base-100/50'
            }`}>
            <span className="text-xs">{getFileIcon(tab.path)}</span>
            <span>{name}</span>
            {tab.dirty && (
              <LuCircle className="text-primary h-2 w-2" fill="currentColor" />
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose(tab.path);
              }}
              className="hover:bg-base-300 ml-1 rounded p-0.5 text-xs">
              <LuX className="h-3 w-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
