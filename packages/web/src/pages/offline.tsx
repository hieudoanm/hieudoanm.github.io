import { NextPage } from 'next';
import Link from 'next/link';

const OfflinePage: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-neutral-100">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-black">Offline</h1>
          <Link href="/">
            <button
              type="button"
              className="btn w-full rounded-xl bg-neutral-900 py-4 text-neutral-100 uppercase">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfflinePage;
