import { render } from '@testing-library/react';
import { LandingTemplate } from '../LandingTemplate';

describe('LandingTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<LandingTemplate />);
    expect(container).toMatchSnapshot();
  });
});
