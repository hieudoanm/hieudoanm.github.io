'use client';

import { FC } from 'react';
import { Header } from '@/components/organisms/Header';
import { AboutTemplate } from '@/components/templates/AboutTemplate';

const AboutPage: FC = () => (
  <div className="flex flex-col">
    <Header />
    <AboutTemplate
      name="Clock"
      description="A collection of time-related utilities: Pomodoro timer, watchface display, world clock, countdown timer, and stopwatch."
      version="0.0.1"
      items={[
        { label: 'Package', value: '@hieudoanm.github.io/clock' },
        { label: 'Framework', value: 'Next.js 16' },
        { label: 'Styling', value: 'TailwindCSS + DaisyUI' },
        { label: 'Theme', value: 'Nothing' },
      ]}
    />
  </div>
);

export default AboutPage;
