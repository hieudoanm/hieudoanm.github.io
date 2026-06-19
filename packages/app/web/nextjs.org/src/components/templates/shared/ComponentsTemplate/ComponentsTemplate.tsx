import { FC } from 'react';
import { DemoDrawer } from './DemoDrawer';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { PrimitivesSection } from './PrimitivesSection';
import { FormsSection } from './FormsSection';
import { FeedbackSection } from './FeedbackSection';
import { NavigationSection } from './NavigationSection';
import { ContainersSection } from './ContainersSection';
import { DataSection } from './DataSection';
import { PricingSection } from './PricingSection';
import { Footer } from './Footer';
import { DemoModal } from './DemoModal';
import { GoogleSignInModal } from './GoogleSignInModal';

export const ComponentsTemplate: FC = () => (
  <div
    className="bg-base-100 text-base-content min-h-screen font-sans"
    data-theme="luxury">
    <DemoDrawer />
    <Nav />
    <Hero />
    <div className="border-base-300 mx-12 border-t" />
    <PrimitivesSection />
    <div className="border-base-300 mx-12 border-t" />
    <FormsSection />
    <div className="border-base-300 mx-12 border-t" />
    <FeedbackSection />
    <div className="border-base-300 mx-12 border-t" />
    <NavigationSection />
    <div className="border-base-300 mx-12 border-t" />
    <ContainersSection />
    <div className="border-base-300 mx-12 border-t" />
    <DataSection />
    <div className="border-base-300 mx-12 border-t" />
    <PricingSection />
    <Footer />
    <DemoModal />
    <GoogleSignInModal />
  </div>
);
