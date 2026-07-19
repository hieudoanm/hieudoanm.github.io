'use client';

import { type FC, type ReactNode } from 'react';
import { motion } from 'motion/react';

const Template: FC<{ children: ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2 }}>
    {children}
  </motion.div>
);

export default Template;
