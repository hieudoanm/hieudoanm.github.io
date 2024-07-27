import { render } from '@testing-library/react';
import { GridTemplate, ListTemplate } from './Apps';

describe('GridTemplate', () => {
  test('render default', () => {
    const wrapper = render(<GridTemplate />);
    expect(wrapper.container).toMatchSnapshot();
  });
});

describe('ListTemplate', () => {
  test('render default', () => {
    const wrapper = render(<ListTemplate />);
    expect(wrapper.container).toMatchSnapshot();
  });
});
