import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <footer className="border-base-300/40 text-base-content/60 border-t py-8 text-center text-sm">
      Built with Next.js, Tailwind & DaisyUI · © {new Date().getFullYear()}
    </footer>
  );
};
