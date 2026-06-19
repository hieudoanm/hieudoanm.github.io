jest.mock('marked', () => ({
  marked: {
    parse: (text: string) => `<p>${text}</p>`,
  },
}));

jest.mock('dompurify', () => ({
  __esModule: true,
  default: () => ({
    sanitize: (html: string) => html,
  }),
}));

jest.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: () => Promise.resolve(),
}));

import { render } from '@testing-library/react';
import { TypoglycemiaModal } from '../TypoglycemiaModal';

describe('TypoglycemiaModal', () => {
  it('should render', () => {
    const { container } = render(<TypoglycemiaModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
