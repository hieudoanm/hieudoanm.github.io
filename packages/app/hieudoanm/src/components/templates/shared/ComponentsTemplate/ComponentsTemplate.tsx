import { FC, useState } from 'react';
import { ThemeEditor, buildThemeStyles } from './ThemeEditor';
import { PreviewTabs } from './PreviewTabs';
import { DEFAULT_CONFIG, ThemeConfig } from './ThemePresets';
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
import { CardsSection } from './CardsSection';
import { ExtraSection } from './ExtraSection';

const ComponentsContent: FC = () => (
  <div>
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
    <CardsSection />
    <div className="border-base-300 mx-12 border-t" />
    <ContainersSection />
    <div className="border-base-300 mx-12 border-t" />
    <DataSection />
    <div className="border-base-300 mx-12 border-t" />
    <PricingSection />
    <div className="border-base-300 mx-12 border-t" />
    <ExtraSection />
    <Footer />
    <DemoModal />
    <GoogleSignInModal />
  </div>
);

export const ComponentsTemplate: FC = () => {
  const [config, setConfig] = useState<ThemeConfig>(DEFAULT_CONFIG);

  return (
    <div
      className="bg-base-100 text-base-content flex h-screen font-sans"
      data-theme="nothing"
      style={buildThemeStyles(config)}>
      <ThemeEditor config={config} onChange={setConfig} />
      <PreviewTabs colors={config.colors}>
        <ComponentsContent />
      </PreviewTabs>
    </div>
  );
};
ComponentsTemplate.displayName = 'ComponentsTemplate';
