import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-100">
      <p className="text-xl font-black lowercase">
        there is{' '}
        <Link
          href="/apps"
          className="underline decoration-dotted underline-offset-6">
          nothing
        </Link>{' '}
        here
      </p>
    </div>
  );
};

export default HomePage;
