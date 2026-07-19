import { FC } from 'react';

const BarChartCard: FC = () => {
  const bars = [30, 50, 40, 65, 55, 70, 45, 60, 75, 50, 80, 45, 60, 55, 70, 40];
  return (
    <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
      <div className="card-body">
        <div className="flex h-24 items-end gap-2">
          {bars.map((h, i) => (
            <div
              key={i}
              className="bg-base-content w-full rounded-sm"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs">
          Sales volume reached <strong>$12,450</strong> this week, showing a 15%
          increase.
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-xs">Charts</button>
          <button className="btn btn-neutral btn-xs">Details</button>
        </div>
      </div>
    </div>
  );
};

const StatsRadialCard: FC = () => (
  <div className="card bg-base-100 border-base-300 w-full border shadow-sm">
    <div className="stats bg-base-100 w-full overflow-hidden">
      <div className="stat">
        <div className="stat-figure">
          <div
            className="radial-progress text-primary"
            style={
              {
                '--value': 91,
                '--size': '3rem',
              } as React.CSSProperties
            }>
            91
          </div>
        </div>
        <div className="stat-title">Page Score</div>
        <div className="stat-value text-primary">91/100</div>
        <div className="stat-desc text-success">✓ All good</div>
      </div>
    </div>
  </div>
);

const RecentOrdersCard: FC = () => {
  const orders = [
    { name: 'Charlie Chapman', status: 'Send', badge: 'badge-info' },
    { name: 'Howard Hudson', status: 'Failed', badge: 'badge-error' },
    { name: 'Fiona Fisher', status: 'In progress', badge: 'badge-warning' },
    { name: 'Nick Nelson', status: 'Completed', badge: 'badge-success' },
    { name: 'Amanda Anderson', status: 'Completed', badge: 'badge-success' },
  ];
  return (
    <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-sm">Recent orders</h3>
        <div className="flex flex-col gap-2">
          {orders.map((o) => (
            <div
              key={o.name}
              className="flex items-center justify-between text-sm">
              <span>{o.name}</span>
              <span className={`badge badge-xs ${o.badge}`}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RevenueStatsCard: FC = () => (
  <div className="card bg-base-100 border-base-300 w-full border shadow-sm">
    <div className="stats bg-base-100 w-full overflow-hidden">
      <div className="stat">
        <div className="stat-title">July Revenue</div>
        <div className="stat-value">$32,400</div>
        <div className="stat-desc text-success">↗ 21% more than last month</div>
      </div>
    </div>
  </div>
);

const WritePostCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <h3 className="card-title text-sm">
        <span>✎</span> Write a new post
      </h3>
      <div className="join">
        <button className="btn btn-xs join-item">B</button>
        <button className="btn btn-xs join-item">I</button>
        <button className="btn btn-xs join-item">U</button>
      </div>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="What's happening?"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <button className="btn btn-xs">Add files</button>
        <span className="text-base-content/40 text-xs">1200 remaining</span>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-xs">Draft</button>
        <button className="btn btn-primary btn-xs">Publish</button>
      </div>
    </div>
  </div>
);

const ChatCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <div className="chat chat-start">
        <div className="chat-image avatar placeholder">
          <div className="bg-primary/20 text-primary w-8 rounded-full">
            <span className="text-xs">OW</span>
          </div>
        </div>
        <div className="chat-header text-xs">
          Obi-Wan
          <time className="text-base-content/40 ml-1">12:45</time>
        </div>
        <div className="chat-bubble chat-bubble-neutral">It's over Anakin</div>
      </div>
      <div className="chat chat-start">
        <div className="chat-image avatar placeholder">
          <div className="bg-primary/20 text-primary w-8 rounded-full">
            <span className="text-xs">OW</span>
          </div>
        </div>
        <div className="chat-footer text-xs opacity-50">Delivered</div>
        <div className="chat-bubble chat-bubble-neutral">
          I have the high ground
        </div>
      </div>
      <div className="chat chat-end">
        <div className="chat-image avatar placeholder">
          <div className="bg-error/20 text-error w-8 rounded-full">
            <span className="text-xs">AK</span>
          </div>
        </div>
        <div className="chat-header text-xs">
          Anakin
          <time className="text-base-content/40 ml-1">12:46</time>
        </div>
        <div className="chat-bubble">You underestimate my power</div>
        <div className="chat-footer text-xs opacity-50">Seen at 12:46</div>
      </div>
    </div>
  </div>
);

const DockDemo: FC = () => (
  <div className="dock dock-sm bg-base-300 relative px-2">
    <button>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.46.57 3.58a1 1 0 01-.24 1.01l-2.2 2.2z" />
      </svg>
    </button>
    <button className="dock-active">
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
      </svg>
    </button>
    <button>
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.14 12.94a7 7 0 00.26-1.94 7 7 0 00-.26-1.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a7.04 7.04 0 00-3.34-1.92l-.36-2.54a.48.48 0 00-.48-.41h-3.84a.48.48 0 00-.48.41l-.36 2.54a7.04 7.04 0 00-3.34 1.92l-2.39-.96a.49.49 0 00-.59.22L2.67 8.48a.48.48 0 00.12.61l2.03 1.58a7 7 0 00-.26 1.94 7 7 0 00.26 1.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96a7.04 7.04 0 003.34 1.92l.36 2.54c.04.24.24.41.48.41h3.84c.24 0 .44-.17.48-.41l.36-2.54a7.04 7.04 0 003.34-1.92l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.03-1.58z" />
      </svg>
    </button>
  </div>
);

const AdminMenuCard: FC = () => (
  <div className="card bg-base-100 border-base-300 border shadow-sm">
    <div className="card-body p-0">
      <ul className="menu w-full">
        <li className="menu-title">Admin panel</li>
        <li>
          <a>
            Databases
            <span className="badge badge-sm">7</span>
          </a>
        </li>
        <li>
          <a>Products</a>
        </li>
        <li>
          <a>
            Messages
            <span className="badge badge-sm">29</span>
          </a>
        </li>
        <li>
          <a>Access tokens</a>
        </li>
        <li>
          <a>
            Users
            <span className="status status-info" />
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
      </ul>
    </div>
  </div>
);

export const DemoColumn2: FC = () => (
  <div className="flex flex-col gap-4">
    <BarChartCard />
    <StatsRadialCard />
    <RecentOrdersCard />
    <RevenueStatsCard />
    <WritePostCard />
    <ChatCard />
    <DockDemo />
    <AdminMenuCard />
  </div>
);
DemoColumn2.displayName = 'DemoColumn2';
