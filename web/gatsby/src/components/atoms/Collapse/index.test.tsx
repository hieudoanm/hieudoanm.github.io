import { render } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';
import React from 'react';
import Collapse from './index';

expect.extend(toHaveNoViolations);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Collapse', () => {
  test('render default', () => {
    const wrapper = render(<Collapse>Collapse</Collapse>);

    expect(wrapper.container).toMatchSnapshot();
  });

  test('render active', () => {
    const wrapper = render(<Collapse active>Collapse</Collapse>);

    expect(wrapper.container).toMatchSnapshot();
  });

  test('render active with class', () => {
    const wrapper = render(
      <Collapse active className="class">
        Collapse
      </Collapse>
    );

    expect(wrapper.container).toMatchSnapshot();
  });
});
