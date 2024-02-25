import { APP_DESCRIPTION, APP_NAME } from '../app.constants';

describe('app.constants', () => {
  it('', () => {
    expect(APP_NAME).toEqual('chess.com Insights');
    expect(APP_DESCRIPTION).toEqual(
      'Free and Open-source Software (FOSS) for chess.com Insights'
    );
  });
});
