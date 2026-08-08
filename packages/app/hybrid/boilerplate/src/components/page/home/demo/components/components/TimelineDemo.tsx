import { FC } from 'react';

export const TimelineDemo: FC = () => {
  const items = [
    "Harry Potter and Sorcerer's Stack",
    'Harry Potter and Chamber of Servers',
    'Harry Potter and Prisoner of Azure',
    'Harry Potter and Goblet of Firebase',
    'Harry Potter and Elixir of Phoenix',
    'Harry Potter and Half-Deployed App',
    'Harry Potter and Deathly Frameworks',
  ];
  return (
    <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
      <div className="card-body">
        <ul className="timeline timeline-vertical timeline-compact">
          {items.map((title, i) => {
            const completed = i < 3;
            const even = i % 2 === 0;
            const icon = completed ? '✓' : '○';
            if (even) {
              return (
                <li key={title}>
                  <div
                    className={`timeline-middle ${completed ? 'text-primary' : ''}`}>
                    {icon}
                  </div>
                  <div className="timeline-end mb-10 md:text-end">
                    <div className="text-xs font-bold">{title}</div>
                  </div>
                  <hr className={completed ? 'bg-primary' : ''} />
                </li>
              );
            }
            return (
              <li key={title}>
                <hr className={completed ? 'bg-primary' : ''} />
                <div className="timeline-middle">
                  <span className={completed ? 'text-primary' : ''}>
                    {icon}
                  </span>
                </div>
                <div className="timeline-end mb-10">
                  <div className="text-xs font-bold">{title}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

TimelineDemo.displayName = 'TimelineDemo';
