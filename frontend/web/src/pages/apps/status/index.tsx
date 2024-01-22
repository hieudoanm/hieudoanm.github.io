import { gql } from '@apollo/client';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { createApolloClient } from '@hieudoanm/common/apollo';
import { log } from '@hieudoanm/common/log';
import Container from '@hieudoanm/components/Container';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

type StatusPageProps = {
  bitbucket: boolean;
  confluence: boolean;
  github: boolean;
  jira: boolean;
  netlify: boolean;
  render: boolean;
  solana: boolean;
  trello: boolean;
  vercel: boolean;
};

const StatusPage: NextPage<StatusPageProps> = ({
  bitbucket = false,
  confluence = false,
  github = false,
  jira = false,
  netlify = false,
  render = false,
  solana = false,
  trello = false,
  vercel = false,
}) => {
  return (
    <>
      <Head>
        <title>Status</title>
      </Head>
      <Container>
        <div className="p-8">
          <div className="overflow-hidden rounded border border-gray-200 shadow">
            <Card>
              <CardHeader>
                <Heading>Status</Heading>
              </CardHeader>
              <List>
                {Object.entries({
                  bitbucket,
                  confluence,
                  github,
                  jira,
                  netlify,
                  render,
                  solana,
                  trello,
                  vercel,
                }).map(([service, error]) => {
                  const bgColor = error ? 'bg-red-500' : 'bg-green-500';
                  return (
                    <ListItem key={service} className="border-t">
                      <CardBody>
                        <div className="flex items-center justify-between">
                          <Text>{service}</Text>
                          <Box className={`h-6 w-6 rounded-full ${bgColor}`} />
                        </div>
                      </CardBody>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

const query = gql`
  query {
    status {
      bitbucket
      confluence
      github
      jira
      netlify
      render
      solana
      trello
      vercel
    }
  }
`;

export const getStaticProps: GetStaticProps<StatusPageProps> = async () => {
  try {
    const client = createApolloClient();
    const { data } = await client.query<{ status: StatusPageProps }>({ query });
    const { status } = data;
    return { props: { ...status } };
  } catch (error) {
    log.error(`getStaticProps error=${error}`);
    return {
      props: {
        bitbucket: false,
        confluence: false,
        github: false,
        jira: false,
        netlify: false,
        render: false,
        solana: false,
        trello: false,
        vercel: false,
      },
    };
  }
};

export default StatusPage;
