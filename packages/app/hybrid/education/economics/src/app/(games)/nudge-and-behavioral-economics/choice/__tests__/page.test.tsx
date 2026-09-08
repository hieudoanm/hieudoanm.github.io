import NudgeChoicePage from '@/app/(games)/nudge-and-behavioral-economics/choice/page';
import { render, screen } from '@testing-library/react';

describe('NudgeChoicePage', () => {
  it('renders the nudge design lab', () => {
    render(<NudgeChoicePage />);
    expect(
      screen.getByRole('heading', { name: /Nudge Design Lab/ })
    ).toBeInTheDocument();
    expect(screen.getByText('401(k) enrollment')).toBeInTheDocument();
    expect(screen.getByTestId('design')).toBeInTheDocument();
  });
});
