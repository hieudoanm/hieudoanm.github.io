import { FC } from 'react';

const NotFoundPage: FC = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-4">
    <h1 className="text-2xl">404</h1>
    <p className="text-sm">This note does not exist.</p>
    <a href="/" className="btn btn-primary btn-sm">
      Back to vault
    </a>
  </div>
);

export default NotFoundPage;
