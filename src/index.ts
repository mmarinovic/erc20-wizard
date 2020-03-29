import { Controller } from './controller';
import { ConsoleService } from './services/console.service';
import { InfuraService } from './services/infura.service';
import { ContractTemplateService } from './services/contract-template.service';
import { ConfigurationService } from './services/configuration.service';

const controller = new Controller(
  new ConsoleService(),
  new InfuraService(new ConfigurationService()),
  new ContractTemplateService()
);

controller.init();
