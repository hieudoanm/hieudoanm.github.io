import { type FC } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const AboutPage: FC = () => (
  <div className="bg-base-200 min-h-screen">
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/" className="btn btn-circle btn-ghost btn-sm">
          <FaArrowLeft className="h-4 w-4" />
        </Link>
        <h1 className="text-2xl font-bold">About</h1>
      </div>

      <section className="bg-base-100 space-y-4 rounded-lg p-6">
        <p className="text-base-content/80">
          <strong>Messaging</strong> is a hybrid web app inspired by Telegram,
          WhatsApp, Messenger and Signal. It brings secure, group and rich
          messaging to the browser and desktop.
        </p>
        <h2 className="text-lg font-semibold">Highlights</h2>
        <ul className="text-base-content/80 list-disc space-y-1 pl-5">
          <li>End-to-end style privacy with secret chats</li>
          <li>Direct and group conversations</li>
          <li>Reactions, replies, edits and deletions</li>
          <li>Delivery status with read receipts</li>
          <li>Disappearing messages</li>
          <li>Offline-first storage via IndexedDB</li>
        </ul>
        <p className="text-base-content/60 text-sm">
          Status: <strong>Phase 1 complete</strong> — purely client-to-client
          with end-to-end encryption; real-time delivery planned over WebRTC
          DataChannels.
        </p>
      </section>
    </div>
  </div>
);

export default AboutPage;
