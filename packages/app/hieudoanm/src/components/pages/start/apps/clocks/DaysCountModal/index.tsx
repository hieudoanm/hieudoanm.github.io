import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';
import { FC, useMemo, useState } from 'react';
import { daysBetween } from './utils';

const todayString = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const DaysCountModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const result = useMemo(() => {
    if (!fromDate || !toDate) return null;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (isNaN(from.getTime()) || isNaN(to.getTime())) return null;
    return daysBetween(from, to);
  }, [fromDate, toDate]);

  const durationParts = result
    ? [
        ...(result.years > 0 ? [`${result.years} y`] : []),
        ...(result.months > 0 ? [`${result.months} m`] : []),
        `${result.days} d`,
      ]
    : [];

  return (
    <FullScreen centered onClose={onClose} title="Days Count">
      <div className="rounded-box border-base-300 bg-base-200 border p-4">
        <div className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="form-control flex-1">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-normal opacity-70">
                  From
                </span>
              </label>
              <input
                type="date"
                className="input input-sm input-bordered w-full"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <button
              className="btn btn-outline btn-sm mb-0.5"
              onClick={() => setFromDate(todayString())}>
              Today
            </button>
          </div>

          <div className="flex items-end gap-2">
            <div className="form-control flex-1">
              <label className="label mb-1 p-0">
                <span className="label-text text-xs font-normal opacity-70">
                  To
                </span>
              </label>
              <input
                type="date"
                className="input input-sm input-bordered w-full"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <button
              className="btn btn-outline btn-sm mb-0.5"
              onClick={() => setToDate(todayString())}>
              Today
            </button>
          </div>

          {result && (
            <div className="bg-base-200 space-y-2 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-70">Total Days</span>
                <span className="text-lg font-normal">
                  {result.totalDays.toLocaleString()}
                </span>
              </div>
              <div className="divider my-1" />
              <div className="flex items-center justify-between">
                <span className="text-xs opacity-70">Duration</span>
                <span className="text-sm font-normal">
                  {durationParts.join(' ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </FullScreen>
  );
};
DaysCountModal.displayName = 'DaysCountModal';
