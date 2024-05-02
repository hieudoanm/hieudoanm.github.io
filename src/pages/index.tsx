import { Icon } from '@chakra-ui/react';
import { metadata } from '@hieudoanm/common/configs/metadata';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import type { IconType } from 'react-icons';
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

const icons: Record<string, IconType> = {
  email: FaEnvelope,
  linkedin: FaLinkedin,
  github: FaGithubSquare,
  instagram: FaInstagram,
  zalo: FaComment,
  telegram: FaTelegram,
  facebook: FaFacebookSquare,
};

const SocialPage: NextPage = () => {
  const { profiles = [] } = metadata;

  return (
    <>
      <Head>
        <title>HIEU DOAN (hieudoanm)</title>
      </Head>
      <div
        className="h-screen overflow-hidden bg-black bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/jpg/background/hero.jpg)' }}>
        <div className="h-screen overflow-auto bg-black/75">
          <div className="container mx-auto h-full py-16">
            <div className="flex h-full items-center justify-center">
              <div className="mx-auto max-w-fit">
                <div className="flex flex-col items-center justify-center gap-y-8">
                  <div className="w-full">
                    <div
                      className="relative w-full rounded-full bg-white"
                      style={{ paddingBottom: '100%' }}>
                      <div className="absolute left-0 top-0 h-full w-full">
                        <div className="flex h-full w-full items-center justify-center">
                          <FaUser className="text-8xl text-black" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h1 className="text-4xl uppercase text-white">HIEU DOAN</h1>
                  </div>
                  <div className="w-full">
                    <Link href="/about">
                      <div className="flex items-center gap-x-4">
                        <div className="flex aspect-square items-center rounded-lg bg-white p-3">
                          <FaUser />
                        </div>
                        <button
                          type="button"
                          className="btn btn-primary w-full">
                          About
                        </button>
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
                        className="w-full">
                        <a href={href} target="_blank" rel="noreferrer">
                          <div className="flex items-center gap-x-4">
                            <div className="flex aspect-square items-center rounded-lg bg-white p-3">
                              <Icon as={icons[`${icon}`]} />
                            </div>
                            <button
                              type="button"
                              className="btn btn-primary w-full">
                              <span>{title}</span>
                            </button>
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

export default SocialPage;
