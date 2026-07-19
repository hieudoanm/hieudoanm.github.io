import { LandingTemplate } from '@/components/templates/landing';
import { FiStar, FiZap, FiShield } from 'react-icons/fi';

const LandingPage = () => (
  <LandingTemplate
    name="Boilerplate"
    tagline="Modern Next.js Starter"
    description="Build faster with TypeScript, Tailwind CSS, and DaisyUI"
    features={[
      {
        icon: <FiStar className="text-primary h-6 w-6" />,
        title: 'Beautiful UI',
        description:
          'Pre-built components with DaisyUI. Dark mode by default, light mode included.',
      },
      {
        icon: <FiZap className="text-primary h-6 w-6" />,
        title: 'Blazing fast',
        description:
          'Built on Next.js App Router. Automatic code splitting, streaming, and edge-ready.',
      },
      {
        icon: <FiShield className="text-primary h-6 w-6" />,
        title: 'Type safe',
        description:
          'Full TypeScript support with strict mode. Catch errors before they reach production.',
      },
    ]}
  />
);

export default LandingPage;
