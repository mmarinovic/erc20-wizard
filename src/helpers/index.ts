import colors from 'colors/safe';

const errorMessageTemplate = (message: string) => colors.red(`❌ ${message}`);

export { errorMessageTemplate };
