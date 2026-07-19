import { fireEvent, render, screen } from '@testing-library/react';
import { ChatModelSelect } from '../ChatModelSelect';

const mockModels = [
  { company: 'OpenAI', label: 'GPT-4', value: 'gpt-4' },
  { company: 'OpenAI', label: 'GPT-3.5', value: 'gpt-3.5' },
  { company: 'Anthropic', label: 'Claude 3', value: 'claude-3' },
];

describe('ChatModelSelect', () => {
  it('to match snapshot', () => {
    const { container } = render(
      <ChatModelSelect models={mockModels} value="gpt-4" onChange={() => {}} />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders all model options', () => {
    render(
      <ChatModelSelect models={mockModels} value="gpt-4" onChange={() => {}} />
    );
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.getByText('GPT-3.5')).toBeInTheDocument();
    expect(screen.getByText('Claude 3')).toBeInTheDocument();
  });

  it('shows current value as selected', () => {
    render(
      <ChatModelSelect
        models={mockModels}
        value="claude-3"
        onChange={() => {}}
      />
    );
    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('claude-3');
  });

  it('calls onChange when selection changes', () => {
    const onChange = jest.fn();
    render(
      <ChatModelSelect models={mockModels} value="gpt-4" onChange={onChange} />
    );
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'claude-3' } });
    expect(onChange).toHaveBeenCalledWith('claude-3');
  });

  it('groups models by company', () => {
    const { container } = render(
      <ChatModelSelect models={mockModels} value="gpt-4" onChange={() => {}} />
    );
    const optgroups = container.querySelectorAll('optgroup');
    expect(optgroups.length).toBe(2);
    expect(optgroups[0]).toHaveAttribute('label', 'OpenAI');
    expect(optgroups[1]).toHaveAttribute('label', 'Anthropic');
  });
});
