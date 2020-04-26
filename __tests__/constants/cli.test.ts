import {
  cliPromptOptions,
  cliMessages,
  cliOptions,
} from '../../src/constants/cli';

describe('cli', () => {
  it('cliPromptOptions matches a snapshot', () => {
    expect(cliPromptOptions).toMatchSnapshot();
  });

  it('cliMessages matches a snapshot', () => {
    expect(cliMessages).toMatchSnapshot();
  });

  it('cliOptions matches a snapshot', () => {
    expect(cliOptions).toMatchSnapshot();
  });
});
