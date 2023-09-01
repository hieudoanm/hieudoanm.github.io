import { Box, Button, Icon } from '@chakra-ui/react';
import { Link, graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FaComment,
  FaEnvelope,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaUser,
} from 'react-icons/fa';

export type SocialPageProperties = {
  data: {
    site: {
      siteMetadata: {
        profiles: {
          auth: boolean;
          icon: string;
          href: string;
          title: string;
        }[];
      };
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<string, any> = {
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithubSquare,
  instagram: FaInstagram,
  zalo: FaComment,
  telegram: FaTelegram,
  facebook: FaFacebookSquare,
};

const SocialPage: React.FC<SocialPageProperties> = ({ data }) => {
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
          <div className="container mx-auto py-16 h-full">
            <div className="flex justify-center items-center h-full">
              <div className="max-w-fit mx-auto">
                <div className="flex flex-col items-center justify-center gap-y-8">
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
                      <div className="flex items-center gap-x-4">
                        <Box className="p-3 aspect-square flex items-center bg-white rounded-lg">
                          <Icon as={FaUser} />
                        </Box>
                        <Button type="button" className="w-full">
                          About
                        </Button>
                      </div>
                    </Link>
                  </div>
                  {profiles.map(({ auth, icon, href, title }) => {
                    if (auth) {
                      return <></>;
                    }

                    return (
                      <div
                        key={`profile-${title.toLowerCase()}`}
                        className="w-full"
                      >
                        <a href={href} target="_blank" rel="noreferrer">
                          <div className="flex items-center gap-x-4">
                            <Box className="p-3 aspect-square flex items-center bg-white rounded-lg">
                              <Icon as={icons[`${icon}`]} />
                            </Box>
                            <Button type="button" className="w-full">
                              <span>{title}</span>
                            </Button>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
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
          auth
          icon
          href
          title
        }
      }
    }
  }
`;

export default SocialPage;
