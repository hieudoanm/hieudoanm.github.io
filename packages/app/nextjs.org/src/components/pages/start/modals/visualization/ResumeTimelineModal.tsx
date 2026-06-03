import { FC } from 'react';
import { ModalWrapper } from '@hieudoanm.github.io/components/atoms/ModalWrapper';

type TimelineEntry = {
  startYear: number;
  endYear: number;
  date: string;
  title: string;
  subtitle: string;
  location: string;
};

type Period = {
  label: string;
  education: (TimelineEntry & { icon: string }) | null;
  experience: (TimelineEntry & { icon: string }) | null;
};

const rmit: TimelineEntry & { icon: string } = {
  icon: '🎓',
  startYear: 2022,
  endYear: 2025,
  date: 'Oct 2022 - Sep 2025',
  title: 'Bachelor of Psychology',
  subtitle: 'RMIT University',
  location: 'Ho Chi Minh City, Vietnam',
};

const lab: TimelineEntry & { icon: string } = {
  icon: '🎓',
  startYear: 2013,
  endYear: 2016,
  date: 'Sep 2013 - Dec 2016',
  title: 'Bachelor of BIT',
  subtitle: 'LAB University of Applied Sciences',
  location: 'Lahti, Finland',
};

const nabLead: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2026,
  endYear: 2026,
  date: 'Jan 2026 - Present',
  title: 'Engineer, Lead',
  subtitle: 'NAB',
  location: 'Ho Chi Minh City, Vietnam',
};

const nabSr: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2024,
  endYear: 2025,
  date: 'Jan 2024 - Dec 2025',
  title: 'Engineer, Senior Analyst',
  subtitle: 'NAB',
  location: 'Ho Chi Minh City, Vietnam',
};

const nabAnalyst: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2021,
  endYear: 2023,
  date: 'Aug 2021 - Dec 2023',
  title: 'Engineer, Analyst',
  subtitle: 'NAB',
  location: 'Ho Chi Minh City, Vietnam',
};

const boost: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2019,
  endYear: 2021,
  date: 'Mar 2019 - Apr 2021',
  title: 'Back-end Engineer',
  subtitle: 'BoostCommerce',
  location: 'Hanoi, Vietnam',
};

const admetrics: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2017,
  endYear: 2019,
  date: 'Mar 2017 - Jan 2019',
  title: 'Front-end Engineer',
  subtitle: 'admetrics',
  location: 'Frankfurt am Main, Germany',
};

const witrafi: TimelineEntry & { icon: string } = {
  icon: '💼',
  startYear: 2015,
  endYear: 2017,
  date: 'Jan 2015 - Feb 2017',
  title: 'Front-end Engineer',
  subtitle: 'Witrafi',
  location: 'Helsinki, Finland',
};

const PERIODS: Period[] = [
  { label: '2026', education: null, experience: nabLead },
  { label: '2025', education: null, experience: null },
  { label: '2024', education: null, experience: nabSr },
  { label: '2023', education: null, experience: null },
  { label: '2022', education: rmit, experience: null },
  { label: '2021', education: null, experience: nabAnalyst },
  { label: '2020', education: null, experience: null },
  { label: '2019', education: null, experience: boost },
  { label: '2018', education: null, experience: null },
  { label: '2017', education: null, experience: admetrics },
  { label: '2016', education: null, experience: null },
  { label: '2015', education: null, experience: witrafi },
  { label: '2014', education: null, experience: null },
  { label: '2013', education: lab, experience: null },
];

const EntryCard: FC<{ entry: TimelineEntry & { icon: string } }> = ({
  entry,
}) => (
  <div className="min-w-0">
    <p className="text-sm leading-tight font-bold">{entry.title}</p>
    <p className="text-base-content/60 text-xs leading-tight">
      {entry.subtitle}
    </p>
    <p className="text-base-content/30 mt-0.5 text-[10px]">{entry.location}</p>
  </div>
);

const EntryIcon: FC<{ icon: string }> = ({ icon }) => (
  <div className="bg-base-100 ring-base-content/10 flex h-7 w-7 items-center justify-center rounded-full ring-4">
    <span className="text-xs">{icon}</span>
  </div>
);

export const ResumeTimelineModal: FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <ModalWrapper
      onClose={onClose}
      title="Resume Timeline"
      subtitle="Education & Experience"
      size="max-w-[min(48rem,90vw)]"
      fullHeight>
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl p-6 pb-0">
          <div className="mb-4 grid grid-cols-[1fr_auto_1fr] gap-0">
            <div className="pr-2 text-right md:pr-4">
              <p className="text-sm font-bold tracking-tight">🎓 Education</p>
            </div>
            <div />
            <div className="pl-2 md:pl-4">
              <p className="text-sm font-bold tracking-tight">💼 Experience</p>
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
                  <div className="font-mono text-[11px] font-bold tracking-tight opacity-60">
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
    </ModalWrapper>
  );
};
