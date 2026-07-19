import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ImportExport } from '@/components/molecules/ImportExport';
import { isDesktop, openSquadFile, saveSquadFile } from '@/lib/desktop';
import { makeSquad } from '@/test/fixtures';

jest.mock('@/lib/desktop', () => ({
  isDesktop: jest.fn(),
  openSquadFile: jest.fn(),
  saveSquadFile: jest.fn(),
}));

const mockIsDesktop = isDesktop as jest.Mock;
const mockOpenSquadFile = openSquadFile as jest.Mock;
const mockSaveSquadFile = saveSquadFile as jest.Mock;

const makeFile = (content: string, name = 'squad.csv'): File => {
  const file = new File([content], name);
  Object.defineProperty(file, 'text', {
    value: jest.fn(async () => content),
  });
  return file;
};

const makeProps = (
  overrides: Partial<Parameters<typeof ImportExport>[0]> = {}
) => ({
  players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' as const }],
  squadName: 'Team A',
  squad: makeSquad({
    name: 'Team A',
    players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
  }),
  onImport: jest.fn() as jest.Mock,
  onImportSquad: jest.fn() as jest.Mock,
  ...overrides,
});

describe('ImportExport', () => {
  beforeEach(() => {
    (URL as unknown as { createObjectURL?: unknown }).createObjectURL = jest.fn(
      () => 'blob:mock'
    );
    (URL as unknown as { revokeObjectURL?: unknown }).revokeObjectURL =
      jest.fn();
    mockIsDesktop.mockReturnValue(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('exports a CSV of the current players', () => {
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    render(<ImportExport {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Export squad as CSV'));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });

  it('disables export when there are no players', () => {
    render(<ImportExport {...makeProps({ players: [] })} />);
    expect(screen.getByLabelText('Export squad as CSV')).toBeDisabled();
  });

  it('imports a CSV file and calls onImport with parsed players', async () => {
    const props = makeProps();
    const { container } = render(<ImportExport {...props} />);
    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [makeFile('Name,Number,Role,Position\nAda,10,MID,AM')] },
    });
    await waitFor(() => expect(props.onImport).toHaveBeenCalledTimes(1));
    expect((props.onImport as jest.Mock).mock.calls[0][0][0]).toMatchObject({
      name: 'Ada',
      number: 10,
      role: 'MID',
      position: 'AM',
    });
  });

  it('reports when the import found no valid players', async () => {
    const { container } = render(<ImportExport {...makeProps()} />);
    const input = container.querySelector('input[type="file"]');
    fireEvent.change(input as HTMLInputElement, {
      target: { files: [makeFile('Name,Number\nAda')] },
    });
    expect(await screen.findByText(/No valid players/)).toBeInTheDocument();
  });

  it('exports the squad as JSON', () => {
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const props = makeProps();
    render(<ImportExport {...props} />);
    fireEvent.click(screen.getByLabelText('Export squad as JSON'));
    expect(URL.createObjectURL).toHaveBeenCalled();
    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });

  it('imports a JSON file and calls onImportSquad', async () => {
    const props = makeProps();
    const { container } = render(<ImportExport {...props} />);
    const inputs = container.querySelectorAll('input[type="file"]');
    const jsonInput = inputs[1];
    const squad = makeSquad({
      name: 'Imported',
      formationId: '433',
      players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
      assignments: { '433-2-5': ['p1'] },
    });
    fireEvent.change(jsonInput as HTMLInputElement, {
      target: { files: [makeFile(JSON.stringify(squad), 'squad.json')] },
    });
    await waitFor(() => expect(props.onImportSquad).toHaveBeenCalledTimes(1));
    expect((props.onImportSquad as jest.Mock).mock.calls[0][0]).toMatchObject({
      name: 'Imported',
      formationId: '433',
    });
  });

  it('reports when the JSON file is invalid', async () => {
    const { container } = render(<ImportExport {...makeProps()} />);
    const inputs = container.querySelectorAll('input[type="file"]');
    fireEvent.change(inputs[1] as HTMLInputElement, {
      target: { files: [makeFile('{not json', 'squad.json')] },
    });
    expect(
      await screen.findByText(/Could not import the squad file/)
    ).toBeInTheDocument();
  });

  it('exports starters as a separate CSV', () => {
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const props = makeProps({
      players: [
        { id: 'p1', name: 'Ada', number: 10, role: 'MID' as const },
        {
          id: 'p2',
          name: 'Bob',
          number: 7,
          role: 'FWD' as const,
          bench: true,
        },
      ],
    });
    render(<ImportExport {...props} />);
    fireEvent.click(screen.getByLabelText('Export starters as CSV'));
    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });

  it('exports bench players as a separate JSON', () => {
    const click = jest
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {});
    const props = makeProps({
      players: [
        { id: 'p1', name: 'Ada', number: 10, role: 'MID' as const },
        {
          id: 'p2',
          name: 'Bob',
          number: 7,
          role: 'FWD' as const,
          bench: true,
        },
      ],
    });
    render(<ImportExport {...props} />);
    fireEvent.click(screen.getByLabelText('Export bench as JSON'));
    expect(click).toHaveBeenCalled();
    click.mockRestore();
  });

  it('hides the native squad file actions in the browser', () => {
    render(<ImportExport {...makeProps()} />);
    expect(screen.queryByLabelText('Open squad file')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Save squad file')).not.toBeInTheDocument();
  });

  it('shows the native squad file actions in Tauri', () => {
    mockIsDesktop.mockReturnValue(true);
    render(<ImportExport {...makeProps()} />);
    expect(screen.getByLabelText('Open squad file')).toBeInTheDocument();
    expect(screen.getByLabelText('Save squad file')).toBeInTheDocument();
  });

  it('opens a squad file through the native dialog', async () => {
    mockIsDesktop.mockReturnValue(true);
    const imported = makeSquad({
      name: 'Native Squad',
      formationId: '433',
      players: [{ id: 'p1', name: 'Ada', number: 10, role: 'MID' }],
    });
    mockOpenSquadFile.mockResolvedValue({
      name: 'native.squad.json',
      content: JSON.stringify(imported),
    });
    const props = makeProps();
    render(<ImportExport {...props} />);
    fireEvent.click(screen.getByLabelText('Open squad file'));
    expect(
      await screen.findByText('Imported Native Squad.')
    ).toBeInTheDocument();
    expect(props.onImportSquad).toHaveBeenCalledWith(imported);
  });

  it('reports an invalid native squad file', async () => {
    mockIsDesktop.mockReturnValue(true);
    mockOpenSquadFile.mockResolvedValue({
      name: 'bad.squad.json',
      content: '{not json',
    });
    render(<ImportExport {...makeProps()} />);
    fireEvent.click(screen.getByLabelText('Open squad file'));
    expect(
      await screen.findByText('Could not import the squad file.')
    ).toBeInTheDocument();
  });

  it('saves the squad through the native dialog', async () => {
    mockIsDesktop.mockReturnValue(true);
    mockSaveSquadFile.mockResolvedValue(true);
    const props = makeProps();
    render(<ImportExport {...props} />);
    fireEvent.click(screen.getByLabelText('Save squad file'));
    expect(
      await screen.findByText('Saved the squad file.')
    ).toBeInTheDocument();
    const [defaultName, content] = mockSaveSquadFile.mock.calls[0];
    expect(defaultName).toBe('team-a.squad.json');
    const parsed = JSON.parse(content);
    expect(parsed.name).toBe('Team A');
    expect(parsed.players).toHaveLength(1);
  });

  it('disables the native save action when there are no players', () => {
    mockIsDesktop.mockReturnValue(true);
    render(<ImportExport {...makeProps({ players: [] })} />);
    expect(screen.getByLabelText('Save squad file')).toBeDisabled();
    expect(screen.getByLabelText('Open squad file')).not.toBeDisabled();
  });
});
