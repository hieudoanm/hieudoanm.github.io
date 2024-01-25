'use client';

import { Icon, IconButton, Input, InputGroup } from '@chakra-ui/react';
import Container from '@mini/components/Container';
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { v4 } from 'uuid';

const UuidPage: NextPage = () => {
  const [uuid, setUuid] = useState(v4());

  return (
    <>
      <Head>
        <title>UUID</title>
      </Head>
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
