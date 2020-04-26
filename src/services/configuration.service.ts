import Configstore from 'configstore';
import { IConfiguration } from '../interfaces/configuration';
import { configKeys } from '../constants/config';

export class ConfigurationService {
  private configStore: Configstore;

  constructor() {
    this.configStore = new Configstore(configKeys.configProjectName);
  }

  get = (): IConfiguration => {
    return {
      infura: {
        projectId: this.configStore.get(configKeys.infuraProjectId),
      },
    };
  };

  set = (infuraProjectId: string) => {
    this.configStore.set(configKeys.infuraProjectId, infuraProjectId);
  };

  clear = () => {
    this.configStore.clear();
  };
}
