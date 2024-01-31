import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TitleBadge } from '@chess/common/components/TitleBadge';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TitleTotal } from '../PlayersTitles';

export const PlayersTitlesTable: React.FC<{ titles: TitleTotal[] }> = ({
  titles = [],
}) => {
  if (titles.length === 0) return <></>;

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th className="w-4">No</Th>
            <Th>Title</Th>
            <Th isNumeric>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {titles.map(({ title, total }, index) => {
            return (
              <Tr key={title} className="border-b px-4 py-2">
                <Td>{index + 1}</Td>
                <Td>
                  <div className="inline-flex items-center gap-x-2">
                    <TitleBadge title={title} />
                    <p>{TITLED_ABBREVIATIONS[title]}</p>
                  </div>
                </Td>
                <Td isNumeric>{total}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
