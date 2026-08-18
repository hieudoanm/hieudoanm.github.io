import { render, screen, fireEvent } from '@testing-library/react';
import { DesignPanel } from '../DesignPanel';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';
import { downloadFile } from '@/lib/request-file';
import { copyText } from '@/lib/clipboard';
import { RequestCollection, RequestConfig } from '@/types/api-client';

jest.mock('@/lib/request-file', () => ({
  downloadFile: jest.fn(),
}));

jest.mock('@/lib/clipboard', () => ({
  copyText: jest.fn().mockResolvedValue(true),
}));

const mockDownloadFile = downloadFile as jest.Mock;
const mockCopyText = copyText as jest.Mock;

const collection = (): RequestCollection => ({
  ...newCollection('Users API'),
  groups: [
    {
      ...newGroup('Users'),
      entries: [
        newCollectionEntry('List users', {
          ...emptyRequest(),
          url: 'https://api.example.com/users',
        }),
      ],
    },
  ],
});

const matchingRequest: RequestConfig = {
  ...emptyRequest(),
  url: 'https://api.example.com/users',
};

const otherRequest: RequestConfig = {
  ...emptyRequest(),
  url: 'https://api.example.com/other',
};

describe('DesignPanel', () => {
  const onMockToggle = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows an empty state without collections', () => {
    render(
      <DesignPanel
        collections={[]}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    expect(screen.getByText(/No collections yet/)).toBeInTheDocument();
  });

  it('renders the collection picker and documentation preview', () => {
    const collections = [collection()];
    render(
      <DesignPanel
        collections={collections}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    expect(screen.getByLabelText('Design collection')).toHaveValue(
      collections[0].id
    );
    expect(screen.getByTitle('API documentation preview')).toBeInTheDocument();
  });

  it('reports the matched mock target', () => {
    render(
      <DesignPanel
        collections={[collection()]}
        request={matchingRequest}
        mockEnabled={true}
        onMockToggle={onMockToggle}
      />
    );
    expect(
      screen.getByText(/Mocking: Users API \/ List users/)
    ).toBeInTheDocument();
  });

  it('advises enabling the mock server when disabled', () => {
    render(
      <DesignPanel
        collections={[collection()]}
        request={otherRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    expect(
      screen.getByText(/Enable the mock server to answer matching requests/)
    ).toBeInTheDocument();
  });

  it('reports no match while the mock server is enabled', () => {
    render(
      <DesignPanel
        collections={[collection()]}
        request={otherRequest}
        mockEnabled={true}
        onMockToggle={onMockToggle}
      />
    );
    expect(
      screen.getByText(/No mock matches the current request/)
    ).toBeInTheDocument();
  });

  it('toggles the mock server', () => {
    render(
      <DesignPanel
        collections={[]}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    fireEvent.click(screen.getByLabelText('Enable mock server'));
    expect(onMockToggle).toHaveBeenCalled();
  });

  it('exports OpenAPI and HTML documentation', () => {
    const collections = [collection()];
    render(
      <DesignPanel
        collections={collections}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    fireEvent.click(screen.getByText('OpenAPI'));
    expect(mockDownloadFile).toHaveBeenCalledWith(
      expect.stringContaining('"openapi"'),
      'Users API.openapi.json',
      'application/json'
    );
    fireEvent.click(screen.getByText('HTML'));
    expect(mockDownloadFile).toHaveBeenCalledWith(
      expect.stringContaining('<!doctype html>'),
      'Users API.api-docs.html',
      'text/html'
    );
  });

  it('switches the collection used for design', () => {
    const first = collection();
    const second = {
      ...collection(),
      id: 'c2',
      name: 'Orders API',
    };
    render(
      <DesignPanel
        collections={[first, second]}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    fireEvent.change(screen.getByLabelText('Design collection'), {
      target: { value: 'c2' },
    });
    expect(screen.getByLabelText('Design collection')).toHaveValue('c2');
  });

  it('copies the collection as markdown', async () => {
    render(
      <DesignPanel
        collections={[collection()]}
        request={matchingRequest}
        mockEnabled={false}
        onMockToggle={onMockToggle}
      />
    );
    fireEvent.click(screen.getByText('Markdown'));
    expect(mockCopyText).toHaveBeenCalledWith(
      expect.stringContaining('# Users API')
    );
    expect(await screen.findByText('Copied')).toBeInTheDocument();
  });
});
