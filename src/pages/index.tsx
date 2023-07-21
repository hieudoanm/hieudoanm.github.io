import { Button } from '@chakra-ui/react';
import { Link, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FaUser } from 'react-icons/fa';

export type HomePageProperties = {
  data: {
    site: {
      siteMetadata: {
        profiles: { href: string; title: string }[];
      };
    };
  };
};

const HomePage: React.FC<HomePageProperties> = ({ data }) => {
  const profiles = data.site.siteMetadata.profiles || [];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>HIEU DOAN (hieudoanm)</title>
      </Helmet>
      <div
        className="h-screen bg-center bg-cover bg-no-repeat overflow-hidden bg-black"
        style={{ backgroundImage: 'url(/images/jpg/background/hero.jpg)' }}
      >
        <div className="h-screen bg-black/75 overflow-auto">
          <div className="container mx-auto py-16">
            <div className="max-w-fit mx-auto">
              <div className="flex flex-col items-center justify-center gap-8">
                <div className="w-full">
                  <div
                    className="relative w-full rounded-full bg-white"
                    style={{ paddingBottom: '100%' }}
                  >
                    <div className="absolute w-full h-full top-0 left-0">
                      <div className="w-full h-full flex items-center justify-center">
                        <FaUser className="text-black text-8xl" />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl uppercase text-white">HIEU DOAN</h1>
                </div>
                <div className="w-full">
                  <Link to="/about">
                    <Button type="button" className="w-full">
                      About
                    </Button>
                  </Link>
                </div>
                {profiles.map(({ href, title }) => {
                  return (
                    <div
                      key={`profile-${title.toLowerCase()}`}
                      className="w-full"
                    >
                      <a href={href} target="_blank" rel="noreferrer">
                        <Button type="button" className="w-full">
                          {title}
                        </Button>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        profiles {
          href
          title
        }
      }
    }
  }
`;

export default HomePage;
