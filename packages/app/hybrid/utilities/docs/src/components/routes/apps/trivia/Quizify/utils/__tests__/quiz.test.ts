import { parseCsv, colorClassMap } from '../quiz';

describe('parseCsv', () => {
  it('parses CSV with header and rows', () => {
    const csv = `question,red,blue,green,yellow,correct
What is 2+2?,4,5,6,7,red
What is the capital of France?,London,Paris,Berlin,Madrid,blue`;

    const result = parseCsv(csv);
    expect(result).toHaveLength(2);

    expect(result[0].question).toBe('What is 2+2?');
    expect(result[0].answers).toEqual({
      red: '4',
      blue: '5',
      green: '6',
      yellow: '7',
    });
    expect(result[0].correct).toBe('red');

    expect(result[1].question).toBe('What is the capital of France?');
    expect(result[1].answers).toEqual({
      red: 'London',
      blue: 'Paris',
      green: 'Berlin',
      yellow: 'Madrid',
    });
    expect(result[1].correct).toBe('blue');
  });

  it('skips rows with fewer than 6 values', () => {
    const csv = `question,red,blue,green,yellow,correct
only,five,values,here,now`;
    expect(parseCsv(csv)).toHaveLength(0);
  });

  it('returns empty array for empty input', () => {
    expect(parseCsv('')).toEqual([]);
  });
});

describe('colorClassMap', () => {
  it('maps colors to btn classes', () => {
    expect(colorClassMap.red).toBe('btn-error');
    expect(colorClassMap.yellow).toBe('btn-warning');
    expect(colorClassMap.blue).toBe('btn-info');
    expect(colorClassMap.green).toBe('btn-success');
  });
});
