import {
  Card,
  CardHeader,
  Divider,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ChessOpening } from '@prisma/client';
import Link from 'next/link';

export type OpeningsTemplateProperties = {
  openings: ChessOpening[];
};

export const OpeningsTemplate: React.FC<OpeningsTemplateProperties> = ({
  openings = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 md:gap-y-8">
      <Card className="border border-gray-200 shadow">
        <CardHeader>
          <Heading className="text-xl">Openings ({openings.length})</Heading>
        </CardHeader>
        <Divider />
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th className="w-4">No</Th>
                <Th className="w-4">ECO</Th>
                <Th>Name</Th>
                <Th>FEN</Th>
              </Tr>
            </Thead>
            <Tbody>
              {openings.map(
                (
                  { eco = '', name = '', fen = '' }: ChessOpening,
                  index: number
                ) => {
                  return (
                    <Tr key={`${eco}-${name}`}>
                      <Td>{index + 1}</Td>
                      <Td>
                        <Link href={`/openings/${eco}`}>{eco}</Link>
                      </Td>
                      <Td>
                        <Text title={name} className="w-32 truncate md:w-auto">
                          {name}
                        </Text>
                      </Td>
                      <Td>
                        <Text title={fen} className="w-32 truncate md:w-auto">
                          {fen}
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
  );
};
