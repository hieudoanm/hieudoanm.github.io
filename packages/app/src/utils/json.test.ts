import { json2csv } from './json';

type Row = { id: string; name: string; gender?: string };

describe('json2csv', () => {
  it('should convert json to csv', () => {
    const csv = `"id","name","gender"
"1","test1","male"
"2","test2",""`;
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    expect(json2csv<Row>(json)).toEqual(csv);
  });

  it('should convert json to csv with delimiter and headers', () => {
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    const csv = `"id";"name"
"1";"test1"
"2";"test2"`;
    expect(
      json2csv<Row>(json, { delimiter: ';', headers: ['id', 'name'] })
    ).toEqual(csv);
  });
});
