import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { OpeningsTemplate } from '@chess/templates/OpeningsTemplate';
import { ChessOpening } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';

const openingsQuery = gql`
  query OpeningsQuery($eco: String, $limit: Int, $offset: Int) {
    chess {
      openings(eco: $eco, limit: $limit, offset: $offset) {
        eco
        name
        pgn
        fen
      }
    }
  }
`;

type OpeningsPageProperties = {
  searchParams: { eco: string; limit: number; offset: number };
};

type OpeningsData = { chess: { openings: ChessOpening[] } };

const OpeningsPage: NextPage<OpeningsPageProperties> = async ({
  searchParams,
}: OpeningsPageProperties) => {
  const { eco, limit = 100, offset = 0 } = searchParams;
  const variables = { eco, limit, offset };
  const queryOptions: QueryOptions<OperationVariables, OpeningsData> = {
    query: openingsQuery,
    variables,
  };
  const data: OpeningsData = await query<OpeningsData>(
    'openingsQuery',
    queryOptions
  );
  const openings = data?.chess?.openings ?? [];

  return (
    <>
      <Head>
        <title>{APP_NAME} - Titled</title>
      </Head>
      <Container>
        <OpeningsTemplate openings={openings} />
      </Container>
    </>
  );
};

export default OpeningsPage;
