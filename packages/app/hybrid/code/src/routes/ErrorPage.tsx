import type { FC } from 'react';
import { LuHouse, LuFileQuestion, LuBug } from 'react-icons/lu';

interface ErrorPageProps {
  statusCode?: number;
  title?: string;
  message?: string;
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

export const ErrorPage: FC<ErrorPageProps> = ({
  statusCode,
  title,
  message,
}) => {
  const defaults = statusCode ? DEFAULT_MESSAGES[statusCode] : undefined;
  const displayTitle = title ?? defaults?.title ?? 'An error occurred';
  const displayMessage =
    message ?? defaults?.message ?? 'An unexpected error occurred.';

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
        <a href="/" className="btn btn-primary mt-6">
          <LuHouse className="h-4 w-4" />
          Go home
        </a>
      </div>
    </div>
  );
};
