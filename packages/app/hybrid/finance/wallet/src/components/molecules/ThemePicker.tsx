import { FC, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { themes } from '@/types';
import { FiSun } from 'react-icons/fi';

const ThemePicker: FC = () => {
  const { theme, setTheme } = useTheme();
  const [showAll, setShowAll] = useState(false);
  const visibleThemes = showAll ? themes : themes.slice(0, 10);

  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FiSun />
            <span className="font-medium">Theme</span>
          </div>
          <span className="text-base-content/60 text-sm capitalize">
            {theme}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-6">
          {visibleThemes.map((t) => (
            <button
              key={t.value}
              className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-all ${
                theme === t.value ? 'ring-primary ring-2' : 'hover:bg-base-300'
              }`}
              data-theme={t.value}
              onClick={() => setTheme(t.value)}>
              <div className="flex w-full gap-0.5">
                <div className="bg-primary h-3 flex-1 rounded-l-sm" />
                <div className="bg-secondary h-3 flex-1" />
                <div className="bg-accent h-3 flex-1 rounded-r-sm" />
              </div>
              <span className="text-base-content w-full truncate text-center text-[10px]">
                {t.name}
              </span>
            </button>
          ))}
        </div>

        {!showAll && themes.length > 10 && (
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => setShowAll(true)}>
            Show all {themes.length} themes
          </button>
        )}
        {showAll && (
          <button
            className="text-primary text-sm hover:underline"
            onClick={() => setShowAll(false)}>
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ThemePicker;
