'use client';

import { motion } from 'motion/react';
import { type FC, type ReactNode } from 'react';

const PageTransitionTemplate: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className="h-full">
    {children}
  </motion.div>
);

export default PageTransitionTemplate;
