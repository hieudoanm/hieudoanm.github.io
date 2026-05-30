import { render } from '@testing-library/react';
import { ComponentsTemplate } from '../ComponentsTemplate';

describe('ComponentsTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<ComponentsTemplate />);
    expect(container).toMatchSnapshot();
  });
});
