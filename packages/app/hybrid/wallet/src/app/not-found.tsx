import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-base-content/60">Page not found</p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </main>
  );
}
