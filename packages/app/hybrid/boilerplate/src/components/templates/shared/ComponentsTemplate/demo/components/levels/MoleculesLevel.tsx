import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import {
  Accordion,
  Alert,
  AvatarGroup,
  Breadcrumbs,
  Card,
  ChatBubble,
  Dropdown,
  EmptyState,
  Fieldset,
  FormRow,
  NavItem,
  Pagination,
  SearchBar,
  Stat,
  Steps,
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
    </div>
  );
};

MoleculesLevel.displayName = 'MoleculesLevel';
