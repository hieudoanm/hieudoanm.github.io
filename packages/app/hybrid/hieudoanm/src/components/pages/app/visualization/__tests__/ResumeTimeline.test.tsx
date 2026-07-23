import { render } from '@testing-library/react';
import { ResumeTimeline } from '../ResumeTimelineModal';

describe('ResumeTimeline', () => {
  it('should render', () => {
    const { container } = render(<ResumeTimeline onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
