import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <nav className="border-b shadow">
      <div className="container mx-auto">
        <div className="px-8 py-4">
          <div className="flex items-center gap-x-4">
            <p className="text-xl font-bold">
              <Link href="/">VI</Link>
            </p>
            <p>
              <Link href="/indicators">Indicators</Link>
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
