import { render } from '@testing-library/react';
import { TanStackTable } from './Table';

describe('TanStackTable', () => {
  test('render default', () => {
    const wrapper = render(<TanStackTable columns={[]} data={[]} />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
