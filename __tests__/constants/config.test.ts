import { configKeys } from '../../src/constants/config';

describe('configKeys', () => {
  it('matches a snapshot', () => {
    expect(configKeys).toMatchSnapshot();
  });
});
