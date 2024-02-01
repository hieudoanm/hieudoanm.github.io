import { gql } from '@apollo/client';
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import { logger } from '@sunil/common/log';
import { queryData } from '@sunil/graphql/apollo/client';
import { NextPage } from 'next';
import Head from 'next/head';

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

export type StatusData = {
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

const StatusPage: NextPage = async () => {
  const data = await queryData<{ status: StatusData }>({ query });
  const { status = {} as StatusData } = data;
  logger.info(status, 'StatusPage');
  const {
    bitbucket = false,
    confluence = false,
    github = false,
    jira = false,
    netlify = false,
    render = false,
    solana = false,
    trello = false,
    vercel = false,
  } = status;

  return (
    <>
      <Head>
        <title>Status</title>
      </Head>
      <Card className="overflow-hidden rounded border border-gray-200 shadow">
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
                    <p className="uppercase">{service}</p>
                    <div className={`h-6 w-6 rounded-full ${bgColor}`} />
                  </div>
                </CardBody>
              </ListItem>
            );
          })}
        </List>
      </Card>
    </>
  );
};

export default StatusPage;
