import { csv } from '..';

type Row = { id: string; name: string; gender?: string };

describe('csv', () => {
  it('should convert json to csv', () => {
    const csvData: string = `"id","name","gender"
"1","test1","male"
"2","test2",""`;
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    expect(csv<Row>(json)).toEqual(csvData);
  });

  it('should convert json to csv with delimiter and headers', () => {
    const json = [
      { id: '1', name: 'test1', gender: 'male' },
      { id: '2', name: 'test2' },
    ];
    const csvData = `"id";"name"
"1";"test1"
"2";"test2"`;
    expect(csv<Row>(json, { delimiter: ';', headers: ['id', 'name'] })).toEqual(
      csvData
    );
  });
});
