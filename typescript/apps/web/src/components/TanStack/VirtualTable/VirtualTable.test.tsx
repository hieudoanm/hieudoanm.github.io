import { render } from '@testing-library/react';
import { TanstackVirtualTable } from './VirtualTable';

describe('TanstackVirtualTable', () => {
  test('render default', () => {
    const wrapper = render(
      <TanstackVirtualTable
        parentRef={{ current: null }}
        columns={[]}
        data={[]}
      />
    );
    expect(wrapper.container).toMatchSnapshot();
  });
});
