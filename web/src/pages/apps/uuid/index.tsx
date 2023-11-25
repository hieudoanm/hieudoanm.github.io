import { Icon, IconButton, Input, InputGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import Container from '../../../components/atoms/Container';
import { Helmet } from 'react-helmet';
import { FaSpinner } from 'react-icons/fa';

export const UuidPage: React.FC = () => {
  const [uuid, setUuid] = useState(v4());

  return (
    <>
      <Helmet>
        <title>UUID</title>
      </Helmet>
      <div className="h-screen w-screen">
        <Container className="h-full">
          <div className="flex h-full items-center justify-center">
            <InputGroup gap={4}>
              <Input value={uuid} />
              <IconButton
                colorScheme="teal"
                onClick={() => setUuid(v4())}
                aria-label={'UUID'}
                icon={<Icon as={FaSpinner} />}
              />
            </InputGroup>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UuidPage;
