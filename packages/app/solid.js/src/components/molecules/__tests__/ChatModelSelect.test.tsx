import { render, screen, fireEvent } from '@solidjs/testing-library';
import { ChatModelSelect } from '../ChatModelSelect';

const models = [
  { company: 'OpenAI', label: 'GPT-4', value: 'gpt-4' },
  { company: 'OpenAI', label: 'GPT-3.5', value: 'gpt-3.5' },
  { company: 'Anthropic', label: 'Claude 3', value: 'claude-3' },
];

describe('ChatModelSelect', () => {
  it('renders all options', () => {
    render(() => (
      <ChatModelSelect models={models} value="gpt-4" onChange={() => {}} />
    ));
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.getByText('GPT-3.5')).toBeInTheDocument();
    expect(screen.getByText('Claude 3')).toBeInTheDocument();
  });

  it('groups options by company', () => {
    render(() => (
      <ChatModelSelect models={models} value="gpt-4" onChange={() => {}} />
    ));
    const select = screen.getByRole('combobox');
    expect(select.innerHTML).toContain('OpenAI');
    expect(select.innerHTML).toContain('Anthropic');
  });

  it('shows the selected value', () => {
    render(() => (
      <ChatModelSelect models={models} value="claude-3" onChange={() => {}} />
    ));
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('claude-3');
  });

  it('calls onChange when a new option is selected', () => {
    const onChange = vi.fn();
    render(() => (
      <ChatModelSelect models={models} value="gpt-4" onChange={onChange} />
    ));
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'claude-3' } });
    expect(onChange).toHaveBeenCalledWith('claude-3');
  });

  it('disables select when disabled is true', () => {
    render(() => (
      <ChatModelSelect
        models={models}
        value="gpt-4"
        onChange={() => {}}
        disabled
      />
    ));
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
