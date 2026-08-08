'use client';

import type { FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: Element | DocumentFragment | null;
}

export const Portal: FC<PortalProps> = ({ children, container }) => {
  if (typeof document === 'undefined') return null;

  const host = container ?? document.body;
  return createPortal(children, host);
};

Portal.displayName = 'Portal';
