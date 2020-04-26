import { ConfigurationService } from '../../src/services/configuration.service';

describe('ConfigurationService', () => {
  const configurationService = new ConfigurationService();

  beforeEach(() => {
    configurationService.clear();
  });

  it('gets when nothing is set', () => {
    const config = configurationService.get();
    expect(config).toEqual({
      infura: {},
    });
  });

  it('gets when value is set', () => {
    configurationService.set('testProjectId');

    const config = configurationService.get();
    expect(config).toEqual({
      infura: {
        projectId: 'testProjectId',
      },
    });
  });

  it('clears', () => {
    configurationService.set('testProjectId');
    configurationService.clear();
    const config = configurationService.get();
    expect(config).toEqual({
      infura: {},
    });
  });
});
