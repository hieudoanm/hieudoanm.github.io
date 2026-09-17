import React from 'react';

export const routerMock = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
};

export const useRouter = () => routerMock;

export const usePathname = jest.fn().mockReturnValue('/');
export const useSearchParams = jest.fn().mockReturnValue(new URLSearchParams());

export const mockNextNavigation = {
  useRouter,
  usePathname,
  useSearchParams,
};

export const mockNextLink = ({
  href,
  children,
  ...props
}: {
  href: string;
  children?: React.ReactNode;
}) =>
  React.createElement(
    'a',
    { href: typeof href === 'string' ? href : '#', ...props },
    children
  );

export const mockLinkModule = { __esModule: true, default: mockNextLink };
