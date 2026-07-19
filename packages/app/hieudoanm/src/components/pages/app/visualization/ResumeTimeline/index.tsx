import { FC } from 'react';
import { FullScreen } from '@hieudoanm.github.io/components/atoms/FullScreen';

import { PERIODS } from './data';
import { EntryCard } from './EntryCard';
import { EntryIcon } from './EntryIcon';

export const ResumeTimeline: FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <FullScreen
      onClose={onClose}
      title="Resume Timeline"
      subtitle="Education & Experience">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-6 pb-0">
          <div className="mb-4 grid grid-cols-[1fr_auto_1fr] gap-0">
            <div className="pr-2 text-right md:pr-4">
              <p className="text-sm font-normal tracking-tight">🎓 Education</p>
            </div>
            <div />
            <div className="pl-2 md:pl-4">
              <p className="text-sm font-normal tracking-tight">
                💼 Experience
              </p>
            </div>
          </div>
        </div>
        <ul className="timeline timeline-vertical mx-auto max-w-2xl px-6 pb-6">
          {PERIODS.map((period, i) => (
            <li key={i}>
              <hr className="bg-base-content/10" />
              <div className="timeline-start self-center pr-2 md:pr-4 md:text-right">
                {period.education ? (
                  <div className="border-base-content/10 rounded-lg border p-2 md:p-3">
                    <span className="mb-0.5 block font-mono text-[10px] opacity-40">
                      {period.education.date}
                    </span>
                    <EntryCard entry={period.education} />
                  </div>
                ) : (
                  <div className="invisible rounded-lg border border-transparent p-2 md:p-3">
                    <div className="mb-0.5 h-4" />
                    <div className="h-12" />
                  </div>
                )}
              </div>

              <div className="timeline-middle self-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="font-mono text-[11px] font-normal tracking-tight opacity-60">
                    {period.label}
                  </div>
                  <div className="flex items-center gap-1">
                    {period.education && <EntryIcon icon="🎓" />}
                    {period.experience && <EntryIcon icon="💼" />}
                  </div>
                </div>
              </div>

              <div className="timeline-end self-center pl-2 md:pl-4">
                {period.experience ? (
                  <div className="border-base-content/10 rounded-lg border p-2 md:p-3">
                    <span className="mb-0.5 block font-mono text-[10px] opacity-40">
                      {period.experience.date}
                    </span>
                    <EntryCard entry={period.experience} />
                  </div>
                ) : (
                  <div className="invisible rounded-lg border border-transparent p-2 md:p-3">
                    <div className="mb-0.5 h-4" />
                    <div className="h-12" />
                  </div>
                )}
              </div>
              <hr className="bg-base-content/10" />
            </li>
          ))}
        </ul>
      </div>
    </FullScreen>
  );
};
ResumeTimeline.displayName = 'ResumeTimeline';
