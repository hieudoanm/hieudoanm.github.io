import { render, screen, fireEvent } from '@testing-library/react';
import { ExamplesEditor } from '../ExamplesEditor';
import { newCollection, newCollectionEntry, newGroup } from '@/lib/collections';
import { emptyRequest } from '@/lib/http';
import { downloadFile } from '@/lib/request-file';
import { RequestCollection, ResponseMeta } from '@/types/api-client';

jest.mock('@/lib/request-file', () => ({
  downloadFile: jest.fn(),
}));

const mockDownloadFile = downloadFile as jest.Mock;

const response: ResponseMeta = {
  status: 200,
  statusText: 'OK',
  url: 'https://api.example.com/users',
  headers: { 'content-type': 'application/json' },
  body: '{"name":"Ada"}',
  timeMs: 12,
  sizeBytes: 15,
};

const setup = (): { collections: RequestCollection[]; entryId: string } => {
  const collections = [
    {
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
    },
  ];
  return { collections, entryId: collections[0].groups[0].entries[0].id };
};

describe('ExamplesEditor', () => {
  const onUpdate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders nothing when the entry is unknown', () => {
    const { collections } = setup();
    const { container } = render(
      <ExamplesEditor
        collections={collections}
        entryId="missing"
        response={response}
        onUpdate={onUpdate}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('shows an empty state when there are no examples', () => {
    const { collections, entryId } = setup();
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    expect(screen.getByText(/No examples yet/)).toBeInTheDocument();
  });

  it('saves the current response as an example', () => {
    const { collections, entryId } = setup();
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={response}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByText('Save response'));
    const next = onUpdate.mock.calls[0][0] as RequestCollection[];
    expect(next[0].groups[0].entries[0].examples).toEqual([
      expect.objectContaining({ name: 'Example 1', body: '{"name":"Ada"}' }),
    ]);
  });

  it('disables saving without a response', () => {
    const { collections, entryId } = setup();
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    expect(screen.getByText('Save response').closest('button')).toBeDisabled();
  });

  it('lists examples and expands one to preview body and schema', () => {
    const { collections, entryId } = setup();
    collections[0].groups[0].entries[0].examples = [
      { id: 'x1', name: 'Happy path', body: '{"ok":true}' },
    ];
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    expect(screen.getByText('Happy path')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Happy path'));
    expect(screen.getByText(/ok.*true/)).toBeInTheDocument();
    expect(screen.getByText('Schema')).toBeInTheDocument();
  });

  it('shows a fallback when an example body is not JSON', () => {
    const { collections, entryId } = setup();
    collections[0].groups[0].entries[0].examples = [
      { id: 'x1', name: 'Bad body', body: '<html>' },
    ];
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByText('Bad body'));
    expect(screen.getByText('Not valid JSON')).toBeInTheDocument();
  });

  it('deletes an example', () => {
    const { collections, entryId } = setup();
    collections[0].groups[0].entries[0].examples = [
      { id: 'x1', name: 'Happy path', body: '{"ok":true}' },
    ];
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Delete example Happy path'));
    const next = onUpdate.mock.calls[0][0] as RequestCollection[];
    expect(next[0].groups[0].entries[0].examples).toEqual([]);
  });

  it('downloads a schema derived from an example body', () => {
    const { collections, entryId } = setup();
    collections[0].groups[0].entries[0].examples = [
      { id: 'x1', name: 'Happy path', body: '{"ok":true}' },
    ];
    render(
      <ExamplesEditor
        collections={collections}
        entryId={entryId}
        response={null}
        onUpdate={onUpdate}
      />
    );
    fireEvent.click(screen.getByLabelText('Download schema for Happy path'));
    expect(mockDownloadFile).toHaveBeenCalledWith(
      expect.stringContaining('"type": "object"'),
      'List users.schema.json',
      'application/json'
    );
  });
});
