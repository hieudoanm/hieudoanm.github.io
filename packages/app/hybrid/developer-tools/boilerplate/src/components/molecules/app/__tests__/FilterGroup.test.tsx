import { fireEvent, render, screen } from '@testing-library/react';
import { FilterGroup } from '../FilterGroup';

describe('FilterGroup', () => {
  const options = [
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived' },
  ];

  it('renders a checkbox per option', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Active')).toBeInTheDocument();
    expect(screen.getByLabelText('Archived')).toBeInTheDocument();
  });

  it('checks the selected options', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={jest.fn()}
      />
    );
    expect(screen.getByLabelText('Active')).toBeChecked();
  });

  it('toggles an option', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Active'));
    expect(onChange).toHaveBeenCalledWith(['active']);
  });

  it('toggles an option off', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByLabelText('Active'));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('resets the selection', () => {
    const onChange = jest.fn();
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={['active']}
        onChange={onChange}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('hides the reset button when nothing is selected', () => {
    render(
      <FilterGroup
        name="status"
        options={options}
        selected={[]}
        onChange={jest.fn()}
      />
    );
    expect(
      screen.queryByRole('button', { name: 'Reset' })
    ).not.toBeInTheDocument();
  });
});
