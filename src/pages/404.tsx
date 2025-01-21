import { NextPage } from 'next';
import Link from 'next/link';

const NotFoundPage: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-gray-300">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-black">404</h1>
          <Link href="/">
            <button
              type="button"
              className="btn w-full rounded-xl bg-black py-4 uppercase text-white">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
