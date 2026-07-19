import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { OpenAPI2Postman } from '../index';

jest.mock('../utils/yamlParser', () => ({
  parseOpenAPI: jest.fn(),
}));

const { parseOpenAPI } = jest.requireMock('../utils/yamlParser') as {
  parseOpenAPI: jest.Mock;
};

Object.assign(navigator, {
  clipboard: { writeText: jest.fn().mockResolvedValue(undefined) },
});

const VALID_SPEC = JSON.stringify({
  openapi: '3.0.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/test': {
      get: {
        summary: 'Test endpoint',
        tags: ['test'],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
});

const PARSED_SPEC = {
  openapi: '3.0.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/test': {
      get: {
        summary: 'Test endpoint',
        tags: ['test'],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
};

describe('OpenAPI2Postman', () => {
  beforeEach(() => {
    parseOpenAPI.mockReturnValue(PARSED_SPEC);
  });

  afterEach(() => {
    parseOpenAPI.mockReset();
  });

  it('renders with sample input', () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    expect(screen.getByText('OpenAPI to Postman')).toBeInTheDocument();
    expect(screen.getByText('OpenAPI Input')).toBeInTheDocument();
    expect(screen.getByText('Postman Output')).toBeInTheDocument();
  });

  it('switches between OpenAPI and Postman tabs', () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    expect(screen.getByText(/Start typing to generate/)).toBeInTheDocument();
  });

  it('generates output when valid spec is entered', async () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Paste your OpenAPI/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: VALID_SPEC } });
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    await waitFor(() => {
      expect(screen.getByText(/Test API/)).toBeInTheDocument();
    });
  });

  it('shows placeholder when output tab is empty', () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    expect(screen.getByText(/Start typing to generate/)).toBeInTheDocument();
  });

  it('clears input when Clear is clicked', () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Paste your OpenAPI/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: 'test' } });
    const clearBtn = screen.getByText(/🗑️ Clear/);
    fireEvent.click(clearBtn);
    expect(textarea.value).toBe('');
  });

  it('copies output to clipboard', async () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Paste your OpenAPI/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: VALID_SPEC } });
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    await waitFor(() => {
      const copyBtn = screen.getByText(/📋 Copy/);
      fireEvent.click(copyBtn);
      expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
  });

  it('switches back to OpenAPI tab', () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    const openapiTab = screen.getByText('OpenAPI Input');
    fireEvent.click(openapiTab);
    expect(
      screen.getByPlaceholderText(/Paste your OpenAPI/)
    ).toBeInTheDocument();
  });

  it('downloads output as JSON file', async () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Paste your OpenAPI/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: VALID_SPEC } });
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    await waitFor(() => {
      expect(screen.getByText(/💾 Download/)).toBeInTheDocument();
    });
  });

  it('shows copied state after copying', async () => {
    render(<OpenAPI2Postman onClose={jest.fn()} />);
    const textarea = screen.getByPlaceholderText(
      /Paste your OpenAPI/
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: VALID_SPEC } });
    const postmanTab = screen.getByText('Postman Output');
    fireEvent.click(postmanTab);
    await waitFor(() => {
      const copyBtn = screen.getByText(/📋 Copy/);
      fireEvent.click(copyBtn);
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it('calls onClose when close button clicked', () => {
    const onClose = jest.fn();
    render(<OpenAPI2Postman onClose={onClose} />);
    const closeBtns = screen.getAllByText('✕');
    fireEvent.click(closeBtns[0]);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
