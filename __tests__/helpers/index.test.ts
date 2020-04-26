import colors from 'colors/safe';
import { errorMessageTemplate } from '../../src/helpers';

describe('helpers', () => {
  it('errorMessageTemplate works', () => {
    const message = errorMessageTemplate('An error has occured');
    expect(message).toEqual(colors.red('❌ An error has occured'));
  });
});
