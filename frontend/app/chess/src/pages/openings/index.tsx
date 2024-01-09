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
import { Container } from '@chess/components/atoms/Container';
import { Layout } from '@chess/layout';
import { Opening } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

type OpeningsPageProperties = {
  openings: Opening[];
};

const OpeningsPage: NextPage<OpeningsPageProperties> = ({ openings = [] }) => {
  return (
    <Layout>
      <Container>
        <div className="py-4 md:py-8">
          <div className="flex flex-col gap-y-4 md:gap-y-8">
            <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
              <BreadcrumbItem>
                <Link href="/">Home</Link>
              </BreadcrumbItem>
              <BreadcrumbItem isCurrentPage>
                <Text>Openings</Text>
              </BreadcrumbItem>
            </Breadcrumb>
            <Card className="border border-gray-200 shadow">
              <CardHeader>
                <Heading as="h1" className="text-xl">
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
                            <Td>
                              <Text
                                title={name}
                                className="w-32 truncate md:w-auto"
                              >
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
    </Layout>
  );
};

const query = gql`
  query OpeningsQuery {
    openings {
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
  OpeningsPageProperties
> = async () => {
  try {
    const {
      data: { openings = [] },
    } = await apolloClient.query<{ openings: Opening[] }>({ query });
    return { props: { openings } };
  } catch (error) {
    logger.error(`getServerSideProps error=${error}`);
    return { props: { openings: [] } };
  }
};

export default OpeningsPage;
