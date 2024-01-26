import { gql } from '@apollo/client';
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardHeader,
  Divider,
  Heading,
  Icon,
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
import { logger } from '@chess/common/libs/logger';
import { ChessOpening } from '@chess/common/types/chess';
import { Container } from '@chess/components/atoms/Container';
import { query } from '@chess/graphql/apollo/client';
import { Layout } from '@chess/layout';
import { NextPage } from 'next';
import { FaChevronRight } from 'react-icons/fa6';

const openingsQuery = gql`
  query OpeningsQuery($eco: String!) {
    chess {
      openings(eco: $eco) {
        eco
        name
        pgn
        fen
      }
    }
  }
`;

type OpeningsResponse = { chess: { openings: ChessOpening[] } };

const OpeningPage: NextPage<{ params: { eco: string } }> = async ({
  params,
}: {
  params: { eco: string };
}) => {
  const eco: string = params.eco ?? 'A00';
  logger.info(`OpeningPage eco=${eco}`);

  const data = await query<OpeningsResponse>({
    query: openingsQuery,
    variables: { eco },
  });
  const openings = data?.chess?.openings ?? [];

  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <Breadcrumb
              separator={<Icon as={FaChevronRight} color="gray.500" />}
            >
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link href="/openings">Openings</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text>{eco}</Text>
              </BreadcrumbItem>
            </Breadcrumb>
            <Card className="border border-gray-200 shadow">
              <CardHeader>
                <Heading as="h1" className="text-xl">
                  Openings by ECO: {eco} ({openings.length})
                </Heading>
              </CardHeader>
              <Divider />
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr>
                      <Th className="w-4">No</Th>
                      <Th className="w-4">ECO</Th>
                      <Th className="w-4">First</Th>
                      <Th className="w-4">Centipawn</Th>
                      <Th>Name</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {openings.map(
                      (
                        { eco = '', name = '' }: ChessOpening,
                        index: number
                      ) => {
                        return (
                          <Tr key={`${eco}-${name}`}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <Link href={`/openings/${eco}`}>{eco}</Link>
                            </Td>
                            <Td>{name}</Td>
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
    </Layout>
  );
};

export default OpeningPage;
