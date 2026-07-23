import { FC, ReactNode } from 'react';
import Sidebar from '@/components/organisms/Sidebar';
import BottomNav from '@/components/organisms/BottomNav';
import Header from '@/components/organisms/Header';
import PageTransition from '@/components/PageTransition';

interface DashboardTemplateProps {
  children: ReactNode;
}

const DashboardTemplate: FC<DashboardTemplateProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        <main
          id="main-content"
          className="flex-1 overflow-y-auto pb-20 md:pb-0"
          tabIndex={-1}>
          <div className="mx-auto max-w-5xl p-4 md:p-6">
            <PageTransition>{children}</PageTransition>
          </div>
        </main>
      </div>

      <BottomNav />
    </div>
  );
};

export default DashboardTemplate;
