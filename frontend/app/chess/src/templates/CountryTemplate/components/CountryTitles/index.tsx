import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { ChessTitleAbbreviation } from '@prisma/client';

export type TitleTotal = { title: ChessTitleAbbreviation; total: number };

export type CountryTitlesProperties = { titles: TitleTotal[] };

export const CountryTitles: React.FC<CountryTitlesProperties> = ({
  titles = [],
}) => {
  return (
    <Accordion allowToggle className="rounded border">
      <AccordionItem className="border-0">
        <AccordionButton className="border-b">
          <div className="flex w-full items-center justify-between">
            <div className="flex-grow text-left">Titled ({titles.length})</div>
            <AccordionIcon />
          </div>
        </AccordionButton>
        <AccordionPanel padding={0}>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th isNumeric>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {titles.map(({ title, total }) => {
                  return (
                    <Tr key={title} className="border-b px-4 py-2">
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
  );
};
