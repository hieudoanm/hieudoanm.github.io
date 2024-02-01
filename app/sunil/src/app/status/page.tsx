import { gql } from '@apollo/client';
import { logger } from '@sunil/common/log';
import { queryData } from '@sunil/graphql/apollo/client';
import { StatusTemplate } from '@sunil/shared/templates/StatusTemplate';
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

  return (
    <>
      <Head>
        <title>Status</title>
      </Head>
      <StatusTemplate status={status} />
    </>
  );
};

export default StatusPage;
