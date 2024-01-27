'use client';

const GlobalError: React.FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        <div>{error.message}</div>
        <button type="button" onClick={() => reset()}>
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
