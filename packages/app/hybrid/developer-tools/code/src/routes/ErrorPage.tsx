import { LuHouse, LuFileQuestion, LuBug, LuRefreshCw } from 'react-icons/lu';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
  error?: Error & { digest?: string };
  reset?: () => void;
}

const DEFAULT_MESSAGES: Record<number, { title: string; message: string }> = {
  404: {
    title: 'Page not found',
    message: 'The page you are looking for does not exist or has been moved.',
  },
  500: {
    title: 'Internal server error',
    message: 'Something went wrong on our end. Please try again later.',
  },
};

export const ErrorPage = ({
  statusCode,
  title,
  message,
  error,
  reset,
}: ErrorPageProps) => {
  const defaults = statusCode ? DEFAULT_MESSAGES[statusCode] : undefined;
  const displayTitle = title ?? defaults?.title ?? 'An error occurred';
  const displayMessage =
    message ??
    defaults?.message ??
    error?.message ??
    'An unexpected error occurred.';

  const errorIcon = (() => {
    if (statusCode === 404)
      return <LuFileQuestion className="mx-auto h-16 w-16" />;
    if (statusCode) return <LuBug className="mx-auto h-16 w-16" />;
    return null;
  })();

  return (
    <div className="bg-base-300 text-base-content flex h-screen flex-col items-center justify-center">
      <div className="text-center">
        {errorIcon}
        {Boolean(statusCode) && (
          <p className="text-base-content/40 mt-4 text-8xl font-black">
            {statusCode}
          </p>
        )}
        <h1 className="mt-4 text-3xl font-bold">{displayTitle}</h1>
        <p className="text-base-content/60 mt-2">{displayMessage}</p>
        {error?.digest && (
          <p className="text-base-content/40 mt-2 text-xs">
            Error ID: {error.digest}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-4">
          <a href="/" className="btn btn-primary">
            <LuHouse className="h-4 w-4" />
            Go home
          </a>
          {reset && (
            <button type="button" onClick={reset} className="btn btn-outline">
              <LuRefreshCw className="h-4 w-4" />
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
