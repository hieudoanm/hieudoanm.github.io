import { render, screen } from '@testing-library/react';
import { TextBlock } from '../TextBlock';

describe('TextBlock', () => {
  it('renders a text block preserving line breaks', () => {
    render(<TextBlock text={'First line.\nSecond line.'} />);
    expect(
      screen.getByText(/First line\.\s*Second line\./)
    ).toBeInTheDocument();
  });
});
