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
  Tr,
} from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TitleBadge } from '@chess/components/atoms/TitleBadge';
import { ChessTitle } from '@prisma/client';
import Link from 'next/link';

export type TitleTotal = { title: ChessTitle; total: number };

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
              <Tbody>
                {titles.map(({ title, total }) => {
                  return (
                    <Tr key={title} className="border-b px-4 py-2">
                      <Td>
                        <Link href={`/titled/${title}`}>
                          <div className="inline-flex items-center gap-x-2">
                            <TitleBadge title={title} />
                            <p>{TITLED_ABBREVIATIONS[title]}</p>
                          </div>
                        </Link>
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
