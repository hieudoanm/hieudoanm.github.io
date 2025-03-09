import { NextPage } from 'next';
import Link from 'next/link';
import {
  FaAppStoreIos,
  FaLinkedin,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareTwitter,
} from 'react-icons/fa6';

const HomePage: NextPage = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 p-8">
      <div className="flex h-full flex-col items-center justify-center gap-y-8 text-black">
        <p className="text-xl font-black tracking-wide uppercase">Hieu</p>
        <div className="flex flex-col items-center justify-center gap-y-2">
          {[
            {
              id: 'apps',
              href: '/apps',
              name: 'Apps',
              icon: <FaAppStoreIos />,
              target: '_self',
            },
            {
              id: 'github',
              href: 'https://github.com/hieudoanm',
              name: 'GitHub',
              icon: <FaSquareGithub />,
              target: '_blank',
            },
            {
              id: 'twitter',
              href: 'https://x.com/hieudoanm',
              name: 'Twitter',
              icon: <FaSquareTwitter />,
              target: '_blank',
            },
            {
              id: 'linkedin',
              href: 'https://www.linkedin.com/in/hieudoanm',
              name: 'LinkedIn',
              icon: <FaLinkedin />,
              target: '_blank',
            },
            {
              id: 'instagram',
              href: 'https://instagram.com/hieudoanm',
              name: 'Instagram',
              icon: <FaSquareInstagram />,
              target: '_blank',
            },
          ].map(({ id, href, name, icon, target = '_self' }) => {
            return (
              <div
                key={id}
                className="flex items-center gap-x-1 border-b border-dotted">
                {icon}
                <Link
                  href={href}
                  target={target}
                  className="tracking-wide lowercase">
                  {name}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const dynamic = 'force-static';

export default HomePage;
