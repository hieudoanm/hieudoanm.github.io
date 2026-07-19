import { exportSquadCsv, importRosterText, importSquadCsv } from '@/lib/csv';
import { newPlayer } from '@/lib/squad';

describe('csv', () => {
  it('exports players with a header row', () => {
    const csv = exportSquadCsv([
      newPlayer('Alisson', 1, 'GK'),
      newPlayer('Mohamed', 11, 'FWD', 'RW'),
    ]);
    const lines = csv.split('\r\n');
    expect(lines[0]).toBe('Name,Number,Role,Position');
    expect(lines[1]).toBe('Alisson,1,GK,');
    expect(lines[2]).toBe('Mohamed,11,FWD,RW');
  });

  it('quotes cells that contain commas or quotes', () => {
    const csv = exportSquadCsv([newPlayer('Smith, John', 4, 'DEF')]);
    expect(csv).toContain('"Smith, John",4,DEF,');
  });

  it('imports a CSV with a header', () => {
    const result = importSquadCsv(
      'Name,Number,Role,Position\r\nAda,10,MID,AM\r\nBob,9,FWD,ST\r\n'
    );
    expect(result.skipped).toBe(0);
    expect(result.players).toHaveLength(2);
    expect(result.players[0]).toMatchObject({
      name: 'Ada',
      number: 10,
      role: 'MID',
      position: 'AM',
    });
    expect(result.players[1]).toMatchObject({
      name: 'Bob',
      number: 9,
      role: 'FWD',
      position: 'ST',
    });
  });

  it('accepts long role and position names and unknown roles default to FWD', () => {
    const result = importSquadCsv(
      'Name,Number,Role,Position\nAda,10,Goalkeeper,Goalkeeper\nBob,9,Defender,Centre-Back\nEve,8,Attacker,Forward'
    );
    expect(result.players.map((p) => p.role)).toEqual(['GK', 'DEF', 'FWD']);
  });

  it('handles a UTF-8 BOM, quoted cells, and blank lines', () => {
    const result = importSquadCsv(
      '\uFEFFName,Number,Role,Position\n"Ada, the First",10,MID,"RW, RW"\n\nBob,9,FWD,\n'
    );
    expect(result.players).toHaveLength(2);
    expect(result.players[0].name).toBe('Ada, the First');
    expect(result.players[0].position).toBe('RW, RW');
  });

  it('skips rows with invalid numbers or empty names', () => {
    const result = importSquadCsv(
      'Name,Number,Role,Position\nAda,x,MID,\n,10,MID,\nBob,0,FWD,\nCarl,8,MID,\n'
    );
    expect(result.players).toHaveLength(1);
    expect(result.players[0].name).toBe('Carl');
    expect(result.skipped).toBe(3);
  });

  it('returns no players for empty input or when a required column is missing', () => {
    expect(importSquadCsv('').players).toEqual([]);
    expect(importSquadCsv('Name,Role\nAda,MID').players).toEqual([]);
    expect(importSquadCsv('Number,Role\n10,MID').players).toEqual([]);
  });

  it('treats an unknown role as FWD and ignores a missing position column', () => {
    const result = importSquadCsv('Name,Number,Role\nAda,10,Whatever');
    expect(result.players[0].role).toBe('FWD');
    expect(result.players[0].position).toBeUndefined();
  });

  it('round-trips a squad through export and import', () => {
    const players = [
      newPlayer('Ada', 10, 'MID', 'AM'),
      newPlayer('Bob', 9, 'FWD'),
    ];
    const roundTrip = importSquadCsv(exportSquadCsv(players));
    expect(roundTrip.players.map((p) => p.name)).toEqual(['Ada', 'Bob']);
    expect(roundTrip.players[0].position).toBe('AM');
    expect(roundTrip.players[1].position).toBeUndefined();
  });

  it('exports only starters when asked', () => {
    const players = [
      newPlayer('Ada', 10, 'MID'),
      { ...newPlayer('Bob', 9, 'FWD'), bench: true as const },
    ];
    const csv = exportSquadCsv(players, 'starters');
    expect(csv).toContain('Ada,10,MID,');
    expect(csv).not.toContain('Bob');
  });

  it('exports only bench players when asked', () => {
    const players = [
      newPlayer('Ada', 10, 'MID'),
      { ...newPlayer('Bob', 9, 'FWD'), bench: true as const },
    ];
    const csv = exportSquadCsv(players, 'bench');
    expect(csv).toContain('Bob,9,FWD,');
    expect(csv).not.toContain('Ada');
  });
});

describe('importRosterText', () => {
  it('parses name, number, role lines', () => {
    const result = importRosterText('Ada,10,MID\nBob,7,FWD');
    expect(result.skipped).toBe(0);
    expect(result.players).toHaveLength(2);
    expect(result.players[0]).toMatchObject({
      name: 'Ada',
      number: 10,
      role: 'MID',
    });
    expect(result.players[1]).toMatchObject({
      name: 'Bob',
      number: 7,
      role: 'FWD',
    });
  });

  it('defaults a missing role to FWD and accepts a position column', () => {
    const result = importRosterText('Cara,1\nDan,11,FWD,ST');
    expect(result.players[0]).toMatchObject({
      name: 'Cara',
      number: 1,
      role: 'FWD',
    });
    expect(result.players[0].position).toBeUndefined();
    expect(result.players[1]).toMatchObject({
      name: 'Dan',
      number: 11,
      role: 'FWD',
      position: 'ST',
    });
  });

  it('skips a header row and invalid lines', () => {
    const result = importRosterText(
      'Name,Number,Role\nAda,10,MID\n,x,FWD\nBob,0,\n'
    );
    expect(result.players.map((p) => p.name)).toEqual(['Ada']);
    expect(result.skipped).toBe(2);
  });

  it('returns no players for empty input', () => {
    expect(importRosterText('')).toEqual({ players: [], skipped: 0 });
  });
});
