import { fireEvent, render, screen } from '@testing-library/react';
import ExamplesModal from '@/components/editor/ExamplesModal';
import { EXAMPLES } from '@/lib/examples';

describe('ExamplesModal', () => {
  const renderModal = (
    props: Partial<Parameters<typeof ExamplesModal>[0]> = {}
  ) => {
    const onClose = jest.fn();
    const onLoadExample = jest.fn();
    const utils = render(
      <ExamplesModal
        examples={EXAMPLES}
        open
        onClose={onClose}
        onLoadExample={onLoadExample}
        {...props}
      />
    );
    return { ...utils, onClose, onLoadExample };
  };

  it('renders nothing when closed', () => {
    const { container } = renderModal({ open: false });
    expect(container).toBeEmptyDOMElement();
  });

  it('lists every built-in example', () => {
    renderModal();
    expect(screen.getByLabelText('Example diagrams')).toBeInTheDocument();
    for (const example of EXAMPLES) {
      expect(
        screen.getByRole('button', { name: new RegExp(example.name) })
      ).toBeInTheDocument();
    }
  });

  it('filters examples by the search query', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText('Search examples'), {
      target: { value: 'netflix' },
    });
    expect(screen.getByRole('button', { name: /Netflix/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Uber/ })).toBeNull();
  });

  it('searches across interview questions', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText('Search examples'), {
      target: { value: 'surge pricing' },
    });
    expect(screen.getByRole('button', { name: /Uber/ })).toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    renderModal();
    fireEvent.change(screen.getByLabelText('Search examples'), {
      target: { value: 'zzz-no-match' },
    });
    expect(screen.getByText(/No examples match/)).toBeInTheDocument();
  });

  it('loads the selected example', () => {
    const { onLoadExample } = renderModal();
    fireEvent.click(screen.getByRole('button', { name: /Uber/ }));
    expect(onLoadExample).toHaveBeenCalledWith(
      EXAMPLES.find((example) => example.id === 'uber')
    );
  });

  it('closes on Escape and on backdrop click', () => {
    const { container, onClose } = renderModal();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.click(container.firstElementChild!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('does not close when clicking inside the dialog', () => {
    const { onClose } = renderModal();
    fireEvent.click(screen.getByLabelText('Example diagrams'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
