import path from 'path';
import fs from 'fs';
import solc from 'solc';

export class ContractTemplateService {
  compileTemplate(tokenName: string) {
    const template = this.loadTemplate();
    const preparedtemplate = this.prepareForCompile(template, tokenName);
    return solc.compile(preparedtemplate).contracts[`:${tokenName}`];
  }

  private loadTemplate() {
    const contractPath = path.resolve(
      __dirname,
      '../contracts',
      'Erc20TokenTemplate.sol'
    );
    return fs.readFileSync(contractPath, 'utf8');
  }

  private prepareForCompile(template: string, tokenName: string) {
    return template.replace('Erc20TokenNamePlaceholder', tokenName);
  }
}
