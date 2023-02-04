import CTA from '@/components/organisms/CTA';
import Footer from '@/components/organisms/Footer';
import Hero from '@/components/organisms/Hero';
import Navbar from '@/components/organisms/Navbar';
import Pricing from '@/components/organisms/Pricing';
import Projects from '@/components/organisms/Projects';
import Services from '@/components/organisms/Services';

export const HomeTemplate: React.FC = () => {
  return (
    <div className="gradient leading-normal tracking-normal text-white">
      <Navbar />
      <Hero />
      <Services />
      <Projects />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default HomeTemplate;
