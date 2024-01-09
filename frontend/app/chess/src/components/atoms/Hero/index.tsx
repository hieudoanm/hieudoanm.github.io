import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
} from '@chakra-ui/react';
import hero from '@chess/assets/hero.jpg';
import { APP_NAME } from '@chess/common/constants';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';

export const Hero: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>('');

  return (
    <div
      className="h-screen bg-cover bg-right-top"
      style={{ backgroundImage: `url(${hero.src})` }}
    >
      <div className="flex h-full items-center justify-center border-b bg-teal-500/50">
        <Card className="border border-gray-200 shadow">
          <CardHeader>
            <Heading className="text-center text-xl md:text-3xl">
              {APP_NAME}
            </Heading>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="flex flex-col gap-4 text-center">
              <form
                onSubmit={(event: FormEvent) => {
                  event.preventDefault();
                  router.push(`/${username}`);
                }}
              >
                <FormLabel className="truncate">
                  Search with chess.com username
                </FormLabel>
                <div className="flex flex  items-center justify-between gap-x-2 md:gap-x-4">
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                  <IconButton
                    aria-label="search"
                    type="submit"
                    colorScheme="teal"
                    icon={<Icon as={FaSearch} />}
                  />
                </div>
              </form>
            </div>
          </CardBody>
          <Divider />
          <CardFooter display={'block'}>
            <ScrollLink to="demo" smooth={true} spy={true} duration={500}>
              <Button type="button" colorScheme="teal" className="w-full">
                View Demo
              </Button>
            </ScrollLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
