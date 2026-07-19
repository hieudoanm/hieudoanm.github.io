import {
  render,
  fireEvent,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import { Chat } from '../ChatModal';

jest.mock('@hieudoanm.github.io/utils/trpc', () => ({
  trpcClient: {
    openrouter: {
      generate: {
        mutate: jest.fn().mockResolvedValue({ text: 'AI response' }),
      },
    },
  },
}));

const { trpcClient } = jest.requireMock('@hieudoanm.github.io/utils/trpc');
const mockMutate = trpcClient.openrouter.generate.mutate;

jest.mock('@frontend/native', () => ({
  scrollToBottom: jest.fn(),
}));

jest.mock('../ChatMessagesModal', () => ({
  Messages: ({ messages }: any) => (
    <div>
      {messages.length === 0 && <div>Empty chat</div>}
      {messages.map((m: any, i: number) => (
        <div key={i}>
          {m.role}: {m.text}
        </div>
      ))}
    </div>
  ),
}));

jest.mock('../ChatModelsModal', () => ({
  ChatModels: ({ selectedModelId, onSelect }: any) => (
    <div>
      <span>Selected: {selectedModelId}</span>
      <button onClick={() => onSelect('new-model')}>Change Model</button>
    </div>
  ),
}));

jest.mock('tesseract.js', () => ({
  recognize: jest
    .fn()
    .mockResolvedValue({ data: { text: 'OCR extracted text' } }),
}));

describe('Chat', () => {
  const onClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal title', () => {
    render(<Chat onClose={onClose} />);
    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('renders Models header', () => {
    render(<Chat onClose={onClose} />);
    expect(screen.getByText('Models')).toBeInTheDocument();
  });

  it('renders empty chat state', () => {
    render(<Chat onClose={onClose} />);
    expect(screen.getByText('Empty chat')).toBeInTheDocument();
  });

  it('renders textarea with default message', () => {
    render(<Chat onClose={onClose} />);
    expect(
      screen.getByDisplayValue('Explain GenAI in a few words')
    ).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<Chat onClose={onClose} />);
    expect(document.querySelector('button[type="submit"]')).toBeInTheDocument();
  });

  it('renders file input for OCR', () => {
    render(<Chat onClose={onClose} />);
    expect(document.querySelector('input[type="file"]')).toBeInTheDocument();
  });

  it('updates textarea on change', () => {
    render(<Chat onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: 'Hello world' } });
    expect(textarea).toHaveValue('Hello world');
  });

  it('submits form and shows user + AI messages', async () => {
    render(<Chat onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button[type="submit"]')!);
    });

    expect(screen.getByText('user: Hello')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('ai: AI response')).toBeInTheDocument();
    });
  });

  it('shows error message on API failure', async () => {
    mockMutate.mockRejectedValueOnce(new Error('API Error'));
    render(<Chat onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button[type="submit"]')!);
    });

    await waitFor(() => {
      expect(
        screen.getByText('ai: An error occurred while generating content.')
      ).toBeInTheDocument();
    });
  });

  it('does not submit when message is empty', async () => {
    render(<Chat onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: '' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button[type="submit"]')!);
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('shows Clear button when messages exist', async () => {
    render(<Chat onClose={onClose} />);
    expect(screen.queryByText('Clear')).not.toBeInTheDocument();

    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button[type="submit"]')!);
    });

    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });
  });

  it('clears messages when Clear button is clicked', async () => {
    render(<Chat onClose={onClose} />);
    const textarea = screen.getByPlaceholderText('Ask anything ...');
    fireEvent.change(textarea, { target: { value: 'Hello' } });

    await act(async () => {
      fireEvent.click(document.querySelector('button[type="submit"]')!);
    });

    await waitFor(() => {
      expect(screen.getByText('Clear')).toBeInTheDocument();
    });

    await act(async () => {
      fireEvent.click(screen.getByText('Clear'));
    });

    expect(screen.getByText('Empty chat')).toBeInTheDocument();
  });

  it('changes model via ChatModels onSelect', async () => {
    render(<Chat onClose={onClose} />);
    expect(screen.getByText('Selected: openrouter/free')).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(screen.getByText('Change Model'));
    });

    expect(screen.getByText('Selected: new-model')).toBeInTheDocument();
  });

  it('processes OCR file upload', async () => {
    render(<Chat onClose={onClose} />);
    const fileInput = document.querySelector('input[type="file"]')!;
    const file = new File(['dummy'], 'test.png', { type: 'image/png' });

    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });

    const Tesseract = require('tesseract.js');
    expect(Tesseract.recognize).toHaveBeenCalledWith(file, 'eng');

    await waitFor(() => {
      const textarea = screen.getByPlaceholderText('Ask anything ...');
      expect(textarea).toHaveValue('OCR extracted text');
    });
  });
});
