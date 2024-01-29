import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Heading,
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
import { ChessTitleAbbreviation } from '@prisma/client';

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type PlayersTitlesProperties = { titles: TitleTotal[] };

export const PlayersTitles: React.FC<PlayersTitlesProperties> = ({
  titles = [],
}) => {
  const total: number = titles.reduce(
    (previousValue: number, { total }) => previousValue + total,
    0
  );

  return (
    <>
      <Heading className="text-center text-lg md:text-left md:text-2xl">
        Titles ({titles.length})
      </Heading>
      <Accordion allowToggle className="rounded border">
        <AccordionItem className="border-0">
          <AccordionButton className="border-b">
            <div className="flex w-full items-center justify-between">
              <div className="flex-grow text-left">Titles ({total})</div>
              <AccordionIcon />
            </div>
          </AccordionButton>
          <AccordionPanel padding={0}>
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
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};
