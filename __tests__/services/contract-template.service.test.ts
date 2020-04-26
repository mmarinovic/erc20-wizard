import { ContractTemplateService } from '../../src/services/contract-template.service';

describe('ContractTemplateService', () => {
  const service = new ContractTemplateService();

  it('compiles contract', () => {
    const compliledContract = service.compileTemplate('TestTokenName');
    expect(compliledContract).toMatchSnapshot();
  });
});
