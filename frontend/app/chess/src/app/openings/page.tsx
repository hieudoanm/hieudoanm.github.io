import { gql } from '@apollo/client';
import {
  Card,
  CardHeader,
  Divider,
  Heading,
  Link,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { ChessOpening } from '@prisma/client';
import { NextPage } from 'next';

const openingsQuery = gql`
  query OpeningsQuery($eco: String) {
    chess {
      openings {
        eco
        name
        pgn
        firstMove
        fen
        centipawn
      }
    }
  }
`;

type OpeningsPageProperties = {
  params: { eco: string };
};

type OpeningsResponse = { chess: { openings: ChessOpening[] } };

const OpeningsPage: NextPage<OpeningsPageProperties> = async ({
  params,
}: OpeningsPageProperties) => {
  const eco = params.eco ?? undefined;
  const data = await query<OpeningsResponse>({
    query: openingsQuery,
    variables: { eco },
  });
  const openings = data?.chess?.openings ?? [];

  return (
    <Container>
      <div className="py-4 md:py-8">
        <div className="flex flex-col gap-y-4 md:gap-y-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>
              <Heading className="text-xl">
                Openings ({openings.length})
              </Heading>
            </CardHeader>
            <Divider />
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    <Th className="w-4">No</Th>
                    <Th className="w-4">ECO</Th>
                    <Th>Name</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {openings.map(
                    ({ eco = '', name = '' }: ChessOpening, index: number) => {
                      return (
                        <Tr key={`${eco}-${name}`}>
                          <Td>{index + 1}</Td>
                          <Td>
                            <Link href={`/openings/${eco}`}>{eco}</Link>
                          </Td>
                          <Td>
                            <Text
                              title={name}
                              className="w-32 truncate md:w-auto">
                              {name}
                            </Text>
                          </Td>
                        </Tr>
                      );
                    }
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default OpeningsPage;
