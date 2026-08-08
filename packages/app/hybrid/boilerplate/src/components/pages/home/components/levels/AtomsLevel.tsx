import { motion } from 'motion/react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  Clock,
  CountUp,
  Countdown,
  GlowCard,
  GradientText,
  Magnetic,
  Progress,
  ProgressRing,
  Rating,
  ScrollProgress,
  Shimmer,
  Spotlight,
  StarBorder,
  StatusDot,
  Swap,
  ThemeController,
  Checkbox,
  CopyButton,
  FileInput,
  Kbd,
  Label,
  NumberField,
  OTPInput,
  PasswordField,
  Radio,
  Select,
  Slider,
  Switch,
  TextField,
  Textarea,
  Validator,
  VisuallyHidden,
  ArticleBadge,
  AuthorAvatar,
  CategoryTag,
  DateStamp,
  ExcerptText,
  HashtagLabel,
  HeadingText,
  KeywordTag,
  MetaLabel,
  ReadingTime,
  Tag,
  TagCloud,
  Text,
  TextRotate,
  TitleText,
  WordCount,
  AccountIcon,
  BentoGrid,
  CompanyIcon,
  ContactAvatar,
  ContactInitials,
  DealPriority,
  Indicator,
  LeadStatus,
  PhoneIcon,
  PipelineStage,
  RevenueBadge,
  SalesTrend,
  StageCount,
  TeamAvatar,
  ValueAmount,
  WinRate,
  Artboard,
  AspectRatio,
  Avatar,
  BrowserMockup,
  CodeBlock,
  Cube,
  Dock,
  Hover3D,
  HoverGallery,
  Icon,
  ImageComparison,
  LetterAvatar,
  Mask,
  MiniMap,
  PhoneMockup,
  WindowMockup,
  AccountBalance,
  AmountText,
  BalanceLabel,
  BudgetBar,
  CashFlow,
  CurrencyTag,
  ExpenseIcon,
  IncomeIcon,
  InterestRate,
  LimitBadge,
  MonthlyStat,
  PaymentStatus,
  PortfolioValue,
  SavingGoal,
  TransactionType,
  TrendArrow,
  ActiveMinutes,
  Badge,
  BloodPressure,
  CalorieCount,
  DistanceValue,
  HeartRate,
  HeightLabel,
  HydrationLevel,
  MetricLabel,
  RestingRate,
  SleepHours,
  StepsCount,
  TempValue,
  WaterIntake,
  WeightValue,
  WorkoutSets,
  AttendanceDot,
  AwardBadge,
  DepartmentTag,
  EmployeeAvatar,
  HireDate,
  JobTitle,
  LeaveStatus,
  ManagerName,
  OvertimeValue,
  PayrollAmount,
  RoleTag,
  SkillLevel,
  TeamSize,
  TenureLabel,
  TitleBadge,
  WorkHours,
  ActionButton,
  ArrowLink,
  BulletPoint,
  CaptionText,
  CtaButton,
  EmptyPlaceholder,
  FeatureIcon,
  HeroBadge,
  LogoMark,
  NavLink,
  PricingTag,
  SectionLabel,
  StatNumber,
  StepNumber,
  TestimonialMark,
  TrustBadge,
  AttachmentIcon,
  ComposeIcon,
  EditableText,
  EmailCount,
  FolderIcon,
  InboxBadge,
  MailAvatar,
  PriorityFlag,
  ReadStatus,
  ReplyIcon,
  SenderInitials,
  SentIcon,
  SpamIcon,
  StarMail,
  SubjectLabel,
  TrashIcon,
  AlbumCover,
  ArtistInitials,
  Collapse,
  DurationText,
  EpisodeBadge,
  GenreTag,
  LikeCount,
  PlayCount,
  PlaylistIcon,
  QueueNumber,
  RatingStar,
  StreamBadge,
  TrackNumber,
  VideoThumb,
  VolumeLevel,
  WatchTime,
  ArticleCard,
  BreakingBadge,
  CategoryChip,
  EditorTag,
  HeadlineText,
  ImageCaption,
  LeadParagraph,
  MediaBadge,
  PublishedDate,
  ReporterName,
  ScoreLabel,
  StoryKicker,
  TagBadge,
  TimeAgo,
  TopStory,
  UpdateBadge,
  CommentCount,
  ConnectionDot,
  FollowButton,
  FollowerCount,
  FriendAvatar,
  GroupIcon,
  LikeButton,
  MentionTag,
  MessageIcon,
  OnlineBadge,
  PostIcon,
  ProfileBadge,
  ShareIcon,
  StoryRing,
  UnreadBadge,
  UsernameLabel,
  CartBadge,
  CategoryIcon,
  CompareIcon,
  DiscountTag,
  FavoriteHeart,
  FreeShipping,
  GiftIcon,
  PriceLabel,
  ProductBadge,
  QuantityStepper,
  RatingCount,
  ReviewCount,
  StockStatus,
  StoreLogo,
  UnitPrice,
  WishlistIcon,
  Button,
  ButtonLink,
  Container,
  Divider,
  Grid,
  IconButton,
  LinkButton,
  Loading,
  Portal,
  Separator,
  Skeleton,
  Slot,
  Spacer,
  Spinner,
  Stack,
  Tooltip,
  ArrivalIcon,
  DepartureIcon,
  DestinationTag,
  DistanceLabel,
  FlightBadge,
  GuestCount,
  HotelStar,
  MapMarker,
  NightCount,
  PricePerNight,
  RatingLabel,
  RoomType,
  SeatIcon,
  TimeZone,
  TravelIcon,
  WeatherIcon,
} from '../../../../atoms';

const AtomTile: FC<{ title: string; index: number; children: ReactNode }> = ({
  title,
  index,
  children,
}) => (
  <motion.div
    className="card bg-base-200 border-base-content/10 border"
    initial={{ opacity: 0, y: 14, scale: 0.97 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      delay: index * 0.05,
    }}>
    <div className="card-body gap-3">
      <h4 className="text-base-content/50 font-mono text-xs uppercase">
        {title}
      </h4>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  </motion.div>
);

export const AtomsLevel: FC = () => {
  const [search, setSearch] = useState('');

  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [rating, setRating] = useState(3);
  const [radio, setRadio] = useState('one');
  const [fruit, setFruit] = useState('');
  const [volume, setVolume] = useState(60);
  const [tags, setTags] = useState(['react', 'next']);
  const [password, setPassword] = useState('s3cret');
  const [quantity, setQuantity] = useState(2);
  const [swapOn, setSwapOn] = useState(false);
  const [otp, setOtp] = useState('');
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [editable, setEditable] = useState('Acme Corp');

  const sections: {
    cat: string;
    tiles: { title: string; node: ReactNode }[];
  }[] = [
    {
      cat: 'app',
      tiles: [
        {
          title: 'Clock',
          node: (
            <AtomTile title="Clock" index={0}>
              <Clock />
              <Clock format="24h" showSeconds />
            </AtomTile>
          ),
        },
        {
          title: 'CountUp',
          node: (
            <AtomTile title="CountUp" index={1}>
              <div className="flex w-full items-baseline gap-4">
                <span className="text-2xl font-bold">
                  <CountUp end={1234} prefix="+" />
                </span>
                <span className="text-primary text-2xl font-bold">
                  <CountUp end={99} suffix="%" duration={2000} />
                </span>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Countdown',
          node: (
            <AtomTile title="Countdown" index={2}>
              <div className="flex items-end gap-4">
                <Countdown value={12} />
                <Countdown value={59} />
                <Countdown value={7} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'GlowCard',
          node: (
            <AtomTile title="GlowCard" index={3}>
              <GlowCard title="Glowing" className="w-full">
                <p className="text-sm">Hover to see the glow effect.</p>
              </GlowCard>
            </AtomTile>
          ),
        },
        {
          title: 'GradientText',
          node: (
            <AtomTile title="GradientText" index={4}>
              <p className="text-lg font-bold">
                <GradientText>Gradient headline</GradientText>
              </p>
            </AtomTile>
          ),
        },
        {
          title: 'Magnetic',
          node: (
            <AtomTile title="Magnetic" index={5}>
              <Magnetic className="w-full">
                <div className="card bg-base-100 border-base-content/10 w-full p-4 text-center text-sm">
                  Move your pointer over me
                </div>
              </Magnetic>
            </AtomTile>
          ),
        },
        {
          title: 'Progress',
          node: (
            <AtomTile title="Progress" index={6}>
              <div className="w-full">
                <Progress value={65} label="Usage" showValue variant="accent" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ProgressRing',
          node: (
            <AtomTile title="ProgressRing" index={7}>
              <div className="flex gap-4">
                <ProgressRing value={35} />
                <ProgressRing value={75} showValue />
                <ProgressRing value={100} size={56} showValue />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Rating',
          node: (
            <AtomTile title="Rating" index={8}>
              <Rating value={rating} onChange={setRating} />
            </AtomTile>
          ),
        },
        {
          title: 'ScrollProgress',
          node: (
            <AtomTile title="ScrollProgress" index={9}>
              <ScrollProgress color="bg-primary" />
              <p className="text-base-content/60 w-full text-sm">
                Scroll the page to see progress at the top.
              </p>
            </AtomTile>
          ),
        },
        {
          title: 'Shimmer',
          node: (
            <AtomTile title="Shimmer" index={10}>
              <div className="flex w-full flex-col gap-2">
                <Shimmer className="h-3 w-full" />
                <Shimmer className="h-3 w-2/3" />
                <Shimmer className="h-16 w-full" rounded="rounded-xl" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Spotlight',
          node: (
            <AtomTile title="Spotlight" index={11}>
              <Spotlight className="w-full">
                <div className="card bg-base-200 border-base-content/10 w-full p-6 text-center text-sm">
                  Hover to reveal the spotlight
                </div>
              </Spotlight>
            </AtomTile>
          ),
        },
        {
          title: 'StarBorder',
          node: (
            <AtomTile title="StarBorder" index={12}>
              <StarBorder className="w-full">
                <div className="p-4 text-center text-sm">
                  Gradient border card
                </div>
              </StarBorder>
            </AtomTile>
          ),
        },
        {
          title: 'StatusDot',
          node: (
            <AtomTile title="StatusDot" index={13}>
              <StatusDot status="online" label="Online" />
              <StatusDot status="busy" label="Busy" />
              <StatusDot status="offline" label="Offline" />
            </AtomTile>
          ),
        },
        {
          title: 'Swap',
          node: (
            <AtomTile title="Swap" index={14}>
              <Swap
                first={<Icon name="star" />}
                second={<Icon name="bell" />}
                on={swapOn}
                onToggle={setSwapOn}
                ariaLabel="Toggle demo"
              />
            </AtomTile>
          ),
        },
        {
          title: 'ThemeController',
          node: (
            <AtomTile title="ThemeController" index={15}>
              <div className="flex flex-col gap-1">
                <ThemeController theme="dark" label="Dark" checked />
                <ThemeController theme="light" label="Light" />
              </div>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'auth',
      tiles: [
        {
          title: 'Checkbox',
          node: (
            <AtomTile title="Checkbox" index={0}>
              <Checkbox
                label="Accept terms"
                checked={checked}
                onChange={setChecked}
              />
            </AtomTile>
          ),
        },
        {
          title: 'CopyButton',
          node: (
            <AtomTile title="CopyButton" index={1}>
              <CopyButton text="pnpm install" label="Copy command" />
              <CopyButton text="npm i" variant="primary" size="md" />
            </AtomTile>
          ),
        },
        {
          title: 'FileInput',
          node: (
            <AtomTile title="FileInput" index={2}>
              <div className="w-full">
                <FileInput label="Upload" accept=".pdf" hint="PDF files only" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Kbd',
          node: (
            <AtomTile title="Kbd" index={3}>
              <div className="flex items-center gap-1">
                <Kbd>Ctrl</Kbd>
                <span className="text-base-content/50">+</span>
                <Kbd>K</Kbd>
                <span className="text-base-content/50">to search</span>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Label',
          node: (
            <AtomTile title="Label" index={4}>
              <Label htmlFor="demo-name">Full name</Label>
            </AtomTile>
          ),
        },
        {
          title: 'NumberField',
          node: (
            <AtomTile title="NumberField" index={5}>
              <div className="w-full">
                <NumberField
                  label="Quantity"
                  value={quantity}
                  onChange={setQuantity}
                  min={0}
                  max={10}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'OTPInput',
          node: (
            <AtomTile title="OTPInput" index={6}>
              <div className="w-full">
                <OTPInput
                  label="One-time code"
                  value={otp}
                  onChange={setOtp}
                  length={6}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PasswordField',
          node: (
            <AtomTile title="PasswordField" index={7}>
              <div className="w-full">
                <PasswordField
                  label="Password"
                  value={password}
                  onChange={setPassword}
                  placeholder="••••••••"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Radio',
          node: (
            <AtomTile title="Radio" index={8}>
              <div className="flex flex-col gap-1">
                <Radio
                  label="Option one"
                  name="demo-radio"
                  checked={radio === 'one'}
                  onChange={() => setRadio('one')}
                  size="sm"
                />
                <Radio
                  label="Option two"
                  name="demo-radio"
                  checked={radio === 'two'}
                  onChange={() => setRadio('two')}
                  size="sm"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Select',
          node: (
            <AtomTile title="Select" index={9}>
              <div className="w-full">
                <Select
                  label="Fruit"
                  value={fruit}
                  onChange={setFruit}
                  placeholder="Pick a fruit"
                  options={[
                    { label: 'Apples', value: 'apples' },
                    { label: 'Oranges', value: 'oranges' },
                    { label: 'Bananas', value: 'bananas' },
                  ]}
                  size="sm"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Slider',
          node: (
            <AtomTile title="Slider" index={10}>
              <div className="w-full">
                <Slider
                  label="Volume"
                  value={volume}
                  onChange={setVolume}
                  showValue
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Switch',
          node: (
            <AtomTile title="Switch" index={11}>
              <Switch
                label="Enabled"
                checked={enabled}
                onChange={setEnabled}
                size="sm"
              />
            </AtomTile>
          ),
        },
        {
          title: 'TextField',
          node: (
            <AtomTile title="TextField" index={12}>
              <div className="w-full">
                <TextField label="Email" type="email" placeholder="you@x.com" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Textarea',
          node: (
            <AtomTile title="Textarea" index={13}>
              <div className="w-full">
                <Textarea
                  label="Message"
                  rows={2}
                  placeholder="Type something..."
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Validator',
          node: (
            <AtomTile title="Validator" index={14}>
              <div className="w-full">
                <Validator hint="Enter a valid email">
                  <input
                    type="email"
                    placeholder="you@x.com"
                    className="input input-bordered w-full"
                    aria-label="Email"
                  />
                </Validator>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'VisuallyHidden',
          node: (
            <AtomTile title="VisuallyHidden" index={15}>
              <p className="text-sm">
                <VisuallyHidden>Screen reader only</VisuallyHidden>
                Visible content.
              </p>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'blog',
      tiles: [
        {
          title: 'ArticleBadge',
          node: (
            <AtomTile title="ArticleBadge" index={0}>
              <div className="flex gap-2">
                <ArticleBadge>Guide</ArticleBadge>
                <ArticleBadge>New</ArticleBadge>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'AuthorAvatar',
          node: (
            <AtomTile title="AuthorAvatar" index={1}>
              <div className="flex gap-2">
                <AuthorAvatar name="Jane Doe" />
                <AuthorAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CategoryTag',
          node: (
            <AtomTile title="CategoryTag" index={2}>
              <div className="flex gap-2">
                <CategoryTag label="React" />
                <CategoryTag label="TypeScript" href="/blog/ts" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'DateStamp',
          node: (
            <AtomTile title="DateStamp" index={3}>
              <DateStamp date="2024-01-15" />
            </AtomTile>
          ),
        },
        {
          title: 'ExcerptText',
          node: (
            <AtomTile title="ExcerptText" index={4}>
              <div className="w-full">
                <ExcerptText
                  text="A concise summary of the article goes here."
                  limit={60}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'HashtagLabel',
          node: (
            <AtomTile title="HashtagLabel" index={5}>
              <div className="flex gap-2">
                <HashtagLabel label="#react" />
                <HashtagLabel label="#nextjs" href="/tag/nextjs" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'HeadingText',
          node: (
            <AtomTile title="HeadingText" index={6}>
              <HeadingText>Hello world</HeadingText>
            </AtomTile>
          ),
        },
        {
          title: 'KeywordTag',
          node: (
            <AtomTile title="KeywordTag" index={7}>
              <div className="flex gap-2">
                <KeywordTag label="hooks" />
                <KeywordTag label="state" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'MetaLabel',
          node: (
            <AtomTile title="MetaLabel" index={8}>
              <div className="flex flex-col gap-1">
                <MetaLabel>Jan 15, 2024</MetaLabel>
                <MetaLabel>5 min read</MetaLabel>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ReadingTime',
          node: (
            <AtomTile title="ReadingTime" index={9}>
              <ReadingTime minutes={5} />
            </AtomTile>
          ),
        },
        {
          title: 'Tag',
          node: (
            <AtomTile title="Tag" index={10}>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag) => (
                  <Tag
                    key={tag}
                    label={tag}
                    variant="primary"
                    onRemove={() => setTags(tags.filter((t) => t !== tag))}
                  />
                ))}
                <Tag label="neutral" />
                <Tag label="success" variant="success" />
                <Tag label="error" variant="error" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TagCloud',
          node: (
            <AtomTile title="TagCloud" index={11}>
              <div className="w-full">
                <TagCloud
                  tags={[
                    { label: 'React', weight: 9 },
                    { label: 'Next.js', weight: 7 },
                    { label: 'TypeScript', weight: 5 },
                    { label: 'Tailwind', weight: 3 },
                    { label: 'DaisyUI', weight: 1 },
                  ]}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Text',
          node: (
            <AtomTile title="Text" index={12}>
              <div className="flex w-full flex-col gap-1">
                <Text as="h3" size="lg" weight="semibold">
                  Heading text
                </Text>
                <Text color="muted">Muted body copy.</Text>
                <Text as="small" color="primary">
                  Small primary label
                </Text>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TextRotate',
          node: (
            <AtomTile title="TextRotate" index={13}>
              <p className="text-sm">
                Build with{' '}
                <TextRotate
                  words={['React', 'Next.js', 'DaisyUI']}
                  duration={2000}
                />
              </p>
            </AtomTile>
          ),
        },
        {
          title: 'TitleText',
          node: (
            <AtomTile title="TitleText" index={14}>
              <TitleText>Amazing article</TitleText>
            </AtomTile>
          ),
        },
        {
          title: 'WordCount',
          node: (
            <AtomTile title="WordCount" index={15}>
              <WordCount count={320} label="words" />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'crm',
      tiles: [
        {
          title: 'AccountIcon',
          node: (
            <AtomTile title="AccountIcon" index={0}>
              <div className="flex gap-2">
                <AccountIcon name="Acme" />
                <AccountIcon name="Globex" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'BentoGrid',
          node: (
            <AtomTile title="BentoGrid" index={1}>
              <div className="w-full">
                <BentoGrid
                  cells={[
                    {
                      key: 'featured',
                      colSpan: 2,
                      rowSpan: 2,
                      content: (
                        <div className="card bg-base-100 border-base-content/10 flex h-full min-h-24 items-center justify-center border p-4 text-sm">
                          Featured
                        </div>
                      ),
                    },
                    {
                      key: 'a',
                      content: (
                        <div className="card bg-base-100 border-base-content/10 flex h-24 items-center justify-center border p-4 text-sm">
                          Cell A
                        </div>
                      ),
                    },
                    {
                      key: 'b',
                      content: (
                        <div className="card bg-base-100 border-base-content/10 flex h-24 items-center justify-center border p-4 text-sm">
                          Cell B
                        </div>
                      ),
                    },
                    {
                      key: 'c',
                      content: (
                        <div className="card bg-base-100 border-base-content/10 flex h-24 items-center justify-center border p-4 text-sm">
                          Cell C
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CompanyIcon',
          node: (
            <AtomTile title="CompanyIcon" index={2}>
              <div className="flex gap-2">
                <CompanyIcon name="Acme" />
                <CompanyIcon name="Globex" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ContactAvatar',
          node: (
            <AtomTile title="ContactAvatar" index={3}>
              <div className="flex gap-2">
                <ContactAvatar name="Jane Doe" />
                <ContactAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ContactInitials',
          node: (
            <AtomTile title="ContactInitials" index={4}>
              <ContactInitials name="Jane Doe" />
            </AtomTile>
          ),
        },
        {
          title: 'DealPriority',
          node: (
            <AtomTile title="DealPriority" index={5}>
              <div className="flex gap-2">
                <DealPriority priority="high" />
                <DealPriority priority="medium" />
                <DealPriority priority="low" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Indicator',
          node: (
            <AtomTile title="Indicator" index={6}>
              <div className="flex gap-6">
                <Indicator badge="3">
                  <IconButton
                    icon={<Icon name="bell" />}
                    label="Inbox"
                    variant="outline"
                    size="sm"
                  />
                </Indicator>
                <Indicator badge="new" position="bottom-end">
                  <IconButton
                    icon={<Icon name="user" />}
                    label="Profile"
                    variant="ghost"
                    size="sm"
                  />
                </Indicator>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'LeadStatus',
          node: (
            <AtomTile title="LeadStatus" index={7}>
              <div className="flex flex-wrap gap-2">
                <LeadStatus status="new" />
                <LeadStatus status="contacted" />
                <LeadStatus status="won" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PhoneIcon',
          node: (
            <AtomTile title="PhoneIcon" index={8}>
              <div className="flex gap-2">
                <PhoneIcon />
                <PhoneIcon className="text-lg" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PipelineStage',
          node: (
            <AtomTile title="PipelineStage" index={9}>
              <PipelineStage stage="Qualified" />
            </AtomTile>
          ),
        },
        {
          title: 'RevenueBadge',
          node: (
            <AtomTile title="RevenueBadge" index={10}>
              <div className="flex gap-2">
                <RevenueBadge value={120000} />
                <RevenueBadge value={45000} prefix="+$" variant="success" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'SalesTrend',
          node: (
            <AtomTile title="SalesTrend" index={11}>
              <SalesTrend value={24} suffix="%" label="Growth" />
            </AtomTile>
          ),
        },
        {
          title: 'StageCount',
          node: (
            <AtomTile title="StageCount" index={12}>
              <StageCount count={12} label="Active" />
            </AtomTile>
          ),
        },
        {
          title: 'TeamAvatar',
          node: (
            <AtomTile title="TeamAvatar" index={13}>
              <div className="flex gap-2">
                <TeamAvatar name="Jane Doe" />
                <TeamAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ValueAmount',
          node: (
            <AtomTile title="ValueAmount" index={14}>
              <div className="flex gap-4">
                <ValueAmount value={2500} currency="USD" />
                <ValueAmount value={1200} currency="EUR" decimals={2} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'WinRate',
          node: (
            <AtomTile title="WinRate" index={15}>
              <WinRate rate={68} label="Win rate" />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'developer',
      tiles: [
        {
          title: 'Artboard',
          node: (
            <AtomTile title="Artboard" index={0}>
              <Artboard title="Mobile preview">Hello</Artboard>
            </AtomTile>
          ),
        },
        {
          title: 'AspectRatio',
          node: (
            <AtomTile title="AspectRatio" index={1}>
              <div className="w-full">
                <AspectRatio ratio={16 / 9}>
                  <div className="bg-primary/20 flex h-full w-full items-center justify-center">
                    <span className="text-primary">16:9</span>
                  </div>
                </AspectRatio>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Avatar',
          node: (
            <AtomTile title="Avatar" index={2}>
              <Avatar alt="Jane Doe" fallback="JD" size="sm" />
              <Avatar alt="Alex Smith" fallback="AS" size="sm" />
              <Avatar alt="Pat Lee" fallback="PL" size="sm" />
            </AtomTile>
          ),
        },
        {
          title: 'BrowserMockup',
          node: (
            <AtomTile title="BrowserMockup" index={3}>
              <div className="w-full">
                <BrowserMockup url="https://example.com">Page</BrowserMockup>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CodeBlock',
          node: (
            <AtomTile title="CodeBlock" index={4}>
              <div className="w-full">
                <CodeBlock
                  code="export const App = () => <h1>Hello</h1>;"
                  language="tsx"
                  title="App.tsx"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Cube',
          node: (
            <AtomTile title="Cube" index={5}>
              <div className="flex items-center gap-4">
                <Cube size={48} />
                <Cube />
                <Cube size={128} speed="slow" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Dock',
          node: (
            <AtomTile title="Dock" index={6}>
              <Dock
                items={[
                  { key: 'home', label: 'Home', icon: <Icon name="home" /> },
                  { key: 'user', label: 'Profile', icon: <Icon name="user" /> },
                  {
                    key: 'star',
                    label: 'Favorites',
                    icon: <Icon name="star" />,
                  },
                ]}
              />
            </AtomTile>
          ),
        },
        {
          title: 'Hover3D',
          node: (
            <AtomTile title="Hover3D" index={7}>
              <Hover3D className="w-full">
                <div className="card bg-base-100 border-base-content/10 border p-6 text-center text-sm">
                  Hover me for a 3D tilt
                </div>
              </Hover3D>
            </AtomTile>
          ),
        },
        {
          title: 'HoverGallery',
          node: (
            <AtomTile title="HoverGallery" index={8}>
              <HoverGallery
                className="w-full"
                images={[
                  { src: '/avatar.png', alt: 'Photo one' },
                  { src: '/avatar.png', alt: 'Photo two' },
                  { src: '/avatar.png', alt: 'Photo three' },
                ]}
              />
            </AtomTile>
          ),
        },
        {
          title: 'Icon',
          node: (
            <AtomTile title="Icon" index={9}>
              <div className="flex gap-2">
                <Icon name="bell" />
                <Icon name="home" />
                <Icon name="user" />
                <Icon name="star" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ImageComparison',
          node: (
            <AtomTile title="ImageComparison" index={10}>
              <div className="w-full">
                <ImageComparison
                  before="/avatar.png"
                  beforeAlt="Before"
                  after="/avatar.png"
                  afterAlt="After"
                  className="w-full"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'LetterAvatar',
          node: (
            <AtomTile title="LetterAvatar" index={11}>
              <div className="flex gap-2">
                <LetterAvatar name="Jane Doe" />
                <LetterAvatar name="Alex Chen" color="accent" size="sm" />
                <LetterAvatar name="Sam" color="neutral" size="lg" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Mask',
          node: (
            <AtomTile title="Mask" index={12}>
              <div className="flex gap-3">
                <Mask
                  src="/avatar.png"
                  alt="Squircle"
                  shape="squircle"
                  className="h-16 w-16"
                />
                <Mask
                  src="/avatar.png"
                  alt="Hexagon"
                  shape="hexagon"
                  className="h-16 w-16"
                />
                <Mask
                  src="/avatar.png"
                  alt="Star"
                  shape="star"
                  className="h-16 w-16"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'MiniMap',
          node: (
            <AtomTile title="MiniMap" index={13}>
              <div className="w-full">
                <MiniMap
                  sections={[
                    { id: 'a', label: 'Intro' },
                    { id: 'b', label: 'Features' },
                    { id: 'c', label: 'Pricing' },
                  ]}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PhoneMockup',
          node: (
            <AtomTile title="PhoneMockup" index={14}>
              <PhoneMockup>Screen</PhoneMockup>
            </AtomTile>
          ),
        },
        {
          title: 'WindowMockup',
          node: (
            <AtomTile title="WindowMockup" index={15}>
              <div className="w-full">
                <WindowMockup title="Terminal">$ pnpm build</WindowMockup>
              </div>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'finance',
      tiles: [
        {
          title: 'AccountBalance',
          node: (
            <AtomTile title="AccountBalance" index={0}>
              <AccountBalance
                accountName="Checking"
                balance={8420.5}
                currency="USD"
              />
            </AtomTile>
          ),
        },
        {
          title: 'AmountText',
          node: (
            <AtomTile title="AmountText" index={1}>
              <AmountText amount={99.99} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'BalanceLabel',
          node: (
            <AtomTile title="BalanceLabel" index={2}>
              <BalanceLabel label="Savings" balance={12500} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'BudgetBar',
          node: (
            <AtomTile title="BudgetBar" index={3}>
              <div className="w-full">
                <BudgetBar value={70} label="Marketing" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CashFlow',
          node: (
            <AtomTile title="CashFlow" index={4}>
              <CashFlow inflow={5000} outflow={3200} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'CurrencyTag',
          node: (
            <AtomTile title="CurrencyTag" index={5}>
              <div className="flex gap-2">
                <CurrencyTag code="USD" />
                <CurrencyTag code="EUR" amount={120} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ExpenseIcon',
          node: (
            <AtomTile title="ExpenseIcon" index={6}>
              <div className="flex gap-2">
                <ExpenseIcon />
                <ExpenseIcon label="Rent" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'IncomeIcon',
          node: (
            <AtomTile title="IncomeIcon" index={7}>
              <div className="flex gap-2">
                <IncomeIcon />
                <IncomeIcon label="Salary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'InterestRate',
          node: (
            <AtomTile title="InterestRate" index={8}>
              <InterestRate rate={4.5} period="APY" />
            </AtomTile>
          ),
        },
        {
          title: 'LimitBadge',
          node: (
            <AtomTile title="LimitBadge" index={9}>
              <LimitBadge limit={5000} used={3200} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'MonthlyStat',
          node: (
            <AtomTile title="MonthlyStat" index={10}>
              <MonthlyStat label="Income" value={4200} />
            </AtomTile>
          ),
        },
        {
          title: 'PaymentStatus',
          node: (
            <AtomTile title="PaymentStatus" index={11}>
              <div className="flex flex-wrap gap-2">
                <PaymentStatus status="paid" />
                <PaymentStatus status="pending" />
                <PaymentStatus status="overdue" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PortfolioValue',
          node: (
            <AtomTile title="PortfolioValue" index={12}>
              <PortfolioValue value={28000} change={5.2} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'SavingGoal',
          node: (
            <AtomTile title="SavingGoal" index={13}>
              <SavingGoal current={2400} target={6000} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'TransactionType',
          node: (
            <AtomTile title="TransactionType" index={14}>
              <div className="flex gap-2">
                <TransactionType type="income" />
                <TransactionType type="expense" />
                <TransactionType type="transfer" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TrendArrow',
          node: (
            <AtomTile title="TrendArrow" index={15}>
              <div className="flex gap-2">
                <TrendArrow direction="up" value={12} />
                <TrendArrow direction="down" value={-4} />
                <TrendArrow direction="flat" value={0} />
              </div>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'health',
      tiles: [
        {
          title: 'ActiveMinutes',
          node: (
            <AtomTile title="ActiveMinutes" index={0}>
              <ActiveMinutes minutes={42} goal={60} />
            </AtomTile>
          ),
        },
        {
          title: 'Badge',
          node: (
            <AtomTile title="Badge" index={1}>
              <Badge>Neutral</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning" outline>
                Warning
              </Badge>
              <Badge variant="error">Error</Badge>
            </AtomTile>
          ),
        },
        {
          title: 'BloodPressure',
          node: (
            <AtomTile title="BloodPressure" index={2}>
              <BloodPressure systolic={120} diastolic={80} />
            </AtomTile>
          ),
        },
        {
          title: 'CalorieCount',
          node: (
            <AtomTile title="CalorieCount" index={3}>
              <CalorieCount calories={1850} goal={2200} />
            </AtomTile>
          ),
        },
        {
          title: 'DistanceValue',
          node: (
            <AtomTile title="DistanceValue" index={4}>
              <DistanceValue distance={5.2} unit="km" />
            </AtomTile>
          ),
        },
        {
          title: 'HeartRate',
          node: (
            <AtomTile title="HeartRate" index={5}>
              <HeartRate bpm={72} />
            </AtomTile>
          ),
        },
        {
          title: 'HeightLabel',
          node: (
            <AtomTile title="HeightLabel" index={6}>
              <HeightLabel height={174} unit="cm" />
            </AtomTile>
          ),
        },
        {
          title: 'HydrationLevel',
          node: (
            <AtomTile title="HydrationLevel" index={7}>
              <HydrationLevel percent={60} />
            </AtomTile>
          ),
        },
        {
          title: 'MetricLabel',
          node: (
            <AtomTile title="MetricLabel" index={8}>
              <MetricLabel label="VO2 max" value={42} />
            </AtomTile>
          ),
        },
        {
          title: 'RestingRate',
          node: (
            <AtomTile title="RestingRate" index={9}>
              <RestingRate bpm={58} />
            </AtomTile>
          ),
        },
        {
          title: 'SleepHours',
          node: (
            <AtomTile title="SleepHours" index={10}>
              <SleepHours hours={7.5} goal={8} />
            </AtomTile>
          ),
        },
        {
          title: 'StepsCount',
          node: (
            <AtomTile title="StepsCount" index={11}>
              <StepsCount steps={8400} goal={10000} />
            </AtomTile>
          ),
        },
        {
          title: 'TempValue',
          node: (
            <AtomTile title="TempValue" index={12}>
              <TempValue value={36.6} unit="C" />
            </AtomTile>
          ),
        },
        {
          title: 'WaterIntake',
          node: (
            <AtomTile title="WaterIntake" index={13}>
              <WaterIntake amount={1800} unit="ml" goal={2500} />
            </AtomTile>
          ),
        },
        {
          title: 'WeightValue',
          node: (
            <AtomTile title="WeightValue" index={14}>
              <WeightValue weight={68.5} unit="kg" />
            </AtomTile>
          ),
        },
        {
          title: 'WorkoutSets',
          node: (
            <AtomTile title="WorkoutSets" index={15}>
              <WorkoutSets sets={4} reps={12} />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'hr',
      tiles: [
        {
          title: 'AttendanceDot',
          node: (
            <AtomTile title="AttendanceDot" index={0}>
              <div className="flex gap-3">
                <AttendanceDot status="present" label="Present" />
                <AttendanceDot status="late" label="Late" />
                <AttendanceDot status="absent" label="Absent" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'AwardBadge',
          node: (
            <AtomTile title="AwardBadge" index={1}>
              <AwardBadge label="Employee of the Month" />
            </AtomTile>
          ),
        },
        {
          title: 'DepartmentTag',
          node: (
            <AtomTile title="DepartmentTag" index={2}>
              <DepartmentTag name="Engineering" />
            </AtomTile>
          ),
        },
        {
          title: 'EmployeeAvatar',
          node: (
            <AtomTile title="EmployeeAvatar" index={3}>
              <div className="flex gap-2">
                <EmployeeAvatar name="Jane Doe" />
                <EmployeeAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'HireDate',
          node: (
            <AtomTile title="HireDate" index={4}>
              <HireDate date="2022-03-14" />
            </AtomTile>
          ),
        },
        {
          title: 'JobTitle',
          node: (
            <AtomTile title="JobTitle" index={5}>
              <JobTitle title="Senior Engineer" />
            </AtomTile>
          ),
        },
        {
          title: 'LeaveStatus',
          node: (
            <AtomTile title="LeaveStatus" index={6}>
              <div className="flex flex-wrap gap-2">
                <LeaveStatus status="approved" />
                <LeaveStatus status="pending" />
                <LeaveStatus status="rejected" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ManagerName',
          node: (
            <AtomTile title="ManagerName" index={7}>
              <ManagerName name="Priya Sharma" />
            </AtomTile>
          ),
        },
        {
          title: 'OvertimeValue',
          node: (
            <AtomTile title="OvertimeValue" index={8}>
              <div className="flex gap-2">
                <OvertimeValue hours={8} />
                <OvertimeValue hours={3} positive={false} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PayrollAmount',
          node: (
            <AtomTile title="PayrollAmount" index={9}>
              <PayrollAmount amount={4200} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'RoleTag',
          node: (
            <AtomTile title="RoleTag" index={10}>
              <RoleTag role="Admin" />
            </AtomTile>
          ),
        },
        {
          title: 'SkillLevel',
          node: (
            <AtomTile title="SkillLevel" index={11}>
              <SkillLevel skill="React" level={4} />
            </AtomTile>
          ),
        },
        {
          title: 'TeamSize',
          node: (
            <AtomTile title="TeamSize" index={12}>
              <TeamSize count={12} />
            </AtomTile>
          ),
        },
        {
          title: 'TenureLabel',
          node: (
            <AtomTile title="TenureLabel" index={13}>
              <div className="flex gap-2">
                <TenureLabel years={2} />
                <TenureLabel years={5} months={6} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TitleBadge',
          node: (
            <AtomTile title="TitleBadge" index={14}>
              <TitleBadge title="Lead" />
            </AtomTile>
          ),
        },
        {
          title: 'WorkHours',
          node: (
            <AtomTile title="WorkHours" index={15}>
              <WorkHours start="09:00" end="17:00" />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'landing',
      tiles: [
        {
          title: 'ActionButton',
          node: (
            <AtomTile title="ActionButton" index={0}>
              <div className="flex gap-2">
                <ActionButton label="Get started" />
                <ActionButton label="Disabled" disabled />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ArrowLink',
          node: (
            <AtomTile title="ArrowLink" index={1}>
              <ArrowLink label="Read more" href="/blog" />
            </AtomTile>
          ),
        },
        {
          title: 'BulletPoint',
          node: (
            <AtomTile title="BulletPoint" index={2}>
              <div className="flex w-full flex-col gap-1">
                <BulletPoint text="Fast builds" />
                <BulletPoint text="Type safe" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CaptionText',
          node: (
            <AtomTile title="CaptionText" index={3}>
              <CaptionText text="A short caption for the hero image." />
            </AtomTile>
          ),
        },
        {
          title: 'CtaButton',
          node: (
            <AtomTile title="CtaButton" index={4}>
              <CtaButton label="Start free trial" />
            </AtomTile>
          ),
        },
        {
          title: 'EmptyPlaceholder',
          node: (
            <AtomTile title="EmptyPlaceholder" index={5}>
              <div className="w-full">
                <EmptyPlaceholder
                  icon={<Icon name="bell" />}
                  title="No notifications"
                  description="You are all caught up."
                  action={<Button size="sm">Clear all</Button>}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'FeatureIcon',
          node: (
            <AtomTile title="FeatureIcon" index={6}>
              <div className="flex gap-2">
                <FeatureIcon label="Speed" icon="check" />
                <FeatureIcon label="Secure" icon="lock" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'HeroBadge',
          node: (
            <AtomTile title="HeroBadge" index={7}>
              <HeroBadge text="New version 2.0" />
            </AtomTile>
          ),
        },
        {
          title: 'LogoMark',
          node: (
            <AtomTile title="LogoMark" index={8}>
              <LogoMark name="Acme" />
            </AtomTile>
          ),
        },
        {
          title: 'NavLink',
          node: (
            <AtomTile title="NavLink" index={9}>
              <div className="flex gap-2">
                <NavLink label="Home" href="/" active />
                <NavLink label="Docs" href="/docs" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PricingTag',
          node: (
            <AtomTile title="PricingTag" index={10}>
              <PricingTag amount={29} period="month" currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'SectionLabel',
          node: (
            <AtomTile title="SectionLabel" index={11}>
              <SectionLabel text="Features" />
            </AtomTile>
          ),
        },
        {
          title: 'StatNumber',
          node: (
            <AtomTile title="StatNumber" index={12}>
              <StatNumber value="10k+" label="Users" />
            </AtomTile>
          ),
        },
        {
          title: 'StepNumber',
          node: (
            <AtomTile title="StepNumber" index={13}>
              <StepNumber number={1} title="Create an account" />
            </AtomTile>
          ),
        },
        {
          title: 'TestimonialMark',
          node: (
            <AtomTile title="TestimonialMark" index={14}>
              <TestimonialMark
                name="Jane Doe"
                quote="Loved it!"
                company="Acme"
              />
            </AtomTile>
          ),
        },
        {
          title: 'TrustBadge',
          node: (
            <AtomTile title="TrustBadge" index={15}>
              <div className="flex gap-2">
                <TrustBadge label="SOC2" />
                <TrustBadge label="GDPR" />
              </div>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'mail',
      tiles: [
        {
          title: 'AttachmentIcon',
          node: (
            <AtomTile title="AttachmentIcon" index={0}>
              <div className="flex gap-2">
                <AttachmentIcon />
                <AttachmentIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ComposeIcon',
          node: (
            <AtomTile title="ComposeIcon" index={1}>
              <div className="flex gap-2">
                <ComposeIcon />
                <ComposeIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'EditableText',
          node: (
            <AtomTile title="EditableText" index={2}>
              <div className="w-full">
                <EditableText
                  label="Project name"
                  value={editable}
                  onChange={setEditable}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'EmailCount',
          node: (
            <AtomTile title="EmailCount" index={3}>
              <EmailCount count={3} label="Unread" />
            </AtomTile>
          ),
        },
        {
          title: 'FolderIcon',
          node: (
            <AtomTile title="FolderIcon" index={4}>
              <div className="flex gap-2">
                <FolderIcon />
                <FolderIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'InboxBadge',
          node: (
            <AtomTile title="InboxBadge" index={5}>
              <InboxBadge count={12} />
            </AtomTile>
          ),
        },
        {
          title: 'MailAvatar',
          node: (
            <AtomTile title="MailAvatar" index={6}>
              <div className="flex gap-2">
                <MailAvatar name="Jane Doe" />
                <MailAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PriorityFlag',
          node: (
            <AtomTile title="PriorityFlag" index={7}>
              <div className="flex gap-2">
                <PriorityFlag priority="high" />
                <PriorityFlag priority="normal" />
                <PriorityFlag priority="low" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ReadStatus',
          node: (
            <AtomTile title="ReadStatus" index={8}>
              <div className="flex gap-2">
                <ReadStatus read />
                <ReadStatus read={false} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ReplyIcon',
          node: (
            <AtomTile title="ReplyIcon" index={9}>
              <div className="flex gap-2">
                <ReplyIcon />
                <ReplyIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'SenderInitials',
          node: (
            <AtomTile title="SenderInitials" index={10}>
              <div className="flex gap-2">
                <SenderInitials name="Jane Doe" />
                <SenderInitials name="Alex Chen" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'SentIcon',
          node: (
            <AtomTile title="SentIcon" index={11}>
              <div className="flex gap-2">
                <SentIcon />
                <SentIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'SpamIcon',
          node: (
            <AtomTile title="SpamIcon" index={12}>
              <div className="flex gap-2">
                <SpamIcon />
                <SpamIcon className="text-warning" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'StarMail',
          node: (
            <AtomTile title="StarMail" index={13}>
              <div className="flex gap-2">
                <StarMail starred />
                <StarMail starred={false} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'SubjectLabel',
          node: (
            <AtomTile title="SubjectLabel" index={14}>
              <SubjectLabel subject="Weekly report" unread />
            </AtomTile>
          ),
        },
        {
          title: 'TrashIcon',
          node: (
            <AtomTile title="TrashIcon" index={15}>
              <div className="flex gap-2">
                <TrashIcon />
                <TrashIcon className="text-error" />
              </div>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'media',
      tiles: [
        {
          title: 'AlbumCover',
          node: (
            <AtomTile title="AlbumCover" index={0}>
              <div className="flex gap-3">
                <AlbumCover title="Abbey Road" />
                <AlbumCover title="Thriller" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ArtistInitials',
          node: (
            <AtomTile title="ArtistInitials" index={1}>
              <div className="flex gap-2">
                <ArtistInitials name="The Beatles" />
                <ArtistInitials name="Queen" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Collapse',
          node: (
            <AtomTile title="Collapse" index={2}>
              <div className="w-full">
                <Collapse
                  title="What is this boilerplate?"
                  open={collapseOpen}
                  onChange={setCollapseOpen}>
                  <p>
                    A full-stack starting point with Next.js, Tailwind CSS,
                    DaisyUI, and Tauri.
                  </p>
                </Collapse>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'DurationText',
          node: (
            <AtomTile title="DurationText" index={3}>
              <DurationText seconds={245} />
            </AtomTile>
          ),
        },
        {
          title: 'EpisodeBadge',
          node: (
            <AtomTile title="EpisodeBadge" index={4}>
              <EpisodeBadge episode={3} label="Episode" />
            </AtomTile>
          ),
        },
        {
          title: 'GenreTag',
          node: (
            <AtomTile title="GenreTag" index={5}>
              <div className="flex gap-2">
                <GenreTag genre="Rock" />
                <GenreTag genre="Jazz" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'LikeCount',
          node: (
            <AtomTile title="LikeCount" index={6}>
              <LikeCount count={128} liked />
            </AtomTile>
          ),
        },
        {
          title: 'PlayCount',
          node: (
            <AtomTile title="PlayCount" index={7}>
              <PlayCount count={45000} label="plays" />
            </AtomTile>
          ),
        },
        {
          title: 'PlaylistIcon',
          node: (
            <AtomTile title="PlaylistIcon" index={8}>
              <div className="flex gap-2">
                <PlaylistIcon />
                <PlaylistIcon className="text-primary" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'QueueNumber',
          node: (
            <AtomTile title="QueueNumber" index={9}>
              <QueueNumber number={1} />
            </AtomTile>
          ),
        },
        {
          title: 'RatingStar',
          node: (
            <AtomTile title="RatingStar" index={10}>
              <RatingStar rating={4} />
            </AtomTile>
          ),
        },
        {
          title: 'StreamBadge',
          node: (
            <AtomTile title="StreamBadge" index={11}>
              <StreamBadge count={1200} label="watching" />
            </AtomTile>
          ),
        },
        {
          title: 'TrackNumber',
          node: (
            <AtomTile title="TrackNumber" index={12}>
              <TrackNumber number={7} />
            </AtomTile>
          ),
        },
        {
          title: 'VideoThumb',
          node: (
            <AtomTile title="VideoThumb" index={13}>
              <div className="w-full">
                <VideoThumb
                  title="Tutorial"
                  src="/avatar.png"
                  durationSeconds={245}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'VolumeLevel',
          node: (
            <AtomTile title="VolumeLevel" index={14}>
              <VolumeLevel level={60} />
            </AtomTile>
          ),
        },
        {
          title: 'WatchTime',
          node: (
            <AtomTile title="WatchTime" index={15}>
              <WatchTime minutes={34} />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'news',
      tiles: [
        {
          title: 'ArticleCard',
          node: (
            <AtomTile title="ArticleCard" index={0}>
              <div className="w-full">
                <ArticleCard
                  title="Launch day"
                  category="News"
                  author="Jane Doe"
                  date="Jan 15, 2024"
                  excerpt="A quick recap of our product launch."
                  href="/news/launch"
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'BreakingBadge',
          node: (
            <AtomTile title="BreakingBadge" index={1}>
              <BreakingBadge label="BREAKING" pulse />
            </AtomTile>
          ),
        },
        {
          title: 'CategoryChip',
          node: (
            <AtomTile title="CategoryChip" index={2}>
              <div className="flex gap-2">
                <CategoryChip label="World" active />
                <CategoryChip label="Tech" />
                <CategoryChip label="Sports" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'EditorTag',
          node: (
            <AtomTile title="EditorTag" index={3}>
              <div className="flex gap-2">
                <EditorTag name="Jane Doe" />
                <EditorTag label="OP-ED" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'HeadlineText',
          node: (
            <AtomTile title="HeadlineText" index={4}>
              <HeadlineText>Local headline here</HeadlineText>
            </AtomTile>
          ),
        },
        {
          title: 'ImageCaption',
          node: (
            <AtomTile title="ImageCaption" index={5}>
              <ImageCaption credit="Photo: Jane Doe">Caption text</ImageCaption>
            </AtomTile>
          ),
        },
        {
          title: 'LeadParagraph',
          node: (
            <AtomTile title="LeadParagraph" index={6}>
              <LeadParagraph>The opening paragraph of the story.</LeadParagraph>
            </AtomTile>
          ),
        },
        {
          title: 'MediaBadge',
          node: (
            <AtomTile title="MediaBadge" index={7}>
              <div className="flex gap-2">
                <MediaBadge type="photo" />
                <MediaBadge type="video" />
                <MediaBadge type="live" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PublishedDate',
          node: (
            <AtomTile title="PublishedDate" index={8}>
              <PublishedDate date="2024-01-15" format="short" />
            </AtomTile>
          ),
        },
        {
          title: 'ReporterName',
          node: (
            <AtomTile title="ReporterName" index={9}>
              <div className="flex flex-col gap-1">
                <ReporterName name="Jane Doe" />
                <ReporterName name="Alex Chen" role="Correspondent" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ScoreLabel',
          node: (
            <AtomTile title="ScoreLabel" index={10}>
              <ScoreLabel score={8.5} outOf={10} label="IMDB" />
            </AtomTile>
          ),
        },
        {
          title: 'StoryKicker',
          node: (
            <AtomTile title="StoryKicker" index={11}>
              <StoryKicker>Exclusive</StoryKicker>
            </AtomTile>
          ),
        },
        {
          title: 'TagBadge',
          node: (
            <AtomTile title="TagBadge" index={12}>
              <div className="flex gap-2">
                <TagBadge label="Politics" />
                <TagBadge label="Economy" href="/tag/economy" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TimeAgo',
          node: (
            <AtomTile title="TimeAgo" index={13}>
              <TimeAgo date={new Date(Date.now() - 3600_000)} />
            </AtomTile>
          ),
        },
        {
          title: 'TopStory',
          node: (
            <AtomTile title="TopStory" index={14}>
              <TopStory rank={1} label="Most read" />
            </AtomTile>
          ),
        },
        {
          title: 'UpdateBadge',
          node: (
            <AtomTile title="UpdateBadge" index={15}>
              <UpdateBadge label="Updated" time="2 min ago" />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'social',
      tiles: [
        {
          title: 'CommentCount',
          node: (
            <AtomTile title="CommentCount" index={0}>
              <CommentCount count={24} />
            </AtomTile>
          ),
        },
        {
          title: 'ConnectionDot',
          node: (
            <AtomTile title="ConnectionDot" index={1}>
              <div className="flex gap-3">
                <ConnectionDot status="online" />
                <ConnectionDot status="away" />
                <ConnectionDot status="offline" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'FollowButton',
          node: (
            <AtomTile title="FollowButton" index={2}>
              <div className="flex gap-2">
                <FollowButton />
                <FollowButton label="Follow me" followingLabel="Following" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'FollowerCount',
          node: (
            <AtomTile title="FollowerCount" index={3}>
              <FollowerCount count={1240} />
            </AtomTile>
          ),
        },
        {
          title: 'FriendAvatar',
          node: (
            <AtomTile title="FriendAvatar" index={4}>
              <div className="flex gap-2">
                <FriendAvatar name="Jane Doe" />
                <FriendAvatar name="Alex Chen" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'GroupIcon',
          node: (
            <AtomTile title="GroupIcon" index={5}>
              <GroupIcon />
            </AtomTile>
          ),
        },
        {
          title: 'LikeButton',
          node: (
            <AtomTile title="LikeButton" index={6}>
              <div className="flex gap-2">
                <LikeButton count={128} />
                <LikeButton liked count={256} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'MentionTag',
          node: (
            <AtomTile title="MentionTag" index={7}>
              <div className="flex gap-2">
                <MentionTag name="@jane" />
                <MentionTag name="@alex" href="/u/alex" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'MessageIcon',
          node: (
            <AtomTile title="MessageIcon" index={8}>
              <div className="flex gap-2">
                <MessageIcon unread />
                <MessageIcon label="Messages" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'OnlineBadge',
          node: (
            <AtomTile title="OnlineBadge" index={9}>
              <div className="flex gap-2">
                <OnlineBadge name="Jane" />
                <OnlineBadge label="Active now" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PostIcon',
          node: (
            <AtomTile title="PostIcon" index={10}>
              <div className="flex gap-2">
                <PostIcon type="text" />
                <PostIcon type="image" />
                <PostIcon type="video" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ProfileBadge',
          node: (
            <AtomTile title="ProfileBadge" index={11}>
              <ProfileBadge name="Jane Doe" verified role="Admin" />
            </AtomTile>
          ),
        },
        {
          title: 'ShareIcon',
          node: (
            <AtomTile title="ShareIcon" index={12}>
              <div className="flex gap-2">
                <ShareIcon />
                <ShareIcon label="Share" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'StoryRing',
          node: (
            <AtomTile title="StoryRing" index={13}>
              <div className="flex gap-2">
                <StoryRing name="Jane" />
                <StoryRing name="Alex" viewed />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'UnreadBadge',
          node: (
            <AtomTile title="UnreadBadge" index={14}>
              <div className="flex gap-2">
                <UnreadBadge count={5} />
                <UnreadBadge count={1} label="message" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'UsernameLabel',
          node: (
            <AtomTile title="UsernameLabel" index={15}>
              <UsernameLabel username="jane_doe" verified />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'store',
      tiles: [
        {
          title: 'CartBadge',
          node: (
            <AtomTile title="CartBadge" index={0}>
              <CartBadge count={3} />
            </AtomTile>
          ),
        },
        {
          title: 'CategoryIcon',
          node: (
            <AtomTile title="CategoryIcon" index={1}>
              <div className="flex gap-2">
                <CategoryIcon label="Electronics" />
                <CategoryIcon label="Books" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'CompareIcon',
          node: (
            <AtomTile title="CompareIcon" index={2}>
              <div className="flex gap-2">
                <CompareIcon />
                <CompareIcon label="Compare" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'DiscountTag',
          node: (
            <AtomTile title="DiscountTag" index={3}>
              <div className="flex gap-2">
                <DiscountTag discount={25} />
                <DiscountTag discount={50} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'FavoriteHeart',
          node: (
            <AtomTile title="FavoriteHeart" index={4}>
              <FavoriteHeart label="Wishlist" />
            </AtomTile>
          ),
        },
        {
          title: 'FreeShipping',
          node: (
            <AtomTile title="FreeShipping" index={5}>
              <FreeShipping />
            </AtomTile>
          ),
        },
        {
          title: 'GiftIcon',
          node: (
            <AtomTile title="GiftIcon" index={6}>
              <div className="flex gap-2">
                <GiftIcon />
                <GiftIcon label="Gift" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'PriceLabel',
          node: (
            <AtomTile title="PriceLabel" index={7}>
              <div className="flex gap-2">
                <PriceLabel amount={49.99} currency="USD" />
                <PriceLabel amount={79.99} currency="USD" strikethrough />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'ProductBadge',
          node: (
            <AtomTile title="ProductBadge" index={8}>
              <div className="flex gap-2">
                <ProductBadge label="Best Seller" />
                <ProductBadge label="New" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'QuantityStepper',
          node: (
            <AtomTile title="QuantityStepper" index={9}>
              <div className="w-full">
                <QuantityStepper
                  label="Qty"
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={9}
                />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'RatingCount',
          node: (
            <AtomTile title="RatingCount" index={10}>
              <RatingCount rating={4.5} count={320} />
            </AtomTile>
          ),
        },
        {
          title: 'ReviewCount',
          node: (
            <AtomTile title="ReviewCount" index={11}>
              <ReviewCount count={320} />
            </AtomTile>
          ),
        },
        {
          title: 'StockStatus',
          node: (
            <AtomTile title="StockStatus" index={12}>
              <div className="flex flex-col gap-1">
                <StockStatus status="in" count={12} />
                <StockStatus status="low" count={2} />
                <StockStatus status="out" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'StoreLogo',
          node: (
            <AtomTile title="StoreLogo" index={13}>
              <div className="flex gap-2">
                <StoreLogo name="Acme" />
                <StoreLogo name="Globex" src="/avatar.png" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'UnitPrice',
          node: (
            <AtomTile title="UnitPrice" index={14}>
              <UnitPrice amount={12.99} currency="USD" per="kg" />
            </AtomTile>
          ),
        },
        {
          title: 'WishlistIcon',
          node: (
            <AtomTile title="WishlistIcon" index={15}>
              <WishlistIcon label="Save" />
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'support',
      tiles: [
        {
          title: 'Button',
          node: (
            <AtomTile title="Button" index={0}>
              <Button size="sm">Primary</Button>
              <Button size="sm" variant="outline">
                Outline
              </Button>
              <Button size="sm" variant="ghost">
                Ghost
              </Button>
              <Button size="sm" loading>
                Loading
              </Button>
            </AtomTile>
          ),
        },
        {
          title: 'ButtonLink',
          node: (
            <AtomTile title="ButtonLink" index={1}>
              <div className="flex gap-2">
                <ButtonLink href="/shared/about" size="sm">
                  About
                </ButtonLink>
                <ButtonLink href="/app/settings" variant="outline" size="sm">
                  Settings
                </ButtonLink>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Container',
          node: (
            <AtomTile title="Container" index={2}>
              <Container size="md">
                <p className="text-base-content/60 text-sm">
                  Centered content, max-width md.
                </p>
              </Container>
            </AtomTile>
          ),
        },
        {
          title: 'Divider',
          node: (
            <AtomTile title="Divider" index={3}>
              <div className="flex w-full flex-col gap-3">
                <Divider label="OR" />
                <Divider />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Grid',
          node: (
            <AtomTile title="Grid" index={4}>
              <Grid cols={2} smCols={3} gap="sm" className="w-full">
                {['A', 'B', 'C', 'D'].map((letter) => (
                  <div
                    key={letter}
                    className="card bg-base-100 border-base-content/10 p-2 text-center text-sm">
                    {letter}
                  </div>
                ))}
              </Grid>
            </AtomTile>
          ),
        },
        {
          title: 'IconButton',
          node: (
            <AtomTile title="IconButton" index={5}>
              <IconButton
                icon={<Icon name="star" />}
                label="Favorite"
                size="sm"
              />
              <IconButton
                icon={<Icon name="bell" />}
                label="Notify"
                variant="outline"
                size="sm"
              />
              <IconButton
                icon={<Icon name="home" />}
                label="Home"
                variant="ghost"
                size="sm"
              />
            </AtomTile>
          ),
        },
        {
          title: 'LinkButton',
          node: (
            <AtomTile title="LinkButton" index={6}>
              <div className="flex gap-2">
                <LinkButton href="/shared/about">Get started</LinkButton>
                <LinkButton href="/app/settings" variant="outline">
                  Settings
                </LinkButton>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Loading',
          node: (
            <AtomTile title="Loading" index={7}>
              <div className="flex flex-wrap items-center gap-2">
                <Loading variant="spinner" size="sm" />
                <Loading variant="dots" />
                <Loading variant="ring" />
                <Loading variant="bars" />
                <Loading variant="ball" />
                <Loading variant="infinity" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Portal',
          node: (
            <AtomTile title="Portal" index={8}>
              <Portal>
                <span className="badge badge-primary">Rendered in body</span>
              </Portal>
            </AtomTile>
          ),
        },
        {
          title: 'Separator',
          node: (
            <AtomTile title="Separator" index={9}>
              <div className="w-full">
                <Separator />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Skeleton',
          node: (
            <AtomTile title="Skeleton" index={10}>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Slot',
          node: (
            <AtomTile title="Slot" index={11}>
              <Slot className="btn btn-primary btn-sm">
                <button type="button">Slotted button</button>
              </Slot>
            </AtomTile>
          ),
        },
        {
          title: 'Spacer',
          node: (
            <AtomTile title="Spacer" index={12}>
              <div className="flex w-full items-center gap-2">
                <span className="badge">Start</span>
                <Spacer />
                <span className="badge">End</span>
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'Spinner',
          node: (
            <AtomTile title="Spinner" index={13}>
              <Spinner size="sm" />
              <Spinner />
            </AtomTile>
          ),
        },
        {
          title: 'Stack',
          node: (
            <AtomTile title="Stack" index={14}>
              <Stack
                items={[
                  <div
                    key="one"
                    className="card bg-base-100 border-base-content/10 p-4">
                    Card one
                  </div>,
                  <div
                    key="two"
                    className="card bg-base-100 border-base-content/10 p-4">
                    Card two
                  </div>,
                  <div
                    key="three"
                    className="card bg-base-100 border-base-content/10 p-4">
                    Card three
                  </div>,
                ]}
              />
            </AtomTile>
          ),
        },
        {
          title: 'Tooltip',
          node: (
            <AtomTile title="Tooltip" index={15}>
              <Tooltip content="Click to copy" position="bottom">
                <Button size="sm" variant="outline">
                  Hover me
                </Button>
              </Tooltip>
            </AtomTile>
          ),
        },
      ],
    },
    {
      cat: 'travel',
      tiles: [
        {
          title: 'ArrivalIcon',
          node: (
            <AtomTile title="ArrivalIcon" index={0}>
              <div className="flex gap-2">
                <ArrivalIcon />
                <ArrivalIcon label="Landing" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'DepartureIcon',
          node: (
            <AtomTile title="DepartureIcon" index={1}>
              <div className="flex gap-2">
                <DepartureIcon />
                <DepartureIcon label="Takeoff" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'DestinationTag',
          node: (
            <AtomTile title="DestinationTag" index={2}>
              <DestinationTag name="Paris" city="France" />
            </AtomTile>
          ),
        },
        {
          title: 'DistanceLabel',
          node: (
            <AtomTile title="DistanceLabel" index={3}>
              <DistanceLabel value={540} unit="km" />
            </AtomTile>
          ),
        },
        {
          title: 'FlightBadge',
          node: (
            <AtomTile title="FlightBadge" index={4}>
              <FlightBadge code="VN 123" status="boarding" />
            </AtomTile>
          ),
        },
        {
          title: 'GuestCount',
          node: (
            <AtomTile title="GuestCount" index={5}>
              <GuestCount count={2} />
            </AtomTile>
          ),
        },
        {
          title: 'HotelStar',
          node: (
            <AtomTile title="HotelStar" index={6}>
              <div className="flex gap-2">
                <HotelStar value={4} />
                <HotelStar value={5} />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'MapMarker',
          node: (
            <AtomTile title="MapMarker" index={7}>
              <div className="flex gap-2">
                <MapMarker />
                <MapMarker label="Paris" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'NightCount',
          node: (
            <AtomTile title="NightCount" index={8}>
              <NightCount count={3} />
            </AtomTile>
          ),
        },
        {
          title: 'PricePerNight',
          node: (
            <AtomTile title="PricePerNight" index={9}>
              <PricePerNight amount={120} currency="USD" />
            </AtomTile>
          ),
        },
        {
          title: 'RatingLabel',
          node: (
            <AtomTile title="RatingLabel" index={10}>
              <RatingLabel score={4.7} label="Guest rating" />
            </AtomTile>
          ),
        },
        {
          title: 'RoomType',
          node: (
            <AtomTile title="RoomType" index={11}>
              <RoomType label="Deluxe King" />
            </AtomTile>
          ),
        },
        {
          title: 'SeatIcon',
          node: (
            <AtomTile title="SeatIcon" index={12}>
              <div className="flex gap-2">
                <SeatIcon />
                <SeatIcon label="12A" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'TimeZone',
          node: (
            <AtomTile title="TimeZone" index={13}>
              <TimeZone timezone="Asia/Tokyo" city="Tokyo" />
            </AtomTile>
          ),
        },
        {
          title: 'TravelIcon',
          node: (
            <AtomTile title="TravelIcon" index={14}>
              <div className="flex gap-2">
                <TravelIcon />
                <TravelIcon label="Plane" />
              </div>
            </AtomTile>
          ),
        },
        {
          title: 'WeatherIcon',
          node: (
            <AtomTile title="WeatherIcon" index={15}>
              <div className="flex gap-2">
                <WeatherIcon condition="sunny" temperature={28} />
                <WeatherIcon condition="rain" temperature={18} />
              </div>
            </AtomTile>
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
          data-testid="atoms-search"
          placeholder="Search atoms…"
          className="grow"
        />
      </label>
      {visible.map((section) => (
        <details
          key={section.cat}
          className="collapse-arrow border-base-content/10 bg-base-200 collapse border"
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

AtomsLevel.displayName = 'AtomsLevel';

export const ATOMS_COUNT = 256;
