import { Controller } from './controller';
import { ConsoleService } from './services/console.service';
import { InfuraService } from './services/infura.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ConfigurationService } from './services/configuration.service';

const configurationSerice = new ConfigurationService();
const controller = new Controller(
  new ConsoleService(),
  new InfuraService(configurationSerice),
  new ContractTemplateService(),
  configurationSerice
);

controller.init();
