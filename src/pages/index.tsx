import { NextPage } from 'next';
import Link from 'next/link';
import profile from '@hieudoanm/assets/profile.jpg';
import { FaGithub, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import {
  FaEnvelopeSquare,
  FaFacebookSquare,
  FaInstagramSquare,
} from 'react-icons/fa';
import { FC } from 'react';

enum Language {
  GOLANG_PYTHON_TYPESCRIPT = 'gpt',
  GOLANG = 'go',
  PYTHON = 'py',
  TYPESCRIPT = 'ts',
}

enum Platform {
  FRONT_END_WEB = 'front-end-web',
  FRONT_END_MOBILE = 'front-end-mobile',
  FRONT_END_DESKTOP = 'front-end-desktop',
}

enum API {
  REST = 'REST',
  GRAPHQL = 'graphql',
}

type Project = {
  id: string;
  name: string;
  emoji: string;
  description: string;
  link: string;
  pricing: string;
  language: Language;
  group: 'miniapp' | 'boilerplate';
  subgroup: 'cli' | Platform | API | 'full-stack';
  category: string;
};

const socialMedias = [
  {
    shown: false,
    id: 'email',
    icon: <FaEnvelopeSquare />,
    link: 'mailto:hieumdoan@gmail.com',
    title: 'Email',
  },
  {
    shown: true,
    id: 'linkedin',
    icon: <FaLinkedin />,
    link: 'https://www.linkedin.com/in/hieudoanm',
    title: 'LinkedIn',
  },
  {
    shown: true,
    id: 'github',
    icon: <FaGithub />,
    link: 'https://github.com/hieudoanm',
    title: 'GitHub',
  },
  {
    shown: false,
    id: 'telegram',
    icon: <FaTelegram />,
    link: 'https://t.me/hieudoanm',
    title: 'Telegram',
  },
  {
    shown: false,
    id: 'facebook',
    icon: <FaFacebookSquare />,
    link: 'https://www.facebook.com/hieudoanm',
    title: 'Facebook',
  },
  {
    shown: false,
    id: 'instagram',
    icon: <FaInstagramSquare />,
    link: 'https://www.instagram.com/hieudoan.com.vn/',
    title: 'Instagram',
  },
];

const projects: Project[] = [
  {
    id: 'chess',
    name: 'chess.com Insights',
    emoji: '♟️',
    description:
      'Chess.com Insights: analytics, trends, and personalized data for chess improvement.',
    link: 'https://chessinsights.vercel.app',
    pricing: 'free',
    language: Language.GOLANG_PYTHON_TYPESCRIPT,
    category: 'visualization',
    group: 'miniapp',
    subgroup: 'full-stack',
  },
  {
    id: 'fx',
    name: 'f(x)',
    emoji: '📰',
    description: 'Reading quick news in 10 minutes every morning',
    link: 'https://fxai.vercel.app/',
    pricing: 'free',
    category: 'tool',
    language: Language.GOLANG_PYTHON_TYPESCRIPT,
    group: 'miniapp',
    subgroup: 'full-stack',
  },
  {
    id: 'go-cli',
    name: 'Go CLI',
    emoji: '',
    description:
      'Golang CLI Boilerplate: Foundation for building command-line interfaces in Go.',
    link: 'https://github.com/hieudoanm/go-cli',
    pricing: 'public',
    category: Language.GOLANG,
    language: Language.GOLANG,
    group: 'boilerplate',
    subgroup: 'full-stack',
  },
  {
    id: 'go-gql',
    name: 'Go - GraphQL',
    emoji: '',
    description: 'Go - GraphQL',
    link: 'https://github.com/hieudoanm/go-gql',
    pricing: 'public',
    language: Language.GOLANG,
    group: 'boilerplate',
    subgroup: API.GRAPHQL,
    category: Language.GOLANG,
  },
  {
    id: 'go-htmx',
    name: 'Go - HTMX',
    emoji: '',
    description:
      'Efficient backend with Go, dynamic frontend using HTMX for minimal JavaScript.',
    link: 'https://github.com/hieudoanm/go-htmx',
    pricing: 'public',
    language: Language.GOLANG,
    group: 'boilerplate',
    subgroup: Platform.FRONT_END_WEB,
    category: Language.GOLANG,
  },
  {
    id: 'py-fast',
    name: 'Python - FastAPI',
    emoji: '',
    description: 'Build RESTful API quickly.',
    link: 'https://github.com/hieudoanm/py-fastapi',
    pricing: 'public',
    language: Language.PYTHON,
    group: 'boilerplate',
    subgroup: API.REST,
    category: Language.PYTHON,
  },
  {
    id: 'ts-fe-angular',
    name: 'TypeScript - Angular',
    emoji: '',
    description:
      'Angular Boilerplate: Jumpstart for building fast and reactive web applications effortlessly.',
    link: 'https://github.com/hieudoanm/ts-fe-angular',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: Platform.FRONT_END_WEB,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-fe-gatsby',
    name: 'TypeScript - Gatsby',
    emoji: '',
    description:
      'Gatsby.js Boilerplate: Jumpstart for building fast and reactive web applications effortlessly.',
    link: 'https://github.com/hieudoanm/ts-fe-gatsby',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: Platform.FRONT_END_WEB,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-fe-solid',
    name: 'TypeScript - Solid',
    emoji: '',
    description:
      'Solid.js Boilerplate: Jumpstart for building fast and reactive web applications effortlessly.',
    link: 'https://github.com/hieudoanm/ts-fe-solid',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: Platform.FRONT_END_WEB,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-be-gql',
    name: 'TypeScript - GraphQL',
    emoji: '',
    description:
      'GraphQL Boilerplate: Kickstart GraphQL projects with structured schema and essential configurations.',
    link: 'https://github.com/hieudoanm/ts-be-gql',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: API.GRAPHQL,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-be-hono',
    name: 'TypeScript - Hono',
    emoji: '',
    description:
      'Hono - Serverless Framework: Scalable, efficient, cloud-native, event-driven computing solution.',
    link: 'https://github.com/hieudoanm/ts-be-hono',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: API.REST,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-be-nest',
    name: 'TypeScript - Nest.js',
    emoji: '',
    description:
      'Nest.js Boilerplate: Streamlined foundation for scalable TypeScript backend development.',
    link: 'https://github.com/hieudoanm/ts-be-nest',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: API.REST,
    category: Language.TYPESCRIPT,
  },
  {
    id: 'ts-fs-nett',
    name: 'TypeScript - N.E.T.T',
    emoji: '',
    description:
      'Next.js x Expo x Tauri x tRPC Boilerplate: Starting point for React application.',
    link: 'https://github.com/hieudoanm/ts-fs-nett',
    pricing: 'public',
    language: Language.TYPESCRIPT,
    group: 'boilerplate',
    subgroup: 'full-stack',
    category: Language.TYPESCRIPT,
  },
];

const Boilerplate: FC<{ title: string; boilerplates: Project[] }> = ({
  title = '',
  boilerplates = [],
}) => {
  return (
    <>
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold'>
          {title} Boilerplates ({boilerplates.length})
        </h1>
      </div>
      <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
        {boilerplates.map(
          ({
            id = '',
            name = '',
            emoji = '',
            description = '',
            link = '',
            pricing = '',
          }: Project) => {
            return (
              <div key={id} className='col-span-1'>
                <Link href={link} target='_blank'>
                  <div className='w-full rounded-xl border bg-secondary shadow transition-all hover:shadow-xl'>
                    <div className='flex flex-col gap-y-2 p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-x-2'>
                          <div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white'>
                            {emoji}
                          </div>
                          <h2 className='text-lg font-bold'>{name}</h2>
                        </div>
                        <div className='badge badge-primary capitalize'>
                          {pricing}
                        </div>
                      </div>
                      <p className='truncate text-sm'>{description}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </>
  );
};

const HomePage: NextPage = () => {
  const miniapps = projects.filter(({ group }) => group === 'miniapp');
  // Boilerplates
  const boilerplates = projects.filter(({ group }) => group === 'boilerplate');
  const frontEndBoilerplates = boilerplates.filter(
    ({ subgroup }) => subgroup === Platform.FRONT_END_WEB
  );
  const restBackEndBoilerplates = boilerplates.filter(
    ({ subgroup }) => subgroup === API.REST
  );
  const graphqlBackEndBoilerplates = boilerplates.filter(
    ({ subgroup }) => subgroup === API.GRAPHQL
  );

  return (
    <div data-theme='luxury'>
      <div className='h-screen w-screen overflow-auto bg-white p-8 lg:p-16'>
        <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
          <div className='col-span-1'>
            <div className='flex flex-col items-center justify-center gap-y-8'>
              <div className='mx-auto flex w-[25%] flex-col lg:w-[50%]'>
                <div className='aspect-square w-full overflow-hidden rounded-full border border-secondary'>
                  <div
                    className='h-full w-full rounded-full border-4 border-white bg-cover bg-center'
                    style={{ backgroundImage: `url(${profile.src})` }}
                  />
                </div>
              </div>
              <div className='flex flex-col gap-y-4 text-center'>
                <Link href='/' className='text-2xl font-bold uppercase'>
                  Hieu Doan
                </Link>
                <p>📍 Vietnam</p>
                <div className='flex items-center justify-center gap-x-2'>
                  {socialMedias
                    .filter(({ shown }) => shown)
                    .map(({ id, icon, link }) => {
                      return (
                        <div key={id}>
                          <Link href={link} target='_blank'>
                            {icon}
                          </Link>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-1 lg:col-span-2'>
            <div className='flex flex-col gap-y-8'>
              <h1 className='text-xl font-bold'>Mini Apps</h1>
              <div className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
                {miniapps.map(
                  ({
                    id = '',
                    name = '',
                    emoji = '',
                    description = '',
                    link = '',
                    pricing = '',
                  }: Project) => {
                    return (
                      <div key={id} className='col-span-1'>
                        <Link href={link} target='_blank'>
                          <div className='w-full rounded-xl border bg-secondary shadow transition-all hover:shadow-xl'>
                            <div className='flex flex-col gap-y-2 p-4'>
                              <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-2'>
                                  <div className='flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-white'>
                                    {emoji}
                                  </div>
                                  <h2 className='text-lg font-bold'>{name}</h2>
                                </div>
                                <div className='badge badge-primary capitalize'>
                                  {pricing}
                                </div>
                              </div>
                              <p className='truncate text-sm'>{description}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  }
                )}
              </div>
              <Boilerplate
                title='Front-end'
                boilerplates={frontEndBoilerplates}
              />
              <Boilerplate
                title='REST'
                boilerplates={restBackEndBoilerplates}
              />
              <Boilerplate
                title='GraphQL'
                boilerplates={graphqlBackEndBoilerplates}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
