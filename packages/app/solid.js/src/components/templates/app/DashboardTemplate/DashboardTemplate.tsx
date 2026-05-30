import { createSignal, type JSX } from 'solid-js';

// ── STAT CARD ──
const StatCard = (props: {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: string;
}) => (
  <div class="card bg-base-200 border-base-300 border">
    <div class="card-body flex-row items-center gap-4 p-5">
      <div class="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl">
        {props.icon}
      </div>
      <div class="min-w-0 flex-1">
        <p class="text-base-content/50 text-xs">{props.label}</p>
        <p class="text-2xl font-bold tracking-tight">{props.value}</p>
        <p class={`text-xs ${props.trendUp ? 'text-success' : 'text-error'}`}>
          {props.trend}
        </p>
      </div>
    </div>
  </div>
);

// ── NAV ITEM ──
const NavItem = (props: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) => (
  <button
    onClick={props.onClick}
    class={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
      props.active
        ? 'bg-primary/10 text-primary font-medium'
        : 'text-base-content/60 hover:bg-base-200 hover:text-base-content'
    }`}>
    <span class="text-lg">{props.icon}</span>
    {props.label}
  </button>
);

// ── RECENT ACTIVITY ROW ──
const ActivityRow = (props: {
  user: string;
  action: string;
  target: string;
  time: string;
}) => (
  <tr class="border-base-300 hover:bg-base-200 border-b transition-colors">
    <td class="px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="bg-base-300 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
          {props.user.charAt(0)}
        </div>
        <span class="text-sm font-medium">{props.user}</span>
      </div>
    </td>
    <td class="text-base-content/60 px-4 py-3 text-sm">{props.action}</td>
    <td class="text-base-content/80 px-4 py-3 text-sm font-medium">
      {props.target}
    </td>
    <td class="text-base-content/40 px-4 py-3 text-right text-xs">
      {props.time}
    </td>
  </tr>
);

// ── DASHBOARD TEMPLATE ──
export const DashboardTemplate = (props: {
  userName?: string;
  userEmail?: string;
}) => {
  const [sidebarOpen, setSidebarOpen] = createSignal(false);
  const [activeNav, setActiveNav] = createSignal('Dashboard');
  const [notifCount] = createSignal(3);

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
    <div class="bg-base-100 text-base-content flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen() && (
        <div
          onClick={() => setSidebarOpen(false)}
          class="bg-base-300/50 fixed inset-0 z-30 lg:hidden"
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        class={`border-base-300 bg-base-100 fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen() ? 'translate-x-0' : '-translate-x-full'
        }`}>
        {/* Logo */}
        <div class="border-base-300 flex items-center gap-3 border-b px-6 py-5">
          <div class="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white">
            F
          </div>
          <span class="text-lg font-bold tracking-tight">Forma</span>
        </div>

        {/* Nav */}
        <nav class="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => (
            <NavItem
              icon={item.icon}
              label={item.label}
              active={activeNav() === item.label}
              onClick={() => {
                setActiveNav(item.label);
                setSidebarOpen(false);
              }}
            />
          ))}
        </nav>

        {/* User footer */}
        <div class="border-base-300 border-t px-4 py-4">
          <div class="flex items-center gap-3">
            <div class="bg-base-300 flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium">
              {props.userName?.charAt(0) ?? 'U'}
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">
                {props.userName ?? 'Guest User'}
              </p>
              <p class="text-base-content/40 truncate text-xs">
                {props.userEmail ?? 'guest@example.com'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div class="flex min-w-0 flex-1 flex-col">
        {/* ── HEADER ── */}
        <header class="border-base-300 bg-base-100/80 flex items-center gap-4 border-b px-4 py-3 backdrop-blur-sm lg:px-6">
          {/* Mobile menu toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            class="btn btn-ghost btn-sm lg:hidden">
            <span class="text-lg">☰</span>
          </button>

          {/* Search */}
          <div class="relative flex-1">
            <span class="text-base-content/30 absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              🔍
            </span>
            <input
              type="search"
              placeholder="Search..."
              class="input input-sm bg-base-200 border-base-300 w-full max-w-xs pl-9"
            />
          </div>

          {/* Notifications */}
          <button class="btn btn-ghost btn-sm relative">
            <span class="text-lg">🔔</span>
            {notifCount() > 0 && (
              <span class="badge badge-error badge-xs absolute -top-1 -right-1 h-4 min-w-4 p-0 text-[10px]">
                {notifCount()}
              </span>
            )}
          </button>

          {/* Avatar */}
          <div class="bg-base-300 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
            {props.userName?.charAt(0) ?? 'U'}
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main class="flex-1 space-y-6 overflow-y-auto p-4 lg:p-6">
          {/* Page heading */}
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p class="text-base-content/50 mt-1 text-sm">
              Welcome back, {props.userName ?? 'Guest'}. Here is what is
              happening today.
            </p>
          </div>

          {/* Stats grid */}
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <StatCard
                label={s.label}
                value={s.value}
                trend={s.trend}
                trendUp={s.trendUp}
                icon={s.icon}
              />
            ))}
          </div>

          {/* Charts row */}
          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main chart */}
            <div class="card bg-base-200 border-base-300 border lg:col-span-2">
              <div class="card-body p-5">
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="font-semibold">Revenue Overview</h3>
                  <select class="select select-xs select-ghost border-base-300 border">
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                  </select>
                </div>
                <div class="bg-base-300/50 flex h-48 items-center justify-center rounded-xl">
                  <span class="text-base-content/30 text-sm">
                    📊 Chart area
                  </span>
                </div>
              </div>
            </div>

            {/* Pie chart placeholder */}
            <div class="card bg-base-200 border-base-300 border">
              <div class="card-body p-5">
                <h3 class="mb-4 font-semibold">Traffic Sources</h3>
                <div class="bg-base-300/50 flex h-48 items-center justify-center rounded-xl">
                  <span class="text-base-content/30 text-sm">
                    🧩 Chart area
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent activity */}
          <div class="card bg-base-200 border-base-300 border">
            <div class="card-body p-5">
              <div class="mb-4 flex items-center justify-between">
                <h3 class="font-semibold">Recent Activity</h3>
                <button class="btn btn-ghost btn-xs">View all →</button>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="text-base-content/40 border-base-300 border-b text-left text-xs tracking-wider uppercase">
                      <th class="px-4 py-2 font-medium">User</th>
                      <th class="px-4 py-2 font-medium">Action</th>
                      <th class="px-4 py-2 font-medium">Target</th>
                      <th class="px-4 py-2 text-right font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((a) => (
                      <ActivityRow
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
