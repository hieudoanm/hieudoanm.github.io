import type { FC, ReactNode } from 'react';
import { motion } from 'motion/react';
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
  AccountSummary,
  ActivityGoal,
  ActivityLog,
  AlertsCard,
  Alert,
  AlbumCard,
  AlbumTracks,
  AmenityList,
  AnalysisCard,
  AppointmentCard,
  ArticleCard,
  ArticleList,
  ArtistCard,
  AttachmentList,
  AttendanceTable,
  AttractionCard,
  AuthorBio,
  AvatarGroup,
  AwardCard,
  Backdrop,
  BalanceCard,
  Banner,
  BenefitCard,
  BlogTeaser,
  BookingCard,
  BottomNavigation,
  Breadcrumbs,
  BreakingNews,
  BudgetCard,
  BundleCard,
  ButtonGroup,
  CalorieTracker,
  CandidateCard,
  Card,
  Carousel,
  CartItem,
  CategoryCard,
  CategoryList,
  CategoryNav,
  ChatBubble,
  CheckboxGroup,
  Checklist,
  ChecklistCard,
  CheckoutSummary,
  Chip,
  ClientLogo,
  ColorPicker,
  ColorSwatch,
  Combobox,
  CommentBox,
  CommentList,
  CompareTable,
  ComposeForm,
  ConfirmDialog,
  ContactCard,
  ContactForm,
  ContextMenu,
  CouponBox,
  CtaBanner,
  CultureCard,
  CustomerSegment,
  CustomerTable,
  DangerZone,
  DatePicker,
  DateRange,
  DealCard,
  DestinationCard,
  Dialog,
  DoctorCard,
  DraftItem,
  Drawer,
  Dropdown,
  EditorialCard,
  EmailRow,
  EmployeeCard,
  EmptyState,
  EpisodeCard,
  EventCard,
  ExchangeCard,
  ExpenseList,
  FAQItem,
  FeaturedPost,
  FeatureList,
  Fieldset,
  FileUpload,
  FilterGroup,
  FlightCard,
  FloatingActionButton,
  FolderItem,
  FollowUpTask,
  FormRow,
  FriendRequest,
  Gauge,
  GroupCard,
  HealthTip,
  HeadlineRow,
  HeartRateChart,
  HeroSection,
  HotelCard,
  HoverCard,
  ImageGallery,
  IncomeList,
  InfoList,
  InboxTable,
  InlineAlert,
  InputGroup,
  InputStepper,
  InterviewCard,
  InventoryTable,
  InvoiceCard,
  InvoiceRow,
  ItineraryList,
  JobPosting,
  JsonViewer,
  KeyValue,
  LabelBadges,
  LeadCard,
  LeaveCard,
  LikeButton,
  List,
  LiveUpdate,
  LoadingOverlay,
  LoanCard,
  LoyaltyCard,
  LyricsView,
  MapPreview,
  MarketIndex,
  Masonry,
  MealPlan,
  MedicationCard,
  Menu,
  MenuGroup,
  Menubar,
  MessagePreview,
  MessageThread,
  MilestoneCard,
  Modal,
  MoodBoard,
  MultiSelect,
  NavItem,
  NotificationItem,
  NowPlayingBar,
  NumberInput,
  NutritionCard,
  OnboardingTask,
  OpinionColumn,
  OrderCard,
  OrderSummary,
  OrgChart,
  Pagination,
  PartnersRow,
  PasswordStrength,
  PaymentCard,
  PayrollSummary,
  PerformanceCard,
  PhotoStory,
  PipelineView,
  PlanCard,
  PlaylistCard,
  PodcastCard,
  PolicyCard,
  Popover,
  PortfolioCard,
  PostCard,
  PostHeader,
  PriceBreakdown,
  PricingCard,
  ProcessStep,
  ProductCard,
  ProductCatalogCard,
  ProductRow,
  ProfileHeader,
  QuoteBlock,
  QueueList,
  RadioGroup,
  RadioStation,
  ReactionPicker,
  RecentlyPlayed,
  RecruitmentCard,
  RelatedPosts,
  ReplyForm,
  Resizable,
  ReviewCard,
  ReviewSummary,
  SalesFunnel,
  SavingsGoal,
  ScoreBoard,
  ScrollArea,
  SearchBar,
  SearchFilters,
  SearchResults,
  SentItem,
  ServiceCard,
  ShareButtons,
  Sheet,
  ShippingInfo,
  SignatureCard,
  SimilarArtists,
  ShareRow,
  SizePicker,
  SkillBar,
  SleepChart,
  SocialLinks,
  SpamItem,
  SpeedDial,
  SportsScoreCard,
  Stat,
  StatHighlight,
  StatTrend,
  StatsRow,
  Steps,
  StepsChart,
  StockBadge,
  StockChart,
  StoreCard,
  StoreReviewCard,
  StoryStrip,
  StreamCard,
  SubscribeForm,
  SuggestionCard,
  SupportTicket,
  SymptomCard,
  Table,
  Tabs,
  TagChips,
  TagInput,
  TaxCard,
  TeamCard,
  TeamMemberCard,
  TeamSummary,
  TestimonialCard,
  Timeline,
  TimesheetRow,
  TimePicker,
  Toast,
  ToggleGroup,
  TrackRow,
  TrainingCard,
  TransactionTable,
  TransferList,
  TransportOption,
  TrashItem,
  TreeView,
  TrendingList,
  TripSummary,
  VideoCard,
  VideoStory,
  VitalsCard,
  WatchlistRow,
  WaterTracker,
  WeatherCard,
  WeatherForecast,
  WeightChart,
  WishlistItem,
  WorkoutCard,
} from '../../../../molecules';
import { Button, Progress, Switch } from '../../../../atoms';

const MoleculeCard: FC<{
  title: string;
  index: number;
  children: ReactNode;
}> = ({ title, index, children }) => (
  <motion.div
    className="card bg-base-200 border-base-content/10 border"
    initial={{ opacity: 0, y: 14, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.06,
    }}>
    <div className="card-body gap-3">
      <h4 className="text-base-content/50 font-mono text-xs uppercase">
        {title}
      </h4>
      {children}
    </div>
  </motion.div>
);

export const MoleculesLevel: FC = () => {
  const [search, setSearch] = useState('');

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
  const [swatch, setSwatch] = useState('#3b82f6');
  const [cartQty, setCartQty] = useState(2);
  const [mood, setMood] = useState('energetic');

  const sections: {
    cat: string;
    tiles: { title: string; node: ReactNode }[];
  }[] = [
    {
      cat: 'app',
      tiles: [
        {
          title: 'ButtonGroup',
          node: (
            <MoleculeCard title="ButtonGroup" index={0}>
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
          ),
        },
        {
          title: 'CheckboxGroup',
          node: (
            <MoleculeCard title="CheckboxGroup" index={1}>
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
          ),
        },
        {
          title: 'Combobox',
          node: (
            <MoleculeCard title="Combobox" index={2}>
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
          ),
        },
        {
          title: 'Fieldset',
          node: (
            <MoleculeCard title="Fieldset" index={3}>
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
          ),
        },
        {
          title: 'FilterGroup',
          node: (
            <MoleculeCard title="FilterGroup" index={4}>
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
          ),
        },
        {
          title: 'FormRow',
          node: (
            <MoleculeCard title="FormRow" index={5}>
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
          ),
        },
        {
          title: 'Gauge',
          node: (
            <MoleculeCard title="Gauge" index={6}>
              <div className="flex w-full items-center justify-around">
                <Gauge value={82} label="Health" variant="success" showValue />
                <Gauge value={45} label="Usage" variant="warning" showValue />
                <Gauge value={20} label="Battery" variant="error" showValue />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'InputGroup',
          node: (
            <MoleculeCard title="InputGroup" index={7}>
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
          ),
        },
        {
          title: 'InputStepper',
          node: (
            <MoleculeCard title="InputStepper" index={8}>
              <InputStepper
                label="Period"
                options={['Day', 'Week', 'Month', 'Year']}
                value={period}
                onChange={setPeriod}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MultiSelect',
          node: (
            <MoleculeCard title="MultiSelect" index={9}>
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
          ),
        },
        {
          title: 'NumberInput',
          node: (
            <MoleculeCard title="NumberInput" index={10}>
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
          ),
        },
        {
          title: 'RadioGroup',
          node: (
            <MoleculeCard title="RadioGroup" index={11}>
              <RadioGroup
                name="plan"
                label="Plan"
                value={plan}
                onChange={setPlan}
                options={[
                  {
                    label: 'Free',
                    value: 'free',
                    description: 'For personal use',
                  },
                  { label: 'Pro', value: 'pro', description: 'For teams' },
                  { label: 'Enterprise', value: 'enterprise' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Stat',
          node: (
            <MoleculeCard title="Stat" index={12}>
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
          ),
        },
        {
          title: 'StatTrend',
          node: (
            <MoleculeCard title="StatTrend" index={13}>
              <div className="grid w-full grid-cols-2 gap-3">
                <StatTrend label="Revenue" value="$48k" trend={12.5} />
                <StatTrend label="Churn" value="2.1%" trend={-8} />
                <StatTrend label="Users" value="12k" trend={3.2} />
                <StatTrend label="Refunds" value="0.4%" trend={-1.5} />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'TagInput',
          node: (
            <MoleculeCard title="TagInput" index={14}>
              <TagInput tags={tags} onChange={setTags} />
            </MoleculeCard>
          ),
        },
        {
          title: 'ToggleGroup',
          node: (
            <MoleculeCard title="ToggleGroup" index={15}>
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
          ),
        },
      ],
    },
    {
      cat: 'auth',
      tiles: [
        {
          title: 'Alert',
          node: (
            <MoleculeCard title="Alert" index={0}>
              <div className="flex flex-col gap-2">
                <Alert title="Saved" description="Your changes are stored." />
                <Alert variant="warning" title="Low balance" />
                <Alert variant="error">Something went wrong.</Alert>
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'AvatarGroup',
          node: (
            <MoleculeCard title="AvatarGroup" index={1}>
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
          ),
        },
        {
          title: 'Banner',
          node: (
            <MoleculeCard title="Banner" index={2}>
              <div className="flex flex-col gap-2">
                <Banner
                  title="Update available"
                  description="v2.2 is ready to install."
                  action={<Button size="sm">Update</Button>}
                />
                <Banner variant="warning" title="Storage almost full" />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'Checklist',
          node: (
            <MoleculeCard title="Checklist" index={3}>
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
          ),
        },
        {
          title: 'Chip',
          node: (
            <MoleculeCard title="Chip" index={4}>
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="React"
                  color="primary"
                  onDelete={() => undefined}
                />
                <Chip label="TypeScript" color="info" variant="outline" />
                <Chip label="Tailwind" color="success" icon={<FiCheck />} />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'ConfirmDialog',
          node: (
            <MoleculeCard title="ConfirmDialog" index={5}>
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
          ),
        },
        {
          title: 'ContextMenu',
          node: (
            <MoleculeCard title="ContextMenu" index={6}>
              <div className="w-full">
                <ContextMenu
                  trigger={
                    <div className="border-base-content/10 bg-base-200 flex w-full items-center justify-center rounded-xl border border-dashed p-8 text-sm">
                      Right-click this panel
                    </div>
                  }
                  items={[
                    {
                      label: 'Copy',
                      icon: <FiCopy />,
                      onClick: () => undefined,
                    },
                    {
                      label: 'Rename',
                      icon: <FiEdit2 />,
                      onClick: () => undefined,
                    },
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
          ),
        },
        {
          title: 'DangerZone',
          node: (
            <MoleculeCard title="DangerZone" index={7}>
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
          ),
        },
        {
          title: 'Dropdown',
          node: (
            <MoleculeCard title="Dropdown" index={8}>
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
          ),
        },
        {
          title: 'FeatureList',
          node: (
            <MoleculeCard title="FeatureList" index={9}>
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
          ),
        },
        {
          title: 'InfoList',
          node: (
            <MoleculeCard title="InfoList" index={10}>
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
          ),
        },
        {
          title: 'InlineAlert',
          node: (
            <MoleculeCard title="InlineAlert" index={11}>
              <div className="flex flex-col gap-2">
                <InlineAlert variant="info">
                  Scheduled maintenance at 02:00 UTC.
                </InlineAlert>
                <InlineAlert variant="success">
                  Your changes are live.
                </InlineAlert>
                <InlineAlert variant="error">
                  The file exceeds the size limit.
                </InlineAlert>
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'KeyValue',
          node: (
            <MoleculeCard title="KeyValue" index={12}>
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
          ),
        },
        {
          title: 'Menu',
          node: (
            <MoleculeCard title="Menu" index={13}>
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
                    {
                      label: 'Log out',
                      danger: true,
                      onClick: () => undefined,
                    },
                  ]}
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'Menubar',
          node: (
            <MoleculeCard title="Menubar" index={14}>
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
          ),
        },
        {
          title: 'PasswordStrength',
          node: (
            <MoleculeCard title="PasswordStrength" index={15}>
              <div className="flex w-full flex-col gap-2">
                <PasswordStrength value="P@ssw0rd!" label="Password" />
                <PasswordStrength value="weak" label="Weak example" />
              </div>
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'blog',
      tiles: [
        {
          title: 'ArticleCard',
          node: (
            <MoleculeCard title="ArticleCard" index={0}>
              <ArticleCard
                title="Building design systems with Tailwind"
                excerpt="A practical guide to composing a token-driven design system using utility-first CSS and DaisyUI components."
                author="Jane Cooper"
                readTime="6 min read"
                date="Aug 2, 2026"
                category="Engineering"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'AuthorBio',
          node: (
            <MoleculeCard title="AuthorBio" index={1}>
              <AuthorBio
                name="Jane Cooper"
                role="Senior Frontend Engineer"
                bio="Jane writes about design systems, accessibility, and performance."
                socials={[
                  { label: 'Twitter', href: '#' },
                  { label: 'GitHub', href: '#' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CategoryList',
          node: (
            <MoleculeCard title="CategoryList" index={2}>
              <CategoryList
                categories={[
                  { label: 'All', count: 24 },
                  { label: 'Engineering', count: 12 },
                  { label: 'Design', count: 8 },
                  { label: 'Product', count: 4 },
                ]}
                active="Engineering"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ChatBubble',
          node: (
            <MoleculeCard title="ChatBubble" index={3}>
              <div className="flex w-full flex-col gap-2">
                <ChatBubble
                  message="How do I get started with the design system?"
                  sender="user"
                  name="You"
                  time="09:12"
                />
                <ChatBubble
                  message="Start with the foundations: colors, spacing, and type tokens."
                  sender="assistant"
                  name="Support"
                  time="09:12"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'CommentBox',
          node: (
            <MoleculeCard title="CommentBox" index={4}>
              <CommentBox onSubmit={() => undefined} author="Jane Cooper" />
            </MoleculeCard>
          ),
        },
        {
          title: 'FeaturedPost',
          node: (
            <MoleculeCard title="FeaturedPost" index={5}>
              <FeaturedPost
                title="Inside the redesign of our developer docs"
                excerpt="We rebuilt the docs from the ground up around tasks, examples, and interactive playgrounds."
                author="Jane Cooper"
                readTime="10 min read"
                category="Product"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PostHeader',
          node: (
            <MoleculeCard title="PostHeader" index={6}>
              <PostHeader
                title="A practical guide to component-driven development"
                author="Jane Cooper"
                date="Aug 2, 2026"
                readTime="6 min read"
                category="Engineering"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'QuoteBlock',
          node: (
            <MoleculeCard title="QuoteBlock" index={7}>
              <QuoteBlock
                quote="Design is not just what it looks like and feels like. Design is how it works."
                author="Steve Jobs"
                source="Interview"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'RelatedPosts',
          node: (
            <MoleculeCard title="RelatedPosts" index={8}>
              <RelatedPosts
                posts={[
                  {
                    title: 'Tokens, utilities, and the future of CSS',
                    readTime: '8 min',
                  },
                  { title: 'Designing accessible forms', readTime: '5 min' },
                  { title: 'Dark mode without the flicker', readTime: '4 min' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ReviewCard',
          node: (
            <MoleculeCard title="ReviewCard" index={9}>
              <ReviewCard
                quote="The component library cut our delivery time in half."
                author="Sarah Kim"
                role="Product Manager"
                rating={5}
                initials="SK"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ShareButtons',
          node: (
            <MoleculeCard title="ShareButtons" index={10}>
              <ShareButtons
                url="https://example.com/blog/guide"
                title="Share:"
                onShare={() => undefined}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SkillBar',
          node: (
            <MoleculeCard title="SkillBar" index={11}>
              <div className="flex w-full flex-col gap-3">
                <SkillBar label="TypeScript" value={85} />
                <SkillBar label="React" value={78} variant="accent" />
                <SkillBar label="Testing" value={62} variant="success" />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'SocialLinks',
          node: (
            <MoleculeCard title="SocialLinks" index={12}>
              <SocialLinks
                items={[
                  { platform: 'github', href: '#' },
                  { platform: 'twitter', href: '#' },
                  { platform: 'linkedin', href: '#' },
                  { platform: 'youtube', href: '#' },
                ]}
                size="md"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SubscribeForm',
          node: (
            <MoleculeCard title="SubscribeForm" index={13}>
              <SubscribeForm onSubmit={() => undefined} />
            </MoleculeCard>
          ),
        },
        {
          title: 'TagChips',
          node: (
            <MoleculeCard title="TagChips" index={14}>
              <TagChips
                tags={['typescript', 'nextjs', 'tailwind', 'daisyui']}
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'crm',
      tiles: [
        {
          title: 'ActivityLog',
          node: (
            <MoleculeCard title="ActivityLog" index={0}>
              <ActivityLog
                activities={[
                  {
                    id: '1',
                    type: 'Call',
                    description: 'Intro call with Acme',
                    timestamp: '2h ago',
                    actor: 'Maya',
                  },
                  {
                    id: '2',
                    type: 'Email',
                    description: 'Sent proposal draft',
                    timestamp: '5h ago',
                    actor: 'Liam',
                  },
                  {
                    id: '3',
                    type: 'Note',
                    description: 'Follow up on pricing',
                    timestamp: '1d ago',
                    actor: 'Maya',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ContactCard',
          node: (
            <MoleculeCard title="ContactCard" index={1}>
              <ContactCard
                name="Olivia Reed"
                email="olivia@acme.com"
                title="VP Engineering"
                company="Acme"
                phone="+1 555 0100"
                status="Active"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CustomerSegment',
          node: (
            <MoleculeCard title="CustomerSegment" index={2}>
              <CustomerSegment
                name="Enterprise"
                count={42}
                description="Accounts with more than 50 seats."
                color="primary"
                avgOrderValue={25000}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CustomerTable',
          node: (
            <MoleculeCard title="CustomerTable" index={3}>
              <CustomerTable
                rows={[
                  {
                    id: '1',
                    name: 'Olivia Reed',
                    email: 'olivia@acme.com',
                    plan: 'Enterprise',
                    status: 'Active',
                  },
                  {
                    id: '2',
                    name: 'Noah Park',
                    email: 'noah@globex.io',
                    plan: 'Pro',
                    status: 'Active',
                  },
                  {
                    id: '3',
                    name: 'Ava Chen',
                    email: 'ava@initech.net',
                    plan: 'Starter',
                    status: 'Trialing',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'DealCard',
          node: (
            <MoleculeCard title="DealCard" index={4}>
              <DealCard
                name="Platform renewal"
                company="Acme"
                amount={48000}
                stage="Negotiation"
                probability={70}
                owner="Maya"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FollowUpTask',
          node: (
            <MoleculeCard title="FollowUpTask" index={5}>
              <FollowUpTask
                id="t1"
                title="Send revised proposal"
                dueDate="Aug 10"
                owner="Maya"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'InventoryTable',
          node: (
            <MoleculeCard title="InventoryTable" index={6}>
              <InventoryTable
                rows={[
                  {
                    id: '1',
                    name: 'Wireless Mouse',
                    sku: 'MSE-100',
                    quantity: 42,
                    reorderLevel: 20,
                    price: 24,
                  },
                  {
                    id: '2',
                    name: 'Mechanical Keyboard',
                    sku: 'KBD-200',
                    quantity: 8,
                    reorderLevel: 15,
                    price: 89,
                  },
                  {
                    id: '3',
                    name: 'USB-C Hub',
                    sku: 'HUB-300',
                    quantity: 35,
                    reorderLevel: 10,
                    price: 32,
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'InvoiceCard',
          node: (
            <MoleculeCard title="InvoiceCard" index={7}>
              <InvoiceCard
                id="INV-1042"
                customer="Acme Inc."
                status="Pending"
                items={[
                  { label: 'Design sprint', amount: 6000 },
                  { label: 'Development', amount: 12000 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LeadCard',
          node: (
            <MoleculeCard title="LeadCard" index={8}>
              <LeadCard
                name="Ethan Brooks"
                company="Vertex Labs"
                email="ethan@vertex.io"
                source="Website"
                score={82}
                status="Qualified"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'OrderCard',
          node: (
            <MoleculeCard title="OrderCard" index={9}>
              <OrderCard
                id="8841"
                customer="Acme Inc."
                date="Aug 4, 2026"
                total={1280}
                itemsCount={3}
                status="Shipped"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PipelineView',
          node: (
            <MoleculeCard title="PipelineView" index={10}>
              <PipelineView
                stages={[
                  {
                    name: 'Prospecting',
                    deals: [
                      { id: '1', name: 'Acme Corp', amount: 24000 },
                      { id: '2', name: 'Globex', amount: 15000 },
                    ],
                  },
                  {
                    name: 'Proposal',
                    deals: [{ id: '3', name: 'Initech', amount: 32000 }],
                  },
                  {
                    name: 'Closed',
                    deals: [{ id: '4', name: 'Umbrella', amount: 9000 }],
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ProductCatalogCard',
          node: (
            <MoleculeCard title="ProductCatalogCard" index={11}>
              <ProductCatalogCard
                name="Pro Plan"
                price={29}
                sku="PLAN-PRO"
                category="Subscription"
                stock={120}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SalesFunnel',
          node: (
            <MoleculeCard title="SalesFunnel" index={12}>
              <SalesFunnel
                stages={[
                  { label: 'Visitors', count: 1200 },
                  { label: 'Leads', count: 640 },
                  { label: 'Qualified', count: 210 },
                  { label: 'Won', count: 48 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StatsRow',
          node: (
            <MoleculeCard title="StatsRow" index={13}>
              <StatsRow
                stats={[
                  {
                    label: 'Revenue',
                    value: '$128k',
                    change: '+12%',
                    trend: 'up',
                  },
                  {
                    label: 'New customers',
                    value: '284',
                    change: '+8%',
                    trend: 'up',
                  },
                  {
                    label: 'Churn',
                    value: '2.1%',
                    change: '-0.4%',
                    trend: 'down',
                  },
                  {
                    label: 'NPS',
                    value: '61',
                    change: 'steady',
                    trend: 'neutral',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SupportTicket',
          node: (
            <MoleculeCard title="SupportTicket" index={14}>
              <SupportTicket
                id="T-221"
                subject="Cannot reset password"
                customer="Dana Wu"
                priority="High"
                status="Open"
                date="Aug 6, 2026"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TeamCard',
          node: (
            <MoleculeCard title="TeamCard" index={15}>
              <TeamCard
                name="Growth"
                members={[
                  {
                    name: 'Maya Patel',
                    role: 'Manager',
                    email: 'maya@acme.com',
                  },
                  { name: 'Liam Nguyen', role: 'AE', email: 'liam@acme.com' },
                  { name: 'Sofia Ruiz', role: 'SDR', email: 'sofia@acme.com' },
                ]}
                totalQuota={250000}
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'developer',
      tiles: [
        {
          title: 'Carousel',
          node: (
            <MoleculeCard title="Carousel" index={0}>
              <Carousel
                slides={[
                  <div
                    key="one"
                    className="bg-primary text-primary-content flex h-40 items-center justify-center rounded-xl">
                    Slide one
                  </div>,
                  <div
                    key="two"
                    className="bg-secondary text-secondary-content flex h-40 items-center justify-center rounded-xl">
                    Slide two
                  </div>,
                  <div
                    key="three"
                    className="bg-accent text-accent-content flex h-40 items-center justify-center rounded-xl">
                    Slide three
                  </div>,
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ColorPicker',
          node: (
            <MoleculeCard title="ColorPicker" index={1}>
              <ColorPicker
                value={color}
                onChange={setColor}
                label="Brand color"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'DatePicker',
          node: (
            <MoleculeCard title="DatePicker" index={2}>
              <DatePicker value={date} onChange={setDate} label="Due date" />
            </MoleculeCard>
          ),
        },
        {
          title: 'DateRange',
          node: (
            <MoleculeCard title="DateRange" index={3}>
              <DateRange
                start={rangeStart}
                end={rangeEnd}
                onStartChange={setRangeStart}
                onEndChange={setRangeEnd}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'EmptyState',
          node: (
            <MoleculeCard title="EmptyState" index={4}>
              <EmptyState
                icon={<FiSearch className="mx-auto" />}
                title="No results found"
                description="Try adjusting your search or filter to find what you are looking for."
                action={
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => undefined}>
                    Clear filters
                  </button>
                }
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FileUpload',
          node: (
            <MoleculeCard title="FileUpload" index={5}>
              <FileUpload
                label="Upload assets"
                hint="PNG, JPG or SVG up to 5 MB"
                accept="image/*"
                multiple
                maxSize={5 * 1024 * 1024}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'HoverCard',
          node: (
            <MoleculeCard title="HoverCard" index={6}>
              <div className="flex justify-center">
                <HoverCard
                  trigger={
                    <span className="btn btn-ghost btn-sm">Hover me</span>
                  }
                  content={
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">Quick preview</p>
                      <p className="text-base-content/60 text-xs">
                        More details appear on hover.
                      </p>
                    </div>
                  }
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'ImageGallery',
          node: (
            <MoleculeCard title="ImageGallery" index={7}>
              <ImageGallery
                label="Product photos"
                images={[
                  { src: '', alt: 'Front view' },
                  { src: '', alt: 'Side view' },
                  { src: '', alt: 'Detail' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'JsonViewer',
          node: (
            <MoleculeCard title="JsonViewer" index={8}>
              <JsonViewer
                name="user"
                defaultExpanded
                data={{
                  id: 1,
                  name: 'Ada Lovelace',
                  active: true,
                  roles: ['admin', 'editor'],
                  profile: { location: 'London', verified: false },
                }}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Pagination',
          node: (
            <MoleculeCard title="Pagination" index={9}>
              <div className="flex justify-center">
                <Pagination current={page} total={12} onChange={setPage} />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'Resizable',
          node: (
            <MoleculeCard title="Resizable" index={10}>
              <Resizable
                first={
                  <div className="bg-primary/10 flex h-36 items-center justify-center rounded-lg text-sm">
                    Left
                  </div>
                }
                second={
                  <div className="bg-base-200 flex h-36 items-center justify-center rounded-lg text-sm">
                    Right
                  </div>
                }
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SearchBar',
          node: (
            <MoleculeCard title="SearchBar" index={11}>
              <SearchBar
                value={query}
                onChange={setQuery}
                placeholder="Search components..."
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SpeedDial',
          node: (
            <MoleculeCard title="SpeedDial" index={12}>
              <SpeedDial
                triggerIcon={<FiPlus />}
                actions={[
                  { label: 'New file', onClick: () => undefined },
                  { label: 'Import', onClick: () => undefined },
                  { label: 'Export', onClick: () => undefined },
                ]}
                position="bottom-right"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TimePicker',
          node: (
            <MoleculeCard title="TimePicker" index={13}>
              <TimePicker value={time} onChange={setTime} label="Start time" />
            </MoleculeCard>
          ),
        },
        {
          title: 'TransferList',
          node: (
            <MoleculeCard title="TransferList" index={14}>
              <TransferList
                left={transferLeft}
                right={transferRight}
                leftTitle="Available"
                rightTitle="Selected"
                onChange={(left, right) => {
                  setTransferLeft(left);
                  setTransferRight(right);
                }}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TreeView',
          node: (
            <MoleculeCard title="TreeView" index={15}>
              <TreeView
                nodes={[
                  {
                    id: 'src',
                    label: 'src',
                    children: [
                      { id: 'components', label: 'components' },
                      {
                        id: 'pages',
                        label: 'pages',
                        children: [
                          { id: 'home', label: 'home.tsx' },
                          { id: 'about', label: 'about.tsx' },
                        ],
                      },
                      { id: 'index', label: 'index.ts' },
                    ],
                  },
                  { id: 'pkg', label: 'package.json' },
                ]}
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'finance',
      tiles: [
        {
          title: 'AccountSummary',
          node: (
            <MoleculeCard title="AccountSummary" index={0}>
              <AccountSummary
                accounts={[
                  {
                    name: 'Checking',
                    type: 'Chequing',
                    number: '•• 4821',
                    balance: 12450,
                  },
                  {
                    name: 'Savings',
                    type: 'Savings',
                    number: '•• 9034',
                    balance: 38000,
                  },
                  {
                    name: 'Travel',
                    type: 'Credit',
                    number: '•• 6617',
                    balance: -1250,
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'AlertsCard',
          node: (
            <MoleculeCard title="AlertsCard" index={1}>
              <AlertsCard
                alerts={[
                  {
                    id: '1',
                    message: 'Large withdrawal detected',
                    type: 'warning',
                  },
                  { id: '2', message: 'Payment received', type: 'success' },
                  { id: '3', message: 'Card about to expire', type: 'error' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'BalanceCard',
          node: (
            <MoleculeCard title="BalanceCard" index={2}>
              <BalanceCard balance={48210.55} trend={3.42} />
            </MoleculeCard>
          ),
        },
        {
          title: 'BudgetCard',
          node: (
            <MoleculeCard title="BudgetCard" index={3}>
              <BudgetCard name="Groceries" spent={680} limit={800} />
            </MoleculeCard>
          ),
        },
        {
          title: 'ExchangeCard',
          node: (
            <MoleculeCard title="ExchangeCard" index={4}>
              <ExchangeCard
                from="USD"
                to="EUR"
                amount={500}
                rate={0.92}
                onSwap={() => undefined}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ExpenseList',
          node: (
            <MoleculeCard title="ExpenseList" index={5}>
              <ExpenseList
                expenses={[
                  {
                    id: '1',
                    title: 'Rent',
                    amount: 1800,
                    category: 'Housing',
                    date: 'Aug 1',
                  },
                  {
                    id: '2',
                    title: 'Utilities',
                    amount: 210,
                    category: 'Bills',
                    date: 'Aug 3',
                  },
                  {
                    id: '3',
                    title: 'Groceries',
                    amount: 145,
                    category: 'Food',
                    date: 'Aug 5',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'IncomeList',
          node: (
            <MoleculeCard title="IncomeList" index={6}>
              <IncomeList
                incomes={[
                  { id: '1', source: 'Salary', amount: 5200, date: 'Aug 1' },
                  { id: '2', source: 'Freelance', amount: 800, date: 'Aug 4' },
                  { id: '3', source: 'Dividends', amount: 120, date: 'Aug 6' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'InvoiceRow',
          node: (
            <MoleculeCard title="InvoiceRow" index={7}>
              <div className="divide-base-content/10 flex w-full flex-col divide-y">
                <InvoiceRow
                  id="INV-204"
                  customer="Acme Corp"
                  amount={2450}
                  date="Aug 2"
                  status="paid"
                  onSelect={() => undefined}
                />
                <InvoiceRow
                  id="INV-205"
                  customer="Globex"
                  amount={980}
                  date="Aug 4"
                  status="pending"
                />
                <InvoiceRow
                  id="INV-201"
                  customer="Initech"
                  amount={1320}
                  date="Jul 28"
                  status="overdue"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'LoanCard',
          node: (
            <MoleculeCard title="LoanCard" index={8}>
              <LoanCard
                lender="First National"
                principal={30000}
                balance={18250}
                rate={4.9}
                term="60 mo"
                nextPayment="Sep 1"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PaymentCard',
          node: (
            <MoleculeCard title="PaymentCard" index={9}>
              <PaymentCard
                provider="Visa"
                last4="4821"
                holder="Ada Lovelace"
                expiry="09/28"
                primary
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PortfolioCard',
          node: (
            <MoleculeCard title="PortfolioCard" index={10}>
              <PortfolioCard
                totalValue={84200}
                change={2.14}
                holdings={[
                  { name: 'AAPL', value: 32000, change: 1.2 },
                  { name: 'VTI', value: 41000, change: -0.4 },
                  { name: 'BTC', value: 11200, change: 6.8 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SavingsGoal',
          node: (
            <MoleculeCard title="SavingsGoal" index={11}>
              <SavingsGoal
                name="Emergency fund"
                current={7500}
                target={10000}
                deadline="Dec 2026"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StockChart',
          node: (
            <MoleculeCard title="StockChart" index={12}>
              <StockChart
                points={[
                  { label: 'M', value: 42 },
                  { label: 'T', value: 55 },
                  { label: 'W', value: 48 },
                  { label: 'T', value: 61 },
                  { label: 'F', value: 57 },
                  { label: 'S', value: 66 },
                  { label: 'S', value: 72 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TaxCard',
          node: (
            <MoleculeCard title="TaxCard" index={13}>
              <TaxCard
                title="Income tax"
                amount={6840.5}
                dueDate="Sep 15, 2026"
                status="pending"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TransactionTable',
          node: (
            <MoleculeCard title="TransactionTable" index={14}>
              <TransactionTable
                transactions={[
                  {
                    id: '1',
                    date: 'Aug 6',
                    description: 'Coffee shop',
                    category: 'Food',
                    amount: 4.5,
                    type: 'expense',
                  },
                  {
                    id: '2',
                    date: 'Aug 5',
                    description: 'Payroll',
                    category: 'Salary',
                    amount: 5200,
                    type: 'income',
                  },
                  {
                    id: '3',
                    date: 'Aug 4',
                    description: 'Streaming',
                    category: 'Subscriptions',
                    amount: 15.99,
                    type: 'expense',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WatchlistRow',
          node: (
            <MoleculeCard title="WatchlistRow" index={15}>
              <div className="divide-base-content/10 flex w-full flex-col divide-y">
                <WatchlistRow
                  symbol="AAPL"
                  name="Apple"
                  price={228.4}
                  change={1.35}
                  onSelect={() => undefined}
                />
                <WatchlistRow
                  symbol="TSLA"
                  name="Tesla"
                  price={246.1}
                  change={-2.12}
                />
                <WatchlistRow
                  symbol="NVDA"
                  name="NVIDIA"
                  price={129.8}
                  change={3.9}
                />
              </div>
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'health',
      tiles: [
        {
          title: 'ActivityGoal',
          node: (
            <MoleculeCard title="ActivityGoal" index={0}>
              <ActivityGoal
                label="Daily steps"
                current={7420}
                target={10000}
                unit=" steps"
                onAdd={(delta) => undefined}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'AppointmentCard',
          node: (
            <MoleculeCard title="AppointmentCard" index={1}>
              <AppointmentCard
                doctor="Dr. Sarah Kim"
                specialty="Cardiology"
                date="Aug 12"
                time="09:30"
                location="City Medical Center"
                status="upcoming"
                onCancel={() => undefined}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CalorieTracker',
          node: (
            <MoleculeCard title="CalorieTracker" index={2}>
              <CalorieTracker consumed={1850} burned={420} goal={2200} />
            </MoleculeCard>
          ),
        },
        {
          title: 'DoctorCard',
          node: (
            <MoleculeCard title="DoctorCard" index={3}>
              <DoctorCard
                name="Dr. Michael Chen"
                specialty="Dermatology"
                rating={4.8}
                reviews={126}
                availability="Available today"
                onBook={() => undefined}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'HealthTip',
          node: (
            <MoleculeCard title="HealthTip" index={4}>
              <HealthTip
                tip="Drink a glass of water before every meal to stay hydrated."
                category="Hydration"
                source="CDC"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'HeartRateChart',
          node: (
            <MoleculeCard title="HeartRateChart" index={5}>
              <HeartRateChart
                points={[
                  { label: '00:00', bpm: 62 },
                  { label: '04:00', bpm: 58 },
                  { label: '08:00', bpm: 74 },
                  { label: '12:00', bpm: 81 },
                  { label: '16:00', bpm: 77 },
                  { label: '20:00', bpm: 69 },
                  { label: '24:00', bpm: 64 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MealPlan',
          node: (
            <MoleculeCard title="MealPlan" index={6}>
              <MealPlan
                meals={[
                  {
                    name: 'Breakfast',
                    time: '08:00',
                    items: ['Oatmeal', 'Banana', 'Greek yogurt'],
                    calories: 420,
                  },
                  {
                    name: 'Lunch',
                    time: '12:30',
                    items: ['Grilled chicken', 'Quinoa', 'Broccoli'],
                    calories: 560,
                  },
                  {
                    name: 'Dinner',
                    time: '19:00',
                    items: ['Salmon', 'Brown rice', 'Asparagus'],
                    calories: 610,
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MedicationCard',
          node: (
            <MoleculeCard title="MedicationCard" index={7}>
              <MedicationCard
                name="Lisinopril"
                dose="10 mg"
                time="08:00"
                frequency="Once daily"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'NutritionCard',
          node: (
            <MoleculeCard title="NutritionCard" index={8}>
              <NutritionCard
                calories={{
                  label: 'Calories',
                  consumed: 1850,
                  target: 2200,
                  unit: 'kcal',
                }}
                protein={{
                  label: 'Protein',
                  consumed: 95,
                  target: 140,
                  unit: 'g',
                }}
                carbs={{
                  label: 'Carbs',
                  consumed: 210,
                  target: 275,
                  unit: 'g',
                }}
                fat={{ label: 'Fat', consumed: 62, target: 73, unit: 'g' }}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SleepChart',
          node: (
            <MoleculeCard title="SleepChart" index={9}>
              <SleepChart
                points={[
                  { label: 'Mon', hours: 7.5 },
                  { label: 'Tue', hours: 6.8 },
                  { label: 'Wed', hours: 8.1 },
                  { label: 'Thu', hours: 7.2 },
                  { label: 'Fri', hours: 6.4 },
                  { label: 'Sat', hours: 8.6 },
                  { label: 'Sun', hours: 8 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StepsChart',
          node: (
            <MoleculeCard title="StepsChart" index={10}>
              <StepsChart
                goal={10000}
                points={[
                  { label: 'Mon', steps: 8200 },
                  { label: 'Tue', steps: 9400 },
                  { label: 'Wed', steps: 6800 },
                  { label: 'Thu', steps: 11200 },
                  { label: 'Fri', steps: 7600 },
                  { label: 'Sat', steps: 12400 },
                  { label: 'Sun', steps: 5300 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SymptomCard',
          node: (
            <MoleculeCard title="SymptomCard" index={11}>
              <SymptomCard
                name="Headache"
                severity="moderate"
                duration="2 days"
                note="Worse in the afternoon"
                date="Aug 7, 2026"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'VitalsCard',
          node: (
            <MoleculeCard title="VitalsCard" index={12}>
              <VitalsCard
                bloodPressure="120/80"
                heartRate={72}
                temperature={36.6}
                spo2={98}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WaterTracker',
          node: (
            <MoleculeCard title="WaterTracker" index={13}>
              <WaterTracker glasses={5} target={8} />
            </MoleculeCard>
          ),
        },
        {
          title: 'WeightChart',
          node: (
            <MoleculeCard title="WeightChart" index={14}>
              <WeightChart
                points={[
                  { label: 'Jun', weight: 82.4 },
                  { label: 'Jul', weight: 81.2 },
                  { label: 'Aug', weight: 79.9 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WorkoutCard',
          node: (
            <MoleculeCard title="WorkoutCard" index={15}>
              <WorkoutCard
                name="Morning run"
                duration={45}
                calories={380}
                type="Cardio"
                intensity="moderate"
                date="Aug 7, 2026"
                completed
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'hr',
      tiles: [
        {
          title: 'AttendanceTable',
          node: (
            <MoleculeCard title="AttendanceTable" index={0}>
              <AttendanceTable
                rows={[
                  {
                    date: 'Aug 4',
                    checkIn: '08:55',
                    checkOut: '17:10',
                    hours: 8.25,
                    status: 'present',
                  },
                  {
                    date: 'Aug 5',
                    checkIn: '09:20',
                    checkOut: '17:30',
                    hours: 8.17,
                    status: 'late',
                  },
                  {
                    date: 'Aug 6',
                    checkIn: '08:45',
                    checkOut: '17:05',
                    hours: 8.33,
                    status: 'present',
                  },
                  {
                    date: 'Aug 7',
                    checkIn: undefined,
                    checkOut: undefined,
                    hours: 0,
                    status: 'leave',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'BenefitCard',
          node: (
            <MoleculeCard title="BenefitCard" index={1}>
              <BenefitCard
                title="Health insurance"
                description="Comprehensive medical, dental, and vision coverage for you and your dependents."
                category="Wellness"
                icon="✦"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CandidateCard',
          node: (
            <MoleculeCard title="CandidateCard" index={2}>
              <CandidateCard
                name="Emma Wilson"
                position="Senior Frontend Engineer"
                stage="Interview"
                score={86}
                appliedAt="Aug 3"
                location="Remote"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'EmployeeCard',
          node: (
            <MoleculeCard title="EmployeeCard" index={3}>
              <EmployeeCard
                employee={{
                  name: 'Alex Rivera',
                  role: 'Product Designer',
                  department: 'Design',
                  email: 'alex@acme.com',
                  location: 'Austin, TX',
                  status: 'active',
                }}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'InterviewCard',
          node: (
            <MoleculeCard title="InterviewCard" index={4}>
              <InterviewCard
                candidate="Emma Wilson"
                role="Senior Frontend Engineer"
                interviewer="Maya Patel"
                date="Aug 11"
                time="14:00"
                type="video"
                status="scheduled"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'JobPosting',
          node: (
            <MoleculeCard title="JobPosting" index={5}>
              <JobPosting
                title="Frontend Engineer"
                department="Engineering"
                location="Remote"
                type="Full-time"
                salary="$120k–$150k"
                postedAt="Aug 1"
                deadline="Aug 21"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LeaveCard',
          node: (
            <MoleculeCard title="LeaveCard" index={6}>
              <LeaveCard
                leave={{
                  employee: 'Sarah Chen',
                  type: 'Annual leave',
                  from: 'Aug 18',
                  to: 'Aug 22',
                  days: 5,
                  status: 'pending',
                  reason: 'Family trip',
                }}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'OnboardingTask',
          node: (
            <MoleculeCard title="OnboardingTask" index={7}>
              <OnboardingTask
                title="Set up laptop"
                due="Aug 10"
                status="in-progress"
                assignee="IT"
                category="Equipment"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'OrgChart',
          node: (
            <MoleculeCard title="OrgChart" index={8}>
              <OrgChart
                title="Engineering"
                nodes={[
                  {
                    name: 'Maya Patel',
                    role: 'VP Engineering',
                    children: [
                      { name: 'Liam Nguyen', role: 'Tech Lead' },
                      {
                        name: 'Sofia Ruiz',
                        role: 'Engineering Manager',
                        children: [
                          { name: 'Tom Lee', role: 'Engineer' },
                          { name: 'Ana Diaz', role: 'Engineer' },
                        ],
                      },
                    ],
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PayrollSummary',
          node: (
            <MoleculeCard title="PayrollSummary" index={9}>
              <PayrollSummary
                period="Aug 1 – Aug 15"
                gross={5200}
                net={3960}
                bonus={250}
                taxes={1040}
                deductions={450}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PerformanceCard',
          node: (
            <MoleculeCard title="PerformanceCard" index={10}>
              <PerformanceCard
                employee="Alex Rivera"
                period="Q2 2026"
                score={87}
                rating="Exceeds"
                highlights={[
                  'Shipped design system v2',
                  'Led 3 usability studies',
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PolicyCard',
          node: (
            <MoleculeCard title="PolicyCard" index={11}>
              <PolicyCard
                title="Remote work policy"
                summary="Guidelines for hybrid and fully remote work arrangements."
                version="2.1"
                updatedAt="Jul 30, 2026"
                category="Workplace"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'RecruitmentCard',
          node: (
            <MoleculeCard title="RecruitmentCard" index={12}>
              <RecruitmentCard
                title="Engineering hiring"
                applicants={42}
                hired={6}
                openRoles={4}
                department="Engineering"
                deadline="Aug 31"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TeamSummary',
          node: (
            <MoleculeCard title="TeamSummary" index={13}>
              <TeamSummary
                name="Growth"
                size={12}
                openRoles={2}
                location="Hybrid · SF"
                manager="Maya Patel"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TimesheetRow',
          node: (
            <MoleculeCard title="TimesheetRow" index={14}>
              <div className="flex w-full flex-col gap-2">
                <TimesheetRow
                  day="Monday"
                  project="Design system"
                  hours={7}
                  overtime={1}
                  status="approved"
                />
                <TimesheetRow
                  day="Tuesday"
                  project="Design system"
                  hours={8}
                  status="pending"
                />
                <TimesheetRow
                  day="Wednesday"
                  project="Support"
                  hours={6}
                  status="rejected"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'TrainingCard',
          node: (
            <MoleculeCard title="TrainingCard" index={15}>
              <TrainingCard
                title="Inclusive leadership"
                provider="HR Academy"
                date="Aug 20"
                duration="2 hours"
                status="upcoming"
                category="Leadership"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'landing',
      tiles: [
        {
          title: 'AwardCard',
          node: (
            <MoleculeCard title="AwardCard" index={0}>
              <AwardCard
                title="Product of the Year"
                organization="Tech Awards"
                year="2025"
                description="Recognized for outstanding developer experience and accessibility."
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'BlogTeaser',
          node: (
            <MoleculeCard title="BlogTeaser" index={1}>
              <BlogTeaser
                title="Announcing our 2026 roadmap"
                excerpt="A look at the features and improvements we are shipping this year."
                date="Aug 1, 2026"
                author="Maya Patel"
                tags={['product', 'roadmap']}
                readTime="4 min"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ClientLogo',
          node: (
            <MoleculeCard title="ClientLogo" index={2}>
              <div className="flex w-full flex-wrap items-center justify-around gap-3">
                <ClientLogo name="Acme" url="#" />
                <ClientLogo name="Globex" url="#" />
                <ClientLogo name="Initech" />
                <ClientLogo name="Umbrella" />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'ContactForm',
          node: (
            <MoleculeCard title="ContactForm" index={3}>
              <ContactForm title="Get in touch" />
            </MoleculeCard>
          ),
        },
        {
          title: 'CtaBanner',
          node: (
            <MoleculeCard title="CtaBanner" index={4}>
              <CtaBanner
                title="Ready to get started?"
                description="Join thousands of teams shipping faster with our platform."
                primaryLabel="Start free trial"
                secondaryLabel="Talk to sales"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FAQItem',
          node: (
            <MoleculeCard title="FAQItem" index={5}>
              <div className="flex w-full flex-col gap-2">
                <FAQItem
                  question="How does pricing work?"
                  answer="You pay a flat monthly rate per active workspace. No hidden fees."
                  defaultOpen
                />
                <FAQItem
                  question="Can I cancel anytime?"
                  answer="Yes, you can cancel your subscription at any time from settings."
                />
                <FAQItem
                  question="Do you offer discounts?"
                  answer="We offer annual plans at 20% off and nonprofit pricing."
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'HeroSection',
          node: (
            <MoleculeCard title="HeroSection" index={6}>
              <HeroSection
                badge="New · v3.0"
                title="Build better products, faster"
                subtitle="A complete component library designed for modern web applications."
                primaryLabel="Get started"
                secondaryLabel="View docs"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MilestoneCard',
          node: (
            <MoleculeCard title="MilestoneCard" index={7}>
              <MilestoneCard
                year="2024"
                title="10,000 developers"
                description="Reached ten thousand registered developers on the platform."
                category="Community"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PartnersRow',
          node: (
            <MoleculeCard title="PartnersRow" index={8}>
              <PartnersRow
                partners={[
                  'Acme',
                  'Globex',
                  'Initech',
                  'Umbrella',
                  'Stark',
                  'Wayne',
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PlanCard',
          node: (
            <MoleculeCard title="PlanCard" index={9}>
              <PlanCard
                name="Pro"
                price="$29"
                period="/month"
                features={[
                  'Unlimited projects',
                  'Team collaboration',
                  'Priority support',
                ]}
                cta="Choose plan"
                recommended
                note="Most popular"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PricingCard',
          node: (
            <MoleculeCard title="PricingCard" index={10}>
              <PricingCard
                name="Enterprise"
                price="$99"
                period="/mo"
                features={[
                  'Unlimited everything',
                  'SSO & audit logs',
                  'Dedicated success manager',
                ]}
                highlighted
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ProcessStep',
          node: (
            <MoleculeCard title="ProcessStep" index={11}>
              <div className="flex w-full flex-wrap items-start justify-around gap-4">
                <ProcessStep
                  step={1}
                  title="Discover"
                  description="Tell us about your goals and current setup."
                  icon="🔍"
                />
                <ProcessStep
                  step={2}
                  title="Plan"
                  description="We craft a tailored roadmap together."
                  icon="📋"
                />
                <ProcessStep
                  step={3}
                  title="Launch"
                  description="Ship, measure, and iterate with our team."
                  icon="🚀"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'ServiceCard',
          node: (
            <MoleculeCard title="ServiceCard" index={12}>
              <ServiceCard
                title="Web development"
                description="Fast, accessible, and maintainable web apps built to last."
                icon="⚡"
                features={[
                  'Next.js & TypeScript',
                  'Design systems',
                  'Performance audits',
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StatHighlight',
          node: (
            <MoleculeCard title="StatHighlight" index={13}>
              <div className="grid w-full grid-cols-2 gap-3">
                <StatHighlight
                  label="Customers"
                  value="12k"
                  delta="+18%"
                  icon="👥"
                />
                <StatHighlight label="Uptime" value="99.9%" icon="📈" />
                <StatHighlight label="NPS" value="72" delta="+6" icon="💬" />
                <StatHighlight
                  label="Churn"
                  value="1.2%"
                  delta="+0.3%"
                  positive={false}
                  icon="⚠️"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'TeamMemberCard',
          node: (
            <MoleculeCard title="TeamMemberCard" index={14}>
              <TeamMemberCard
                name="Jane Cooper"
                role="CEO"
                bio="Jane founded the company in 2019 with a mission to simplify software delivery."
                initials="JC"
                socials={[
                  { label: 'LinkedIn', href: '#' },
                  { label: 'X', href: '#' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TestimonialCard',
          node: (
            <MoleculeCard title="TestimonialCard" index={15}>
              <TestimonialCard
                quote="The best investment our engineering team has made this year."
                author="Sarah Kim"
                role="VP Engineering"
                company="Acme"
                rating={5}
                initials="SK"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'mail',
      tiles: [
        {
          title: 'AttachmentList',
          node: (
            <MoleculeCard title="AttachmentList" index={0}>
              <AttachmentList
                attachments={[
                  {
                    id: '1',
                    name: 'quarterly-report.pdf',
                    size: '2.4 MB',
                    kind: 'PDF',
                  },
                  {
                    id: '2',
                    name: 'signature.png',
                    size: '180 KB',
                    kind: 'PNG',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ComposeForm',
          node: (
            <MoleculeCard title="ComposeForm" index={1}>
              <ComposeForm defaultSubject="Follow-up meeting" />
            </MoleculeCard>
          ),
        },
        {
          title: 'DraftItem',
          node: (
            <MoleculeCard title="DraftItem" index={2}>
              <DraftItem
                to="alex@company.com"
                subject="Updated proposal"
                preview="As discussed, here are the revised numbers..."
                updatedAt="2h"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'EmailRow',
          node: (
            <MoleculeCard title="EmailRow" index={3}>
              <EmailRow
                from="Maya Patel"
                subject="Quarterly review"
                preview="Attaching the updated deck for your feedback."
                time="10:42"
                unread
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FolderItem',
          node: (
            <MoleculeCard title="FolderItem" index={4}>
              <div className="flex w-full flex-col gap-1">
                <FolderItem label="Inbox" count={12} active />
                <FolderItem label="Starred" icon="★" />
                <FolderItem label="Sent" count={3} />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'InboxTable',
          node: (
            <MoleculeCard title="InboxTable" index={5}>
              <InboxTable
                emails={[
                  {
                    id: '1',
                    from: 'Hugo Silva',
                    subject: 'Onboarding steps',
                    preview: 'Here is everything you need to get started.',
                    time: '09:12',
                  },
                  {
                    id: '2',
                    from: 'Team Newsletter',
                    subject: 'August digest',
                    preview: 'The best of what we shipped this month.',
                    time: 'Yesterday',
                    unread: true,
                  },
                  {
                    id: '3',
                    from: 'Finance',
                    subject: 'Invoice #4821',
                    preview: 'Your invoice is ready for download.',
                    time: 'Mon',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LabelBadges',
          node: (
            <MoleculeCard title="LabelBadges" index={6}>
              <LabelBadges
                labels={['work', 'invoice', 'important', 'projects']}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LoadingOverlay',
          node: (
            <MoleculeCard title="LoadingOverlay" index={7}>
              <LoadingOverlay open label="Syncing mailbox" />
            </MoleculeCard>
          ),
        },
        {
          title: 'MessageThread',
          node: (
            <MoleculeCard title="MessageThread" index={8}>
              <MessageThread
                subject="Design handoff"
                messages={[
                  {
                    id: '1',
                    author: 'Aisha Khan',
                    time: '9:15',
                    body: 'The new mockups are ready for review.',
                  },
                  {
                    id: '2',
                    author: 'Ben Ortiz',
                    time: '9:48',
                    body: 'Thanks! I left a few comments on the spacing.',
                  },
                  {
                    id: '3',
                    author: 'Aisha Khan',
                    time: '10:02',
                    body: 'Perfect, I will address them today.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'NavItem',
          node: (
            <MoleculeCard title="NavItem" index={9}>
              <ul className="w-full space-y-1">
                <NavItem label="Inbox" href="#" badge="12" active />
                <NavItem label="Sent" href="#" icon="📤" />
                <NavItem label="Archive" href="#" icon="🗄️" />
              </ul>
            </MoleculeCard>
          ),
        },
        {
          title: 'ReplyForm',
          node: (
            <MoleculeCard title="ReplyForm" index={10}>
              <ReplyForm to="Maya Patel" subject="Quarterly review" />
            </MoleculeCard>
          ),
        },
        {
          title: 'SearchResults',
          node: (
            <MoleculeCard title="SearchResults" index={11}>
              <SearchResults
                query="invoice"
                results={[
                  {
                    id: '1',
                    from: 'Finance',
                    subject: 'Invoice #4821',
                    preview: 'Your invoice is ready for download.',
                  },
                  {
                    id: '2',
                    from: 'Payroll',
                    subject: 'Invoice settings',
                    preview: 'Manage your billing details here.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SentItem',
          node: (
            <MoleculeCard title="SentItem" index={12}>
              <SentItem
                to="client@company.com"
                subject="Contract signing"
                preview="Please review and sign at your convenience."
                time="11:30"
                status="delivered"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SignatureCard',
          node: (
            <MoleculeCard title="SignatureCard" index={13}>
              <SignatureCard
                name="Jordan Lee"
                role="Product Manager"
                company="Acme Inc."
                email="jordan@acme.io"
                phone="+1 555 0100"
                website="acme.io"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SpamItem',
          node: (
            <MoleculeCard title="SpamItem" index={14}>
              <SpamItem
                from="noreply@promo.example"
                subject="You have won a prize!"
                preview="Claim your exclusive offer before midnight."
                time="08:05"
                flagged
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TrashItem',
          node: (
            <MoleculeCard title="TrashItem" index={15}>
              <TrashItem
                from="Old Boss"
                subject="Outdated thread"
                preview="This thread is no longer needed."
                time="Jul 30"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'media',
      tiles: [
        {
          title: 'AlbumCard',
          node: (
            <MoleculeCard title="AlbumCard" index={0}>
              <AlbumCard
                title="Midnight Drive"
                artist="Neon Sky"
                year="2025"
                trackCount={12}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'AlbumTracks',
          node: (
            <MoleculeCard title="AlbumTracks" index={1}>
              <AlbumTracks
                album="Midnight Drive"
                artist="Neon Sky"
                currentId="2"
                tracks={[
                  { id: '1', title: 'City Lights', duration: '3:45' },
                  { id: '2', title: 'Neon Heart', duration: '4:12' },
                  { id: '3', title: 'Takeoff', duration: '3:02' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ArtistCard',
          node: (
            <MoleculeCard title="ArtistCard" index={2}>
              <ArtistCard name="Neon Sky" followers="1.2M" verified />
            </MoleculeCard>
          ),
        },
        {
          title: 'EpisodeCard',
          node: (
            <MoleculeCard title="EpisodeCard" index={3}>
              <EpisodeCard
                title="Shipping software with confidence"
                show="Dev Talk"
                duration="42 min"
                publishedAt="Aug 5"
                progress={65}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LyricsView',
          node: (
            <MoleculeCard title="LyricsView" index={4}>
              <LyricsView
                activeLine={2}
                lines={[
                  'Under neon skies',
                  'we chase the fading light',
                  'a hundred stories left to write',
                  'keep running through the night',
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MoodBoard',
          node: (
            <MoleculeCard title="MoodBoard" index={5}>
              <MoodBoard
                selectedId="chill"
                moods={[
                  { id: 'focus', label: 'Focus', emoji: '🎯' },
                  { id: 'chill', label: 'Chill', emoji: '🌙' },
                  { id: 'party', label: 'Party', emoji: '🎉' },
                  { id: 'gym', label: 'Workout', emoji: '🏋️' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'NowPlayingBar',
          node: (
            <MoleculeCard title="NowPlayingBar" index={6}>
              <NowPlayingBar
                title="Neon Heart"
                artist="Neon Sky"
                progress={40}
                playing
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PlaylistCard',
          node: (
            <MoleculeCard title="PlaylistCard" index={7}>
              <PlaylistCard
                title="Morning Focus"
                trackCount={28}
                author="Neon Sky"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PodcastCard',
          node: (
            <MoleculeCard title="PodcastCard" index={8}>
              <PodcastCard title="Dev Talk" host="Maya Patel" episodes={120} />
            </MoleculeCard>
          ),
        },
        {
          title: 'QueueList',
          node: (
            <MoleculeCard title="QueueList" index={9}>
              <QueueList
                currentId="1"
                tracks={[
                  {
                    id: '1',
                    title: 'Neon Heart',
                    artist: 'Neon Sky',
                    duration: '4:12',
                  },
                  {
                    id: '2',
                    title: 'Golden Hour',
                    artist: 'Aurora',
                    duration: '3:30',
                  },
                  {
                    id: '3',
                    title: 'Silent Waves',
                    artist: 'Calm & Co.',
                    duration: '5:01',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'RadioStation',
          node: (
            <MoleculeCard title="RadioStation" index={10}>
              <RadioStation
                name="Synthwave FM"
                genre="Electronic"
                frequency="104.7"
                listeners={18432}
                live
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'RecentlyPlayed',
          node: (
            <MoleculeCard title="RecentlyPlayed" index={11}>
              <RecentlyPlayed
                items={[
                  {
                    id: '1',
                    title: 'Neon Heart',
                    artist: 'Neon Sky',
                    playedAt: '2h ago',
                  },
                  {
                    id: '2',
                    title: 'Golden Hour',
                    artist: 'Aurora',
                    playedAt: 'Yesterday',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SimilarArtists',
          node: (
            <MoleculeCard title="SimilarArtists" index={12}>
              <SimilarArtists
                artists={[
                  { id: '1', name: 'Aurora', followers: '890K' },
                  { id: '2', name: 'Calm & Co.', followers: '450K' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StreamCard',
          node: (
            <MoleculeCard title="StreamCard" index={13}>
              <StreamCard
                title="Nightly synthwave sets"
                platform="Twitch"
                status="live"
                viewers={3421}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TrackRow',
          node: (
            <MoleculeCard title="TrackRow" index={14}>
              <TrackRow
                title="Neon Heart"
                artist="Neon Sky"
                duration="4:12"
                index={2}
                playing
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'VideoCard',
          node: (
            <MoleculeCard title="VideoCard" index={15}>
              <VideoCard
                title="How we rebuilt our design system"
                channel="Maya Patel"
                views="128K"
                duration="12:48"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'news',
      tiles: [
        {
          title: 'AnalysisCard',
          node: (
            <MoleculeCard title="AnalysisCard" index={0}>
              <AnalysisCard
                title="Markets rally on rate cut expectations"
                author="Leo Martinez"
                time="12 min ago"
                summary="Investors pushed equities higher after the central bank signalled looser policy."
                tags={['markets', 'economy']}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ArticleList',
          node: (
            <MoleculeCard title="ArticleList" index={1}>
              <ArticleList
                title="Latest stories"
                articles={[
                  {
                    id: '1',
                    title: 'Cities embrace greener transit',
                    section: 'Cities',
                    excerpt:
                      'New electric bus fleets rolling out across five metros.',
                  },
                  {
                    id: '2',
                    title: 'A field guide to night markets',
                    section: 'Culture',
                    excerpt: 'Where to eat and what to try this summer.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'BreakingNews',
          node: (
            <MoleculeCard title="BreakingNews" index={2}>
              <BreakingNews
                headline="Blizzard warning issued for the northern coast"
                live
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CategoryNav',
          node: (
            <MoleculeCard title="CategoryNav" index={3}>
              <CategoryNav
                categories={['World', 'Politics', 'Business', 'Tech', 'Sports']}
                active="Business"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CultureCard',
          node: (
            <MoleculeCard title="CultureCard" index={4}>
              <CultureCard
                title="The quiet renaissance of vinyl"
                author="Nina Okafor"
                date="Aug 6, 2026"
                excerpt="Record stores are thriving as a new generation rediscovers analog."
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'EditorialCard',
          node: (
            <MoleculeCard title="EditorialCard" index={5}>
              <EditorialCard
                title="We need faster grid infrastructure"
                author="Editorial board"
                date="Aug 7, 2026"
                excerpt="Renewable energy is only as good as the grid that carries it."
                stance="support"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'HeadlineRow',
          node: (
            <MoleculeCard title="HeadlineRow" index={6}>
              <div className="w-full">
                <HeadlineRow
                  title="Tech earnings beat expectations"
                  section="Business"
                  time="2h ago"
                  rank={1}
                />
                <HeadlineRow
                  title="New telescope captures distant galaxy"
                  section="Science"
                  time="4h ago"
                  rank={2}
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'LiveUpdate',
          node: (
            <MoleculeCard title="LiveUpdate" index={7}>
              <LiveUpdate
                title="Election night"
                updates={[
                  {
                    id: '1',
                    time: '10:02',
                    content: 'First results are in for the north district.',
                  },
                  {
                    id: '2',
                    time: '10:15',
                    content: 'Turnout tracking higher than last cycle.',
                  },
                  {
                    id: '3',
                    time: '10:31',
                    content: 'East region counts continue steadily.',
                  },
                  {
                    id: '4',
                    time: '10:48',
                    content: 'Projections to follow after the next batch.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MarketIndex',
          node: (
            <MoleculeCard title="MarketIndex" index={8}>
              <div className="divide-base-300 flex w-full flex-col divide-y">
                <MarketIndex
                  name="S&P 500"
                  value={5548}
                  change={42.1}
                  changePercent={0.76}
                />
                <MarketIndex
                  name="NASDAQ"
                  value={18240}
                  change={-18.3}
                  changePercent={-0.1}
                />
                <MarketIndex
                  name="DOW"
                  value={41290}
                  change={101.5}
                  changePercent={0.25}
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'OpinionColumn',
          node: (
            <MoleculeCard title="OpinionColumn" index={9}>
              <OpinionColumn
                columnists={[
                  {
                    id: '1',
                    name: 'Amara Chen',
                    headline: 'The case for four-day workweeks',
                    excerpt:
                      'Shorter weeks can boost both well-being and output.',
                  },
                  {
                    id: '2',
                    name: 'Tom Rivera',
                    headline: 'What the river teaches us',
                    excerpt: 'An essay on resilience and renewal.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PhotoStory',
          node: (
            <MoleculeCard title="PhotoStory" index={10}>
              <PhotoStory
                title="Life above the clouds"
                caption="Trekking through the high Andes at dawn."
                photographer="Sofia Ruiz"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ScoreBoard',
          node: (
            <MoleculeCard title="ScoreBoard" index={11}>
              <ScoreBoard
                home={{ name: 'Hawks', score: 84 }}
                away={{ name: 'Falcons', score: 79 }}
                period="Q4 · 02:14"
                status="Live"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SportsScoreCard',
          node: (
            <MoleculeCard title="SportsScoreCard" index={12}>
              <SportsScoreCard
                sport="Basketball"
                home={{ name: 'Hawks', score: 84 }}
                away={{ name: 'Falcons', score: 79 }}
                status="Final"
                period="Full time"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TrendingList',
          node: (
            <MoleculeCard title="TrendingList" index={13}>
              <TrendingList
                items={[
                  { id: '1', title: 'Autumn travel deals', count: '12K posts' },
                  {
                    id: '2',
                    title: 'City marathon results',
                    count: '8K posts',
                  },
                  { id: '3', title: 'New album drops', count: '6K posts' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'VideoStory',
          node: (
            <MoleculeCard title="VideoStory" index={14}>
              <VideoStory
                title="Diving the Great Barrier Reef in 4K"
                duration="6:24"
                channel="Explore"
                views="204K"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WeatherCard',
          node: (
            <MoleculeCard title="WeatherCard" index={15}>
              <WeatherCard
                city="San Francisco"
                temperature={18}
                condition="Partly cloudy"
                high={21}
                low={13}
                humidity={68}
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'social',
      tiles: [
        {
          title: 'Backdrop',
          node: (
            <MoleculeCard title="Backdrop" index={0}>
              <Button size="sm" onClick={() => setBackdropOpen(true)}>
                Open backdrop
              </Button>
              <Backdrop
                open={backdropOpen}
                onClose={() => setBackdropOpen(false)}>
                <div className="card bg-base-100 p-6 shadow-xl">
                  <p className="text-sm">
                    A modal-like panel rendered over the backdrop.
                  </p>
                  <Button
                    size="sm"
                    className="mt-4"
                    onClick={() => setBackdropOpen(false)}>
                    Close
                  </Button>
                </div>
              </Backdrop>
            </MoleculeCard>
          ),
        },
        {
          title: 'BottomNavigation',
          node: (
            <MoleculeCard title="BottomNavigation" index={1}>
              <BottomNavigation
                value={bottomNav}
                onChange={setBottomNav}
                items={[
                  { label: 'Home', icon: <FiHome />, value: 'home' },
                  { label: 'Search', icon: <FiSearch />, value: 'search' },
                  { label: 'Mail', icon: <FiMail />, value: 'mail' },
                  { label: 'Profile', icon: <FiUser />, value: 'profile' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CommentList',
          node: (
            <MoleculeCard title="CommentList" index={2}>
              <CommentList
                comments={[
                  {
                    id: '1',
                    author: 'Aisha Khan',
                    content: 'This is such a helpful write-up, thank you!',
                    time: '2h',
                    likes: 14,
                  },
                  {
                    id: '2',
                    author: 'Ben Ortiz',
                    content: 'Agreed, especially the section on hooks.',
                    time: '1h',
                    likes: 6,
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'EventCard',
          node: (
            <MoleculeCard title="EventCard" index={3}>
              <EventCard
                title="Design systems meetup"
                date="Sat, Aug 22, 2026"
                location="Riverside Hall"
                attendees={48}
                price="Free"
                month="Aug"
                day={22}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FloatingActionButton',
          node: (
            <MoleculeCard title="FloatingActionButton" index={4}>
              <FloatingActionButton icon={<FiPlus />} label="Create post" />
            </MoleculeCard>
          ),
        },
        {
          title: 'FriendRequest',
          node: (
            <MoleculeCard title="FriendRequest" index={5}>
              <FriendRequest name="Priya Nair" mutual={12} />
            </MoleculeCard>
          ),
        },
        {
          title: 'GroupCard',
          node: (
            <MoleculeCard title="GroupCard" index={6}>
              <GroupCard
                name="Frontend Folks"
                members={1240}
                description="A friendly community for web developers."
                category="Tech"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LikeButton',
          node: (
            <MoleculeCard title="LikeButton" index={7}>
              <LikeButton count={128} label="Likes" />
            </MoleculeCard>
          ),
        },
        {
          title: 'MessagePreview',
          node: (
            <MoleculeCard title="MessagePreview" index={8}>
              <div className="divide-base-300 flex w-full flex-col divide-y">
                <MessagePreview
                  name="Leo Martinez"
                  preview="Can we sync on the roadmap tomorrow?"
                  time="9:12"
                  unread={2}
                />
                <MessagePreview
                  name="Sofia Ruiz"
                  preview="Sent you the final illustrations."
                  time="Yesterday"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'NotificationItem',
          node: (
            <MoleculeCard title="NotificationItem" index={9}>
              <div className="divide-base-300 flex w-full flex-col divide-y">
                <NotificationItem
                  message="Aisha Khan liked your post"
                  time="12 min"
                  type="like"
                />
                <NotificationItem
                  message="Ben Ortiz commented on your photo"
                  time="1h"
                  type="comment"
                  read
                />
                <NotificationItem
                  message="Priya Nair started following you"
                  time="3h"
                  type="follow"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'PostCard',
          node: (
            <MoleculeCard title="PostCard" index={10}>
              <PostCard
                author="Maya Patel"
                content="Shipped a redesigned dashboard today. The feedback loop is much tighter now."
                likes={204}
                comments={18}
                shares={9}
                time="2h"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ProfileHeader',
          node: (
            <MoleculeCard title="ProfileHeader" index={11}>
              <ProfileHeader
                name="Maya Patel"
                handle="mayapatel"
                bio="Designer & developer. Building calm software."
                followers={12400}
                following={320}
                isVerified
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ReactionPicker',
          node: (
            <MoleculeCard title="ReactionPicker" index={12}>
              <ReactionPicker />
            </MoleculeCard>
          ),
        },
        {
          title: 'ShareRow',
          node: (
            <MoleculeCard title="ShareRow" index={13}>
              <ShareRow shares={24} />
            </MoleculeCard>
          ),
        },
        {
          title: 'StoryStrip',
          node: (
            <MoleculeCard title="StoryStrip" index={14}>
              <StoryStrip
                stories={[
                  { id: '1', name: 'Aisha' },
                  { id: '2', name: 'Ben' },
                  { id: '3', name: 'Priya' },
                  { id: '4', name: 'Leo' },
                  { id: '5', name: 'Sofia' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SuggestionCard',
          node: (
            <MoleculeCard title="SuggestionCard" index={15}>
              <SuggestionCard
                name="Elena Garcia"
                handle="elenag"
                reason="Followed by Maya"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'store',
      tiles: [
        {
          title: 'BundleCard',
          node: (
            <MoleculeCard title="BundleCard" index={0}>
              <BundleCard
                title="Starter kit"
                items={['Wireless earbuds', 'Travel pouch', 'USB-C cable']}
                price={49.99}
                originalPrice={79.99}
                badge="Save 37%"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CartItem',
          node: (
            <MoleculeCard title="CartItem" index={1}>
              <CartItem
                name="Mechanical keyboard"
                price={129.0}
                quantity={cartQty}
                onQuantityChange={setCartQty}
                imageLabel="KB"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CategoryCard',
          node: (
            <MoleculeCard title="CategoryCard" index={2}>
              <div className="grid w-full grid-cols-2 gap-3">
                <CategoryCard name="Audio" productCount={42} imageLabel="🎧" />
                <CategoryCard
                  name="Wearables"
                  productCount={27}
                  imageLabel="⌚"
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'CheckoutSummary',
          node: (
            <MoleculeCard title="CheckoutSummary" index={3}>
              <CheckoutSummary
                subtotal={129.0}
                shipping={6.99}
                tax={10.83}
                discount={15.0}
                total={131.82}
                itemCount={2}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ColorSwatch',
          node: (
            <MoleculeCard title="ColorSwatch" index={4}>
              <ColorSwatch
                selected="Navy"
                colors={[
                  { name: 'Navy', value: '#1e3a5f' },
                  { name: 'Forest', value: '#2f6f4f' },
                  { name: 'Burgundy', value: '#8a2b2b' },
                  { name: 'Slate', value: '#475569' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CompareTable',
          node: (
            <MoleculeCard title="CompareTable" index={5}>
              <CompareTable
                products={['Basic', 'Pro']}
                rows={[
                  { label: 'Seats', values: [5, 20] },
                  { label: 'Support', values: ['Email', 'Priority'] },
                  { label: 'SSO', values: ['No', 'Yes'] },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'CouponBox',
          node: (
            <MoleculeCard title="CouponBox" index={6}>
              <CouponBox
                onApply={(code) => setQuery(code)}
                placeholder="SAVE20"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'OrderSummary',
          node: (
            <MoleculeCard title="OrderSummary" index={7}>
              <OrderSummary
                orderNumber="#4821"
                status="shipped"
                placedAt="Aug 4, 2026"
                paymentMethod="Visa ···· 4242"
                itemCount={3}
                total={159.97}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ProductCard',
          node: (
            <MoleculeCard title="ProductCard" index={8}>
              <ProductCard
                name="Ceramic travel mug"
                price={24.99}
                rating={4.7}
                reviews={312}
                badge="Best seller"
                imageLabel="☕"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ProductRow',
          node: (
            <MoleculeCard title="ProductRow" index={9}>
              <div className="flex w-full flex-col">
                <ProductRow
                  name="Canvas tote"
                  price={18.0}
                  sku="TOT-201"
                  category="Bags"
                />
                <ProductRow
                  name="Hiking backpack"
                  price={89.99}
                  sku="BAG-118"
                  category="Bags"
                  inStock={false}
                />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'ShippingInfo',
          node: (
            <MoleculeCard title="ShippingInfo" index={10}>
              <ShippingInfo
                method="Express delivery"
                eta="Arrives tomorrow by 8 PM"
                cost={9.99}
                carrier="FastPost"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SizePicker',
          node: (
            <MoleculeCard title="SizePicker" index={11}>
              <SizePicker
                sizes={['XS', 'S', 'M', 'L', 'XL']}
                defaultSelected="M"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StockBadge',
          node: (
            <MoleculeCard title="StockBadge" index={12}>
              <div className="flex w-full flex-col gap-2">
                <StockBadge status="in-stock" quantity={23} />
                <StockBadge status="low-stock" quantity={3} />
                <StockBadge status="out-of-stock" />
              </div>
            </MoleculeCard>
          ),
        },
        {
          title: 'StoreCard',
          node: (
            <MoleculeCard title="StoreCard" index={13}>
              <StoreCard
                name="Green & Co."
                rating={4.8}
                reviewCount={1052}
                deliveryTime="20–30 min"
                category="Organic"
                logoLabel="G"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'StoreReviewCard',
          node: (
            <MoleculeCard title="StoreReviewCard" index={14}>
              <StoreReviewCard
                author="Alex Rivera"
                rating={5}
                comment="Great quality and fast shipping. Highly recommend."
                date="Aug 2, 2026"
                verified
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WishlistItem',
          node: (
            <MoleculeCard title="WishlistItem" index={15}>
              <WishlistItem
                name="Noise-cancelling headphones"
                price={249.0}
                addedDate="Jul 28"
              />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'support',
      tiles: [
        {
          title: 'Accordion',
          node: (
            <MoleculeCard title="Accordion" index={0}>
              <Accordion
                items={[
                  {
                    id: 'billing',
                    title: 'How does billing work?',
                    content:
                      'You are billed monthly per active workspace. No hidden fees.',
                  },
                  {
                    id: 'cancel',
                    title: 'Can I cancel anytime?',
                    content: 'Yes, you can cancel from settings at any moment.',
                  },
                  {
                    id: 'refund',
                    title: 'What is the refund policy?',
                    content: 'Full refunds within 14 days of purchase.',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Breadcrumbs',
          node: (
            <MoleculeCard title="Breadcrumbs" index={1}>
              <Breadcrumbs
                items={[
                  { label: 'Home', href: '#' },
                  { label: 'Settings', href: '#' },
                  { label: 'Profile' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Card',
          node: (
            <MoleculeCard title="Card" index={2}>
              <Card
                title="Account overview"
                description="Your workspace at a glance."
                action={
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                }>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-base-200 rounded-lg p-3">
                    <p className="text-base-content/50">Seats</p>
                    <p className="font-semibold">12 / 20</p>
                  </div>
                  <div className="bg-base-200 rounded-lg p-3">
                    <p className="text-base-content/50">Plan</p>
                    <p className="font-semibold">Pro</p>
                  </div>
                </div>
              </Card>
            </MoleculeCard>
          ),
        },
        {
          title: 'Dialog',
          node: (
            <MoleculeCard title="Dialog" index={3}>
              <Button size="sm" onClick={() => setDialogOpen(true)}>
                Open dialog
              </Button>
              <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                title="Delete workspace?"
                description="This action cannot be undone."
                footer={
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" onClick={() => setDialogOpen(false)}>
                      Delete
                    </Button>
                  </>
                }>
                <p className="text-sm">
                  All projects, members, and settings will be permanently
                  removed.
                </p>
              </Dialog>
            </MoleculeCard>
          ),
        },
        {
          title: 'Drawer',
          node: (
            <MoleculeCard title="Drawer" index={4}>
              <Button size="sm" onClick={() => setDrawerOpen(true)}>
                Open drawer
              </Button>
              <Drawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                title="Filters"
                side="right"
                footer={
                  <Button size="sm" onClick={() => setDrawerOpen(false)}>
                    Apply
                  </Button>
                }>
                <ul className="flex flex-col gap-3 text-sm">
                  <li>Status</li>
                  <li>Assignee</li>
                  <li>Date range</li>
                  <li>Labels</li>
                </ul>
              </Drawer>
            </MoleculeCard>
          ),
        },
        {
          title: 'List',
          node: (
            <MoleculeCard title="List" index={5}>
              <List
                title="Recent files"
                items={[
                  {
                    id: '1',
                    title: 'quarterly-report.pdf',
                    description: 'PDF · 2.4 MB',
                    leading: <FiCheck className="text-success" />,
                  },
                  {
                    id: '2',
                    title: 'roadmap-2026.md',
                    description: 'Markdown · 18 KB',
                    leading: <FiEdit2 className="text-base-content/50" />,
                  },
                  {
                    id: '3',
                    title: 'design-spec.fig',
                    description: 'Figma · 6.1 MB',
                    leading: <FiCopy className="text-base-content/50" />,
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Masonry',
          node: (
            <MoleculeCard title="Masonry" index={6}>
              <Masonry
                columns={2}
                gap="sm"
                items={[
                  <div key="a" className="bg-primary/10 rounded-lg p-4 text-sm">
                    Card A
                  </div>,
                  <div
                    key="b"
                    className="bg-secondary/10 rounded-lg p-8 text-sm">
                    Card B
                  </div>,
                  <div key="c" className="bg-accent/10 rounded-lg p-5 text-sm">
                    Card C
                  </div>,
                  <div key="d" className="bg-base-200 rounded-lg p-10 text-sm">
                    Card D
                  </div>,
                  <div key="e" className="bg-warning/10 rounded-lg p-3 text-sm">
                    Card E
                  </div>,
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MenuGroup',
          node: (
            <MoleculeCard title="MenuGroup" index={7}>
              <MenuGroup
                sections={[
                  {
                    id: 'general',
                    title: 'General',
                    items: [
                      {
                        id: 'profile',
                        label: 'Profile',
                        icon: <FiUser />,
                        active: true,
                      },
                      {
                        id: 'notifications',
                        label: 'Notifications',
                        icon: <FiBell />,
                      },
                    ],
                  },
                  {
                    id: 'workspace',
                    title: 'Workspace',
                    items: [
                      { id: 'members', label: 'Members', icon: <FiHome /> },
                      { id: 'billing', label: 'Billing', icon: <FiMail /> },
                    ],
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Modal',
          node: (
            <MoleculeCard title="Modal" index={8}>
              <Button size="sm" onClick={() => setOverlayOpen(true)}>
                Open modal
              </Button>
              <Modal
                open={overlayOpen}
                onClose={() => setOverlayOpen(false)}
                title="Confirm action"
                action={
                  <Button size="sm" onClick={() => setOverlayOpen(false)}>
                    Got it
                  </Button>
                }>
                <p className="text-sm">
                  This will finalize your current selection. Continue?
                </p>
              </Modal>
            </MoleculeCard>
          ),
        },
        {
          title: 'Popover',
          node: (
            <MoleculeCard title="Popover" index={9}>
              <Popover trigger={<Button size="sm">More details</Button>}>
                <div className="flex flex-col gap-2 text-sm">
                  <p className="font-medium">Quick actions</p>
                  <Button size="sm" variant="ghost" className="justify-start">
                    Duplicate
                  </Button>
                  <Button size="sm" variant="ghost" className="justify-start">
                    Move to
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-error justify-start">
                    Delete
                  </Button>
                </div>
              </Popover>
            </MoleculeCard>
          ),
        },
        {
          title: 'ScrollArea',
          node: (
            <MoleculeCard title="ScrollArea" index={10}>
              <ScrollArea maxHeight={140}>
                <ul className="flex flex-col gap-3 text-sm">
                  {Array.from({ length: 12 }, (_, index) => (
                    <li key={index} className="bg-base-200 rounded-lg p-3">
                      Notification item {index + 1}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </MoleculeCard>
          ),
        },
        {
          title: 'Sheet',
          node: (
            <MoleculeCard title="Sheet" index={11}>
              <Button size="sm" onClick={() => setSheetOpen(true)}>
                Open sheet
              </Button>
              <Sheet
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                title="Create report"
                side="right"
                footer={
                  <Button size="sm" onClick={() => setSheetOpen(false)}>
                    Generate
                  </Button>
                }>
                <p className="text-sm">
                  Choose a time range and the metrics to include in your report.
                </p>
              </Sheet>
            </MoleculeCard>
          ),
        },
        {
          title: 'Steps',
          node: (
            <MoleculeCard title="Steps" index={12}>
              <Steps
                current={2}
                steps={[
                  { label: 'Account', description: 'Create your account' },
                  { label: 'Team', description: 'Invite your team' },
                  { label: 'Launch', description: 'Go live' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Table',
          node: (
            <MoleculeCard title="Table" index={13}>
              <Table
                caption="Team members"
                striped
                columns={[
                  { key: 'name', header: 'Name' },
                  { key: 'role', header: 'Role' },
                  { key: 'status', header: 'Status', align: 'right' },
                ]}
                rows={[
                  { name: 'Maya Patel', role: 'Admin', status: 'Active' },
                  { name: 'Leo Martinez', role: 'Member', status: 'Active' },
                  { name: 'Sofia Ruiz', role: 'Viewer', status: 'Invited' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Tabs',
          node: (
            <MoleculeCard title="Tabs" index={14}>
              <Tabs
                value={tab}
                onChange={setTab}
                tabs={[
                  { label: 'Overview', value: 'overview' },
                  { label: 'Activity', value: 'activity' },
                  { label: 'Settings', value: 'settings' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Timeline',
          node: (
            <MoleculeCard title="Timeline" index={15}>
              <Timeline
                items={[
                  {
                    title: 'Project created',
                    description: 'Workspace provisioned.',
                    time: 'Aug 1',
                  },
                  {
                    title: 'Design approved',
                    description: 'Mockups signed off.',
                    time: 'Aug 3',
                  },
                  {
                    title: 'First release',
                    description: 'v1.0 shipped.',
                    time: 'Aug 7',
                  },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'Toast',
          node: (
            <MoleculeCard title="Toast" index={16}>
              <Toast message="Changes saved successfully" variant="success" />
            </MoleculeCard>
          ),
        },
      ],
    },
    {
      cat: 'travel',
      tiles: [
        {
          title: 'AmenityList',
          node: (
            <MoleculeCard title="AmenityList" index={0}>
              <AmenityList
                amenities={[
                  'Free Wi-Fi',
                  'Pool',
                  'Gym',
                  'Breakfast',
                  'Parking',
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'AttractionCard',
          node: (
            <MoleculeCard title="AttractionCard" index={1}>
              <AttractionCard
                name="Old Town walking tour"
                location="Riverside Quarter"
                rating={4.8}
                price={18.5}
                duration="2h"
                description="Guided tour through historic streets and landmarks."
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'BookingCard',
          node: (
            <MoleculeCard title="BookingCard" index={2}>
              <BookingCard
                reference="BK-4821"
                title="Riverside Hotel — Deluxe Room"
                date="Aug 20 – Aug 24, 2026"
                status="confirmed"
                price={620.0}
                guests={2}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ChecklistCard',
          node: (
            <MoleculeCard title="ChecklistCard" index={3}>
              <ChecklistCard
                defaultChecked={['passport', 'charger']}
                items={[
                  { id: 'passport', label: 'Passport' },
                  { id: 'charger', label: 'Phone charger' },
                  { id: 'adapter', label: 'Power adapter' },
                  { id: 'sunscreen', label: 'Sunscreen' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'DestinationCard',
          node: (
            <MoleculeCard title="DestinationCard" index={4}>
              <DestinationCard
                name="Kyoto"
                country="Japan"
                price={1450.0}
                rating={4.9}
                imageLabel="🏯"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'FlightCard',
          node: (
            <MoleculeCard title="FlightCard" index={5}>
              <FlightCard
                airline="SkyWays"
                flightNo="SW 284"
                from="SFO"
                to="HND"
                departureTime="10:40"
                arrivalTime="14:20"
                price={880.0}
                duration="11h 40m"
                stops={0}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'HotelCard',
          node: (
            <MoleculeCard title="HotelCard" index={6}>
              <HotelCard
                name="Riverside Hotel"
                location="Old Town, Kyoto"
                pricePerNight={155.0}
                rating={4.7}
                stars={5}
                imageLabel="🏨"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ItineraryList',
          node: (
            <MoleculeCard title="ItineraryList" index={7}>
              <ItineraryList
                items={[
                  {
                    time: '09:00',
                    title: 'Breakfast at café',
                    detail: 'Nishiki Market',
                  },
                  {
                    time: '11:00',
                    title: 'Temple visit',
                    detail: 'Kinkaku-ji',
                  },
                  { time: '14:00', title: 'Walk the bamboo grove' },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'LoyaltyCard',
          node: (
            <MoleculeCard title="LoyaltyCard" index={8}>
              <LoyaltyCard
                tier="Silver"
                points={3840}
                pointsToNext={5000}
                nextTier="Gold"
                program="SkyWays Rewards"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'MapPreview',
          node: (
            <MoleculeCard title="MapPreview" index={9}>
              <MapPreview
                placeName="Kyoto Station"
                address="Higashishiokoji-cho, Shimogyo-ku"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'PriceBreakdown',
          node: (
            <MoleculeCard title="PriceBreakdown" index={10}>
              <PriceBreakdown
                items={[
                  { label: 'Flights', amount: 880.0 },
                  { label: 'Hotel (4 nights)', amount: 620.0 },
                  { label: 'Tours', amount: 96.0 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'ReviewSummary',
          node: (
            <MoleculeCard title="ReviewSummary" index={11}>
              <ReviewSummary
                average={4.7}
                count={1284}
                breakdown={[
                  { stars: 5, count: 902 },
                  { stars: 4, count: 280 },
                  { stars: 3, count: 64 },
                  { stars: 2, count: 24 },
                  { stars: 1, count: 14 },
                ]}
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'SearchFilters',
          node: (
            <MoleculeCard title="SearchFilters" index={12}>
              <SearchFilters placeholder="Search trips, hotels, flights" />
            </MoleculeCard>
          ),
        },
        {
          title: 'TransportOption',
          node: (
            <MoleculeCard title="TransportOption" index={13}>
              <TransportOption
                type="train"
                provider="Shinkansen"
                duration="2h 15m"
                price={82.0}
                departure="08:45"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'TripSummary',
          node: (
            <MoleculeCard title="TripSummary" index={14}>
              <TripSummary
                destination="Kyoto, Japan"
                duration="4 days"
                travelers={2}
                budget={1850.0}
                startDate="Aug 20, 2026"
              />
            </MoleculeCard>
          ),
        },
        {
          title: 'WeatherForecast',
          node: (
            <MoleculeCard title="WeatherForecast" index={15}>
              <WeatherForecast
                days={[
                  { day: 'Mon', condition: 'Sunny', high: 28, low: 19 },
                  { day: 'Tue', condition: 'Cloudy', high: 26, low: 18 },
                  { day: 'Wed', condition: 'Rain', high: 24, low: 17 },
                ]}
              />
            </MoleculeCard>
          ),
        },
      ],
    },
  ];

  const term = search.trim().toLowerCase();
  const visible = term
    ? sections
        .map((s) => ({
          ...s,
          tiles: s.tiles.filter(
            (t) => t.title.toLowerCase().includes(term) || s.cat.includes(term)
          ),
        }))
        .filter((s) => s.tiles.length > 0)
    : sections;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-3 p-5">
      <label className="input input-bordered flex w-full items-center gap-2">
        <svg
          aria-hidden="true"
          className="text-base-content/50 size-4 shrink-0"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
          />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          data-testid="molecules-search"
          placeholder="Search molecule…"
          className="grow"
        />
      </label>
      {visible.map((section) => (
        <details
          key={section.cat}
          className="collapse-arrow border-base-300 collapse rounded-none border-b p-0"
          open>
          <summary className="collapse-title text-base-content/60 font-mono text-xs uppercase">
            {section.cat}
            <span className="badge badge-ghost badge-sm ml-2">
              {section.tiles.length}
            </span>
          </summary>
          <div className="collapse-content">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {section.tiles.map((tile) => tile.node)}
            </div>
          </div>
        </details>
      ))}
    </div>
  );
};

MoleculesLevel.displayName = 'MoleculesLevel';

export const MOLECULES_COUNT = 256;
