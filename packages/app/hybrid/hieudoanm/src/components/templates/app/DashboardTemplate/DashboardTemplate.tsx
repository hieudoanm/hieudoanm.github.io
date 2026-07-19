import { FC, useState } from 'react';

// ── STAT CARD ──
const StatCard: FC<{
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}> = ({ label, value, trend, trendUp, icon }) => (
  <div className="card bg-base-200 border-base-300 border">
    <div className="card-body flex-row items-center gap-4 p-5">
      <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-base-content/50 text-xs">{label}</p>
        <p className="text-2xl font-bold tracking-tight">{value}</p>
        <p className={`text-xs ${trendUp ? 'text-success' : 'text-error'}`}>
          {trend}
        </p>
      </div>
    </div>
  </div>
);

// ── NAV ITEM ──
const NavItem: FC<{
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
      active
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
    }`}>
    <span className="text-lg">{icon}</span>
    {label}
  </button>
);

// ── RECENT ACTIVITY ROW ──
const ActivityRow: FC<{
  user: string;
  action: string;
  target: string;
  time: string;
}> = ({ user, action, target, time }) => (
  <tr className="border-base-300 hover:bg-base-200 border-b transition-colors">
    <td className="px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="bg-base-300 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
          {user.charAt(0)}
        </div>
        <span className="text-sm font-medium">{user}</span>
      </div>
    </td>
    <td className="text-base-content/60 px-4 py-3 text-sm">{action}</td>
    <td className="text-base-content/80 px-4 py-3 text-sm font-medium">
      {target}
    </td>
    <td className="text-base-content/40 px-4 py-3 text-right text-xs">
      {time}
    </td>
  </tr>
);

// ── DASHBOARD TEMPLATE ──
export const DashboardTemplate: FC<{
  userName?: string;
  userEmail?: string;
}> = ({ userName = 'Guest User', userEmail = 'guest@example.com' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [notifCount] = useState(3);

  const navItems = [
    { icon: '📊', label: 'Dashboard' },
    { icon: '📈', label: 'Analytics' },
    { icon: '👥', label: 'Users' },
    { icon: '⚙️', label: 'Settings' },
  ];

  const stats = [
    {
      label: 'Total Revenue',
      value: '$48,250',
      trend: '+12.5%',
      trendUp: true,
      icon: '💰',
    },
    {
      label: 'Active Users',
      value: '2,847',
      trend: '+8.2%',
      trendUp: true,
      icon: '👤',
    },
    {
      label: 'Orders',
      value: '1,423',
      trend: '-3.1%',
      trendUp: false,
      icon: '📦',
    },
    {
      label: 'Growth Rate',
      value: '23.6%',
      trend: '+4.3%',
      trendUp: true,
      icon: '📈',
    },
  ];

  const activities = [
    {
      user: 'Alice Chen',
      action: 'created',
      target: 'Project Alpha',
      time: '2 min ago',
    },
    {
      user: 'Bob Martinez',
      action: 'updated',
      target: 'Invoice #2024-089',
      time: '15 min ago',
    },
    {
      user: 'Carol Smith',
      action: 'deployed',
      target: 'v3.2.1 to production',
      time: '1 hr ago',
    },
    {
      user: 'David Kim',
      action: 'commented on',
      target: 'Design review',
      time: '2 hr ago',
    },
    {
      user: 'Eva Johansson',
      action: 'closed',
      target: 'Support ticket #4521',
      time: '4 hr ago',
    },
  ];

  return (
    <div className="bg-base-100 text-base-content flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="bg-base-300/50 fixed inset-0 z-30 lg:hidden"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`border-base-300 bg-base-100 fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Logo */}
        <div className="border-base-300 flex items-center gap-3 border-b px-6 py-5">
          <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
            F
          </div>
          <span className="text-lg font-bold tracking-tight">DaisyX</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeNav === item.label}
              onClick={() => {
                setActiveNav(item.label);
                setSidebarOpen(false);
              }}
            />
          ))}
        </nav>

        {/* User footer */}
        <div className="border-base-300 border-t px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-base-300 flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium">
              {userName.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{userName}</p>
              <p className="text-base-content/40 truncate text-xs">
                {userEmail}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* ── HEADER ── */}
        <header className="border-base-300 bg-base-100/80 flex items-center gap-4 border-b px-4 py-3 backdrop-blur-sm lg:px-6">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="btn btn-ghost btn-sm lg:hidden">
            <span className="text-lg">☰</span>
          </button>

          {/* Search */}
          <div className="relative flex-1">
            <span className="text-base-content/30 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search..."
              className="input input-sm bg-base-200 border-base-300 w-full max-w-xs pl-9"
            />
          </div>

          {/* Notifications */}
          <button className="btn btn-ghost btn-sm relative">
            <span className="text-lg">🔔</span>
            {notifCount > 0 && (
              <span className="badge badge-error badge-xs absolute -top-1 -right-1 h-4 min-w-4 p-0 text-[10px]">
                {notifCount}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div className="bg-base-300 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
            {userName.charAt(0)}
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 space-y-6 overflow-y-auto p-4 lg:p-6">
          {/* Page heading */}
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-base-content/50 mt-1 text-sm">
              Welcome back, {userName}. Here is what is happening today.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <StatCard
                key={s.label}
                label={s.label}
                value={s.value}
                trend={s.trend}
                trendUp={s.trendUp}
                icon={s.icon}
              />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main chart */}
            <div className="card bg-base-200 border-base-300 border lg:col-span-2">
              <div className="card-body p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold">Revenue Overview</h3>
                  <select className="select select-xs select-ghost border-base-300 border">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div className="bg-base-300/50 flex h-48 items-center justify-center rounded-xl">
                  <span className="text-base-content/30 text-sm">
                    📊 Chart area
                  </span>
                </div>
              </div>
            </div>

            {/* Pie chart placeholder */}
            <div className="card bg-base-200 border-base-300 border">
              <div className="card-body p-5">
                <h3 className="mb-4 font-semibold">Traffic Sources</h3>
                <div className="bg-base-300/50 flex h-48 items-center justify-center rounded-xl">
                  <span className="text-base-content/30 text-sm">
                    🧩 Chart area
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div className="card bg-base-200 border-base-300 border">
            <div className="card-body p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Recent Activity</h3>
                <button className="btn btn-ghost btn-xs">View all →</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-base-content/40 border-base-300 border-b text-left text-xs tracking-wider uppercase">
                      <th className="px-4 py-2 font-medium">User</th>
                      <th className="px-4 py-2 font-medium">Action</th>
                      <th className="px-4 py-2 font-medium">Target</th>
                      <th className="px-4 py-2 text-right font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((a) => (
                      <ActivityRow
                        key={a.user}
                        user={a.user}
                        action={a.action}
                        target={a.target}
                        time={a.time}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

DashboardTemplate.displayName = 'DashboardTemplate';
