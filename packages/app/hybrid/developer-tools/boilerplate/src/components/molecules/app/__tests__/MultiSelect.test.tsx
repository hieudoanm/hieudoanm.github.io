import { fireEvent, render, screen } from '@testing-library/react';
import { MultiSelect } from '../MultiSelect';

describe('MultiSelect', () => {
  const options = [
    { value: 'js', label: 'JavaScript' },
    { value: 'ts', label: 'TypeScript' },
  ];

  it('shows the placeholder when nothing is selected', () => {
    render(<MultiSelect options={options} value={[]} onChange={jest.fn()} />);
    expect(screen.getByText('Select…')).toBeInTheDocument();
  });

  it('shows selected values as chips', () => {
    render(
      <MultiSelect options={options} value={['ts']} onChange={jest.fn()} />
    );
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('toggles an option in the dropdown', () => {
    const onChange = jest.fn();
    render(<MultiSelect options={options} value={[]} onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: /Select/ }));
    fireEvent.click(screen.getByLabelText('JavaScript'));
    expect(onChange).toHaveBeenCalledWith(['js']);
  });

  it('removes a selected option', () => {
    const onChange = jest.fn();
    render(
      <MultiSelect options={options} value={['js', 'ts']} onChange={onChange} />
    );
    fireEvent.click(screen.getByRole('button', { name: /TypeScript/ }));
    fireEvent.click(screen.getByLabelText('TypeScript'));
    expect(onChange).toHaveBeenCalledWith(['js']);
  });

  it('closes the dropdown when clicking outside', () => {
    render(
      <div>
        <MultiSelect options={options} value={[]} onChange={jest.fn()} />
        <button type="button">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByRole('button', { name: /Select/ }));
    fireEvent.mouseDown(screen.getByRole('button', { name: 'Outside' }));
    expect(screen.queryByLabelText('JavaScript')).not.toBeInTheDocument();
  });
});
