import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-3">
      <div className="text-5xl font-bold tracking-tight">404</div>
      <p className="text-sm opacity-60">This page does not exist.</p>
      <Link href="/" className="btn btn-primary btn-sm">
        Back home
      </Link>
    </main>
  );
}
