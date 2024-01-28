import { render } from '@testing-library/react';
import { CountryTitles } from '..';

describe('CountryTitles', () => {
  it('to match snapshot', () => {
    const { container } = render(<CountryTitles titles={[]} />);
    expect(container).toMatchSnapshot();
  });
});
