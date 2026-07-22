'use client';

const Error = () => {
  console.log('[Error] render');
  return (
    <main
      className="flex h-screen w-screen flex-col items-center justify-center gap-4"
      role="alert">
      <h1 className="text-6xl font-bold">Error</h1>
      <p className="text-base-content/60">Something went wrong</p>
      <button
        className="btn btn-primary"
        onClick={() => window.location.reload()}>
        Try Again
      </button>
    </main>
  );
};

export default Error;
