import { fireEvent, render, screen } from '@testing-library/react';
import { Collapse } from '../Collapse';

describe('Collapse', () => {
  it('renders title and children', () => {
    render(<Collapse title="How to install?">Run pnpm install.</Collapse>);
    expect(screen.getByText('How to install?')).toBeInTheDocument();
    expect(screen.getByText('Run pnpm install.')).toBeInTheDocument();
  });

  it('reflects the open state and calls onChange', () => {
    const onChange = jest.fn();
    render(
      <Collapse title="Details" open onChange={onChange}>
        Body
      </Collapse>
    );
    const checkbox = screen.getByRole('checkbox', { name: 'Details' });
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
