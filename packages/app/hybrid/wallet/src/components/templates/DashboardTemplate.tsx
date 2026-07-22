import { FC, ReactNode } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import BottomNav from '@/components/organisms/BottomNav';
import Header from '@/components/organisms/Header';

interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <div className="mx-auto max-w-5xl p-4 md:p-6">{children}</div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardTemplate;
