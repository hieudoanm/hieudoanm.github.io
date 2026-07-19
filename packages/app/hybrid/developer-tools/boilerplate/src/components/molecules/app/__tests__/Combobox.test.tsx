import { fireEvent, render, screen } from '@testing-library/react';
import { Combobox } from '../Combobox';

describe('Combobox', () => {
  const options = [
    { label: 'Apples', value: 'apples' },
    { label: 'Bananas', value: 'bananas' },
    { label: 'Cherries', value: 'cherries' },
  ];

  it('shows the selected label', () => {
    render(<Combobox options={options} value="apples" onChange={jest.fn()} />);
    expect(screen.getByText('Apples')).toBeInTheDocument();
  });

  it('opens, filters, and selects an option', () => {
    const onChange = jest.fn();
    render(<Combobox options={options} value="" onChange={onChange} />);
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search options' }), {
      target: { value: 'ban' },
    });
    expect(screen.getByText('Bananas')).toBeInTheDocument();
    expect(screen.queryByText('Apples')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Bananas'));
    expect(onChange).toHaveBeenCalledWith('bananas');
  });

  it('shows empty state when nothing matches', () => {
    render(
      <Combobox
        options={options}
        value=""
        onChange={jest.fn()}
        emptyText="Nothing found."
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Search options' }), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('Nothing found.')).toBeInTheDocument();
  });
});
