import { FC } from 'react';
import { Section } from './Section';

export const FeedbackSection: FC = () => {
  return (
    <Section
      id="feedback"
      label="Feedback & display"
      title="Communicate every state"
      sub="Alerts, toasts, progress, skeletons — all the patterns you need to tell users what's happening.">
      <div className="mb-10 grid grid-cols-2 gap-10">
        <div>
          <p className="text-base-content/50 mb-4 text-sm">Alerts</p>
          <div className="flex flex-col gap-3">
            {[
              {
                icon: '✓',
                cls: 'alert-success',
                title: 'Changes saved',
                desc: 'Your profile was updated successfully.',
              },
              {
                icon: '✕',
                cls: 'alert-error',
                title: 'Payment failed',
                desc: 'Your card was declined. Please try again.',
              },
              {
                icon: '⚠',
                cls: 'alert-warning',
                title: 'Trial ending soon',
                desc: '7 days left in your free trial.',
              },
              {
                icon: 'ℹ',
                cls: 'alert-info',
                title: 'Scheduled maintenance',
                desc: 'Downtime on Sat, Apr 6 from 02:00–04:00 UTC.',
              },
            ].map(({ icon, cls, title, desc }) => (
              <div key={title} role="alert" className={`alert ${cls} text-sm`}>
                <span>{icon}</span>
                <div>
                  <strong className="block">{title}</strong>
                  <span className="text-xs opacity-80">{desc}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-base-content/50 mt-6 mb-4 text-sm">Toast</p>
          <div className="relative h-14">
            <div className="bg-base-300 border-base-content/10 absolute right-0 bottom-0 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg">
              <span className="text-success">✓</span>
              <span>Copied to clipboard</span>
              <button className="text-base-content/40 hover:text-base-content ml-2 text-base leading-none">
                ✕
              </button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-base-content/50 mb-4 text-sm">
            Progress &amp; steps
          </p>
          <div className="mb-8 flex flex-col gap-2">
            {[
              { label: 'Uploading files', pct: 72 },
              { label: 'Processing', pct: 40 },
              { label: 'Indexing', pct: 100 },
            ].map(({ label, pct }) => (
              <div key={label}>
                <div className="text-base-content/50 mb-1 flex justify-between text-xs">
                  <span>{label}</span>
                  <span>{pct}%</span>
                </div>
                <progress
                  className="progress progress-primary h-[6px] w-full"
                  value={pct}
                  max="100"
                />
              </div>
            ))}
          </div>
          <ul className="steps steps-horizontal mb-8 w-full text-xs">
            {['Account', 'Profile', 'Billing', 'Done'].map((s, i) => (
              <li
                key={s}
                className={`step ${i < 3 ? 'step-primary' : ''}`}
                data-content={i < 2 ? '✓' : undefined}>
                {s}
              </li>
            ))}
          </ul>
          <p className="text-base-content/50 mb-4 text-sm">
            Skeleton &amp; spinner
          </p>
          <div className="flex items-start gap-3">
            <div className="skeleton h-11 w-11 shrink-0 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
              <div className="skeleton h-3 w-3/5" />
              <div className="skeleton h-3 w-4/5" />
              <div className="skeleton h-3 w-2/5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="loading loading-spinner loading-sm text-primary" />
            <span className="text-base-content/50 text-sm">
              Loading your workspace…
            </span>
          </div>
        </div>
      </div>
      <div className="card bg-base-200 border-base-300 border">
        <div className="card-body items-center py-12 text-center">
          <div className="mb-4 text-5xl opacity-40">◌</div>
          <h3 className="mb-2 text-base font-medium">No components yet</h3>
          <p className="text-base-content/50 mb-6 text-sm">
            Start building your library by adding your first component.
          </p>
          <button className="btn btn-primary btn-sm">Add component</button>
        </div>
      </div>
    </Section>
  );
};
FeedbackSection.displayName = 'FeedbackSection';
