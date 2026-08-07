import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import {
  Accordion,
  Alert,
  AvatarGroup,
  Breadcrumbs,
  ButtonGroup,
  Card,
  Carousel,
  ChatBubble,
  CheckboxGroup,
  ColorPicker,
  Combobox,
  ConfirmDialog,
  DangerZone,
  Dropdown,
  EmptyState,
  Fieldset,
  FormRow,
  InputGroup,
  KeyValue,
  List,
  Menu,
  NavItem,
  Pagination,
  Popover,
  RadioGroup,
  SearchBar,
  Sheet,
  Stat,
  Steps,
  Table,
  Tabs,
  TagInput,
  Timeline,
  TreeView,
} from '../../../../../../molecules';
import { Button, Progress, Switch } from '../../../../../../atoms';

const MoleculeCard: FC<{
  title: string;
  index: number;
  children: ReactNode;
}> = ({ title, index, children }) => (
  <div
    className="card bg-base-200 border-base-content/10 animate-atomic-in border"
    style={{ animationDelay: `${index * 60}ms` }}>
    <div className="card-body gap-3">
      <h4 className="text-base-content/50 font-mono text-xs uppercase">
        {title}
      </h4>
      {children}
    </div>
  </div>
);

export const MoleculesLevel: FC = () => {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('overview');
  const [page, setPage] = useState(1);
  const [tags, setTags] = useState(['typescript', 'next']);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [group, setGroup] = useState('day');
  const [sheetOpen, setSheetOpen] = useState(false);
  const [combo, setCombo] = useState('next');
  const [color, setColor] = useState('#3b82f6');
  const [amount, setAmount] = useState('');
  const [plan, setPlan] = useState('pro');
  const [channels, setChannels] = useState(['email']);

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <MoleculeCard title="Card" index={0}>
        <Card
          title="Monthly report"
          description="Performance overview"
          action={
            <Button size="sm" variant="ghost">
              View
            </Button>
          }>
          <div className="text-sm">
            <Progress value={72} size="sm" showValue />
          </div>
        </Card>
      </MoleculeCard>
      <MoleculeCard title="Alert" index={1}>
        <div className="flex flex-col gap-2">
          <Alert title="Saved" description="Your changes are stored." />
          <Alert variant="warning" title="Low balance" />
          <Alert variant="error">Something went wrong.</Alert>
        </div>
      </MoleculeCard>
      <MoleculeCard title="SearchBar" index={2}>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search projects..."
        />
      </MoleculeCard>
      <MoleculeCard title="Stat" index={3}>
        <div className="flex justify-around">
          <Stat
            label="Revenue"
            value="$12,480"
            icon={<FiBell />}
            variant="success"
          />
          <Stat
            label="Users"
            value="3,201"
            icon={<FiUser />}
            variant="primary"
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Pagination" index={4}>
        <div className="flex justify-center">
          <Pagination current={page} total={7} onChange={setPage} />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Tabs" index={5}>
        <Tabs
          tabs={[
            { label: 'Overview', value: 'overview' },
            { label: 'Activity', value: 'activity' },
            { label: 'Settings', value: 'settings' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </MoleculeCard>
      <MoleculeCard title="AvatarGroup" index={6}>
        <AvatarGroup
          size="sm"
          avatars={[
            { alt: 'Jane Doe', fallback: 'JD' },
            { alt: 'Alex Smith', fallback: 'AS' },
            { alt: 'Pat Lee', fallback: 'PL' },
            { alt: 'Mia Chen', fallback: 'MC' },
            { alt: 'Noah Kim', fallback: 'NK' },
          ]}
          max={4}
        />
      </MoleculeCard>
      <MoleculeCard title="Breadcrumbs" index={7}>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Projects', href: '/projects' },
            { label: 'Settings' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="NavItem" index={8}>
        <ul className="w-full">
          <NavItem label="Dashboard" href="/dashboard" active />
          <NavItem label="Messages" href="/messages" badge="12" />
          <NavItem label="Inbox" href="/inbox" icon={<FiBell />} />
        </ul>
      </MoleculeCard>
      <MoleculeCard title="Fieldset" index={9}>
        <Fieldset legend="Notifications">
          <Switch
            label="Email alerts"
            checked
            onChange={() => undefined}
            size="sm"
          />
          <Switch
            label="Push alerts"
            checked={false}
            onChange={() => undefined}
            size="sm"
          />
        </Fieldset>
      </MoleculeCard>
      <MoleculeCard title="Dropdown" index={10}>
        <Dropdown
          trigger={
            <Button size="sm" variant="outline">
              Actions
            </Button>
          }
          items={[
            { label: 'Edit', onClick: () => undefined },
            { label: 'Duplicate', onClick: () => undefined },
            { label: 'Delete', onClick: () => undefined, danger: true },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="EmptyState" index={11}>
        <EmptyState
          icon={<FiBell />}
          title="No notifications"
          description="You are all caught up."
        />
      </MoleculeCard>
      <MoleculeCard title="Accordion" index={12}>
        <Accordion
          items={[
            { id: 'a', title: 'What is this?', content: 'An accordion.' },
            { id: 'b', title: 'Is it animated?', content: 'Yes, via DaisyUI.' },
            {
              id: 'c',
              title: 'Can I open many?',
              content: 'Only with multiple.',
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="Steps" index={13}>
        <Steps
          steps={[
            { label: 'Account', description: 'Create it' },
            { label: 'Payment', description: 'Add card' },
            { label: 'Done' },
          ]}
          current={1}
        />
      </MoleculeCard>
      <MoleculeCard title="Timeline" index={14}>
        <Timeline
          items={[
            { title: 'Opened', time: '09:00', description: 'Ticket created' },
            { title: 'Assigned', time: '10:30', description: 'To support' },
            { title: 'Resolved', time: '14:00' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="ChatBubble" index={15}>
        <div className="flex flex-col gap-2">
          <ChatBubble
            message="How can I help today?"
            sender="assistant"
            name="Support"
            time="09:00"
          />
          <ChatBubble message="Reset my password" sender="user" time="09:01" />
        </div>
      </MoleculeCard>
      <MoleculeCard title="TagInput" index={16}>
        <TagInput tags={tags} onChange={setTags} />
      </MoleculeCard>
      <MoleculeCard title="FormRow" index={17}>
        <div className="w-full max-w-xs">
          <FormRow
            label="Email"
            hint="Work email preferred"
            required
            htmlFor="demo-email">
            <input
              id="demo-email"
              type="email"
              placeholder="you@x.com"
              className="input input-bordered w-full"
              aria-label="Email"
            />
          </FormRow>
        </div>
      </MoleculeCard>
      <MoleculeCard title="TreeView" index={18}>
        <TreeView
          nodes={[
            {
              id: 'src',
              label: 'src',
              children: [
                {
                  id: 'components',
                  label: 'components',
                  children: [
                    { id: 'atoms', label: 'atoms' },
                    { id: 'molecules', label: 'molecules' },
                    { id: 'organisms', label: 'organisms' },
                  ],
                },
                { id: 'styles', label: 'styles' },
              ],
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="ConfirmDialog" index={19}>
        <div className="flex flex-col items-start gap-2">
          <Button size="sm" onClick={() => setConfirmOpen(true)}>
            Open dialog
          </Button>
          <span className="text-base-content/50 text-xs">
            Dangerous actions need a confirmation step.
          </span>
        </div>
        <ConfirmDialog
          open={confirmOpen}
          title="Delete project?"
          message="This will permanently remove the project and all its files."
          danger
          confirmLabel="Delete"
          onConfirm={() => setConfirmOpen(false)}
          onCancel={() => setConfirmOpen(false)}
        />
      </MoleculeCard>
      <MoleculeCard title="Menu" index={20}>
        <div className="w-full">
          <Menu
            title="Account"
            items={[
              {
                label: 'Profile',
                icon: <FiUser />,
                onClick: () => undefined,
              },
              { label: 'Settings', active: true },
              { label: 'Log out', danger: true, onClick: () => undefined },
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="ButtonGroup" index={21}>
        <div className="flex w-full flex-col gap-3">
          <ButtonGroup
            options={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            value={group}
            onChange={setGroup}
            size="sm"
          />
          <ButtonGroup
            options={[
              { label: 'Low', value: 'low' },
              { label: 'High', value: 'high' },
            ]}
            value="low"
            onChange={() => undefined}
            orientation="vertical"
            size="sm"
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Carousel" index={22}>
        <Carousel
          ariaLabel="Feature slides"
          slides={[
            <div
              key="1"
              className="bg-base-300 flex h-32 items-center justify-center rounded-xl text-sm">
              Slide one
            </div>,
            <div
              key="2"
              className="bg-base-300 flex h-32 items-center justify-center rounded-xl text-sm">
              Slide two
            </div>,
            <div
              key="3"
              className="bg-base-300 flex h-32 items-center justify-center rounded-xl text-sm">
              Slide three
            </div>,
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="KeyValue" index={23}>
        <KeyValue
          title="Deployment"
          items={[
            { key: 'Version', value: 'v1.2.3' },
            { key: 'Region', value: 'ap-southeast-1' },
            {
              key: 'Status',
              value: <span className="text-success">Healthy</span>,
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="List" index={24}>
        <List
          title="Open tasks"
          items={[
            {
              id: '1',
              title: 'Fix login bug',
              description: 'Priority: high',
              action: (
                <Button size="sm" variant="ghost">
                  Open
                </Button>
              ),
            },
            { id: '2', title: 'Write docs', description: 'In review' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="DangerZone" index={25}>
        <DangerZone
          items={[
            {
              id: 'reset',
              label: 'Reset account',
              description: 'Restore all defaults.',
              action: (
                <Button size="sm" variant="outline">
                  Reset
                </Button>
              ),
            },
            {
              id: 'delete',
              label: 'Delete account',
              description: 'Permanently remove everything.',
              action: (
                <Button size="sm" variant="ghost" className="text-error">
                  Delete
                </Button>
              ),
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="Sheet" index={26}>
        <div className="flex flex-col items-start gap-2">
          <Button size="sm" onClick={() => setSheetOpen(true)}>
            Open sheet
          </Button>
          <span className="text-base-content/50 text-xs">
            Slides in from any edge.
          </span>
        </div>
        <Sheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          title="Filters"
          side="right"
          footer={
            <Button size="sm" onClick={() => setSheetOpen(false)}>
              Apply
            </Button>
          }>
          <div className="flex flex-col gap-2 text-sm">
            <p>Price range</p>
            <p>Availability</p>
            <p>Brand</p>
          </div>
        </Sheet>
      </MoleculeCard>
      <MoleculeCard title="Popover" index={27}>
        <Popover
          trigger={
            <Button size="sm" variant="outline">
              Menu
            </Button>
          }>
          <div className="flex flex-col gap-1 text-sm">
            <span className="font-medium">Quick actions</span>
            <span>Duplicate</span>
            <span>Move to…</span>
            <span>Archive</span>
          </div>
        </Popover>
      </MoleculeCard>
      <MoleculeCard title="Combobox" index={28}>
        <div className="w-full">
          <Combobox
            label="Framework"
            value={combo}
            onChange={setCombo}
            options={[
              { label: 'Next.js', value: 'next' },
              { label: 'Remix', value: 'remix' },
              { label: 'Astro', value: 'astro' },
              { label: 'Nuxt', value: 'nuxt' },
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="ColorPicker" index={29}>
        <div className="w-full">
          <ColorPicker
            label="Brand color"
            value={color}
            onChange={setColor}
            swatches={[
              '#3b82f6',
              '#10b981',
              '#f59e0b',
              '#ef4444',
              '#8b5cf6',
              '#000000',
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="InputGroup" index={30}>
        <div className="w-full">
          <InputGroup
            label="Amount"
            value={amount}
            onChange={setAmount}
            leading={<span>$</span>}
            trailing={<span>USD</span>}
            placeholder="0.00"
            hint="Minimum $10"
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="RadioGroup" index={31}>
        <RadioGroup
          name="plan"
          label="Plan"
          value={plan}
          onChange={setPlan}
          options={[
            { label: 'Free', value: 'free', description: 'For personal use' },
            { label: 'Pro', value: 'pro', description: 'For teams' },
            { label: 'Enterprise', value: 'enterprise' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="CheckboxGroup" index={32}>
        <CheckboxGroup
          label="Notifications"
          value={channels}
          onChange={setChannels}
          options={[
            { label: 'Email', value: 'email' },
            { label: 'SMS', value: 'sms' },
            { label: 'Push', value: 'push' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="Table" index={33}>
        <Table
          caption="Team members"
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'role', header: 'Role' },
            { key: 'hours', header: 'Hours', align: 'right' },
          ]}
          rows={[
            { name: 'Ada', role: 'Engineer', hours: 38 },
            { name: 'Grace', role: 'Designer', hours: 41 },
            { name: 'Linus', role: 'Maintainer' },
          ]}
          striped
        />
      </MoleculeCard>
    </div>
  );
};

MoleculesLevel.displayName = 'MoleculesLevel';
