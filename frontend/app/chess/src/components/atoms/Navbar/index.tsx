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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { APP_NAME, YEAR } from '@chess/common/constants/app.constants';
import { Container } from '@chess/components/atoms/Container';
import Link from 'next/link';
import { FaGithub, FaHamburger, FaTools } from 'react-icons/fa';

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
            <Link href="/countries">
              <Text>Countries</Text>
            </Link>
            <Link href="/streamers">
              <Text>Streamers</Text>
            </Link>
            <Link href="/titled">
              <Text>Titled</Text>
            </Link>
            <Link href="/openings">
              <Text>Openings</Text>
            </Link>
            <Link href="/analysis">
              <Text>Analysis</Text>
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
                    <Icon as={FaHamburger} />
                  </Button>
                </div>
                <Link href="/">
                  <Text textTransform={'uppercase'} fontWeight={600}>
                    {APP_NAME}
                  </Text>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="flex items-center gap-x-4">
                  <Link href="/countries">
                    <Text>Countries</Text>
                  </Link>
                  <Link href="/players">
                    <Text>Players</Text>
                  </Link>
                  <Link href="/streamers">
                    <Text>Streamers</Text>
                  </Link>
                  <Link href="/titled">
                    <Text>Titled</Text>
                  </Link>
                  <Menu>
                    <MenuButton
                      size={'sm'}
                      as={Button}
                      colorScheme="teal"
                      leftIcon={<Icon as={FaTools} />}>
                      <Text>Tools</Text>
                    </MenuButton>
                    <MenuList>
                      {['openings'].map((tool: string) => {
                        return (
                          <Link key={tool} href={`/${tool}`}>
                            <MenuItem className="capitalize">{tool}</MenuItem>
                          </Link>
                        );
                      })}
                    </MenuList>
                  </Menu>
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
