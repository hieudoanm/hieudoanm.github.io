import { gql } from '@apollo/client';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
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
import { apolloClient } from '@chess/common/graphql';
import { logger } from '@chess/common/libs/logger';
import { chunk } from '@chess/common/utils/chunk';
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { Opening } from '@prisma/client';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

type OpeningPageProperties = { eco: string; openings: Opening[] };

const OpeningPage: NextPage<OpeningPageProperties> = ({
  eco = '',
  openings = [],
}) => {
  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
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
                        {
                          eco = '',
                          name = '',
                          firstMove = '',
                          centipawn = 0,
                        }: Opening,
                        index: number
                      ) => {
                        return (
                          <Tr key={`${eco}-${name}`}>
                            <Td>{index + 1}</Td>
                            <Td>
                              <Link href={`/openings/${eco}`}>{eco}</Link>
                            </Td>
                            <Td>{firstMove}</Td>
                            <Td>{centipawn}</Td>
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

const query = gql`
  query OpeningsByEcoQuery($eco: String!) {
    openings(eco: $eco) {
      eco
      name
      pgn
      firstMove
      fen
      centipawn
    }
  }
`;

export const getServerSideProps: GetServerSideProps<
  OpeningPageProperties
> = async (context: GetServerSidePropsContext) => {
  const eco: string = context.query.eco?.toString() ?? '';
  try {
    const {
      data: { openings = [] },
    } = await apolloClient.query<{ openings: Opening[] }>({
      query,
      variables: { eco },
    });
    return { props: { eco, openings } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { eco, openings: [] } };
  }
};

export default OpeningPage;
