import Link from 'next/link';

const Unauthorized = () => {
  console.log('[Unauthorized] render');
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold">401</h1>
      <p className="text-base-content/60">Unauthorized access</p>
      <Link href="/sign-in" className="btn btn-primary">
        Login
      </Link>
    </main>
  );
};

export default Unauthorized;
