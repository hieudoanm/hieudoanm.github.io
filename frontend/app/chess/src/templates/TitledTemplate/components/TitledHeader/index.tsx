import { Menu, MenuButton, MenuItem, MenuList, Select } from '@chakra-ui/react';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TimeRange } from '@chess/common/types/time';
import { ChessTitle } from '@prisma/client';

export type TitledHeaderProperties = {
  timeRange: TimeRange;
  total: number;
  title: ChessTitle;
};

export const TitledHeader: React.FC<TitledHeaderProperties> = ({
  timeRange,
  total = 0,
  title,
}) => {
  return (
    <div className="flex items-center justify-between">
      <Menu>
        <MenuButton
          // as={Button}
          // rightIcon={<Icon as={FaChevronDown} />}
          className="bg-white px-0 text-lg md:text-4xl">
          {TITLED_ABBREVIATIONS[title]} ({total})
        </MenuButton>
        <MenuList>
          {Object.entries(TITLED_ABBREVIATIONS)
            .filter(([_key, value]) => !value.includes('Arena'))
            .map(([key, value]) => (
              <MenuItem
                key={key}
                className={`${title === key ? 'font-bold' : ''}`}>
                {value}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
      <div className="rounded shadow">
        <Select
          id="timeRange"
          name="timeRange"
          placeholder="Time Range"
          value={timeRange}>
          <option value="week">7 Days</option>
          <option value="month">30 Days</option>
          <option value="quarter">90 Days</option>
          <option value="year">1 Year</option>
        </Select>
      </div>
    </div>
  );
};
