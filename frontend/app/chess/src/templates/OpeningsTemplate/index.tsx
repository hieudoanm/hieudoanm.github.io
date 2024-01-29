import {
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
import { OpeningsHeader } from './components/OpeningsHeader';

export type OpeningsTemplateProperties = {
  ecos: string[];
  openings: ChessOpening[];
};

export const OpeningsTemplate: React.FC<OpeningsTemplateProperties> = ({
  ecos = [],
  openings = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <OpeningsHeader ecos={[]} total={openings.length} />
      <TableContainer className="overflow-hidden rounded border border-gray-200 shadow">
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
    </div>
  );
};
