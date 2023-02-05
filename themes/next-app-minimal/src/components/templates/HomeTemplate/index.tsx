import CTA from '@/components/organisms/CTA';
import Features from '@/components/organisms/Features';
import Footer from '@/components/organisms/Footer';
import Hero from '@/components/organisms/Hero';
import { content } from '@/content';

export const LandingTemplate: React.FC = () => (
  <div className="text-gray-600 antialiased">
    <Hero
      title={content.hero.title}
      subtitle={content.hero.subtitle}
      description={content.hero.description}
    />
    <Features
      title={content.features.title}
      description={content.features.description}
      features={content.features.features}
    />
    <CTA title={content.banner.title} subtitle={content.banner.subtitle} />
    <Footer title={content.title} />
  </div>
);

export default LandingTemplate;
