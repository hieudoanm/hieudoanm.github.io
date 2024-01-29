import { Heading, Select } from '@chakra-ui/react';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import flags from '@chess/common/json/flags.json';
import { ChessTitle } from '@prisma/client';

export const CountryHeader: React.FC<{
  countryCode: string;
  titles: ChessTitle[];
}> = ({ countryCode, titles = [] }) => {
  const [title, setTitle] = useSearchParameter('title');

  return (
    <div className="flex items-center justify-between">
      <Heading style={{ wordSpacing: '16px' }}>
        {(flags as Record<string, string>)[countryCode]} {countryCode}
      </Heading>
      <div className="flex items-center gap-x-2">
        <Select
          aria-label="Title"
          id="title"
          name="title"
          className="shadow"
          value={title}
          onChange={(event) => {
            const newTitle: string = event.target.value;
            setTitle(newTitle);
          }}>
          <option value="">Title</option>
          {titles.map(({ abbreviation, title }) => (
            <option key={abbreviation} value={abbreviation}>
              {title}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
};
