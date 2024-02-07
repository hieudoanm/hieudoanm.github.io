'use client';

import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Container } from '@chess/common/components/Container';
import { APP_NAME, YEAR } from '@chess/common/constants/app.constants';
import Link from 'next/link';
import { FaBars, FaGithub } from 'react-icons/fa';

const GitHubButton: React.FC<{ size: string }> = ({ size = 'md' }) => {
  return (
    <Link
      href="https://github.com/hieudoanm"
      className="font-bold"
      target="_blank">
      <button
        type="button"
        className="flex w-full items-center gap-x-2 bg-teal-500 text-white btn btn-xs">
        <FaGithub />
        <p>GitHub</p>
      </button>
    </Link>
  );
};

export const MobileDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{APP_NAME}</DrawerHeader>
        <div className="divider m-0" />
        <DrawerBody>
          <div className="flex flex-col gap-y-4">
            <Link href="/players">
              <p>Players</p>
            </Link>
            <div className="divider m-0" />
            <Link href="/openings">
              <p>Openings</p>
            </Link>
            <Link href="/rating">
              <p>Rating</p>
            </Link>
            <GitHubButton size="md" />
          </div>
        </DrawerBody>
        <div className="divider m-0" />
        <DrawerFooter justifyContent="start">
          &copy; {YEAR} {APP_NAME}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <nav className="border-b shadow">
        <Container>
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className="block md:hidden">
                  <button
                    type="button"
                    className="bg-teal-500 text-white btn btn-xs"
                    onClick={onOpen}>
                    <FaBars />
                  </button>
                </div>
                <Link href="/">
                  <p className="uppercase font-bold">{APP_NAME}</p>
                </Link>
                <div className="hidden md:block">
                  <div className="flex items-center gap-x-4">
                    <Link href="/players">
                      <p>Players</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-x-4">
                  <Link href="/openings">
                    <p>Openings</p>
                  </Link>
                  <Link href="/rating">
                    <p>Rating</p>
                  </Link>
                  <GitHubButton size="sm" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};
