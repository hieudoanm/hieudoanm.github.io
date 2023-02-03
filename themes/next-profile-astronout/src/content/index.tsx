import { Facebook, GitHub, Twitter } from '@mui/icons-material';
import ezgames from '../assets/images/projects/ezgames.png';
import footballbattle from '../assets/images/projects/footballbattle.png';
import project3 from '../assets/images/projects/img3.png';

const content = {
  seo: {
    title: 'Hieu',
    description:
      'This website is build with Next.js, Tailwindcss and MUI (my front-end techstack). My back-end teckstack includes Node.js, GraphQL, Prisma, MongoDB, PostgreSQL and Supabase. I am self-learning Machine Learning.',
  },
  projects: [
    {
      id: 'ezgames',
      url: 'https://ezgames.cc/',
      image: ezgames,
    },
    {
      id: 'footballbattle',
      url: 'https://footballbattle.co/',
      image: footballbattle,
    },
    { id: '', url: '', image: project3 },
  ],
  social: [
    {
      id: 'facebook',
      url: 'https://facebook.com/hieudoanm',
      icon: <Facebook />,
    },
    { id: 'twitter', url: 'https://twitter.com/hieudoanm', icon: <Twitter /> },
    { id: 'github', url: 'https://github.com/hieudoanm', icon: <GitHub /> },
  ],
};

export default content;
