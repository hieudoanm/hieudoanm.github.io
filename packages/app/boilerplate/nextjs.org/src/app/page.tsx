import { NextPage } from 'next';
import Link from 'next/link';

const HomePage: NextPage = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-6">
    <h1>Boilerplate</h1>
    <div className="flex gap-4">
      <Link href="/about" className="btn btn-ghost btn-sm">
        About
      </Link>
      <Link href="/settings" className="btn btn-ghost btn-sm">
        Settings
      </Link>
      <Link href="/version" className="btn btn-ghost btn-sm">
        Version
      </Link>
      <Link href="/not-found" className="btn btn-ghost btn-sm">
        Not Found
      </Link>
    </div>
  </div>
);

export default HomePage;
