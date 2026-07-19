import { FC } from 'react';

const AlertSolidInfo: FC = () => (
  <div className="alert alert-info border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
    <span>There are 9 new messages</span>
  </div>
);

const AlertOutlineSuccess: FC = () => (
  <div className="alert alert-outline alert-success border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
    <span>Verification process completed</span>
  </div>
);

const AlertDashWarning: FC = () => (
  <div className="alert alert-dash alert-warning border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
    </svg>
    <span>
      <a className="link">Click</a> to verify your email
    </span>
  </div>
);

const AlertSoftError: FC = () => (
  <div className="alert alert-soft alert-error border-base-300 border text-xs font-bold">
    <svg fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
    <span>Access denied</span>
    <button className="btn btn-ghost btn-xs">Support</button>
  </div>
);

const TimelineDemo: FC = () => {
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
    <ul className="timeline timeline-vertical timeline-compact">
      {items.map((title, i) => (
        <li key={title}>
          {i % 2 === 0 ? (
            <>
              <div className={`timeline-middle ${i < 3 ? 'text-primary' : ''}`}>
                {i < 3 ? '✓' : '○'}
              </div>
              <div className="timeline-end mb-10 md:text-end">
                <div className="text-xs font-bold">{title}</div>
              </div>
              <hr className={i < 3 ? 'bg-primary' : ''} />
            </>
          ) : (
            <>
              <hr className={i < 3 ? 'bg-primary' : ''} />
              <div className="timeline-middle">
                <span className={i < 3 ? 'text-primary' : ''}>
                  {i < 3 ? '✓' : '○'}
                </span>
              </div>
              <div className="timeline-end mb-10">
                <div className="text-xs font-bold">{title}</div>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

const PricingCard: FC = () => (
  <div
    className="card bg-base-100 border-base-300 from-base-content/5 border bg-linear-to-bl shadow-sm"
    style={{
      background:
        'linear-gradient(to bottom left, oklch(var(--b1) / 0.05), oklch(var(--b1)))',
    }}>
    <div className="card-body">
      <div className="tabs tabs-box bg-base-300 m-4 inline-flex flex-nowrap self-center">
        <input
          type="radio"
          name="pricing"
          className="tab"
          aria-label="Monthly"
        />
        <input
          type="radio"
          name="pricing"
          className="tab"
          aria-label="Yearly"
          defaultChecked
        />
      </div>
      <div className="indicator">
        <span className="indicator-item badge badge-warning badge-xs">
          SALE
        </span>
        <h3 className="text-xl font-bold">Starter Plan</h3>
      </div>
      <div className="my-2 text-4xl font-bold">
        $200
        <span className="text-base-content/50 text-sm font-normal">/month</span>
      </div>
      <ul className="my-4 flex flex-col gap-2 text-sm">
        <li>✓ 20 Tokens per day</li>
        <li>✓ 10 Projects</li>
        <li>✓ API Access</li>
        <li className="text-base-content/40">✕ Priority Support</li>
      </ul>
      <button className="btn btn-accent w-full">Buy Now</button>
    </div>
  </div>
);

export const DemoColumn4: FC = () => (
  <div className="flex flex-col gap-4">
    <AlertSolidInfo />
    <AlertOutlineSuccess />
    <AlertDashWarning />
    <AlertSoftError />
    <TimelineDemo />
    <PricingCard />
  </div>
);
DemoColumn4.displayName = 'DemoColumn4';
