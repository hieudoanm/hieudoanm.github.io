import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  FiBell,
  FiCheck,
  FiCopy,
  FiEdit2,
  FiHome,
  FiMail,
  FiPlus,
  FiSearch,
  FiShare2,
  FiTrash,
  FiUpload,
  FiUser,
} from 'react-icons/fi';
import {
  Accordion,
  Alert,
  AvatarGroup,
  Backdrop,
  Banner,
  BottomNavigation,
  Breadcrumbs,
  ButtonGroup,
  Card,
  Carousel,
  ChatBubble,
  Checklist,
  CheckboxGroup,
  Chip,
  ColorPicker,
  Combobox,
  ConfirmDialog,
  ContextMenu,
  DangerZone,
  DatePicker,
  DateRange,
  Dialog,
  Drawer,
  Dropdown,
  EmptyState,
  FeatureList,
  Fieldset,
  FileUpload,
  FilterGroup,
  FloatingActionButton,
  FormRow,
  Gauge,
  HoverCard,
  ImageGallery,
  InfoList,
  InlineAlert,
  InputGroup,
  InputStepper,
  JsonViewer,
  KeyValue,
  List,
  LoadingOverlay,
  Masonry,
  Menu,
  MenuGroup,
  Menubar,
  Modal,
  MultiSelect,
  NavItem,
  NumberInput,
  Pagination,
  PasswordStrength,
  Popover,
  RadioGroup,
  Resizable,
  ReviewCard,
  ScrollArea,
  SearchBar,
  Sheet,
  SkillBar,
  SocialLinks,
  SpeedDial,
  Stat,
  StatTrend,
  Steps,
  Table,
  Tabs,
  TagInput,
  Timeline,
  TimePicker,
  Toast,
  ToggleGroup,
  TransferList,
  TreeView,
} from '../../../../../molecules';
import { Button, Progress, Switch } from '../../../../../atoms';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bottomNav, setBottomNav] = useState('home');
  const [toggleMode, setToggleMode] = useState('light');
  const [toggleSet, setToggleSet] = useState(['bold']);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [rangeStart, setRangeStart] = useState('2026-08-01');
  const [rangeEnd, setRangeEnd] = useState('2026-08-07');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [period, setPeriod] = useState('day');
  const [count, setCount] = useState(3);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [transferLeft, setTransferLeft] = useState([
    { id: 'a', label: 'Alpha' },
    { id: 'b', label: 'Beta' },
    { id: 'c', label: 'Gamma' },
    { id: 'd', label: 'Delta' },
  ]);
  const [transferRight, setTransferRight] = useState([
    { id: 'e', label: 'Epsilon' },
  ]);
  const [multi, setMulti] = useState(['react', 'typescript']);
  const [time, setTime] = useState('09:00');
  const [filters, setFilters] = useState(['active']);
  const [checklist, setChecklist] = useState([
    { id: 'design', label: 'Design system', done: true },
    { id: 'build', label: 'Build UI', done: false },
    { id: 'test', label: 'Run tests', done: false },
    { id: 'ship', label: 'Ship release', done: false },
  ]);

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
      <MoleculeCard title="Banner" index={34}>
        <div className="flex flex-col gap-2">
          <Banner
            title="Update available"
            description="v2.2 is ready to install."
            action={<Button size="sm">Update</Button>}
          />
          <Banner variant="warning" title="Storage almost full" />
        </div>
      </MoleculeCard>
      <MoleculeCard title="BottomNavigation" index={35}>
        <div className="w-full">
          <BottomNavigation
            items={[
              { label: 'Home', value: 'home', icon: <FiHome /> },
              { label: 'Mail', value: 'mail', icon: <FiMail /> },
              { label: 'Search', value: 'search', icon: <FiSearch /> },
            ]}
            value={bottomNav}
            onChange={setBottomNav}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Chip" index={36}>
        <div className="flex flex-wrap gap-2">
          <Chip label="React" color="primary" onDelete={() => undefined} />
          <Chip label="TypeScript" color="info" variant="outline" />
          <Chip label="Tailwind" color="success" icon={<FiCheck />} />
        </div>
      </MoleculeCard>
      <MoleculeCard title="ContextMenu" index={37}>
        <div className="w-full">
          <ContextMenu
            trigger={
              <div className="border-base-content/10 bg-base-200 flex w-full items-center justify-center rounded-xl border border-dashed p-8 text-sm">
                Right-click this panel
              </div>
            }
            items={[
              { label: 'Copy', icon: <FiCopy />, onClick: () => undefined },
              { label: 'Rename', icon: <FiEdit2 />, onClick: () => undefined },
              {
                label: 'Delete',
                icon: <FiTrash />,
                danger: true,
                onClick: () => undefined,
              },
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Drawer" index={38}>
        <div className="flex w-full flex-col gap-2">
          <Button size="sm" onClick={() => setDrawerOpen(true)}>
            Open drawer
          </Button>
          <Drawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Filters"
            side="right">
            <p className="text-sm">Filter panel content.</p>
          </Drawer>
        </div>
      </MoleculeCard>
      <MoleculeCard title="FloatingActionButton" index={39}>
        <div className="flex w-full items-center gap-2">
          <span className="text-base-content/50 text-sm">Action button:</span>
          <FloatingActionButton
            icon={<FiPlus />}
            label="Add"
            position="bottom-left"
            size="sm"
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="HoverCard" index={40}>
        <div className="flex w-full justify-center py-4">
          <HoverCard
            trigger={
              <Button size="sm" variant="outline">
                Hover for details
              </Button>
            }
            content={
              <div className="flex flex-col gap-1">
                <span className="font-medium">Jane Doe</span>
                <span className="text-base-content/50 text-sm">
                  Staff Engineer
                </span>
              </div>
            }
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="ScrollArea" index={41}>
        <div className="w-full">
          <ScrollArea maxHeight={120}>
            <ul className="flex flex-col gap-2">
              {[
                'Account',
                'Billing',
                'Security',
                'Notifications',
                'Appearance',
                'Privacy',
                'Sessions',
              ].map((item) => (
                <li
                  key={item}
                  className="border-base-content/10 bg-base-100 rounded-lg border px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </MoleculeCard>
      <MoleculeCard title="SpeedDial" index={42}>
        <p className="text-base-content/50 text-sm">
          Floating trigger sits in the bottom-right corner of this page.
        </p>
        <SpeedDial
          triggerIcon={<FiPlus />}
          actions={[
            {
              label: 'Compose',
              icon: <FiEdit2 />,
              onClick: () => undefined,
            },
            {
              label: 'Upload',
              icon: <FiUpload />,
              onClick: () => undefined,
            },
            {
              label: 'Share',
              icon: <FiShare2 />,
              onClick: () => undefined,
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="ToggleGroup" index={43}>
        <div className="flex w-full flex-col gap-3">
          <ToggleGroup
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'System', value: 'system' },
            ]}
            value={toggleMode}
            onChange={(value) => setToggleMode(value as string)}
          />
          <ToggleGroup
            multiple
            options={[
              { label: 'Bold', value: 'bold' },
              { label: 'Italic', value: 'italic' },
              { label: 'Underline', value: 'underline' },
            ]}
            value={toggleSet}
            onChange={(value) => setToggleSet(value as string[])}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="DateRange" index={44}>
        <DateRange
          label="Campaign window"
          start={rangeStart}
          end={rangeEnd}
          onStartChange={setRangeStart}
          onEndChange={setRangeEnd}
          min="2026-01-01"
          max="2026-12-31"
        />
      </MoleculeCard>
      <MoleculeCard title="DatePicker" index={45}>
        <DatePicker
          label="Due date"
          value={date}
          onChange={setDate}
          placeholder="Choose a date"
        />
      </MoleculeCard>
      <MoleculeCard title="Dialog" index={46}>
        <div className="flex flex-col items-start gap-2">
          <Button size="sm" onClick={() => setDialogOpen(true)}>
            Open dialog
          </Button>
          <span className="text-base-content/50 text-xs">
            Closes on backdrop click or Escape.
          </span>
        </div>
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          title="Confirm upgrade"
          description="You are about to switch to the Pro plan."
          footer={
            <>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button size="sm" onClick={() => setDialogOpen(false)}>
                Upgrade
              </Button>
            </>
          }>
          <p className="text-sm">No charges until the next billing cycle.</p>
        </Dialog>
      </MoleculeCard>
      <MoleculeCard title="FileUpload" index={47}>
        <FileUpload
          label="Project assets"
          accept="image/*"
          multiple
          maxSize={5 * 1024 * 1024}
          hint="PNG or JPG, up to 5 MB each"
        />
      </MoleculeCard>
      <MoleculeCard title="ImageGallery" index={48}>
        <ImageGallery
          images={[
            { src: '/gallery-1.png', alt: 'Coastal landscape' },
            { src: '/gallery-2.png', alt: 'Mountain trail' },
            { src: '/gallery-3.png', alt: 'City skyline' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="InfoList" index={49}>
        <InfoList
          title="Repository"
          items={[
            { key: 'owner', label: 'Owner', value: 'hieudoanm' },
            { key: 'stars', label: 'Stars', value: '1,024' },
            {
              key: 'license',
              label: 'License',
              value: 'MIT',
              icon: <FiCheck />,
            },
          ]}
          columns={2}
        />
      </MoleculeCard>
      <MoleculeCard title="InlineAlert" index={50}>
        <div className="flex flex-col gap-2">
          <InlineAlert variant="info">
            Scheduled maintenance at 02:00 UTC.
          </InlineAlert>
          <InlineAlert variant="success">Your changes are live.</InlineAlert>
          <InlineAlert variant="error">
            The file exceeds the size limit.
          </InlineAlert>
        </div>
      </MoleculeCard>
      <MoleculeCard title="InputStepper" index={51}>
        <InputStepper
          label="Period"
          options={['Day', 'Week', 'Month', 'Year']}
          value={period}
          onChange={setPeriod}
        />
      </MoleculeCard>
      <MoleculeCard title="MenuGroup" index={52}>
        <MenuGroup
          sections={[
            {
              id: 'workspace',
              title: 'Workspace',
              items: [
                {
                  id: 'projects',
                  label: 'Projects',
                  icon: <FiHome />,
                },
                { id: 'reports', label: 'Reports' },
              ],
            },
            {
              id: 'account',
              title: 'Account',
              items: [
                { id: 'profile', label: 'Profile', icon: <FiUser /> },
                { id: 'billing', label: 'Billing' },
              ],
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="NumberInput" index={53}>
        <NumberInput
          label="Team size"
          value={count}
          onChange={setCount}
          min={1}
          max={20}
          step={1}
          hint="Between 1 and 20"
        />
      </MoleculeCard>
      <MoleculeCard title="Menubar" index={54}>
        <Menubar
          items={[
            {
              label: 'File',
              children: (
                <div className="flex flex-col gap-1 text-sm">
                  <span>New</span>
                  <span>Open…</span>
                  <span>Save</span>
                </div>
              ),
            },
            {
              label: 'Edit',
              children: (
                <div className="flex flex-col gap-1 text-sm">
                  <span>Undo</span>
                  <span>Redo</span>
                </div>
              ),
            },
            { label: 'View' },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="Backdrop" index={55}>
        <div className="flex w-full flex-col items-start gap-2">
          <Button size="sm" onClick={() => setBackdropOpen(true)}>
            Show backdrop
          </Button>
          <span className="text-base-content/50 text-xs">
            Dims the page behind a layer.
          </span>
        </div>
        <Backdrop open={backdropOpen} onClose={() => setBackdropOpen(false)} />
      </MoleculeCard>
      <MoleculeCard title="LoadingOverlay" index={56}>
        <div className="flex w-full flex-col items-start gap-2">
          <Button size="sm" onClick={() => setOverlayOpen(true)}>
            Show overlay
          </Button>
          <span className="text-base-content/50 text-xs">
            Full-screen loading state.
          </span>
        </div>
        <LoadingOverlay
          open={overlayOpen}
          label="Saving changes…"
          onClose={() => setOverlayOpen(false)}
        />
      </MoleculeCard>
      <MoleculeCard title="TransferList" index={57}>
        <div className="w-full">
          <TransferList
            left={transferLeft}
            right={transferRight}
            onChange={(left, right) => {
              setTransferLeft(left);
              setTransferRight(right);
            }}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="MultiSelect" index={58}>
        <div className="w-full">
          <MultiSelect
            label="Stack"
            value={multi}
            onChange={setMulti}
            options={[
              { value: 'react', label: 'React' },
              { value: 'typescript', label: 'TypeScript' },
              { value: 'next', label: 'Next.js' },
              { value: 'tailwind', label: 'Tailwind' },
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="TimePicker" index={59}>
        <div className="w-full">
          <TimePicker label="Start time" value={time} onChange={setTime} />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Resizable" index={60}>
        <div className="w-full">
          <Resizable
            direction="horizontal"
            first={
              <div className="bg-base-300 flex h-24 items-center justify-center rounded-lg text-xs">
                First pane
              </div>
            }
            second={
              <div className="bg-base-100 flex h-24 items-center justify-center rounded-lg text-xs">
                Second pane
              </div>
            }
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="FilterGroup" index={61}>
        <div className="flex w-full flex-col gap-2">
          <FilterGroup
            name="status"
            selected={filters}
            onChange={setFilters}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'archived', label: 'Archived' },
              { value: 'draft', label: 'Draft' },
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="PasswordStrength" index={64}>
        <div className="flex w-full flex-col gap-2">
          <PasswordStrength value="P@ssw0rd!" label="Password" />
          <PasswordStrength value="weak" label="Weak example" />
        </div>
      </MoleculeCard>
      <MoleculeCard title="SkillBar" index={65}>
        <div className="flex w-full flex-col gap-3">
          <SkillBar label="TypeScript" value={90} variant="primary" showValue />
          <SkillBar label="React" value={80} variant="success" showValue />
          <SkillBar label="Testing" value={60} variant="warning" showValue />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Checklist" index={66}>
        <Checklist
          items={checklist}
          onToggle={(id) =>
            setChecklist(
              checklist.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
              )
            )
          }
        />
      </MoleculeCard>
      <MoleculeCard title="FeatureList" index={67}>
        <FeatureList
          columns={2}
          items={[
            {
              icon: <FiCheck />,
              title: 'Fast',
              description: 'Sub-second loads',
            },
            {
              icon: <FiHome />,
              title: 'Reliable',
              description: '99.9% uptime',
            },
            {
              icon: <FiUser />,
              title: 'Secure',
              description: 'End-to-end encrypted',
            },
            {
              icon: <FiMail />,
              title: 'Supported',
              description: '24/7 email help',
            },
          ]}
        />
      </MoleculeCard>
      <MoleculeCard title="SocialLinks" index={68}>
        <SocialLinks
          items={[
            { platform: 'github', href: 'https://github.com', label: 'GitHub' },
            {
              platform: 'twitter',
              href: 'https://twitter.com',
              label: 'Twitter',
            },
            {
              platform: 'linkedin',
              href: 'https://linkedin.com',
              label: 'LinkedIn',
            },
          ]}
          size="md"
        />
      </MoleculeCard>
      <MoleculeCard title="Gauge" index={69}>
        <div className="flex w-full items-center justify-around">
          <Gauge value={82} label="Health" variant="success" showValue />
          <Gauge value={45} label="Usage" variant="warning" showValue />
          <Gauge value={20} label="Battery" variant="error" showValue />
        </div>
      </MoleculeCard>
      <MoleculeCard title="JsonViewer" index={70}>
        <div className="w-full">
          <JsonViewer
            name="profile"
            defaultExpanded
            data={{
              name: 'Ada Lovelace',
              age: 36,
              active: true,
              skills: ['math', 'compilers'],
              meta: { city: 'London', verified: false },
            }}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="Masonry" index={71}>
        <div className="w-full">
          <Masonry
            columns={3}
            gap="sm"
            items={[
              <div
                key="a"
                className="card bg-base-100 border-base-content/10 border p-3 text-sm">
                Short card
              </div>,
              <div
                key="b"
                className="card bg-base-100 border-base-content/10 border p-3 text-sm">
                A taller card with more content to demonstrate the masonry
                layout.
              </div>,
              <div
                key="c"
                className="card bg-base-100 border-base-content/10 border p-3 text-sm">
                Medium
              </div>,
              <div
                key="d"
                className="card bg-base-100 border-base-content/10 border p-3 text-sm">
                Another
              </div>,
            ]}
          />
        </div>
      </MoleculeCard>
      <MoleculeCard title="StatTrend" index={72}>
        <div className="grid w-full grid-cols-2 gap-3">
          <StatTrend label="Revenue" value="$48k" trend={12.5} />
          <StatTrend label="Churn" value="2.1%" trend={-8} />
          <StatTrend label="Users" value="12k" trend={3.2} />
          <StatTrend label="Refunds" value="0.4%" trend={-1.5} />
        </div>
      </MoleculeCard>
      <MoleculeCard title="ReviewCard" index={73}>
        <div className="w-full">
          <ReviewCard
            quote="The component library saved our team weeks of work."
            author="Ada Lovelace"
            role="Staff Engineer"
            rating={5}
            initials="AL"
          />
        </div>
      </MoleculeCard>
    </div>
  );
};

MoleculesLevel.displayName = 'MoleculesLevel';
