import { groupBy } from '.';

describe('groupBy', () => {
  it('should group by value', () => {
    const array = [
      { id: '1', gender: 'male' },
      { id: '2', gender: 'male' },
      { id: '3', gender: 'female' },
      { id: '4', gender: 'female' },
    ];
    const groups = groupBy(array, 'gender');
    expect(groups).toEqual({
      male: [
        { id: '1', gender: 'male' },
        { id: '2', gender: 'male' },
      ],
      female: [
        { id: '3', gender: 'female' },
        { id: '4', gender: 'female' },
      ],
    });
  });
});
