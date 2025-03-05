import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-y-2 overflow-hidden bg-gray-100">
      <p className="text-xl font-black lowercase">
        it&apos;s{' '}
        <Link
          href="/apps"
          className="underline decoration-dotted underline-offset-6">
          nothing
        </Link>
      </p>
    </div>
  );
};

export default HomePage;
