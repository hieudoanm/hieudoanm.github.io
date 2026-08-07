import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Icon,
  Progress,
  Rating,
  Skeleton,
  Spinner,
  StatusDot,
  Switch,
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
    </div>
  );
};

AtomsLevel.displayName = 'AtomsLevel';
