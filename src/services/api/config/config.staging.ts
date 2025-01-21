import { Config, baseConfig } from './config.base';

export const stagingConfig: Config = {
  ...baseConfig,
  environment: 'staging',
  apiUrl: 'https://api.infinitixai.com/api/v1',
  apiTimeout: 10000,
} as const;
