import { render } from '@testing-library/react';
import { LunarDate } from '../LunarDate';

describe('LunarDate', () => {
  it('should render solar date and lunar date', () => {
    const { container } = render(
      <LunarDate
        chosenDate={new Date(2026, 5, 15)}
        lunarDay={1}
        lunarMonth={5}
        lunarYear={2026}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('should show unavailable when lunar data is null', () => {
    const { container } = render(
      <LunarDate
        chosenDate={new Date(2026, 5, 15)}
        lunarDay={null}
        lunarMonth={null}
        lunarYear={null}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
