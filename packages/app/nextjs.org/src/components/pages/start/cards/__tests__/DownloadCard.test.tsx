import { render } from '@testing-library/react';
import { DownloadCard } from '../DownloadCard';

describe('DownloadCard', () => {
  it('should render', () => {
    const { container } = render(
      <DownloadCard
        label="test"
        description="test"
        emoji="🔥"
        color="#ff0000"
        downloads={[
          { label: 'macOS', url: 'https://example.com/macos' },
          { label: 'Windows', url: 'https://example.com/windows' },
        ]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
