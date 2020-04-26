import prompt from 'prompt';
import minimist from 'minimist';
import { cliPromptOptions, cliOptions } from '../constants/cli';
import { Spinner } from 'cli-spinner';
import { IPromptResult } from '../interfaces/prompt-result';
import { ICliArgs } from '../interfaces/cli-args';

export class ConsoleService {
  spinner: Spinner;

  constructor() {
    this.spinner = new Spinner();
  }

  initPrompt(callback: (result: IPromptResult) => void) {
    this.spinner = new Spinner();

    prompt.start();
    prompt.get(cliPromptOptions, (_, result: IPromptResult) => {
      callback(result);
    });
  }

  showSpinner(message: string) {
    this.spinner.setSpinnerTitle(message);
    this.spinner.start();
  }

  stopSpinner() {
    if (this.spinner) {
      this.spinner.stop(true);
    }
  }

  getArgs(processArgs: string[]): ICliArgs {
    return minimist(processArgs.slice(2), cliOptions) as any;
  }
}
