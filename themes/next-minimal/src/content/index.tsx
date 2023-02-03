import { GitHub, LinkedIn, Twitter } from '@mui/icons-material';
import web1 from '../assets/images/projects/web1.png';
import web2 from '../assets/images/projects/web2.png';
import web3 from '../assets/images/projects/web3.png';
import web4 from '../assets/images/projects/web4.png';
import web5 from '../assets/images/projects/web5.png';
import web6 from '../assets/images/projects/web6.png';
import code from '../assets/images/services/code.png';
import consulting from '../assets/images/services/consulting.png';
import design from '../assets/images/services/design.png';

const content = {
  seo: {
    title: 'Hieu Doan',
    description:
      "Freelancer providing services for programming and design content needs. Join me down below and let's get cracking!",
  },
  social: [
    {
      id: 'github',
      url: 'https://github.com/hieudoanm',
      icon: <GitHub fontSize="large" className="text-white" />,
    },
    {
      id: 'linkedin',
      url: 'https://linkedin.com/in/hieudoanm',
      icon: <LinkedIn fontSize="large" className="text-white" />,
    },
    {
      id: 'twitter',
      url: 'https://twitter.com/hieudoanm',
      icon: <Twitter fontSize="large" className="text-white" />,
    },
  ],
  services: [
    {
      id: 'front-end',
      image: design,
      title: 'Front-end',
      description:
        'Creating elegant designs suited for your needs following core design theory.',
      tools: ['React', 'Next.js', 'Tailwindcss', 'MUI'],
    },
    {
      id: 'back-end',
      image: consulting,
      title: 'Back-end',
      description:
        "Do you have an idea for your next great website? Let's make it a reality.",
      tools: ['Node.js', 'Golang', 'Prisma', 'PostgreSQL'],
    },
    {
      id: 'consulting',
      image: code,
      title: 'Consulting',
      description:
        'Are you interested in feedback for your current project? I can give you tips and tricks to level it up.',
      tools: [
        'Front-end Development',
        'Back-end Development',
        'Infrastructure as Code',
        'Machine Learning',
      ],
    },
  ],
  projects: [
    { id: 1, url: '#', title: 'web1', image: web1 },
    { id: 2, url: '#', title: 'web2', image: web2 },
    { id: 3, url: '#', title: 'web3', image: web3 },
    { id: 4, url: '#', title: 'web4', image: web4 },
    { id: 5, url: '#', title: 'web5', image: web5 },
    { id: 6, url: '#', title: 'web6', image: web6 },
  ],
};

export default content;
