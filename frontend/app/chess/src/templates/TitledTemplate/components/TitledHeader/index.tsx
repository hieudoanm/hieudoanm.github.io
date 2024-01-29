import { Heading, Select } from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { useSearchParameter } from '@chess/common/hooks/use-search-param';
import { logger } from '@chess/common/libs/logger';

export type TitledHeaderProperties = {
  total: number;
};

export const TitledHeader: React.FC<TitledHeaderProperties> = ({
  total = 0,
}) => {
  const [title, setTitle] = useSearchParameter('title', 'GM');
  const [timeRange, setTimeRange] = useSearchParameter('timeRange');

  return (
    <div className="flex items-center justify-between">
      <Heading>Players ({total})</Heading>
      <div className="flex items-center justify-between gap-x-2 md:gap-x-4">
        <Select
          id="title"
          name="title"
          placeholder="Title"
          className="shadow"
          value={title}
          onChange={(event) => {
            const newTitle: string = event.target.value;
            logger.info(`newTitle=${newTitle}`);
            setTitle(newTitle);
          }}>
          {Object.entries(TITLED_ABBREVIATIONS)
            .filter(([_key, value]) => !value.includes('Arena'))
            .map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
        </Select>
        <Select
          id="timeRange"
          name="timeRange"
          placeholder="Time Range"
          className="shadow"
          value={timeRange}
          onChange={(event) => {
            const newTimeRange: string = event.target.value;
            setTimeRange(newTimeRange);
          }}>
          <option value="week">7 Days</option>
          <option value="month">30 Days</option>
          <option value="quarter">90 Days</option>
          <option value="year">1 Year</option>
        </Select>
      </div>
    </div>
  );
};
