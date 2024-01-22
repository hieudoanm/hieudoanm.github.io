import { useUser } from '@auth0/nextjs-auth0/client';
import { ChevronDownIcon, HamburgerIcon, Icon } from '@chakra-ui/icons';
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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import {
  APP_NAME,
  TITLED_ABBREVIATIONS,
  TITLES,
  YEAR,
} from '@chess/common/constants';
import { Container } from '@chess/components/atoms/Container';
import Link from 'next/link';
import {
  FaChessKnight,
  FaCog,
  FaGithub,
  FaSignInAlt,
  FaSignOutAlt,
  FaTools,
  FaUser,
} from 'react-icons/fa';

const AuthButton: React.FC<{ size: string }> = ({ size = 'md' }) => {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <Menu>
          <MenuButton
            size={size}
            as={Button}
            colorScheme="teal"
            leftIcon={<Icon as={FaCog} />}>
            Settings
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="/profile" className="flex items-center gap-x-2">
                <Icon as={FaUser} />
                <Text>Profile</Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                href="/api/auth/logout"
                className="flex items-center gap-x-2">
                <Icon as={FaSignOutAlt} />
                <Text>Sign Out</Text>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link href="/api/auth/login">
          <Button
            size={size}
            colorScheme="teal"
            className="flex w-full items-center gap-x-2">
            <Icon as={FaSignInAlt} />
            <Text>Sign In</Text>
          </Button>
        </Link>
      )}
    </>
  );
};

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
            <AuthButton size="md" />
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
                    <HamburgerIcon />
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
                      {['openings', 'analysis'].map((tool: string) => {
                        return (
                          <Link key={tool} href={`/${tool}`}>
                            <MenuItem className="capitalize">{tool}</MenuItem>
                          </Link>
                        );
                      })}
                    </MenuList>
                  </Menu>
                  <GitHubButton size="sm" />
                  <AuthButton size="sm" />
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
