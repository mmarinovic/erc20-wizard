import prompt from 'prompt';
import colors from 'colors/safe';
import { Spinner } from 'cli-spinner';
import { IPromptResult } from '../interfaces/prompt-result';

export class ConsoleService {
  spinner: Spinner;

  constructor() {
    this.spinner = new Spinner();
  }

  promptItems = [
    {
      description: colors.magenta(
        'Please enter your private key. This will be used to sign contract transaction.'
      ),
      name: 'privateKey',
      required: true,
      hidden: true,
    },
    {
      description: 'Token name',
      name: 'tokenName',
      pattern: /^[a-zA-Z ]+$/,
      required: true,
    },
    {
      description: 'Token symbol',
      name: 'tokenSymbol',
      pattern: /^[a-zA-Z]+$/,
      required: true,
    },
    {
      description: 'Token decimal places',
      name: 'tokenDecimals',
      pattern: /^[0-9]+$/,
      required: true,
    },
    {
      description: 'Token total supply',
      name: 'tokenTotalSupply',
      pattern: /^[0-9]+$/,
      required: true,
    },
  ];

  initPrompt(callback: (result: IPromptResult) => void) {
    this.spinner = new Spinner();

    prompt.start();
    prompt.get(this.promptItems, (_, result: IPromptResult) => {
      callback(result);
    });
  }

  showSpinner(message: string) {
    this.spinner.setSpinnerTitle(message);
    this.spinner.start();
  }

  stopSpinner() {
    this.spinner && this.spinner.stop();
  }
}
