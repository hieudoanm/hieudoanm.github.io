export interface NavItem {
  href: string;
  label: string;
  description: string;
}

/**
 * One navigation list drives the sidebar and the dashboard. The order follows
 * the researcher's actual path: check the project, launch a run, read results.
 */
export const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Dashboard',
    description: 'Project state and the latest runs',
  },
  {
    href: '/setup',
    label: 'Setup',
    description: 'Environment and data checks',
  },
  {
    href: '/launch',
    label: 'Launch',
    description: 'Edit a configuration and start a run',
  },
  {
    href: '/runs',
    label: 'Runs',
    description: 'Every run folder the project contains',
  },
  {
    href: '/analysis',
    label: 'Analysis',
    description: 'Metrics, cohorts and exports',
  },
  {
    href: '/rigour',
    label: 'Rigour',
    description: 'Split integrity and lock-box discipline',
  },
  {
    href: '/datasets',
    label: 'Datasets',
    description: 'Cohort table and participant files',
  },
  {
    href: '/viewer',
    label: 'Viewer',
    description: 'Side-by-side imaging of run outputs',
  },
  { href: '/compare', label: 'Compare', description: 'Two runs, one table' },
  {
    href: '/settings',
    label: 'Settings',
    description: 'Where the project lives on disk',
  },
];

export const navItem = (href: string): NavItem | undefined =>
  NAV_ITEMS.find((item) => item.href === href);

export const PROTOTYPE_NOTICE =
  'Prototype interface. It reads run folders written by the pipeline and cannot start a training run from inside the browser build.';
