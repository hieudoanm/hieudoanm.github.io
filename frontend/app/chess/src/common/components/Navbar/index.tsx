'use client';

import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  Text,
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
      <Button
        size={size}
        colorScheme="teal"
        className="flex w-full items-center gap-x-2">
        <Icon as={FaGithub} />
        <Text>GitHub</Text>
      </Button>
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
        <Divider />
        <DrawerBody>
          <div className="flex flex-col gap-y-4">
            <Link href="/players">
              <Text>Players</Text>
            </Link>
            <Link href="/titled">
              <Text>Titled</Text>
            </Link>
            <Divider />
            <Link href="/openings">
              <Text>Openings</Text>
            </Link>
            <Link href="/rating">
              <Text>Rating</Text>
            </Link>
            <GitHubButton size="md" />
          </div>
        </DrawerBody>
        <Divider />
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
                  <Button colorScheme="teal" onClick={onOpen} size="sm">
                    <Icon as={FaBars} />
                  </Button>
                </div>
                <Link href="/">
                  <Text textTransform={'uppercase'} fontWeight={600}>
                    {APP_NAME}
                  </Text>
                </Link>
                <div className="hidden md:block">
                  <div className="flex items-center gap-x-4">
                    <Link href="/players">
                      <Text>Players</Text>
                    </Link>
                    <Link href="/titled">
                      <Text>Titled</Text>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-x-4">
                  <Link href="/openings">
                    <Text>Openings</Text>
                  </Link>
                  <Link href="/rating">
                    <Text>Rating</Text>
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
