'use client';

import { type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export const PageTransition: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="h-full">
    {children}
  </motion.div>
);
