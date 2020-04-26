import { Controller } from './controller';
import { ConsoleService } from './services/console.service';
import { InfuraService } from './services/infura.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ConfigurationService } from './services/configuration.service';

const configurationSerice = new ConfigurationService();
const consoleService = new ConsoleService();
const infuraService = new InfuraService(configurationSerice);
const contractTemplateService = new ContractTemplateService();

const controller = new Controller(
  consoleService,
  infuraService,
  contractTemplateService,
  configurationSerice
);

controller.init();
