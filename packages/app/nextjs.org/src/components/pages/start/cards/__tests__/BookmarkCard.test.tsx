import { render } from '@testing-library/react';
import { BookmarkCard } from '../BookmarkCard';

describe('BookmarkCard', () => {
  it('should render', () => {
    const { container } = render(
      <BookmarkCard
        label="test"
        url="https://example.com"
        description="test"
        emoji="test"
        color="#ff0000"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
