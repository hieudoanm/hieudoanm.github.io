import type { Metadata } from 'next';
import type { FC } from 'react';
import { ResumeView } from '@/components/routes/resume/ResumeView';

export const metadata: Metadata = {
  title: 'Hieu Doan — Resume',
  description:
    'Hieu Doan — software engineer with 10+ years of experience building web, mobile, and desktop products.',
};

const HomePage: FC = () => <ResumeView />;

export default HomePage;
