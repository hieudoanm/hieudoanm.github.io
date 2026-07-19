'use client';

const GlobalError = () => {
  console.log('[GlobalError] render');
  return (
    <html>
      <body>
        <main
          className="flex h-screen w-screen flex-col items-center justify-center gap-4"
          role="alert">
          <h1 className="text-6xl font-bold">Error</h1>
          <p className="text-base-content/60">A critical error occurred</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}>
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
};

export default GlobalError;
