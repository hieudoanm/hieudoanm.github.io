import { jsonToCsv } from '.';

type Row = { id: string; name: string; gender?: string };

describe('csvToJSON', () => {
  it('should convert csv to json', () => {
    const csv = `"id","name","gender"
"1","test1","male"
"2","test2",""`;
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    expect(jsonToCsv<Row>(json)).toEqual(csv);
  });

  it('should convert csv to json with delimiter and headers', () => {
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    const csv = `"id";"name"
"1";"test1"
"2";"test2"`;
    expect(
      jsonToCsv<Row>(json, { delimiter: ';', headers: ['id', 'name'] })
    ).toEqual(csv);
  });
});
