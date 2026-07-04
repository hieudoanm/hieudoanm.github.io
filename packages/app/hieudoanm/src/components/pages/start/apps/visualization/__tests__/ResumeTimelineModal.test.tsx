import { render } from '@testing-library/react';
import { ResumeTimelineModal } from '../ResumeTimelineModal';

describe('ResumeTimelineModal', () => {
  it('should render', () => {
    const { container } = render(<ResumeTimelineModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
