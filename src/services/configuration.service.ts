import config from '../config.json';
import { IConfiguration } from '../interfaces/configuration';

export class ConfigurationService {
  constructor() {
    this.validateConfig();
  }

  get(): IConfiguration {
    return {
      infura: {
        projectId: config.infura.projectId,
      },
    };
  }

  private validateConfig() {
    if (!config.infura?.projectId) {
      throw new Error('Infura project id is required');
    }
  }
}
