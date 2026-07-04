import { render } from '@testing-library/react';
import { DownloadsTemplate } from '../DownloadsTemplate';

describe('DownloadsTemplate', () => {
  it('to match snapshot', () => {
    const { container } = render(<DownloadsTemplate />);
    expect(container).toMatchSnapshot();
  });
});
