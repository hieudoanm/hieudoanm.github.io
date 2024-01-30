'use client';

import { useSearchParameter } from '@broca/common/hooks/use-search-param';
import {
  Card,
  CardHeader,
  FormControl,
  Heading,
  Select,
  Switch,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Language } from '@prisma/client';
import Link from 'next/link';

type LanguagesTemplateProperties = {
  languages: Language[];
};

export const LanguagesTemplate: React.FC<LanguagesTemplateProperties> = ({
  languages = [],
}) => {
  const [category, setCategory] = useSearchParameter('category');
  const [duolingo, setDuolingo] = useSearchParameter('duolingo', 'false');

  return (
    <Card className="border border-gray-200">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <Heading className="text-xl">Languages ({languages.length})</Heading>
          <div className="flex items-center gap-x-1 md:gap-x-2">
            <Switch
              size="lg"
              id="duolingo"
              name="duolingo"
              title="duolingo"
              colorScheme="teal"
              checked={duolingo === 'true'}
              onChange={() => setDuolingo((duolingo !== 'true').toString())}
            />
            <FormControl>
              <Select
                size="sm"
                id="category"
                name="category"
                placeholder="Category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </Select>
            </FormControl>
          </div>
        </div>
      </CardHeader>
      <TableContainer>
        <Table>
          <TableCaption className="pb-4">
            Languages ({languages.length})
          </TableCaption>
          <Thead>
            <Tr>
              <Th>Code</Th>
              <Th isNumeric className="w-8">
                Name
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {languages.map(({ cca3, name }) => {
              return (
                <Tr key={cca3}>
                  <Td>
                    <Link href={`/languages/${encodeURIComponent(cca3)}`}>
                      {cca3}
                    </Link>
                  </Td>
                  <Td isNumeric>{name}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

LanguagesTemplate.displayName = 'LanguagesTemplate';
