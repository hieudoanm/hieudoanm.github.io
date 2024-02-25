import { OperationVariables, QueryOptions, gql } from '@apollo/client';
import { APP_NAME } from '@chess/common/constants/app.constants';
import { BUILD_ENV } from '@chess/common/environments/environments';
import { logger } from '@chess/common/libs/logger';
import { query } from '@chess/graphql/apollo/client';
import { OpeningsTemplate } from '@chess/shared/templates/OpeningsTemplate';
import { ChessOpening } from '@prisma/client';
import { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
  title: `${APP_NAME} - Openings`,
};

const openingsQuery = gql`
  query OpeningsQuery($eco: String, $limit: Int, $offset: Int) {
    chess {
      ecos
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
  searchParams: { eco: string; limit: string; offset: string };
};

type OpeningsData = { chess: { ecos: string[]; openings: ChessOpening[] } };

const OpeningsPage: NextPage<OpeningsPageProperties> = async ({
  searchParams,
}: OpeningsPageProperties) => {
  const {
    eco,
    limit: limitString = '100',
    offset: offsetString = '0',
  } = searchParams;
  const limit: number = Number.parseInt(limitString ?? '100');
  const offset: number = Number.parseInt(offsetString ?? '0');
  const variables = { eco, limit, offset };
  const queryOptions: QueryOptions<OperationVariables, OpeningsData> = {
    query: openingsQuery,
    variables,
  };

  const data: OpeningsData = await query<OpeningsData>(
    'openingsQuery',
    queryOptions
  );
  const ecos: string[] = data?.chess?.ecos ?? [];
  const openings = data?.chess?.openings ?? [];
  logger.info({ ecos: ecos.length, openings: openings.length }, 'OpeningsPage');

  return <OpeningsTemplate ecos={ecos} openings={openings} />;
};

export const dynamic =
  BUILD_ENV === 'static' ? 'force-static' : 'force-dynamic';

export default OpeningsPage;
