import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  ButtonLink,
  Checkbox,
  CodeBlock,
  Collapse,
  CopyButton,
  Countdown,
  Divider,
  FileInput,
  Icon,
  IconButton,
  Indicator,
  Kbd,
  Mask,
  NumberField,
  OTPInput,
  PasswordField,
  Progress,
  ProgressRing,
  Radio,
  Rating,
  Select,
  Skeleton,
  Slider,
  Spinner,
  Stack,
  StatusDot,
  Swap,
  Switch,
  Tag,
  Text,
  Textarea,
  TextField,
  Tooltip,
} from '../../../../../../atoms';

const AtomTile: FC<{ title: string; index: number; children: ReactNode }> = ({
  title,
  index,
  children,
}) => (
  <div
    className="card bg-base-200 border-base-content/10 animate-atomic-in border"
    style={{ animationDelay: `${index * 50}ms` }}>
    <div className="card-body gap-3">
      <h4 className="text-base-content/50 font-mono text-xs uppercase">
        {title}
      </h4>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  </div>
);

export const AtomsLevel: FC = () => {
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

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
      <AtomTile title="Badge" index={1}>
        <Badge>Neutral</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning" outline>
          Warning
        </Badge>
        <Badge variant="error">Error</Badge>
      </AtomTile>
      <AtomTile title="StatusDot" index={2}>
        <StatusDot status="online" label="Online" />
        <StatusDot status="busy" label="Busy" />
        <StatusDot status="offline" label="Offline" />
      </AtomTile>
      <AtomTile title="Rating" index={3}>
        <Rating value={rating} onChange={setRating} />
      </AtomTile>
      <AtomTile title="Progress" index={4}>
        <div className="w-full">
          <Progress value={65} label="Usage" showValue variant="accent" />
        </div>
      </AtomTile>
      <AtomTile title="Switch" index={5}>
        <Switch
          label="Enabled"
          checked={enabled}
          onChange={setEnabled}
          size="sm"
        />
      </AtomTile>
      <AtomTile title="Checkbox" index={6}>
        <Checkbox
          label="Accept terms"
          checked={checked}
          onChange={setChecked}
        />
      </AtomTile>
      <AtomTile title="Icon" index={7}>
        <div className="flex gap-2">
          <Icon name="bell" />
          <Icon name="home" />
          <Icon name="user" />
          <Icon name="star" />
        </div>
      </AtomTile>
      <AtomTile title="Avatar" index={8}>
        <Avatar alt="Jane Doe" fallback="JD" size="sm" />
        <Avatar alt="Alex Smith" fallback="AS" size="sm" />
        <Avatar alt="Pat Lee" fallback="PL" size="sm" />
      </AtomTile>
      <AtomTile title="Spinner" index={9}>
        <Spinner size="sm" />
        <Spinner />
      </AtomTile>
      <AtomTile title="Tooltip" index={10}>
        <Tooltip content="Click to copy" position="bottom">
          <Button size="sm" variant="outline">
            Hover me
          </Button>
        </Tooltip>
      </AtomTile>
      <AtomTile title="Skeleton" index={11}>
        <div className="flex w-full flex-col gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </AtomTile>
      <AtomTile title="TextField" index={12}>
        <div className="w-full">
          <TextField label="Email" type="email" placeholder="you@x.com" />
        </div>
      </AtomTile>
      <AtomTile title="Textarea" index={13}>
        <div className="w-full">
          <Textarea label="Message" rows={2} placeholder="Type something..." />
        </div>
      </AtomTile>
      <AtomTile title="Radio" index={14}>
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
      <AtomTile title="Select" index={15}>
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
      <AtomTile title="Slider" index={16}>
        <div className="w-full">
          <Slider
            label="Volume"
            value={volume}
            onChange={setVolume}
            showValue
          />
        </div>
      </AtomTile>
      <AtomTile title="Tag" index={17}>
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
      <AtomTile title="Kbd" index={18}>
        <div className="flex items-center gap-1">
          <Kbd>Ctrl</Kbd>
          <span className="text-base-content/50">+</span>
          <Kbd>K</Kbd>
          <span className="text-base-content/50">to search</span>
        </div>
      </AtomTile>
      <AtomTile title="CodeBlock" index={19}>
        <div className="w-full">
          <CodeBlock
            code="export const App = () => <h1>Hello</h1>;"
            language="tsx"
            title="App.tsx"
          />
        </div>
      </AtomTile>
      <AtomTile title="FileInput" index={20}>
        <div className="w-full">
          <FileInput label="Upload" accept=".pdf" hint="PDF files only" />
        </div>
      </AtomTile>
      <AtomTile title="PasswordField" index={21}>
        <div className="w-full">
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            placeholder="••••••••"
          />
        </div>
      </AtomTile>
      <AtomTile title="CopyButton" index={22}>
        <CopyButton text="pnpm install" label="Copy command" />
        <CopyButton text="npm i" variant="primary" size="md" />
      </AtomTile>
      <AtomTile title="NumberField" index={23}>
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
      <AtomTile title="IconButton" index={24}>
        <IconButton icon={<Icon name="star" />} label="Favorite" size="sm" />
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
      <AtomTile title="Divider" index={25}>
        <div className="flex w-full flex-col gap-3">
          <Divider label="OR" />
          <Divider />
        </div>
      </AtomTile>
      <AtomTile title="Indicator" index={26}>
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
      <AtomTile title="Swap" index={27}>
        <Swap
          first={<Icon name="star" />}
          second={<Icon name="bell" />}
          on={swapOn}
          onToggle={setSwapOn}
          ariaLabel="Toggle demo"
        />
      </AtomTile>
      <AtomTile title="Countdown" index={28}>
        <div className="flex items-end gap-4">
          <Countdown value={12} />
          <Countdown value={59} />
          <Countdown value={7} />
        </div>
      </AtomTile>
      <AtomTile title="Mask" index={29}>
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
      <AtomTile title="Stack" index={30}>
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
      <AtomTile title="Text" index={31}>
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
      <AtomTile title="ButtonLink" index={32}>
        <div className="flex gap-2">
          <ButtonLink href="/about" size="sm">
            About
          </ButtonLink>
          <ButtonLink href="/settings" variant="outline" size="sm">
            Settings
          </ButtonLink>
        </div>
      </AtomTile>
      <AtomTile title="OTPInput" index={33}>
        <div className="w-full">
          <OTPInput
            label="One-time code"
            value={otp}
            onChange={setOtp}
            length={6}
          />
        </div>
      </AtomTile>
      <AtomTile title="Collapse" index={34}>
        <div className="w-full">
          <Collapse
            title="What is this boilerplate?"
            open={collapseOpen}
            onChange={setCollapseOpen}>
            <p>
              A full-stack starting point with Next.js, Tailwind CSS, DaisyUI,
              and Tauri.
            </p>
          </Collapse>
        </div>
      </AtomTile>
      <AtomTile title="ProgressRing" index={35}>
        <div className="flex gap-4">
          <ProgressRing value={35} />
          <ProgressRing value={75} showValue />
          <ProgressRing value={100} size={56} showValue />
        </div>
      </AtomTile>
    </div>
  );
};

AtomsLevel.displayName = 'AtomsLevel';
