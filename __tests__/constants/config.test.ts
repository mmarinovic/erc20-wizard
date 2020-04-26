import { configKeys } from '../../src/constants/config';

describe('configKeys', () => {
  it('has correct keys', () => {
    expect(configKeys).toEqual({
      configProjectName: 'erc20-wizard',
      infuraProjectId: 'infuraProjectId',
    });
  });
});
