import { FC } from 'react';

import { Header } from '../../../organisms/landing/Header';
import { Hero } from '../../../organisms/landing/Hero';
import { Features } from '../../../organisms/landing/Features';
import { Pricing } from '../../../organisms/landing/Pricing';
import { Testimonials } from '../../../organisms/landing/Testimonials';
import { CallToAction } from '../../../organisms/landing/CallToAction';
import { FrequentlyAskedQuestions } from '../../../organisms/landing/FrequentlyAskedQuestions';
import { Footer } from '../../../organisms/landing/Footer';

export const LandingTemplate: FC = () => (
  <div className="bg-base-100 text-base-content min-h-screen">
    <Header />
    <Hero />
    <Features />
    <Pricing />
    <Testimonials />
    <CallToAction />
    <FrequentlyAskedQuestions />
    <Footer />
  </div>
);
