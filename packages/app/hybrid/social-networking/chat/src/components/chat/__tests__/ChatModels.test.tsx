import { render, fireEvent, screen } from '@testing-library/react';
import { ChatModels } from '../ChatModels';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

const { useQuery } = jest.requireMock('@tanstack/react-query');

const paidModel = {
  id: 'paid-model',
  name: 'Paid Model',
  pricing: { prompt: '0.01', completion: '0.02' },
  architecture: { tokenizer: 'gpt2' },
  description: '',
  supported_parameters: [],
};

const freeModel1 = {
  id: 'gpt-4',
  name: 'GPT-4',
  pricing: { prompt: '0', completion: '0' },
  architecture: { tokenizer: 'gpt2' },
  description: '',
  supported_parameters: [],
};

const freeModel2 = {
  id: 'claude-3',
  name: 'Claude 3',
  pricing: { prompt: '0', completion: '0' },
  architecture: { tokenizer: 'claude' },
  description: '',
  supported_parameters: [],
};

const freeModel3 = {
  id: 'gemini-pro',
  name: 'Gemini Pro',
  pricing: { prompt: '0', completion: '0' },
  architecture: { tokenizer: '' },
  description: '',
  supported_parameters: [],
};

describe('ChatModels', () => {
  const onSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    useQuery.mockReturnValue({ isPending: true, error: null, data: null });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: new Error('fail'),
      data: null,
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });

  it('shows no free models message when only paid models exist', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [paidModel] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    expect(screen.getByText('No free models')).toBeInTheDocument();
  });

  it('renders model list with free models only', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [paidModel, freeModel1] },
    });
    render(<ChatModels selectedModelId="free-model-1" onSelect={onSelect} />);
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.queryByText('Paid Model')).not.toBeInTheDocument();
  });

  it('renders selected model with selected style', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1] },
    });
    render(<ChatModels selectedModelId="gpt-4" onSelect={onSelect} />);
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
  });

  it('filters models by search', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel2] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'gpt' } });
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.queryByText('Claude 3')).not.toBeInTheDocument();
  });

  it('filters by tokenizer', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel2] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'claude' } });
    expect(screen.getByText('Claude 3')).toBeInTheDocument();
    expect(screen.queryByText('GPT-4')).not.toBeInTheDocument();
  });

  it('shows No matches when filter yields no results', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel2] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'zzz' } });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('selects model on click', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1] },
    });
    render(<ChatModels selectedModelId="other" onSelect={onSelect} />);
    fireEvent.click(screen.getByText('GPT-4'));
    expect(onSelect).toHaveBeenCalledWith('gpt-4');
  });

  it('clears search when clear button clicked', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel2] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'gpt' } });
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    const clearButton = screen.getByTitle('Clear search');
    fireEvent.click(clearButton);
    expect(searchInput).toHaveValue('');
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.getByText('Claude 3')).toBeInTheDocument();
  });

  it('shows free count in footer without search', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    expect(screen.getByText('1 free')).toBeInTheDocument();
  });

  it('shows filtered count in footer with search', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel2] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const searchInput = screen.getByPlaceholderText('Search…');
    fireEvent.change(searchInput, { target: { value: 'gpt' } });
    expect(screen.getByText(/1 found/)).toBeInTheDocument();
  });

  it('filters out free models with empty tokenizer', () => {
    useQuery.mockReturnValue({
      isPending: false,
      error: null,
      data: { data: [freeModel1, freeModel3] },
    });
    render(<ChatModels selectedModelId="mock" onSelect={onSelect} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(screen.getByText('GPT-4')).toBeInTheDocument();
    expect(screen.getByText('Gemini Pro')).toBeInTheDocument();
  });
});
