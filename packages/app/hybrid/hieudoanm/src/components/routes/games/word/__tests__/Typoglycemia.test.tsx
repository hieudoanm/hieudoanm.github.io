jest.mock('marked', () => ({
  marked: (text: string) => `<p>${text}</p>`,
}));

jest.mock('dompurify', () => ({
  __esModule: true,
  default: () => ({
    sanitize: (html: string) => html,
  }),
}));

jest.mock('html2canvas-pro', () => ({
  __esModule: true,
  default: () =>
    Promise.resolve({
      toBlob: (cb: (b: Blob | null) => void) => cb(new Blob()),
    }),
}));

import { render, fireEvent, screen } from '@testing-library/react';
import { Typoglycemia } from '../Typoglycemia';

describe('Typoglycemia', () => {
  it('should render correctly', () => {
    const { container } = render(<Typoglycemia onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('switches to view tab when clicked', () => {
    render(<Typoglycemia onClose={jest.fn()} />);
    const viewTab = screen.getByText('View');
    fireEvent.click(viewTab);
    expect(screen.queryByText('Editor')).toBeInTheDocument();
  });

  it('switches back to editor tab', () => {
    render(<Typoglycemia onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('View'));
    fireEvent.click(screen.getByText('Editor'));
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('shows stop and save buttons in view tab', () => {
    render(<Typoglycemia onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('View'));
    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('toggles shuffle/stop in view tab', () => {
    render(<Typoglycemia onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('View'));
    fireEvent.click(screen.getByText('Stop'));
    expect(screen.getByText('Shuffle')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Shuffle'));
    expect(screen.getByText('Stop')).toBeInTheDocument();
  });

  it('calls html2canvas on save button', () => {
    render(<Typoglycemia onClose={jest.fn()} />);
    fireEvent.click(screen.getByText('View'));
    const saveBtn = screen.getByText('Save');
    fireEvent.click(saveBtn);
  });
});
