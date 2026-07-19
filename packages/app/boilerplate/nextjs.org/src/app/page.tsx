'use client';

import { useState } from 'react';
import { Spinner } from '@/components/atoms/Spinner';
import { Badge } from '@/components/atoms/Badge';
import { Avatar } from '@/components/atoms/Avatar';
import { Separator } from '@/components/atoms/Separator';
import { TextField } from '@/components/atoms/TextField';
import { Skeleton } from '@/components/atoms/Skeleton';
import { Toast } from '@/components/molecules/Toast';
import { Modal } from '@/components/molecules/Modal';
import { Card } from '@/components/molecules/Card';
import { EmptyState } from '@/components/molecules/EmptyState';
import { Tabs } from '@/components/molecules/Tabs';
import { Dropdown } from '@/components/molecules/Dropdown';
import { Header } from '@/components/organisms/Header';

const tabs = [
  { label: 'One', value: 'one' },
  { label: 'Two', value: 'two' },
  { label: 'Three', value: 'three' },
];

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('one');
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [text, setText] = useState('');

  return (
    <div className="flex min-h-dvh flex-col pb-20">
      <Header
        title="Boilerplate"
        action={
          <a href="/about" className="btn btn-ghost btn-sm">
            About
          </a>
        }
      />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 p-6">
        <h2>Atoms</h2>

        <section className="flex flex-col gap-4">
          <h3>Spinner</h3>
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Badge</h3>
          <div className="flex flex-wrap gap-2">
            <Badge>neutral</Badge>
            <Badge variant="primary">primary</Badge>
            <Badge variant="secondary">secondary</Badge>
            <Badge variant="accent">accent</Badge>
            <Badge variant="success">success</Badge>
            <Badge variant="warning">warning</Badge>
            <Badge variant="error">error</Badge>
            <Badge variant="info">info</Badge>
            <Badge outline>outline</Badge>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Avatar</h3>
          <div className="flex items-center gap-4">
            <Avatar alt="John Doe" size="sm" />
            <Avatar alt="Jane Smith" size="md" />
            <Avatar alt="Bob" size="lg" />
            <Avatar size="md" />
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>TextField</h3>
          <TextField
            label="Name"
            placeholder="Enter your name"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <TextField
            label="Email"
            placeholder="you@example.com"
            error="Invalid email address"
          />
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Skeleton</h3>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </section>

        <Separator />

        <h2>Molecules</h2>

        <section className="flex flex-col gap-4">
          <h3>Card</h3>
          <Card
            title="Card Title"
            description="Card description goes here"
            action={<button className="btn btn-ghost btn-sm">Action</button>}>
            <p className="text-base-content/70 text-sm">
              Card body content. Cards compose header and body slots from props.
            </p>
          </Card>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>EmptyState</h3>
          <EmptyState
            icon="📭"
            title="No items found"
            description="Create something to get started"
            action={<button className="btn btn-primary btn-sm">Create</button>}
          />
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Tabs</h3>
          <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />
          <p className="text-base-content/50 text-sm">
            Active tab: {activeTab}
          </p>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Dropdown</h3>
          <Dropdown
            trigger={<button className="btn btn-sm">Menu</button>}
            items={[
              { label: 'Edit', onClick: () => setToast('Edit clicked') },
              { label: 'Duplicate', onClick: () => setToast('Duplicated') },
              {
                label: 'Delete',
                onClick: () => setToast('Deleted'),
                danger: true,
              },
            ]}
          />
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Toast</h3>
          <div className="flex gap-2">
            <button
              className="btn btn-info btn-sm"
              onClick={() => setToast('info')}>
              Info
            </button>
            <button
              className="btn btn-success btn-sm"
              onClick={() => setToast('success')}>
              Success
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setToast('warning')}>
              Warning
            </button>
            <button
              className="btn btn-error btn-sm"
              onClick={() => setToast('error')}>
              Error
            </button>
          </div>
        </section>

        <Separator />

        <section className="flex flex-col gap-4">
          <h3>Modal</h3>
          <button
            className="btn btn-primary btn-sm w-fit"
            onClick={() => setModalOpen(true)}>
            Open Modal
          </button>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Confirm Action"
            action={
              <>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    setModalOpen(false);
                    setToast('Confirmed');
                  }}>
                  Confirm
                </button>
              </>
            }>
            <p className="text-sm">
              Are you sure you want to proceed? This action cannot be undone.
            </p>
          </Modal>
        </section>

        <Separator />

        <h2>Organisms</h2>

        <section className="flex flex-col gap-4">
          <h3>Header</h3>
          <div className="rounded-xl border">
            <Header
              title="Page Title"
              subtitle="Subtitle goes here"
              badges={<Badge variant="primary">new</Badge>}
              action={<button className="btn btn-sm">Action</button>}
            />
          </div>
        </section>
      </main>

      {toast && (
        <Toast
          message={toast}
          variant={toast as 'info' | 'success' | 'warning' | 'error'}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default HomePage;
