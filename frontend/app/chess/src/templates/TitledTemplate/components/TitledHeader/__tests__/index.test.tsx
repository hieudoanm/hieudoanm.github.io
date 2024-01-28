import { render } from '@testing-library/react';
import { TitledHeader } from '..';

describe('TitledHeader', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <TitledHeader title="GM" total={0} timeRange="year" />
    );
    expect(container).toMatchSnapshot();
  });
});
