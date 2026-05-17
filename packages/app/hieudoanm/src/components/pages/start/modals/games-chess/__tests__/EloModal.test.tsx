import { fireEvent, render } from '@testing-library/react';
import { EloModal } from '../EloModal';

describe('EloModal', () => {
  it('should render rating tab', () => {
    const { container } = render(<EloModal onClose={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });

  it('should switch to performance tab', () => {
    const { getByText, container } = render(<EloModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Performance'));
    expect(container).toMatchSnapshot();
  });

  it('should calculate rating', () => {
    const { getByText, container } = render(<EloModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Calculate Rating'));
    expect(container).toMatchSnapshot();
  });

  it('should add a game', () => {
    const { getByText, getAllByDisplayValue } = render(
      <EloModal onClose={jest.fn()} />
    );
    fireEvent.click(getByText('Performance'));
    fireEvent.click(getByText('Add Game'));
    const inputs = getAllByDisplayValue('1800');
    expect(inputs).toHaveLength(2);
  });

  it('should calculate performance', () => {
    const { getByText, container } = render(<EloModal onClose={jest.fn()} />);
    fireEvent.click(getByText('Performance'));
    fireEvent.click(getByText('Calculate Performance'));
    expect(container).toMatchSnapshot();
  });
});
