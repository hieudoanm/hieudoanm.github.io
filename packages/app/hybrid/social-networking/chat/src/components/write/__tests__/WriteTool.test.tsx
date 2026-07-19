import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { WriteTool } from '../WriteTool';
import type { WriteToolConfig } from '../config';

jest.mock('@/utils/trpc', () => ({
  trpcClient: {
    openrouter: {
      generate: {
        mutate: jest.fn(),
      },
    },
  },
}));

const { trpcClient } = jest.requireMock('@/utils/trpc');
const mockMutate = trpcClient.openrouter.generate.mutate;

const config: WriteToolConfig = {
  id: 'write-tone',
  title: 'Tone Rewriter',
  emoji: '🎭',
  description: 'Rewrite text in a specific tone',
  systemPrompt: 'Rewrite the following text in a {tone} tone.',
  placeholder: 'Enter text to rewrite...',
  buttonLabel: 'Rewrite',
  configFields: [
    {
      id: 'tone',
      label: 'Tone',
      placeholder: 'Professional',
      options: [
        { value: 'Professional', label: 'Professional' },
        { value: 'Casual', label: 'Casual' },
      ],
    },
  ],
};

const simpleConfig: WriteToolConfig = {
  id: 'write-article',
  title: 'Article',
  emoji: '📝',
  description: 'Write a complete article',
  systemPrompt: 'Write an article.',
  placeholder: 'Enter a topic...',
};

describe('WriteTool', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the title and description', () => {
    render(<WriteTool config={simpleConfig} />);
    expect(screen.getByText('Article')).toBeInTheDocument();
    expect(screen.getByText('Write a complete article')).toBeInTheDocument();
  });

  it('renders config fields with defaults', () => {
    render(<WriteTool config={config} />);
    const select = screen.getByDisplayValue('Professional');
    expect(select).toBeInTheDocument();
  });

  it('updates config values from the select', async () => {
    render(<WriteTool config={config} />);
    const select = screen.getByDisplayValue('Professional');
    fireEvent.change(select, { target: { value: 'Casual' } });
    expect(screen.getByDisplayValue('Casual')).toBeInTheDocument();
  });

  it('uses the default button label when none is given', () => {
    render(<WriteTool config={simpleConfig} />);
    expect(screen.getByText('Generate')).toBeInTheDocument();
  });

  it('generates a response and renders the result', async () => {
    mockMutate.mockResolvedValue({ text: 'Generated text' });
    render(<WriteTool config={simpleConfig} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a topic...'), {
      target: { value: 'My topic' },
    });
    fireEvent.click(screen.getByText('Generate'));
    expect(screen.getByText('Generating...')).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getByText('Generated text')).toBeInTheDocument()
    );
    expect(mockMutate).toHaveBeenCalledWith({
      messages: [
        { role: 'ai', text: 'Write an article.' },
        { role: 'user', text: 'My topic' },
      ],
      model: 'openrouter/free',
    });
  });

  it('substitutes config values into the prompt', async () => {
    mockMutate.mockResolvedValue({ text: 'Done' });
    render(<WriteTool config={config} />);
    fireEvent.change(screen.getByPlaceholderText('Enter text to rewrite...'), {
      target: { value: 'Text' },
    });
    fireEvent.click(screen.getByText('Rewrite'));
    await waitFor(() =>
      expect(mockMutate).toHaveBeenCalledWith(
        expect.objectContaining({
          messages: [
            {
              role: 'ai',
              text: 'Rewrite the following text in a Professional tone.',
            },
            { role: 'user', text: 'Text' },
          ],
        })
      )
    );
  });

  it('renders the fallback message when no text is returned', async () => {
    mockMutate.mockResolvedValue({});
    render(<WriteTool config={simpleConfig} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a topic...'), {
      target: { value: 'My topic' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() =>
      expect(screen.getByText('No response generated.')).toBeInTheDocument()
    );
  });

  it('renders an error message on failure', async () => {
    mockMutate.mockRejectedValue(new Error('boom'));
    render(<WriteTool config={simpleConfig} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a topic...'), {
      target: { value: 'My topic' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() =>
      expect(screen.getByText('Error: boom')).toBeInTheDocument()
    );
  });

  it('renders a generic error for non-Error throws', async () => {
    mockMutate.mockRejectedValue('string error');
    render(<WriteTool config={simpleConfig} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a topic...'), {
      target: { value: 'My topic' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() =>
      expect(screen.getByText('Error: Unknown error')).toBeInTheDocument()
    );
  });

  it('does not generate when the input is empty', () => {
    render(<WriteTool config={simpleConfig} />);
    fireEvent.click(screen.getByText('Generate'));
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('copies the result on copy click', async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText },
    });
    mockMutate.mockResolvedValue({ text: 'Result text' });
    render(<WriteTool config={simpleConfig} />);
    fireEvent.change(screen.getByPlaceholderText('Enter a topic...'), {
      target: { value: 'My topic' },
    });
    fireEvent.click(screen.getByText('Generate'));
    await waitFor(() =>
      expect(screen.getByText('Result text')).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText('Copy'));
    expect(writeText).toHaveBeenCalledWith('Result text');
  });
});
