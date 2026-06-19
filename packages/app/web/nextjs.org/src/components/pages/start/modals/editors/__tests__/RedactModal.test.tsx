import { render } from '@testing-library/react';
import { RedactModal } from '../RedactModal';

jest.mock('react-pdf', () => ({
  Document: ({ children }: any) => <div>{children}</div>,
  Page: () => <div>Page</div>,
  pdfjs: {
    GlobalWorkerOptions: {},
    version: '1.2.3',
  },
}));

jest.mock('fabric', () => ({
  Canvas: jest.fn().mockImplementation(() => ({
    setDimensions: jest.fn(),
    on: jest.fn(),
    getObjects: jest.fn().mockReturnValue([]),
    renderAll: jest.fn(),
  })),
  Rect: jest.fn(),
}));

describe('RedactModal', () => {
  it('should render', () => {
    const { container } = render(<RedactModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
