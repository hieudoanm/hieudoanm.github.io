import {
  importParticipantsFromCSV,
  importTournamentFromCSV,
  readFileAsText,
} from '@/lib/import';

describe('importParticipantsFromCSV', () => {
  it('parses name, seed, and rating columns', () => {
    const csv = ['name,seed,rating', 'Alice,1,1500', 'Bob,2,1400'].join('\n');
    expect(importParticipantsFromCSV(csv)).toEqual([
      { name: 'Alice', seed: 1, rating: 1500 },
      { name: 'Bob', seed: 2, rating: 1400 },
    ]);
  });

  it('resolves alternative header names', () => {
    const csv = ['Player,Elo', 'Alice,1500'].join('\n');
    expect(importParticipantsFromCSV(csv)).toEqual([
      { name: 'Alice', rating: 1500 },
    ]);
  });

  it('returns empty when fewer than two lines or no name column', () => {
    expect(importParticipantsFromCSV('name,seed')).toEqual([]);
    expect(importParticipantsFromCSV('foo,bar\nAlice,1')).toEqual([]);
  });

  it('skips blank and comment lines', () => {
    const csv = ['# comment', '', 'name,seed', '', 'Alice,1'].join('\n');
    expect(importParticipantsFromCSV(csv)).toEqual([
      { name: 'Alice', seed: 1 },
    ]);
  });

  it('parses quoted cells with commas and escaped quotes', () => {
    const csv = ['name,seed', '"Doe, John",1', '"O""Brien",2'].join('\n');
    expect(importParticipantsFromCSV(csv)).toEqual([
      { name: 'Doe, John', seed: 1 },
      { name: 'O"Brien', seed: 2 },
    ]);
  });

  it('treats non-numeric seeds and ratings as undefined', () => {
    const csv = ['name,seed,rating', 'Alice,abc,xyz'].join('\n');
    expect(importParticipantsFromCSV(csv)).toEqual([{ name: 'Alice' }]);
  });
});

describe('importTournamentFromCSV', () => {
  it('parses tournament columns', () => {
    const csv = [
      'name,description,format,maxParticipants',
      'Cup,Knockout,single-elimination,16',
    ].join('\n');
    expect(importTournamentFromCSV(csv)).toEqual([
      {
        name: 'Cup',
        description: 'Knockout',
        format: 'single-elimination',
        maxParticipants: 16,
      },
    ]);
  });

  it('resolves alternative header names', () => {
    const csv = ['Tournament,Desc,Type,Max', 'Cup,Knockout,se,16'].join('\n');
    expect(importTournamentFromCSV(csv)).toEqual([
      {
        name: 'Cup',
        description: 'Knockout',
        format: 'se',
        maxParticipants: 16,
      },
    ]);
  });

  it('returns empty for invalid input', () => {
    expect(importTournamentFromCSV('name')).toEqual([]);
    expect(importTournamentFromCSV('foo,bar\nCup,1')).toEqual([]);
  });
});

describe('readFileAsText', () => {
  it('resolves with the file contents', async () => {
    const file = new File(['hello world'], 'file.txt', { type: 'text/plain' });
    await expect(readFileAsText(file)).resolves.toBe('hello world');
  });

  it('rejects when reading fails', async () => {
    const spy = jest
      .spyOn(FileReader.prototype, 'readAsText')
      .mockImplementationOnce(function (this: FileReader) {
        queueMicrotask(() => {
          this.onerror?.(
            new ProgressEvent('error') as unknown as ProgressEvent<FileReader>
          );
        });
      });

    await expect(readFileAsText(new File(['x'], 'file.txt'))).rejects.toThrow(
      'Failed to read file'
    );
    spy.mockRestore();
  });
});
