import Link from 'next/link';

const ForbiddenPage = () => (
  <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
    <h1 className="text-6xl font-bold">403</h1>
    <p className="text-base-content/60">
      You do not have permission to access this page.
    </p>
    <Link href="/" className="btn btn-primary btn-sm">
      Go Home
    </Link>
  </main>
);

export default ForbiddenPage;
