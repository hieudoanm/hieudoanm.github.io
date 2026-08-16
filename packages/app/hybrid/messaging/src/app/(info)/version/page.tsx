import { type FC } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const APP_VERSION = '0.0.1';

const VersionPage: FC = () => (
  <div className="bg-base-200 min-h-screen">
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/" className="btn btn-circle btn-ghost btn-sm">
          <FaArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">Version</h1>
      </div>

      <section className="bg-base-100 rounded-lg p-6">
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-base-content/60">Application</dt>
            <dd className="font-medium">Messaging</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-base-content/60">Version</dt>
            <dd className="font-medium">{APP_VERSION}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-base-content/60">Status</dt>
            <dd className="badge badge-success badge-sm">Phase 1 complete</dd>
          </div>
        </dl>
        <div className="divider" />
        <p className="text-base-content/60 text-sm">
          Release tag:{' '}
          <code className="badge badge-ghost badge-sm">
            app-hybrid-messaging-latest
          </code>
        </p>
      </section>
    </div>
  </div>
);

export default VersionPage;
