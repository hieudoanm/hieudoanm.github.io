import { NextPage } from 'next';
import Link from 'next/link';

const ErrorPage: NextPage = () => {
  return (
    <div className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center">
          <h1 className="text-9xl font-black">500</h1>
          <Link href="/">
            <button
              type="button"
              className="btn w-full rounded border border-gray-800 py-4 uppercase">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
