import Container from '@mui/material/Container';
import Link from 'next/link';
import React from 'react';
import content from '../../../content';

export const Footer: React.FC = () => {
  return (
    <div id="footer" className="bg-gray-900 py-8">
      <Container>
        <div className="flex items-center justify-between text-white">
          <h1 className="text-lg uppercase">
            &copy; {new Date().getFullYear()} {content.seo.title}
          </h1>
          <div className="flex cursor-pointer gap-4">
            {content.social.map(({ id, url, icon }) => {
              return (
                <Link key={id} href={url} target="_blank">
                  {icon}
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
